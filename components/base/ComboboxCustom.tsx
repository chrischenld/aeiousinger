"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

interface ComboboxProps {
	options: { value: string; label: string }[];
	placeholder?: string;
	searchPlaceholder?: string;
	emptyMessage?: string;
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
}

export default function ComboboxCustom({
	options,
	placeholder = "Select option",
	searchPlaceholder = "Search",
	emptyMessage = "No option found",
	className,
	value = "",
	onChange,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(value);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [highlightedIndex, setHighlightedIndex] = React.useState<number>(0);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const searchInputRef = React.useRef<HTMLInputElement>(null);

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Only reset highlighted index when opening or when search query changes
	React.useEffect(() => {
		if (searchQuery !== "") {
			setHighlightedIndex(0);
		}
	}, [searchQuery]);

	// Focus search input when opening
	React.useEffect(() => {
		if (open) {
			setTimeout(() => {
				searchInputRef.current?.focus();
				setHighlightedIndex(0);
			}, 0);
		}
	}, [open]);

	// Close dropdown when clicking outside
	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Add keyboard handler
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!open) {
			switch (e.key) {
				case "Enter":
				case "ArrowDown":
					setOpen(true);
					e.preventDefault();
					break;
			}
			return;
		}

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				setHighlightedIndex((prev) =>
					prev < filteredOptions.length - 1 ? prev + 1 : prev
				);
				break;
			case "ArrowUp":
				e.preventDefault();
				setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
				break;
			case "Enter":
				e.preventDefault();
				if (filteredOptions.length > 0) {
					const selectedOption = filteredOptions[highlightedIndex];
					setSelectedValue(selectedOption.value);
					onChange?.(selectedOption.value);
					setOpen(false);
					setSearchQuery("");
				}
				break;
			case "Escape":
				setOpen(false);
				break;
		}
	};

	return (
		<div
			ref={containerRef}
			className={`w-48 ${className}`}
			onKeyDown={handleKeyDown}
		>
			<button
				onClick={() => setOpen(!open)}
				onKeyDown={handleKeyDown}
				className={`w-full flex h-10 items-center justify-between rounded-[0.125rem] border border-border-light bg-bg px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-fg-xlight focus:ring-ring`}
			>
				{selectedValue
					? options.find((option) => option.value === selectedValue)?.label
					: placeholder}
				<ChevronsUpDown className="h-4 w-4" />
			</button>
			{open && (
				<div className="absolute w-48 mt-1 border border-border-light bg-bg shadow-lg z-10 rounded-[0.125rem]">
					<div className="h-10 z-20 border-b border-border-light focus-within:outline-hidden">
						<div className="h-full flex items-center">
							<input
								ref={searchInputRef}
								type="text"
								placeholder={searchPlaceholder}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Escape") {
										setOpen(false);
										e.stopPropagation();
									}
								}}
								className="w-full h-full px-2 py-2 bg-bg focus:outline-hidden placeholder:text-fg-xlight"
							/>
							<div className="flex items-center justify-center h-full px-2 bg-bg-strong border-l border-border-light rounded-tr-[0.125rem] text-fg-xlight">
								<Search className="h-4 w-4" />
							</div>
						</div>
					</div>
					{filteredOptions.length > 0 ? (
						<ul
							role="listbox"
							className="max-h-60 w-full overflow-auto text-sm text-fg-xlight"
						>
							{filteredOptions.map((option, index) => (
								<li
									key={option.value}
									role="option"
									aria-selected={selectedValue === option.value}
									onMouseEnter={() => setHighlightedIndex(index)}
									className={`w-full select-none ${
										highlightedIndex === index
											? "bg-bg-strong text-fg hover:bg-bg-strong hover:text-fg hover:cursor-default"
											: ""
									}`}
								>
									<div
										onClick={() => {
											setSelectedValue(option.value);
											onChange?.(option.value);
											setOpen(false);
											setSearchQuery("");
										}}
										className="w-full flex items-center justify-between p-2 cursor-default"
									>
										{option.label}
										<Check
											className={`h-4 w-4 ${
												selectedValue === option.value
													? "opacity-100"
													: "opacity-0"
											}`}
										/>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className="flex items-center h-10 p-2 text-sm text-fg-light">
							{emptyMessage}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
