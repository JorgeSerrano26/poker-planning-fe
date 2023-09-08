import Header from "@/components/Header/Header";

const RoomLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default RoomLayout;
