"use client";

import GlitchText from "@/components/GlitchText/GlitchText";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Input } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options";

type Props = {
	searchParams?: {
		error: "room_not_found";
	};
};

export default async function Home({ searchParams }: Props) {
	// const session = await getServerSession(options);

	// if (!session) {
	// 	redirect("/api/auth/signin?callbackUrl=/");
	// }

	const router = useRouter();
	const socket = useRef<Socket | null>(null);
	const [roomId, setRoomId] = useState("");

	useEffect(() => {
		socket.current = io("http://localhost:4000", {
			reconnection: true,
			reconnectionDelay: 3000, // 3 segundos
			reconnectionDelayMax: 5000,
			reconnectionAttempts: 5,
		});
		socket.current.on("connect_error", () => {
			toast.error("Connection error, try later.");
		});
		socket.current.on("connect", onConnect);
		socket.current.on("room_created", (data: { roomId: string }) => {
			router.replace(`/room/${data.roomId}`);
		});
	}, []);

	const onConnect = () => {
		console.log("Connected successfully");
		toast.success("Connected successfully");
	};

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
						type="button"
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
