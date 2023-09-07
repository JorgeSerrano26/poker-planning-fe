import type { User, Vote, Card } from "@/hooks/useRoom/types";
import { Avatar } from "@nextui-org/react";

type Props = {
	users: User[];
	votes: Vote[];
	cards: Card[];
	showVotes?: boolean;
};

const ListOfUsers = ({ users, votes, cards, showVotes = false }: Props) => {
	return (
		<div className="w-full max-w-md p-4 bg-gray-900 border rounded-lg shadow sm:p-8">
			<div className="flex items-center justify-between mb-4">
				<h5 className="text-xl font-bold leading-none text-white">
					Conntected users
				</h5>
			</div>
			<div className="flow-root">
				<ul
					role="list"
					className="divide-y divide-gray-200 dark:divide-gray-700"
				>
					{users.map((user) => {
						const vote = votes?.find((el) => el.userId === user.id);
						const card = cards.find((card) => card.id === vote?.cardId);

						const voteLabel = !vote
							? "Aun no voto"
							: showVotes
							? card?.label
							: "Voto oculto";

						return (
							<li className="py-3 sm:py-4" key={`vote-${user.id}`}>
								<div className="flex items-center space-x-4">
									<div className="flex-shrink-0">
										<Avatar
											src={user.image}
											className="mr-2"
											alt={user.userName}
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-lg font-medium text-gray-300 truncate">
											{user.userName}
										</p>
									</div>
									<div className="inline-flex items-center text-base font-semibold text-gray-300">
										{voteLabel}
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ListOfUsers;
