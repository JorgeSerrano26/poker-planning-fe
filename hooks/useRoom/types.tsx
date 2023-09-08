import { CardProps } from "@/components/Card/Card";

export type UseRoomParams = {
	roomId: string;
	user: User;
	onConnect?: () => void;
	onConnectError?: (error: string) => void;
	onUserLeave?: (name: string) => void;
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

export type Room = {
	users: User[];
	cards: Card[];
	votes: Vote[];
	showVotes: boolean;
	votesAverage: number;
};

export type Card = Pick<CardProps, "value" | "label" | "id">;
