"use client";

import GlitchText from "@/components/GlitchText/GlitchText";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

export default function Home() {
	const router = useRouter();
	const socket = useRef<Socket | null>(null);

	useEffect(() => {
		socket.current = io("http://localhost:4000");
		socket.current.on("connect", onConnect);
		socket.current.on("room_created", (data: { roomId: string }) => {
			router.replace(`/room/${data.roomId}`);
		});
	}, []);

	const onConnect = () => console.log("Connected successfully");

	const creteRoom = () => {
		socket.current?.emit("create_room");
	};

	return (
		<main className="grid place-items-center w-full h-screen">
			<div className="flex flex-col justify-center">
				<GlitchText text="Poker Planning" className="mb-5" />
				<button
					type="submit"
					onClick={creteRoom}
					disabled={!socket}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					Crear sala
				</button>
			</div>
		</main>
	);
}
