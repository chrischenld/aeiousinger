type TimeSection = {
	title: string;
	description: string;
	items: Record<
		string,
		{
			title: string;
			description: string;
		}
	>;
};

export const timeSections = [
	{
		title: "Duplets",
		items: ["1/64", "1/32", "1/16", "1/8", "1/4", "1/2", "1"],
	},
	{
		title: "Triplets",
		items: ["1/32", "1/16", "1/8", "1/4", "1/2"],
	},
	{
		title: "Dotted",
		items: ["1/64•", "1/32•", "1/16•", "1/8•", "1/4•", "1/2•", "1•"],
	},
	{
		title: "Long",
		items: ["2", "3", "4", "5", "6", "7", "8"],
	},
];

export const timeContent: Record<string, TimeSection> = {
	duplets: {
		title: "Duplets",
		description: "Duplet divisions",
		items: {
			"1": {
				title: "1",
				description: "Whole note duration",
			},
			"1/2": {
				title: "1/2",
				description: "Half note duration",
			},
			"1/4": {
				title: "1/4",
				description: "Quarter note duration",
			},
			"1/8": {
				title: "1/8",
				description: "8th note duration",
			},
			"1/16": {
				title: "1/16",
				description: "16th note duration",
			},
			"1/32": {
				title: "1/32",
				description: "32nd note duration",
			},
			"1/64": {
				title: "1/64",
				description: "64th note duration",
			},
		},
	},
	triplets: {
		title: "Triplets",
		description: "Triplet divisions",
		items: {
			"1/2tr": {
				title: "1/2tr",
				description: "Half triplet note duration",
			},
			"1/4tr": {
				title: "1/4tr",
				description: "Quarter triplet note duration",
			},
			"1/8tr": {
				title: "1/8tr",
				description: "8th triplet note duration",
			},
			"1/16tr": {
				title: "1/16tr",
				description: "16th triplet note duration",
			},
			"1/32tr": {
				title: "1/32tr",
				description: "32nd triplet note duration",
			},
		},
	},
	dotted: {
		title: "Dotted",
		description: "Dotted notes, or notes tied to a note",
		items: {
			"1•": {
				title: "1•",
				description: "whole dotted note duration, or 1 + 1/2",
			},
			"1/2•": {
				title: "1/2•",
				description: "half dotted note duration, or 1/2 + 1/4",
			},
			"1/4•": {
				title: "1/4•",
				description: "quarter dotted note duration, or 1/4 + 1/8",
			},
			"1/8•": {
				title: "1/8•",
				description: "8th dotted note duration, or 1/8 + 1/16",
			},
			"1/16•": {
				title: "1/16•",
				description: "16th dotted note duration, or 1/16 + 1/32",
			},
			"1/32•": {
				title: "1/32•",
				description: "32nd dotted note duration, or 1/32 + 1/64",
			},
		},
	},
	long: {
		title: "Long",
		description: "Long note durations",
		items: {
			"2": {
				title: "2",
				description: "Two measure duration",
			},
			"3": {
				title: "3",
				description: "Three measure duration",
			},
			"4": {
				title: "4",
				description: "Four measure duration",
			},
			"5": {
				title: "5",
				description: "Five measure duration",
			},
			"6": {
				title: "6",
				description: "Six measure duration",
			},
			"7": {
				title: "7",
				description: "Seven measure duration",
			},
			"8": {
				title: "8",
				description: "Eight measure duration",
			},
		},
	},
};
