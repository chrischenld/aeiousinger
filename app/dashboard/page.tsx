"use client";

import { ThemeToggle } from "../components/ui/theme-toggle";
import Link from "next/link";
import { useSongs } from "../context/SongsContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	const { songs, addSong } = useSongs();
	const router = useRouter();

	// Function to create a new song and navigate to it
	const handleCreateNewSong = () => {
		const newSongId = addSong();
		// router.push(`/song/${newSongId}`);
	};

	const headerColSpan =
		"col-span-7 md:col-span-14 lg:col-span-22 xl:col-span-30 2xl:col-span-38";

	const dashboardBlockSpan = "col-span-8 md:col-span-2";

	return (
		<div className="GridLayout h-screen-dvh overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen-dvh md:grid-rows-1 grid-rows-[1fr_auto]">
				<div
					className={`grid grid-cols-subgrid grid-rows-[60px_1fr] col-span-full h-full`}
				>
					<div className="grid grid-cols-subgrid col-span-full h-[60px] border-[var(--app-border)] border-l border-t border-b col-span-full sticky top-0 bg-[var(--app-bg)] z-10">
						<div className={`grid grid-cols-subgrid ${headerColSpan}`}>
							<h1 className="w-full h-full flex items-center px-2 text-xs font-bold text-[var(--app-fg)]">
								aeiousinger
							</h1>
						</div>
						<div className="grid grid-cols-subgrid col-span-1 md:col-span-2 border-l border-[var(--app-border)]">
							<ThemeToggle className="flex items-center justify-center text-xs col-span-full" />
						</div>
					</div>
					<div className="grid grid-cols-subgrid col-span-full grid-rows-[auto_1fr] col-span-full h-dvh-content overflow-y-auto">
						<div className="grid grid-cols-subgrid col-span-full gap-y-8 py-8">
							{songs.map((song) => (
								<Link
									key={song.id}
									href={`/song/${song.id}`}
									className={`flex flex-col items-center justify-center px-2 ${dashboardBlockSpan} h-24 font-medium text-xs text-[var(--app-fg-muted)] overflow-hidden relative ring-1 ring-inset ring-[var(--app-border)] hover:ring-[var(--app-border-hover)] focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--app-fg)] transition-colors`}
								>
									{song.title}
									{/* <p className="text-xs text-[var(--app-fg-muted)]">
										{new Date(song.updatedAt).toLocaleDateString()}
									</p>
									<div className="flex space-x-1">
										{song.notes.slice(0, 5).map((note, i) => (
											<div
												key={i}
												className="w-5 h-5 bg-[var(--app-accent-bg)] rounded-sm flex items-center justify-center"
											>
												<span className="text-[8px]">
													{note.pitch?.charAt(0) || "-"}
												</span>
											</div>
										))}
									</div> */}
								</Link>
							))}
							<Button
								onClick={handleCreateNewSong}
								className={`flex flex-col justify-center px-2 ${dashboardBlockSpan} h-24 font-medium text-xs text-[var(--app-fg-muted)] overflow-hidden relative ring-1 ring-inset ring-[var(--app-border)] hover:ring-[var(--app-border-hover)] focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--app-fg)] transition-colors`}
							>
								+
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
