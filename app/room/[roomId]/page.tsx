import { redirect } from "next/navigation";
import RoomComponent from "@/components/Room/Room";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/hooks/useRoom";

type NextPage = { params: { roomId: string } };

const Room = async ({ params }: NextPage) => {
	const session = await getServerSession(options);

	if (!session) {
		redirect(`/login?callbackUrl=/room/${params.roomId}`);
	}

	const { user } = session;

	if (!params.roomId) {
		redirect("/?error=invalidroom");
	}

	const finalUser: User = {
		userName: user?.name ?? "",
		id: user?.email ?? "",
		image: user?.image ?? "",
	};

	return <RoomComponent user={finalUser} roomId={params.roomId} />;
};

export default Room;
