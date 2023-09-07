"use client";

import GlitchText from "@/components/GlitchText/GlitchText";
import GoogleButton from "@/components/GoogleButton/GoogleButton";
import { signIn } from "next-auth/react";

type Props = {
	searchParams?: {
		callbackUrl: string;
	};
};

const Login = ({ searchParams }: Props) => {
	const handleOnClick = () => {
		signIn("google", { callbackUrl: searchParams?.callbackUrl ?? "/" });
	};

	return (
		<main className="flex flex-col items-center justify-center w-full h-full p-5">
			<h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
				<GlitchText text="Poker Planning" className="mb-5" />
			</h5>
			<GoogleButton onClick={handleOnClick} />
		</main>
	);
};

export default Login;
