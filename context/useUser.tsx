"use client";

import { User } from "@/hooks/useRoom/types";
import { createContext, useContext } from "react";

const UserContext = createContext<User>({
	userName: "",
	id: "",
	image: "",
});

export const useUser = () => useContext(UserContext);

type Props = {
	children?: React.ReactNode;
	user: User;
};

export const UserProvider = ({ children, user }: Props) => (
	<UserContext.Provider value={user}>{children}</UserContext.Provider>
);
