"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to dashboard
		router.push("/dashboard");
	}, [router]);

	// Loading state
	return (
		<div className="GridLayout h-screen overflow-hidden flex items-center justify-center">
			<p>Loading...</p>
		</div>
	);
}
