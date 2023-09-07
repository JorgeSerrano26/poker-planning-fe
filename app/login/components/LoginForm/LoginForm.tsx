"use client";

import { signIn } from "next-auth/react";
import GoogleButton from "@/components/GoogleButton/GoogleButton";

type Props = {
	callbackUrl?: string;
};

const ProvidersMap = {
	google: GoogleButton,
};

type Provider = keyof typeof ProvidersMap;

const availableProviders: Provider[] = Object.keys(ProvidersMap) as Provider[];

const LoginForm = ({ callbackUrl = "/" }: Props) => {
	const handleOnClick = (provider: string) => () => {
		signIn(provider, { callbackUrl });
	};

	return (
		<div>
			{availableProviders.map((provider) => {
				const Component = ProvidersMap[provider];

				return <Component onClick={handleOnClick(provider)} />;
			})}
		</div>
	);
};

export default LoginForm;
