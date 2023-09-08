import {
	leaveRoomEvent,
	resetVotesEvent,
	revealVotesEvent,
	voteEvent,
} from "./events";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";
import type { UseRoomParams, User, Vote, Room, Card } from "./types";
import { Errors } from "@/utils/Errors";
import { SOCKET_CONFIGS } from "./constants";

const useRoom = ({ roomId, user, onUserLeave }: UseRoomParams) => {
	const socket = useRef<Socket | null>(null);
	const router = useRouter();
	const [selectedCard, setSelectedCard] = useState<number | null>(null);
	const [room, setRoom] = useState<Room>({
		users: [],
		cards: [],
		votes: [],
		showVotes: false,
		votesAverage: 0,
	});

	const [connected, setConnected] = useState(false);

	// Errors
	const [error, setError] = useState(null);

	useEffect(() => {
		try {
			socket.current = io(SOCKET_CONFIGS.url, SOCKET_CONFIGS.options);
			socket.current.on("connect", () => console.log("Connected successfully"));
			socket.current.emit("join_room", { user, roomId });
			socket.current.on("joined", (data: Room) => {
				setRoom(data);
				setConnected(true);
			});
			socket.current.on("room_not_found", () => {
				router.replace(`/?error=${Errors.ROOM_NOT_FOUND}`);
			});
			// Users
			socket.current.on("user_joined", (user: User) => {
				setRoom((room) => ({
					...room,
					users: [...room.users, user],
				}));
			});
			socket.current.on("user_left", ({ id, userName }: User) => {
				if (onUserLeave) onUserLeave(userName);

				setRoom((room) => ({
					...room,
					users: room.users.filter((u) => u.id !== id),
				}));
			});
			//Votes
			socket.current.on("reveal_votes", ({ votesAverage }) => {
				setRoom((room) => ({
					...room,
					showVotes: true,
					votesAverage,
				}));
			});
			socket.current.on("reset_votes", () => {
				setRoom((room) => ({
					...room,
					showVotes: false,
					votes: [],
					votesAverage: 0,
				}));
				setSelectedCard(null);
			});
			socket.current.on("user_voted", (vote: Vote) => {
				setRoom((room) => {
					const index = room.votes.findIndex((v) => v.userId === vote.userId);

					let newVotes = [...room.votes, vote];

					if (index !== -1) {
						newVotes = structuredClone(room.votes);
						newVotes.splice(index, 1, vote);
					}

					return {
						...room,
						votes: newVotes,
					};
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
		setSelectedCard(cardId);
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

	return {
		users: room.users,
		votes: room.votes,
		cards: room.cards,
		vote,
		showVotes: room.showVotes,
		revealVotes,
		resetVotes,
		connected,
		votesAverage: room.votesAverage,
		selectedCard,
	};
};

export default useRoom;
