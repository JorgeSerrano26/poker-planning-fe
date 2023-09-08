import { redirect } from "next/navigation";
import RoomComponent from "@/components/Room/Room";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { User } from "@/hooks/useRoom/types";
import { Errors } from "@/utils/Errors";
import API from "@/app/services/API";
import { UserProvider } from "@/context/useUser";
import Header from "@/components/Header/Header";
import generateUser from "@/utils/generateUser";

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

	const { error } = await getRoom(params.roomId);

	if (error) {
		redirect(`/?error=${Errors.ROOM_NOT_FOUND}`);
	}

	const user = generateUser(session.user);

	return (
		<UserProvider user={user}>
			<Header />
			<RoomComponent user={user} roomId={params.roomId} />
		</UserProvider>
	);
};

export default Room;
