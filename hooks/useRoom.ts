import { CardProps } from "@/components/Card/Card";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useRouter } from "next/navigation";

type UseRoomParams = {
	roomId: string;
	user: User;
};

export type User = {
	userName: string;
	id: string;
	image: string;
};

export type Vote = {
	voteId: string;
	cardId: number;
	userId: User["id"];
};

type JoinedData = {
	users: User[];
	cards: Card[];
	votes: Vote[];
	showCards: boolean;
};

const onConnect = () => console.log("Connected successfully");

export type Card = Pick<CardProps, "value" | "label" | "id">;

const useRoom = ({ roomId, user }: UseRoomParams) => {
	const socket = useRef<Socket | null>(null);
	const router = useRouter();
	// States
	const [showVotes, setShowVotes] = useState(false);
	const [users, setUsers] = useState<User[]>([]);
	const [cards, setCards] = useState<Card[]>([]);
	const [votes, setVotes] = useState<Vote[]>([]);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		try {
			socket.current = io("http://localhost:4000");
			socket.current.on("connect", onConnect);
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
				router.replace("/?error=room_not_found");
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
			window.addEventListener("beforeunload", () => {
				socket.current?.emit("leave_room", { roomId, user });
				socket.current?.disconnect();
				socket.current = null;
			});
		} catch (error) {
			console.log(error);
		}

		return () => {
			socket.current?.emit("leave_room", { roomId, user });
			window.removeEventListener("beforeunload", () => {});
			socket.current?.disconnect();
			socket.current = null;
		};
	}, []);

	const vote = (cardId: number) => {
		socket.current?.emit("vote", { roomId, cardId, user });
	};

	const revealVotes = () => {
		socket.current?.emit("reveal_votes", { roomId });
	};

	const resetVotes = () => {
		socket.current?.emit("reset_votes", { roomId });
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
