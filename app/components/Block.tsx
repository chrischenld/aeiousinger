import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NoteField, Note } from "./NoteMenuComponents";

interface BlockProps
	extends Omit<React.ComponentProps<typeof Button>, "onClick">,
		Pick<Note, "duration" | "pitch" | "phoneme1" | "phoneme2"> {
	isSelected: boolean;
	onSelect: () => void;
	onDelete?: () => void;
	activeTab?: NoteField;
}

export function Block({
	duration,
	pitch,
	phoneme1,
	phoneme2,
	isSelected,
	onSelect,
	onDelete,
	activeTab,
	className,
	...props
}: BlockProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		console.log("Block keyDown:", {
			key: e.key,
			isSelected,
			hasDeleteHandler: !!onDelete,
			activeElement: document.activeElement?.tagName,
			buttonElement: e.currentTarget.tagName,
			isFocused: document.activeElement === e.currentTarget,
			metaKey: e.metaKey,
			ctrlKey: e.ctrlKey,
		});

		// Handle delete when focused (regardless of selection state) with Cmd+Delete or Cmd+Backspace
		if (
			onDelete &&
			(e.key === "Delete" || e.key === "Backspace") &&
			(e.metaKey || e.ctrlKey)
		) {
			console.log("Block delete triggered with modifier key");
			e.preventDefault();
			onDelete();
			return;
		}

		// Handle selection (which opens menu) with Enter/Space
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			onSelect();
		}
	};

	return (
		<>
			{/* The pseudo-element solution for rings has issues with focus in some browsers */}
			{/* Using an actual element with higher z-index guarantees it works across all browsers */}
			{isSelected && (
				<div
					className="absolute inset-0 ring-1 ring-[var(--app-fg)] pointer-events-none z-10"
					aria-hidden="true"
				/>
			)}

			<Button
				variant="outline"
				aria-label={`Note with pitch ${
					pitch !== null ? pitch : "unset"
				}, duration ${duration !== null ? duration : "unset"}, phoneme ${
					phoneme1 || "unset"
				}${phoneme2 ? " " + phoneme2 : ""}`}
				className={cn(
					"flex flex-col items-center justify-center p-0 border-none bg-[var(--app-bg)] hover:bg-[var(--app-bg-strong)] rounded-none col-span-1 w-full h-auto cursor-pointer text-xs text-[var(--app-fg-muted)] overflow-hidden relative",
					isSelected
						? "bg-[var(--app-bg-strong)]"
						: "ring-1 ring-inset ring-[var(--app-border)] hover:ring-[var(--app-border-hover)]",
					"focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--app-fg)]",
					className
				)}
				onClick={onSelect}
				onKeyDown={handleKeyDown}
				data-selected={isSelected}
				data-duration={duration}
				data-pitch={pitch}
				{...props}
			>
				<div className="flex flex-col items-center w-full relative h-24">
					<div
						className={cn(
							"h-8 flex flex-row items-center justify-center w-full",
							isSelected &&
								activeTab === "duration" &&
								"bg-[var(--app-accent-bg)]"
						)}
					>
						<span
							className={cn(
								activeTab === "duration" &&
									isSelected &&
									"text-[var(--app-accent-fg)] font-medium"
							)}
						>
							{duration !== null ? duration : "-"}
						</span>
					</div>
					<div
						className={cn(
							"h-8 flex flex-row items-center justify-center w-full",
							isSelected && activeTab === "pitch" && "bg-[var(--app-accent-bg)]"
						)}
					>
						<span
							className={cn(
								activeTab === "pitch" &&
									isSelected &&
									"text-[var(--app-accent-fg)] font-medium"
							)}
						>
							{pitch !== null ? pitch : "-"}
						</span>
					</div>
					<div
						className={cn(
							"h-8 flex flex-row items-center justify-center w-full",
							isSelected &&
								(activeTab === "phoneme1" || activeTab === "phoneme2") &&
								"bg-[var(--app-accent-bg)]"
						)}
					>
						<span
							className={cn(
								activeTab === "phoneme1" &&
									isSelected &&
									"text-[var(--app-accent-fg)] font-medium"
							)}
						>
							{phoneme1}
						</span>
						{phoneme2 && (
							<>
								<span>·</span>
								<span
									className={cn(
										activeTab === "phoneme2" &&
											isSelected &&
											"text-[var(--app-accent-fg)] font-medium"
									)}
								>
									{phoneme2}
								</span>
							</>
						)}
					</div>
				</div>
			</Button>
		</>
	);
}
