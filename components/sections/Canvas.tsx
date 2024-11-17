"use client";

import { useState } from "react";
import Combobox from "../base/Combobox";
import DoubleCombobox from "../compositions/DoubleCombobox";
import { graphemeContent } from "@/data/graphemeContent";

const phonemeOptions = Object.values(graphemeContent).flatMap((section) =>
	Object.entries(section.items).map(([value, item]) => ({
		value,
		label: item.title,
	}))
);

export default function Canvas() {
	const [value, setValue] = useState("");
	const [value2, setValue2] = useState("");
	const [value3, setValue3] = useState("");

	return (
		<div className="grid grid-cols-subgrid col-span-full md:col-span-19 bg-bg p-16">
			<div className="col-span-10 flex gap-4">
				<Combobox value={value} onChange={setValue} options={phonemeOptions} />
				<DoubleCombobox
					firstOptions={phonemeOptions}
					secondOptions={phonemeOptions}
					onFirstChange={setValue2}
					firstPlaceholder="--"
					firstValue={value2}
					secondValue={value3}
					onSecondChange={setValue3}
					secondPlaceholder="--"
				/>
			</div>
		</div>
	);
}
