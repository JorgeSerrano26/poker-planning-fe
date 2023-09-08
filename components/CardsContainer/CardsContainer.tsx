import Card, { CardProps } from "../Card/Card";

type Props = {
	cards?: CardProps[];
	showVotes?: boolean;
};

const CardContainer = ({ cards = [], showVotes = false }: Props) => {
	return (
		<ul className="flex flex-wrap gap-2 list-none">
			{cards.map((card, index) => (
				<Card key={`card-${index}`} {...card} disabled={showVotes} />
			))}
		</ul>
	);
};

export default CardContainer;
