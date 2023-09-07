const SOCKET_URL = process.env.NEXT_PUBLIC_BE_URL ?? "";

export const SOCKET_CONFIGS = {
	url: SOCKET_URL,
	options: {
		reconnection: true,
		reconnectionDelay: 3000, // 3 segundos
		reconnectionDelayMax: 5000,
		reconnectionAttempts: 1,
	},
};
