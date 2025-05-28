export default function Loading() {
	return (
		<div className="GridLayout h-screen-dvh overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen-dvh md:grid-rows-1 grid-rows-[1fr_auto]">
				<div
					className={`grid grid-cols-subgrid grid-rows-[60px_1fr] col-span-full h-full`}
				>
					<div className="grid grid-cols-subgrid col-span-full h-[60px] border-[var(--app-border)] border-l border-t border-b col-span-full sticky top-0 bg-[var(--app-bg)] z-10">
						<div className={`grid grid-cols-subgrid`}>
							<h1 className="w-full h-full flex items-center px-2 text-xs font-bold text-[var(--app-fg)]"></h1>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] col-span-full h-dvh-content overflow-y-auto"></div>
			</main>
		</div>
	);
}
