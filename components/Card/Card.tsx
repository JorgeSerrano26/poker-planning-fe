import classnames from "classnames";

export type CardProps = {
	label: string;
	value: number | null;
	onClick: (id: number, value: CardProps["value"]) => void;
	selected?: boolean;
	id: number;
	disabled?: boolean;
};

const Card = ({
	label,
	value,
	onClick,
	id,
	selected = false,
	disabled = false,
}: CardProps) => {
	const onClickCard = () => onClick(id, value);

	const cardClass = classnames(
		"cursor-pointer outline-none rounded-lg text-2xl h-32 w-20 font-bold border-solid border-2 border-[#3993ff] hover:shadow-blue hover:bg-[#3993ff] transition",
		selected && "bg-[#3993ff] hover:shadow-none",
		disabled && !selected && "opacity-50",
		disabled && "cursor-not-allowed hover:cursor-not-allowed",
		disabled && "hover:shadow-none",
	);

	return (
		<li>
			<button
				onClick={disabled ? undefined : onClickCard}
				className={cardClass}
				type="button"
			>
				{label}
			</button>
		</li>
	);
};

export default Card;
