"use client";

// import { useState } from "react";
import { useTheme } from "@/app/providers/ThemeProvider";
import localFont from "next/font/local";
import { SunMoon } from "lucide-react";
// import Select from "../base/Select";

// const geistMono = localFont({
// 	src: "@/app/fonts/GeistMonoVF.woff",
// 	variable: "--font-geist-mono",
// 	weight: "100 900",
// });

export default function Header() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		if (theme === "light") setTheme("dark");
		else if (theme === "dark") setTheme("system");
		else setTheme("light");
	};

	return (
		<header
			className={`h-16 grid grid-cols-subgrid col-span-full border-b border-border items-center `}
		>
			<h1 className="h-full grid col-span-4 text-sm font-bold text-fg-muted px-3 items-center ">
				aeiousinger
			</h1>
			<div className="h-full grid grid-cols-subgrid col-span-1 col-end-9 md:col-end-20 border-l border-border items-center">
				<button
					onClick={toggleTheme}
					className="flex items-center justify-center w-full h-full col-end-9 md:col-end-20 p-0 text-sm hover:underline"
				>
					<SunMoon />
				</button>
			</div>
		</header>
	);
}
