"use client";

import * as React from "react";
import { useState } from "react";
import Combobox from "../base/Combobox";
import DoubleCombobox from "./DoubleCombobox";
import { graphemeContent } from "@/data/graphemeContent";
import { timeContent } from "@/data/timeContent";
import { pitchContent } from "@/data/pitchContent";

const phonemeOptions = Object.values(graphemeContent).flatMap((section) =>
	Object.entries(section.items).map(([value, item]) => ({
		value,
		label: item.title,
	}))
);

const timeOptions = Object.values(timeContent).flatMap((section) =>
	Object.entries(section.items).map(([value, item]) => ({
		value,
		label: item.title,
	}))
);

const pitchOptions = Object.values(pitchContent).flatMap((section) =>
	Object.entries(section.items).map(([value, item]) => ({
		value,
		label: item.title,
	}))
);

interface NoteBlockProps {
	className?: string;
	placeholder?: boolean;
}

export default function NoteBlock({
	className,
	placeholder = false,
}: NoteBlockProps) {
	// temporary values
	const [value, setValue] = useState("");
	const [value2, setValue2] = useState("");
	const [value3, setValue3] = useState("");
	const [value4, setValue4] = useState("");
	// remove values above

	return (
		<div
			className={`grid grid-cols-subgrid col-span-1 h-fit border border-border ${className} ${
				placeholder
					? "bg-bg border border-border-2xlight"
					: "bg-bg-strong border border-border"
			}`}
		>
			<div
				className={`p-1.5 h-[54px] border-b ${
					placeholder ? "border-border-2xlight" : "border-border"
				}`}
			>
				{!placeholder && (
					<Combobox value={value} onChange={setValue} options={pitchOptions} />
				)}
			</div>
			<div
				className={`p-1.5 h-[54px] border-b ${
					placeholder ? "border-border-2xlight" : "border-border"
				}`}
			>
				{!placeholder && (
					<Combobox value={value2} onChange={setValue2} options={timeOptions} />
				)}
			</div>
			<div className="p-1.5 h-[54px]">
				{!placeholder && (
					<DoubleCombobox
						firstOptions={phonemeOptions}
						secondOptions={phonemeOptions}
						onFirstChange={setValue3}
						firstValue={value3}
						secondValue={value4}
						onSecondChange={setValue4}
					/>
				)}
			</div>
		</div>
	);
}
