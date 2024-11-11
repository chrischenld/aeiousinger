import GraphemeGrid from "@/components/sections/GraphemeGrid";
import Canvas from "@/components/sections/Canvas";
import { graphemeSections } from "@/data/graphemeContent";

export default function Home() {
	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="h-[calc(100vh-3rem)]">
				<Canvas />
				<GraphemeGrid sections={graphemeSections} />
			</main>
		</div>
	);
}
