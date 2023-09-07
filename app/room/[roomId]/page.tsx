import { redirect } from "next/navigation";
import RoomComponent from "@/components/Room/Room";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/hooks/useRoom/types";
import { Errors } from "@/utils/Errors";
import API from "@/app/services/API";

type NextPage = { params: { roomId: string } };

const getRoom = async (roomId: string) => {
	try {
		const data = await API.getRoom(roomId);
		return {
			data,
			error: null,
		};
	} catch (error) {
		return {
			data: null,
			error: error,
		};
	}
};

const Room = async ({ params }: NextPage) => {
	const session = await getServerSession(options);

	if (!session) {
		redirect(`/login?callbackUrl=/room/${params.roomId}`);
	}

	const { user } = session;

	if (!params.roomId) {
		redirect("/?error=invalidroom");
	}

	const { error } = await getRoom(params.roomId);

	if (error) {
		redirect(`/?error=${Errors.ROOM_NOT_FOUND}`);
	}

	const finalUser: User = {
		userName: user?.name ?? "",
		id: user?.email ?? "",
		image: user?.image ?? "",
	};

	return <RoomComponent user={finalUser} roomId={params.roomId} />;
};

export default Room;
