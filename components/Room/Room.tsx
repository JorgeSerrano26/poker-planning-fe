"use client";

import useRoom from "@/hooks/useRoom/useRoom";
import type { User } from "@/hooks/useRoom/types";
import { CardProps } from "../Card/Card";
import CardsContainer from "../CardsContainer/CardsContainer";
import { Button, Spinner } from "@nextui-org/react";
import ListOfUsers from "@/components/ListOfUsers/ListOfUsers";
import { Toaster, toast } from "sonner";

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
		votesAverage,
		selectedCard,
	} = useRoom({
		roomId: roomId,
		user,
	});

	const onClick = (id: CardProps["id"]) => {
		vote(id);
		toast.success("Voted");
	};

	const onResetVotes = () => {
		resetVotes();
	};

	if (!connected) {
		return (
			<div className="w-full h-full flex justify-center align-middle">
				<Spinner />
			</div>
		);
	}
	return (
		<>
			<div className="w-full mx-auto">
				<div className="container m-auto py-5">
					<h1 className="font-bold">
						Room {roomId} - Usuario {user.userName}
					</h1>
				</div>
				<section className="container m-auto py-5">
					<Button
						color="primary"
						onClick={showVotes ? onResetVotes : revealVotes}
					>
						{showVotes ? "Reset votes" : "Reveal votes"}
					</Button>
				</section>

				<section className="container m-auto py-5">
					<CardsContainer
						showVotes={showVotes}
						cards={cards.map((card) => ({
							...card,
							onClick,
							selected: selectedCard === card.id,
						}))}
					/>
				</section>
				<section className="container m-auto py-5">
					<ListOfUsers
						currentUser={user}
						users={users}
						votes={votes}
						cards={cards}
						showVotes={showVotes}
						votesAverage={votesAverage}
					/>
				</section>
			</div>
			<Toaster position="top-right" richColors />
		</>
	);
};

export default RoomComponent;
