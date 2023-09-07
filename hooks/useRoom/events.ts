import { User } from "./types";

export enum SocketEvents {
	RESET_VOTES = "reset_votes",
	REVEAL_VOTES = "reveal_votes",
	VOTE = "vote",
	LEAVE_ROOM = "leave_room",
	JOIN_ROOM = "join_room",
}

// Types datas
type BaseEvent = {
	roomId: string;
};

type ResetVotes = {} & BaseEvent;
type RevealVotes = {} & BaseEvent;
type Vote = {
	cardId: number;
	user: User;
} & BaseEvent;
type LeaveRoom = { user: User } & BaseEvent;

// Events
type Event<Data> = (data: Data) => {
	event: SocketEvents;
	data: Data;
};

// Events functions
export const resetVotesEvent: Event<ResetVotes> = (data) => ({
	event: SocketEvents.RESET_VOTES,
	data,
});

export const revealVotesEvent: Event<RevealVotes> = (data) => ({
	event: SocketEvents.REVEAL_VOTES,
	data,
});

export const voteEvent: Event<Vote> = (data) => ({
	event: SocketEvents.VOTE,
	data,
});

export const leaveRoomEvent: Event<LeaveRoom> = (data) => ({
	event: SocketEvents.LEAVE_ROOM,
	data,
});
