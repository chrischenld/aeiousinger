"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				unstyled: false,
				classNames: {
					toast:
						"bg-[var(--app-bg)] text-[var(--app-fg)] border-[var(--app-border)] font-mono text-xs",
					title: "text-[var(--app-fg)]",
					description: "text-[var(--app-fg-muted)]",
					error:
						"bg-[var(--app-bg)] text-[var(--app-fg)] border-[var(--app-border)]",
					success:
						"bg-[var(--app-bg)] text-[var(--app-fg)] border-[var(--app-border)]",
					warning:
						"bg-[var(--app-bg)] text-[var(--app-fg)] border-[var(--app-border)]",
					info: "bg-[var(--app-bg)] text-[var(--app-fg)] border-[var(--app-border)]",
				},
			}}
			style={
				{
					"--normal-bg": "var(--app-bg)",
					"--normal-text": "var(--app-fg)",
					"--normal-border": "var(--app-border)",
					"--border-radius": "0px",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
