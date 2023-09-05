import Card, { CardProps } from "../Card/Card";

type Props = {
	cards?: CardProps[];
};

const CardContainer = ({ cards = [] }: Props) => {
	return (
		<ul className="flex flex-wrap gap-2 list-none justify-center">
			{cards.map((card, index) => (
				<Card key={`card-${index}`} {...card} />
			))}
		</ul>
	);
};

export default CardContainer;
