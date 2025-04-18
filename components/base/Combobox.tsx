"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Check, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
interface ComboboxProps {
	options: { value: string; label: string }[];
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
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

export default function Combobox({
	options,
	placeholder = "--",
	searchPlaceholder = "Search",
	emptyMessage = "No option found",
	className,
	value = "",
	onChange,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);
	const containerRef = React.useRef<HTMLDivElement>(null);
	// const listRef = React.useRef<HTMLDivElement>(null);

	// Focus management
	React.useEffect(() => {
		if (open) {
			// Use a small timeout to ensure the input is mounted
			const timeout = setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
			return () => clearTimeout(timeout);
		}
	}, [open]);

	// Add click outside handler
	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
				setSearch(""); // Clear search when closing
			}
		}

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}
	}, [open]);

	// Handle keyboard events at the top level
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!open && (e.key === "Enter" || e.key === "ArrowDown")) {
			setOpen(true);
			e.preventDefault();
		} else if (open && e.key === "Escape") {
			setOpen(false);
			setSearch("");
			e.preventDefault();
		}
	};

	// Handle Tab out of the component
	const handleBlur = (e: React.FocusEvent) => {
		// Check if the new focus target is outside the combobox
		if (!containerRef.current?.contains(e.relatedTarget as Node) && open) {
			setOpen(false);
			setSearch("");
		}
	};

	return (
		<div
			ref={containerRef}
			className={`w-full ${className}`}
			onKeyDown={handleKeyDown}
			onBlur={handleBlur}
			role="combobox"
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
				className="w-full h-10 items-center justify-between rounded-[0.125rem] border border-border-light bg-bg text-sm truncate px-2"
			>
				{value
					? options.find((option) => option.value === value)?.label
					: placeholder}
				{/* <ChevronsUpDown className="h-4 w-4" /> */}
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						variants={animationVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						transition={animationVariants.transition}
						className="absolute z-[100]"
					>
						<Command
							className="w-48 mt-1 border border-border-light bg-bg shadow-lg rounded-[0.125rem] overflow-hidden focus:outline-none"
							shouldFilter={false}
						>
							<div className="flex items-center justify-between h-10 border-b border-border-light">
								<Command.Input
									ref={inputRef}
									value={search}
									onValueChange={setSearch}
									placeholder={searchPlaceholder}
									aria-label={searchPlaceholder}
									className="w-full h-full px-2 py-2 bg-bg focus:outline-none placeholder:text-fg-xlight"
								/>
								<div className="flex items-center justify-center p-2 h-full text-fg-xlight bg-bg-strong border-l border-border-light">
									<Search className="h-4 w-4" />
								</div>
							</div>

							<Command.List
								className="max-h-64 overflow-auto focus:outline-none"
								role="listbox"
								aria-label={`${placeholder} options`}
							>
								{options
									.filter((option) =>
										option.label.toLowerCase().includes(search.toLowerCase())
									)
									.map((option) => (
										<Command.Item
											key={option.value}
											value={option.value}
											onSelect={() => {
												// If the clicked option is already selected, clear the selection
												if (value === option.value) {
													onChange?.(""); // Clear the value
												} else {
													onChange?.(option.value); // Select the new value
												}
												setOpen(false);
												setSearch("");
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

								{search &&
									!options.filter((option) =>
										option.label.toLowerCase().includes(search.toLowerCase())
									).length && (
										<Command.Empty
											className="flex h-10 items-center p-2 text-sm text-fg-light"
											role="status"
										>
											{emptyMessage}
										</Command.Empty>
									)}
							</Command.List>
						</Command>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
