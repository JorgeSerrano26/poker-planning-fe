import GlitchText from "@/components/GlitchText/GlitchText";
import LoginForm from "./components/LoginForm/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

type Props = {
	searchParams?: {
		callbackUrl: string;
	};
};

const Login = async ({ searchParams }: Props) => {
	const session = await getServerSession(options);

	if (session) {
		redirect("/");
	}

	return (
		<section className="flex flex-col items-center justify-center w-full h-screen p-5">
			<h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl">
				<GlitchText text="Poker Planning" className="mb-5" />
			</h5>
			<LoginForm callbackUrl={searchParams?.callbackUrl} />
		</section>
	);
};

export default Login;
