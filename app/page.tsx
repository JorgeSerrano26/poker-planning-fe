import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import CreateRoomOrJoin from "@/components/CreateRoomOrJoin";

type Props = {
	searchParams?: {
		error: "room_not_found";
	};
};

export default async function Home({ searchParams }: Props) {
	const session = await getServerSession(options);

	if (!session) {
		redirect("/login?callbackUrl=/");
	}

	return <CreateRoomOrJoin error={searchParams?.error} />;
}
