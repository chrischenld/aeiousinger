"use client";

import { ThemeToggle } from "../components/ui/theme-toggle";
import Link from "next/link";
import { useSongs } from "../context/SongsContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const { songs, addSong } = useSongs();
	const router = useRouter();

	// Function to create a new song and navigate to it
	const handleCreateNewSong = () => {
		const newSongId = addSong();
		router.push(`/song/${newSongId}`);
	};

	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div
					className={`grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full h-full`}
				>
					<div className="h-[60px] px-4 border-[var(--app-border)] border-t border-b flex justify-between items-center col-span-full">
						<h1 className="text-xs font-bold text-[var(--app-fg)]">
							aeiousinger
						</h1>
						<div className="flex items-center gap-4">
							<ThemeToggle />
						</div>
					</div>
					<div className="grid grid-cols-subgrid col-span-full gap-4 overflow-y-auto">
						<div className="col-span-full">
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-12">
								{songs.map((song) => (
									<Link
										key={song.id}
										href={`/song/${song.id}`}
										className="block"
									>
										<div className="flex flex-col border border-[var(--app-border)] p-4 hover:border-[var(--app-border-hover)] transition-colors">
											<p className="font-medium text-xs text-[var(--app-fg)]">
												{song.title}
											</p>
											<p className="text-xs text-[var(--app-fg-muted)]">
												{new Date(song.updatedAt).toLocaleDateString()}
											</p>
											<div className="flex space-x-1">
												{/* {song.notes.slice(0, 5).map((note, i) => (
													<div
														key={i}
														className="w-5 h-5 bg-[var(--app-accent-bg)] rounded-sm flex items-center justify-center"
													>
														<span className="text-[8px]">
															{note.pitch?.charAt(0) || "-"}
														</span>
													</div>
												))} */}
											</div>
										</div>
									</Link>
								))}

								{/* Button to create a new song */}
								<button
									onClick={handleCreateNewSong}
									className="border border-[var(--app-border)] p-4 hover:border-[var(--app-border-hover)] transition-colors flex items-center justify-center cursor-pointer"
								>
									<p className="text-xs text-[var(--app-fg)]">+ New Song</p>
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
