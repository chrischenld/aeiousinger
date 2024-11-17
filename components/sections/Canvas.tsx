"use client";

import { useState } from "react";
import Combobox from "../base/Combobox";

const options = [
	{ value: "1", label: "Option 1" },
	{ value: "2", label: "Option 2" },
	{ value: "3", label: "Option 3" },
	{ value: "4", label: "Option 4" },
	{ value: "5", label: "Option 5" },
	{ value: "6", label: "Option 6" },
	{ value: "7", label: "Option 7" },
	{ value: "8", label: "Option 8" },
	{ value: "9", label: "Option 9" },
	{ value: "10", label: "Option 10" },
];

export default function Canvas() {
	const [value, setValue] = useState("");

	return (
		<div className="grid grid-cols-subgrid col-span-full md:col-span-19 bg-bg">
			<Combobox value={value} onChange={setValue} options={options} />
		</div>
	);
}
