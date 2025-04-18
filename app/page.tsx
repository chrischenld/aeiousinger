import Canvas from "@/components/sections/Canvas";
import Header from "@/components/compositions/Header";

export default function Home() {
	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-18 h-screen"></div>
				<div className="grid grid-cols-subgrid col-span-6 h-screen">poo</div>
			</main>
		</div>
	);
}
