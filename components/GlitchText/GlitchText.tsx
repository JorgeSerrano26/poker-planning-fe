import classNames from "classnames";
import styles from "./styles.module.scss";

type Props = {
	className?: string;
	text: string;
};

const GlitchText = ({ className = "", text }: Props) => {
	const glitchClass = classNames(styles.glitch, className);

	return (
		<div className={glitchClass} data-glitch={text} aria-label={text}>
			{text}
		</div>
	);
};

export default GlitchText;
