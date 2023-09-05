"use client";

import useRoom, { User } from "@/hooks/useRoom";
import { CardProps } from "../Card/Card";
import { useState } from "react";
import CardsContainer from "../CardsContainer/CardsContainer";
import Link from "next/link";

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
		user: currentUser,
		revealVotes,
		resetVotes,
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

	return (
		<div>
			<li>
				<Link href="/api/auth/signout">Sign Out</Link>
			</li>
			<h1>Room {roomId}</h1>
			<div>
				<p>Selected card: {selectedCard}</p>
				<p>Selected value: {selectedValue}</p>
			</div>
			{showVotes ? (
				<button
					type="submit"
					onClick={onResetVotes}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Reset votes
				</button>
			) : (
				<button
					type="submit"
					onClick={revealVotes}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Reveal votes
				</button>
			)}
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
			<ul>
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
						<li key={`vote-${user.id}`}>
							{user.userName} {label}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default RoomComponent;
