"use client";

import { useUser } from "@/context/useUser";
import { Avatar, Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

const Header = () => {
	const { userName, image } = useUser();

	return (
		<header className="w-full px-5 py-2 ">
			<div className="container m-auto shadow-md rounded-lg bg-blue-500 bg-opacity-20 py-3 px-2 flex justify-between">
				<div className="flex items-center gap-2">
					<Avatar src={image} showFallback />
					<p className="text-white font-bold">{userName}</p>
				</div>
				<Button
					color="danger"
					type="button"
					variant="flat"
					onClick={() => signOut()}
				>
					Cerrar sesion
				</Button>
			</div>
		</header>
	);
};

export default Header;
