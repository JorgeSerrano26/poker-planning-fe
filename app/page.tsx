"use client";

import GlitchText from "@/components/GlitchText/GlitchText";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Input } from "@nextui-org/react";
import { Toaster, toast } from "sonner";

type Props = {
	searchParams?: {
		error: "room_not_found";
	};
};

export default function Home({ searchParams }: Props) {
	const router = useRouter();
	const socket = useRef<Socket | null>(null);
	const [roomId, setRoomId] = useState("");

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

	const handleRoomId: React.ChangeEventHandler<HTMLInputElement> = (e) =>
		setRoomId(e.target.value);

	useEffect(() => {
		if (searchParams?.error === "room_not_found") {
			toast.error("The room doesn't exist");
		}
	}, []);

	return (
		<>
			<main className="grid place-items-center w-full h-screen">
				<div className="flex flex-col justify-center">
					<GlitchText text="Poker Planning" className="mb-5" />
					<Input
						label="Room id"
						color="primary"
						placeholder="0de8bd80-0704..."
						value={roomId}
						onChange={handleRoomId}
						className="mb-3"
					/>
					<a
						href={roomId.length ? `/room/${roomId}` : "#"}
						className={`${
							roomId.length ? "disabled" : ""
						} text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
					>
						Unirse a la sala
					</a>
					<span className="h-1 w-full bg-blue-700 mt-5 mb-5 rounded" />
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
			<Toaster position="top-right" richColors />
		</>
	);
}
