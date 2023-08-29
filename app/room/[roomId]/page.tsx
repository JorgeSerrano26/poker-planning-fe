"use client";

import CardsContainer from "@/components/CardsContainer/CardsContainer";
import { CardProps } from "@/components/Card/Card";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useRoom from "@/hooks/useRoom";
import { v4 as uuid } from "uuid";
import RoomComponent from "@/components/Room/Room";

type NextPage = { params: { roomId: string } };

const Room = ({ params }: NextPage) => {
	if (!params.roomId) {
		redirect("/");
	}
	const [user, setUser] = useState<{ userName: string; id: string }>({
		userName: "",
		id: "",
	});

	useEffect(() => {
		const currUser = localStorage.getItem("user");
		if (currUser) {
			setUser(JSON.parse(currUser));
		}
	}, []);

	const createUser = () => {
		const finalUser = { ...user, id: uuid() };
		setUser(finalUser);
		localStorage.setItem("user", JSON.stringify(finalUser));
	};

	if (user.id) {
		return <RoomComponent user={user} roomId={params.roomId} />;
	}

	return (
		<div>
			<input
				type="text"
				name="userName"
				id="username"
				onChange={(event) => setUser({ ...user, userName: event.target.value })}
			/>
			<button
				type="submit"
				onClick={createUser}
				disabled={!user}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				Seleccionar nombre
			</button>
		</div>
	);
};

export default Room;
