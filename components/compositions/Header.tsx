"use client";

import { useTheme } from "@/app/providers/ThemeProvider";
import localFont from "next/font/local";

const geistMono = localFont({
	src: "../../app/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export default function Header() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		if (theme === "light") setTheme("dark");
		else if (theme === "dark") setTheme("system");
		else setTheme("light");
	};

	return (
		<header
			className={`h-fit grid grid-cols-subgrid col-span-full border-b border-border items-center py-6 ${geistMono.className}`}
		>
			<h1 className="col-span-4 text-sm font-bold text-fg-muted px-3">
				aeiousinger
			</h1>
			<button
				onClick={toggleTheme}
				className="col-end-9 md:col-end-20 p-0 text-sm hover:underline"
			>
				{theme === "system" ? "system" : theme}
			</button>
		</header>
	);
}
