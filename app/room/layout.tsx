import Header from "@/components/Header/Header";

const RoomLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
};

export default RoomLayout;
