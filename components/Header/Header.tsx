"use client";

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

const Header = () => {
	return (
		<div className="w-full bg-slate-400 px-5 py-2 shadow-md">
			<Button color="primary" onClick={() => signOut()}>
				Cerrar sesion
			</Button>
		</div>
	);
};

export default Header;
