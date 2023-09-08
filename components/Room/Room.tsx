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

const Message = ({ user }: { user: string }) => {
	return (
		<p>
			<span className="font-bold">{user}</span> left the room
		</p>
	);
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
		onUserLeave: (name) => {
			console.log(name);
			toast.message(Message({ user: name }));
		},
	});

	const onClick = (id: CardProps["id"]) => {
		vote(id);
		toast.success("Voted");
	};

	const onResetVotes = () => {
		resetVotes();
	};

	const copyShareButton = async () => {
		await navigator.clipboard.writeText(window.location.href);
		toast.success("Link copied");
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
				<section className="container m-auto py-5 flex gap-2">
					<Button
						color="primary"
						onClick={showVotes ? onResetVotes : revealVotes}
					>
						{showVotes ? "Reset votes" : "Reveal votes"}
					</Button>
					<Button color="primary" onClick={copyShareButton}>
						Share link
						{/* rome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							className="w-4 h-4 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 18"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"
							/>
						</svg>
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
