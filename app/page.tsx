import GraphemeGrid from "@/components/sections/GraphemeGrid";
import Canvas from "@/components/sections/Canvas";
import { graphemeSections } from "@/data/graphemeContent";
import Header from "@/components/compositions/Header";

export default function Home() {
	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-19 h-screen">
					<Header />
					<Canvas />
				</div>
				<GraphemeGrid sections={graphemeSections} />
			</main>
		</div>
	);
}
