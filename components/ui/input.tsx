import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 bg-transparent px-2 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent text-xs file:text-xs file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
				"focus-visible:ring-2 focus-visible:ring-[var(--app-fg)] focus-visible:ring-offset-0 focus-visible:z-30",
				"invalid:ring-1 invalid:ring-[var(--app-border-error)] invalid:ring-inset aria-invalid:ring-1 aria-invalid:ring-[var(--app-border-error)] aria-invalid:ring-inset aria-invalid:border-[var(--app-border-error)]",
				className
			)}
			{...props}
		/>
	);
}

export { Input };
