"use client";

import * as React from "react";
import Combobox from "../base/Combobox";

interface DoubleComboboxProps {
	firstOptions: { value: string; label: string }[];
	secondOptions: { value: string; label: string }[];
	firstPlaceholder?: string;
	secondPlaceholder?: string;
	className?: string;
	firstValue?: string;
	secondValue?: string;
	onFirstChange?: (value: string) => void;
	onSecondChange?: (value: string) => void;
}

export default function DoubleCombobox({
	firstOptions,
	secondOptions,
	firstPlaceholder = "--",
	secondPlaceholder = "--",
	className,
	firstValue = "",
	secondValue = "",
	onFirstChange,
	onSecondChange,
}: DoubleComboboxProps) {
	return (
		<div
			className={`w-32 h-fit border border-border-light rounded-[0.125rem] ${className}`}
		>
			<div className="flex h-10 relative">
				<Combobox
					options={firstOptions}
					value={firstValue}
					onChange={onFirstChange}
					placeholder={firstPlaceholder}
					className="w-full [&>button]:border-0 [&>button]:rounded-none [&>button]:border-r [&>button]:border-border-light relative focus-within:z-10"
				/>
				<Combobox
					options={secondOptions}
					value={secondValue}
					onChange={onSecondChange}
					placeholder={secondPlaceholder}
					className="w-full [&>button]:border-0 [&>button]:rounded-none relative focus-within:z-10"
				/>
			</div>
		</div>
	);
}
