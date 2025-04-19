import ReferenceGrid from "@/app/mk1/components/sections/ReferenceGrid";
import Canvas from "@/app/mk1/components/sections/Canvas";
import Header from "@/app/mk1/components/compositions/Header";

export default function Home() {
	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-19 h-screen">
					<Header />
					<Canvas />
				</div>
				<ReferenceGrid />
			</main>
		</div>
	);
}
