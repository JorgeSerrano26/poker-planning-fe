import {
	leaveRoomEvent,
	resetVotesEvent,
	revealVotesEvent,
	voteEvent,
} from "./events";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import type { UseRoomParams, User, Vote, JoinedData, Card } from "./types";
import { Errors } from "@/utils/Errors";
import { SOCKET_CONFIGS } from "./constants";

const useRoom = ({ roomId, user }: UseRoomParams) => {
	const socket = useRef<Socket | null>(null);
	const router = useRouter();
	// States
	const [showVotes, setShowVotes] = useState(false);
	const [users, setUsers] = useState<User[]>([]);
	const [cards, setCards] = useState<Card[]>([]);
	const [votes, setVotes] = useState<Vote[]>([]);
	const [connected, setConnected] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		try {
			socket.current = io(SOCKET_CONFIGS.url, SOCKET_CONFIGS.options);
			socket.current.on("connect", () => console.log("Connected successfully"));
			socket.current.emit("join_room", { user, roomId });
			socket.current.on("joined", (data: JoinedData) => {
				const { users, cards, votes, showCards } = data;
				setShowVotes(showCards);
				setVotes(votes);
				setUsers(users);
				setCards(cards);
				setConnected(true);
			});
			socket.current.on("room_not_found", () => {
				router.replace(`/?error=${Errors.ROOM_NOT_FOUND}`);
			});
			// Users
			socket.current.on("user_joined", (user: User) => {
				setUsers((users) => [...users, user]);
			});
			socket.current.on("user_left", ({ userId }: { userId: string }) => {
				setUsers((users) => {
					const index = users.findIndex((u) => u.id === userId);

					const newUsers = structuredClone(users);

					newUsers.splice(index, 1);

					return newUsers;
				});
			});
			//Votes
			socket.current.on("reveal_votes", () => {
				setShowVotes(true);
			});
			socket.current.on("reset_votes", () => {
				setShowVotes(false);
				setVotes([]);
			});
			socket.current.on("user_voted", (vote: Vote) => {
				setVotes((currentVotes) => {
					console.log("currentVotes", currentVotes);
					const index = currentVotes.findIndex((v) => v.userId === vote.userId);
					console.log("index", index);
					if (index === -1) {
						return [...currentVotes, vote];
					} else {
						const newVotes = structuredClone(currentVotes);
						newVotes.splice(index, 1, vote);

						return newVotes;
					}
				});
			});
			socket.current.on("connect_error", () => {});
			socket.current.on("room_created", (data: { roomId: string }) => {
				router.replace(`/room/${data.roomId}`);
			});
			window.addEventListener("beforeunload", () => {
				socket.current?.emit("leave_room", { roomId, user });
				socket.current?.disconnect();
				socket.current = null;
			});
		} catch (error) {
			console.log(error);
		}

		return () => {
			// Reset socket on unmount
			const { event, data } = leaveRoomEvent({ roomId, user });
			socket.current?.emit(event, data);
			window.removeEventListener("beforeunload", () => {});
			socket.current?.disconnect();
			socket.current = null;
		};
	}, []);

	const vote = (cardId: number) => {
		const { event, data } = voteEvent({ roomId, cardId, user });
		socket.current?.emit(event, data);
	};

	const revealVotes = () => {
		const { event, data } = revealVotesEvent({ roomId });
		socket.current?.emit(event, data);
	};

	const resetVotes = () => {
		const { event, data } = resetVotesEvent({ roomId });
		socket.current?.emit(event, data);
	};

	const createRoom = () => {
		socket.current?.emit("create_room");
	};

	return {
		users,
		votes,
		cards,
		vote,
		showVotes,
		user,
		revealVotes,
		resetVotes,
		connected,
	};
};

export default useRoom;
