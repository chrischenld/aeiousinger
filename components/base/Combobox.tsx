"use client";

import * as React from "react";
import { Command } from "cmdk";
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

export default function Combobox({
	options,
	placeholder = "Select option",
	searchPlaceholder = "Search",
	emptyMessage = "No option found",
	className,
	value = "",
	onChange,
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [search, setSearch] = React.useState("");
	const inputRef = React.useRef<HTMLInputElement>(null);
	const listRef = React.useRef<HTMLDivElement>(null);

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

	// Handle keyboard events at the top level
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!open && (e.key === "Enter" || e.key === "ArrowDown")) {
			setOpen(true);
			e.preventDefault();
		}
	};

	return (
		<div
			className={`w-48 ${className}`}
			onKeyDown={handleKeyDown}
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
				className="w-full flex h-10 items-center justify-between rounded-[0.125rem] border border-border-light bg-bg px-2 text-sm"
			>
				{value
					? options.find((option) => option.value === value)?.label
					: placeholder}
				<ChevronsUpDown className="h-4 w-4" />
			</button>

			{open && (
				<Command
					className="absolute w-48 mt-1 border border-border-light bg-bg shadow-lg z-10 rounded-[0.125rem] overflow-hidden focus:outline-none"
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
						ref={listRef}
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
										onChange?.(option.value);
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
									className="p-2 text-sm text-fg-light"
									role="status"
								>
									{emptyMessage}
								</Command.Empty>
							)}
					</Command.List>
				</Command>
			)}
		</div>
	);
}
