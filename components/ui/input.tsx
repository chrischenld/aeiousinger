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

interface InputWithSuffixProps extends React.ComponentProps<"input"> {
	suffix: React.ReactNode;
	containerClassName?: string;
}

function InputWithSuffix({
	suffix,
	className,
	containerClassName,
	...props
}: InputWithSuffixProps) {
	return (
		<div className={cn("relative flex items-center", containerClassName)}>
			<Input
				className={cn(
					"pr-2", // Add padding-right to make space for suffix
					className
				)}
				{...props}
			/>
			<div className="absolute right-2 flex items-center justify-center text-[var(--app-fg-muted)] pointer-events-none">
				{suffix}
			</div>
		</div>
	);
}

export { Input, InputWithSuffix };
