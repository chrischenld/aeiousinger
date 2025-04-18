"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectProps {
	options: { value: string; label: string }[];
	placeholder?: string;
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
}

const animationVariants = {
	hidden: { opacity: 0, y: -16, scale: 0.95 },
	visible: { opacity: 1, y: 0, scale: 1 },
	transition: {
		duration: 0.19,
		ease: [0.76, 0.06, 0.13, 0.95],
	},
	exit: { opacity: 0, y: -16, scale: 0.95 },
};

export default function Select({
	options,
	placeholder = "--",
	className,
	value = options?.[0]?.value ?? "",
	onChange,
}: SelectProps) {
	const [open, setOpen] = React.useState(false);
	const containerRef = React.useRef<HTMLDivElement>(null);

	// Add click outside handler
	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		}

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [open]);

	// Handle keyboard events
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!open && (e.key === "Enter" || e.key === "ArrowDown")) {
			setOpen(true);
			e.preventDefault();
		} else if (open && e.key === "Escape") {
			setOpen(false);
			e.preventDefault();
		}
	};

	return (
		<div
			ref={containerRef}
			className={`w-full h-full col-span-2 ${className}`}
			onKeyDown={handleKeyDown}
			aria-expanded={open}
			aria-haspopup="listbox"
		>
			<button
				onClick={() => setOpen(!open)}
				aria-label={`${placeholder}, ${
					value
						? options.find((opt) => opt.value === value)?.label
						: "no selection"
				}`}
				className="w-full h-full border-r border-border-light bg-bg text-sm text-left px-3 flex items-center justify-between"
			>
				{value
					? options.find((option) => option.value === value)?.label
					: placeholder}
				<ChevronsUpDown className="h-4 w-4" />
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						variants={animationVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={animationVariants.transition}
						className="absolute z-100"
					>
						<Command className="w-48 mt-1 border border-border-light bg-bg shadow-lg rounded-[0.125rem] overflow-hidden focus:outline-hidden">
							<Command.List
								className="max-h-64 overflow-auto focus:outline-hidden"
								role="listbox"
								aria-label={`${placeholder} options`}
							>
								{options.map((option) => (
									<Command.Item
										key={option.value}
										value={option.value}
										onSelect={() => {
											if (value !== option.value) {
												onChange?.(option.value);
											}
											setOpen(false);
										}}
										className="w-full h-10 flex items-center justify-between p-2 text-sm text-fg-xlight cursor-default select-none data-[selected=true]:bg-bg-strong data-[selected=true]:text-fg"
										role="option"
										aria-selected={value === option.value}
									>
										<span>{option.label}</span>
										{value === option.value && (
											<Check className="h-4 w-4" aria-hidden="true" />
										)}
									</Command.Item>
								))}
							</Command.List>
						</Command>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
