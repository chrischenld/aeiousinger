import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlockProps
	extends Omit<React.ComponentProps<typeof Button>, "onClick"> {
	duration: number;
	pitch: number;
	phoneme1: string;
	phoneme2: string;
	isSelected: boolean;
	onSelect: () => void;
}

export function Block({
	duration,
	pitch,
	phoneme1,
	phoneme2,
	isSelected,
	onSelect,
	className,
	...props
}: BlockProps) {
	return (
		<Button
			variant="outline"
			aria-label={`Note with pitch ${pitch}, duration ${duration}, phoneme ${phoneme1}${phoneme2}`}
			className={cn(
				"flex flex-col items-center justify-center p-3 bg-sandDark-2 rounded-md col-span-1 h-auto w-auto",
				isSelected
					? "border-sandDark-7 bg-sandDark-3"
					: "border-sandDark-4 hover:border-sandDark-5",
				className
			)}
			onClick={onSelect}
			data-selected={isSelected}
			data-duration={duration}
			data-pitch={pitch}
			{...props}
		>
			<div className="flex flex-col items-center gap-1 text-xs text-sandDark-10">
				<span>{pitch}</span>
				<span>{duration}</span>
				<span>
					{phoneme1}
					{phoneme2 ? `${phoneme2}` : ""}
				</span>
			</div>
		</Button>
	);
}
