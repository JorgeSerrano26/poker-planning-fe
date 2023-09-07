"use client";

import GlitchText from "@/components/GlitchText/GlitchText";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import useRoom from "@/hooks/useRoom/useRoom";
import useCreateRoom from "@/hooks/useCreateRoom/useCreateRoom";
import API from "@/app/services/API";

type Props = {
	error?: "room_not_found";
};

export default function CrearRoomOrJoin({ error }: Props) {
	const router = useRouter();
	const [roomId, setRoomId] = useState<string>("");
	const { creteRoom, connected } = useCreateRoom({
		onRoomCreated: (roomId) => {
			router.replace(`/room/${roomId}`);
		},
		onConntectError: (message) => {
			toast.error(message);
		},
	});

	const handleRoomId: React.ChangeEventHandler<HTMLInputElement> = (e) =>
		setRoomId(e.target.value);

	const redirectToRoom = async () => {
		try {
			await API.getRoom(roomId);
			router.replace(`/room/${roomId}`);
		} catch (error) {
			if ((error as Error).message === "404")
				toast.error("The room doesn't exist");
		}
	};

	useEffect(() => {
		if (error === "room_not_found") {
			toast.error("The room doesn't exist");
		}
	}, []);

	return (
		<>
			<section className="grid place-items-center w-full h-screen">
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
					<Button
						href={roomId.length ? `/room/${roomId}` : "#"}
						color="primary"
						onClick={redirectToRoom}
						className={!roomId.length ? "opacity-50" : ""}
						disabled={!roomId.length}
						variant="solid"
					>
						Unirse a la sala
					</Button>
					<Divider className="my-4 bg-blue-700" />
					<Button color="primary" onClick={creteRoom} disabled={!connected}>
						Crear sala
					</Button>
				</div>
			</section>
			<Toaster position="top-right" richColors />
		</>
	);
}
