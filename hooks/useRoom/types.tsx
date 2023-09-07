import { CardProps } from "@/components/Card/Card";

export type UseRoomParams = {
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

export type JoinedData = {
	users: User[];
	cards: Card[];
	votes: Vote[];
	showCards: boolean;
};

export type Card = Pick<CardProps, "value" | "label" | "id">;
