"use client";

import useRoom, { User } from "@/hooks/useRoom";
import { CardProps } from "../Card/Card";
import { useState } from "react";
import CardsContainer from "../CardsContainer/CardsContainer";
import { Button, Spinner } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

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
			<Button color="primary">Cerrar sesion</Button>
			<h1>
				Room {roomId} - {user.userName}
			</h1>
			<div>
				<p>Selected card: {selectedCard}</p>
				<p>Selected value: {selectedValue}</p>
			</div>

			<button
				type="submit"
				onClick={showVotes ? onResetVotes : revealVotes}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				{showVotes ? "Reset votes" : "Reveal votes"}
			</button>

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
			<div className="w-72 h-72 bg-blue-600 bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg p-3">
				<ul className="flex flex-col">
					{users.map((user) => {
						const vote = votes?.find((el) => el.userId === user.id);
						console.log(vote);
						const card = cards.find((card) => card.id === vote?.cardId);

						const label = !vote
							? "Aun no voto"
							: showVotes
							? card?.label
							: "Voto oculto";

						return (
							<li key={`vote-${user.id}`} className="flex items-center">
								<Avatar src={user.image} className="mr-2" />
								<span className="truncate max-w-[100px]:">{user.userName}</span>{" "}
								- {label}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default RoomComponent;
