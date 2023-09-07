import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import GoogleLogo from "./GoogleLogo";

type Props = Omit<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	"className" | "type" | "aria-label"
>;

const GoogleButton = (props: Props) => {
	return (
		<button
			type="button"
			aria-label="Sign in with Google"
			className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
			{...props}
		>
			<GoogleLogo />
			Sign in with Google
		</button>
	);
};

export default GoogleButton;
