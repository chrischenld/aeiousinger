import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const fragmentMono = localFont({
	src: "./fonts/FragmentMonoRegular.woff2",
	variable: "--font-fragment-mono",
	weight: "400",
});

export const metadata: Metadata = {
	title: "aeiousinger",
	description: "aeiousinger",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${fragmentMono.variable} ${geistMono.variable} ${geistSans.variable} antialiased h-screen overflow-hidden`}
			>
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
