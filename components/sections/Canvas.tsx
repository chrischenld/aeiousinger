import ComboboxCustom from "../base/ComboboxCustom";

const options = [
	{ value: "1", label: "Option 1" },
	{ value: "2", label: "Option 2" },
	{ value: "3", label: "Option 3" },
];

export default function Canvas() {
	return (
		<div className="grid grid-cols-subgrid col-span-full md:col-span-19 bg-bg p-64">
			<ComboboxCustom options={options} />
		</div>
	);
}
