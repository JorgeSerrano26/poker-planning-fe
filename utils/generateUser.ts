import { User } from "@/hooks/useRoom/types";

type Param = {
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
};

const generateUser = (user: Param = {}): User => {
	return {
		userName: user?.name ?? "User without name",
		id: user?.email ?? "User without email",
		image: user?.image ?? "",
	};
};

export default generateUser;
