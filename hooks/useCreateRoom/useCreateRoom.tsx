import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { SOCKET_CONFIGS } from "../useRoom/constants";

type Props = {
	onConntectError?: (error: string) => void;
	onConnect?: () => void;
	onRoomCreated: (roomId: string) => void;
};

const useCreateRoom = ({
	onConntectError,
	onConnect,
	onRoomCreated,
}: Props) => {
	const socket = useRef<Socket | null>(null);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		socket.current = io(SOCKET_CONFIGS.url, SOCKET_CONFIGS.options);

		socket.current.on("connect_error", () => {
			console.log("Error connecting to the socket");
			if (onConntectError) onConntectError("Connection error, try later.");
		});

		socket.current.on("connect", () => {
			setConnected(true);
			console.log("Connected successfully");
			if (onConnect) onConnect();
		});

		socket.current.on("room_created", (data: { roomId: string }) => {
			onRoomCreated(data.roomId);
		});
	}, []);

	const creteRoom = () => {
		socket.current?.emit("create_room");
	};

	return { creteRoom, connected };
};

export default useCreateRoom;
