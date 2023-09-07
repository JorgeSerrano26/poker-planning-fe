"use client";

import useRoom from "@/hooks/useRoom/useRoom";
import type { User } from "@/hooks/useRoom/types";
import { CardProps } from "../Card/Card";
import { useState } from "react";
import CardsContainer from "../CardsContainer/CardsContainer";
import { Button, Spinner } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import ListOfUsers from "@/components/ListOfUsers/ListOfUsers";

type Props = {
	user: User;
	roomId: string;
};

const RoomComponent = ({ roomId, user }: Props) => {
	const {
		users,
		cards,
		votes,
		showVotes,
		vote,
		revealVotes,
		resetVotes,
		connected,
	} = useRoom({
		roomId: roomId,
		user,
	});

	const [selectedCard, setSelectedCard] = useState<number | null>(null);
	const [selectedValue, setSelectedValue] = useState<number | null>(null);

	const onClick = (id: CardProps["id"], value: CardProps["value"]) => {
		setSelectedCard(id);
		setSelectedValue(value);
		vote(id);
	};

	const onResetVotes = () => {
		resetVotes();
		setSelectedCard(null);
		setSelectedValue(null);
	};

	if (!connected) {
		return (
			<div className="w-full h-full flex justify-center align-middle">
				<Spinner />
			</div>
		);
	}
	return (
		<div>
			<h1>
				Room {roomId} - {user.userName}
			</h1>
			<div>
				<p>Selected card: {selectedCard}</p>
				<p>Selected value: {selectedValue}</p>
			</div>

			<Button color="primary" onClick={showVotes ? onResetVotes : revealVotes}>
				{showVotes ? "Reset votes" : "Reveal votes"}
			</Button>

			<CardsContainer
				cards={cards.map((card) => ({
					...card,
					onClick,
					selected: selectedCard === card.id,
				}))}
			/>
			<div>
				{votes?.map((vote) => {
					return (
						<p key={vote.voteId}>
							{vote.userId} {vote.cardId}
						</p>
					);
				})}
			</div>
			<div>
				<ListOfUsers
					users={users}
					votes={votes}
					cards={cards}
					showVotes={showVotes}
				/>
			</div>
		</div>
	);
};

export default RoomComponent;
