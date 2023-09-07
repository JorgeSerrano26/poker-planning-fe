const getRoom = async (roomId: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BE_URL}/api/room/${roomId}`,
	);

	if (!res.ok) {
		throw new Error(String(res.status));
	}

	const data = await res.json();
	return data;
};

export default {
	getRoom,
};
