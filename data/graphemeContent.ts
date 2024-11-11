type GraphemeSection = {
	title: string;
	description: string;
	items: Record<
		string,
		{
			title: string;
			description: string;
			examples?: string[];
			related?: string[];
		}
	>;
};

export const graphemeSections = [
	{
		title: "consonants",
		items: [
			"b",
			"d",
			"f",
			"g",
			"hx",
			"j",
			"k",
			"m",
			"n",
			"p",
			"r",
			"t",
			"s",
			"v",
			"w",
			"y",
			"z",
		],
	},
	{
		title: "digraphs",
		items: ["ch", "gh", "ng", "ph", "sh", "th", "wh", "zh"],
	},
	{
		title: "controlled",
		items: ["rx", "tx"],
	},
	{
		title: "vowels",
		items: [
			"ey",
			"iy",
			"ay",
			"ow",
			"uw",
			"ae",
			"eh",
			"ih",
			"aa",
			"ah",
			"uh",
			"oy",
			"ao",
		],
	},
	{
		title: "blends",
		items: [
			"bl",
			"cl",
			"fl",
			"gl",
			"pl",
			"br",
			"cr",
			"dr",
			"fr",
			"gr",
			"pr",
			"tr",
			"sk",
			"sl",
			"sp",
			"st",
			"sw",
			"spr",
			"str",
		],
	},
];

export const graphemeContent: Record<string, GraphemeSection> = {
	consonants: {
		title: "Consonants",
		description: "Basic consonant sounds in English",
		items: {
			b: {
				title: "b",
				description: "Standard b sound.",
				examples: ["bat", "ball", "big"],
				related: ["bl", "br"],
			},
			d: {
				title: "d",
				description: "Standard d sound.",
				examples: ["dog", "dad", "door"],
			},
			f: {
				title: "f",
				description: "Standard f sound.",
				examples: ["fish", "fun", "fall"],
			},
			g: {
				title: "g",
				description: "Standard hard g sound.",
				examples: ["go", "get", "good"],
			},
			hx: {
				title: "hx",
				description: "Voiced, 'hard' h sound.",
				examples: ["hat", "hot", "hand"],
			},
			j: {
				title: "j",
				description: "Standard hard j sound.",
				examples: ["jump", "jam", "jet"],
				related: ["zh"],
			},
			k: {
				title: "k",
				description:
					"Standard k sound. Could apply to words with a hard c sound.",
				examples: ["cat", "cookie", "kick"],
			},
			m: {
				title: "m",
				description: "Standard m sound.",
				examples: ["man", "mom", "make"],
			},
			n: {
				title: "n",
				description: "Standard n sound",
				examples: ["no", "new", "nice"],
			},
			p: {
				title: "p",
				description: "Standard p sound",
				examples: ["pat", "pen", "pig"],
			},
			r: {
				title: "r",
				description:
					"Standard r sound, typically the one used in the beginning of a word",
				examples: ["red", "run", "rat"],
			},
			t: {
				title: "t",
				description: "Standard t sound.",
				examples: ["top", "ten", "take"],
				related: ["tx"],
			},
			s: {
				title: "s",
				description: "Standard s sound.",
				examples: ["sit", "see", "sun"],
			},
			v: {
				title: "v",
				description: "Standard v sound.",
				examples: ["van", "very", "vote"],
			},
			w: {
				title: "w",
				description: "Standard w sound.",
				examples: ["win", "way", "walk"],
			},
			y: {
				title: "y",
				description:
					"Voiced y sound. Use for the beginning of words, not the long e sound.",
				examples: ["yes", "you", "yard"],
			},
			z: {
				title: "z",
				description: "Standard z sound.",
				examples: ["zoo", "zip", "zero"],
			},
		},
	},
	digraphs: {
		title: "Digraphs",
		description: "Two letters that make one sound",
		items: {
			ch: {
				title: "ch",
				description: "Combination of c and h that make the 'ch' sound",
				examples: ["chair", "church", "catch"],
				related: ["tr"],
			},
			gh: {
				title: "gh",
				description:
					"Combination of g and h that make the 'g' sound or can be silent",
				examples: ["ghost", "ghoul", "high"],
			},
			ng: {
				title: "ng",
				description: "Combination of n and g that make the 'ng' sound",
				examples: ["sing", "ring", "long"],
			},
			ph: {
				title: "ph",
				description: "Combination of p and h that make the 'f' sound",
				examples: ["phone", "photo", "graph"],
				related: ["f"],
			},
			sh: {
				title: "sh",
				description: "Combination of s and h that make the 'sh' sound",
				examples: ["ship", "shop", "fish"],
			},
			th: {
				title: "th",
				description:
					"Combination of t and h that make the 'th' sound (can be voiced or unvoiced)",
				examples: ["this", "that", "think"],
			},
			wh: {
				title: "wh",
				description:
					"Combination of w and h that make the 'w' sound or 'hw' sound",
				examples: ["what", "when", "where"],
				related: ["w"],
			},
			zh: {
				title: "zh",
				description: "Combination of z and h that make a softer 'j' sound",
				examples: ["zhou"],
				related: ["j"],
			},
		},
	},
	controlled: {
		title: "Controlled Vowels",
		description: "Vowel sounds affected by 'r'",
		items: {
			rx: {
				title: "rx",
				description: "When r follows a vowel. Softer r.",
				examples: ["car", "star", "park"],
			},
			tx: {
				title: "tx",
				description:
					"When t comes at the end of a word. Softer t. Can also be used for an -ed ending.",
				examples: ["text", "fact", "packed"],
				related: ["t"],
			},
		},
	},
	vowels: {
		title: "Vowels",
		description: "Basic vowel sounds",
		items: {
			ey: {
				title: "ey",
				description: "Long a sound.",
				examples: ["make", "take", "late"],
				related: ["ae"],
			},
			iy: {
				title: "iy",
				description: "Long e sound.",
				examples: ["team", "feet", "leave"],
				related: ["eh"],
			},
			ay: {
				title: "ay",
				description: "Long i sound.",
				examples: ["lie", "bye", "sigh"],
				related: ["ih"],
			},
			ow: {
				title: "ow",
				description: "Long o sound.",
				examples: ["know", "toe", "pro"],
				related: ["aa", "oy", "ao"],
			},
			uw: {
				title: "uw",
				description: "Long u sound.",
				examples: ["use", "tube", "sue"],
				related: ["ah", "uh"],
			},
			ae: {
				title: "ae",
				description: "Short a sound.",
				examples: ["matte", "cat", "bag"],
				related: ["ey"],
			},
			eh: {
				title: "eh",
				description: "Short e sound.",
				examples: ["bed", "let", "pet"],
				related: ["iy"],
			},
			ih: {
				title: "ih",
				description: "Short i sound.",
				examples: ["hit", "fit", "kid"],
				related: ["ay"],
			},
			aa: {
				title: "aa",
				description: "Short o sound.",
				examples: ["pot", "sought", "broad"],
				related: ["ow"],
			},
			ah: {
				title: "ah",
				description: "Short u sound.",
				examples: ["cuff", "bug", "bump"],
				related: ["uw"],
			},
			uh: {
				title: "uh",
				description: "Similar to a ooo sound.",
				examples: ["moon", "boom", "tomb"],
				related: ["ow", "aa"],
			},
			oy: {
				title: "oy",
				description: "Starts with an o sound, ends with an y sound.",
				examples: ["coin", "groin", "boy"],
			},
			ao: {
				title: "ao",
				description: 'An "ou" or "oa" sound.',
				examples: ["war", "ore", "four"],
				related: ["ow"],
			},
		},
	},
	blends: {
		title: "Blends",
		description: "Multiple consonants blended together",
		items: {
			bl: {
				title: "bl",
				description: 'Blend combining "b" and "l".',
				examples: ["blue", "black", "blend"],
			},
			cl: {
				title: "cl",
				description: 'Blend combining "c" and "l".',
				examples: ["clap", "clean", "climb"],
			},
			fl: {
				title: "fl",
				description: 'Blend combining "f" and "l".',
				examples: ["flag", "flap", "fly"],
			},
			gl: {
				title: "gl",
				description: 'Blend combining "g" and "l".',
				examples: ["glove", "glide", "gloom"],
			},
			pl: {
				title: "pl",
				description: 'Blend combining "p" and "l".',
				examples: ["plop", "pluck", "plumb"],
			},
			br: {
				title: "br",
				description: 'Blend combining "b" and "r".',
				examples: ["bread", "break", "bright"],
			},
			cr: {
				title: "cr",
				description: 'Blend combining "c" and "r".',
				examples: ["crawl", "creek", "crane"],
			},
			dr: {
				title: "dr",
				description: 'Blend combining "d" and "r".',
				examples: ["drown", "dare", "dare"],
			},
			fr: {
				title: "fr",
				description: 'Blend combining "f" and "r".',
				examples: ["fray", "fray", "fray"],
			},
			gr: {
				title: "gr",
				description: 'Blend combining "g" and "r".',
				examples: ["grief", "grief", "grief"],
			},
			pr: {
				title: "pr",
				description: 'Blend combining "p" and "r".',
				examples: ["prank", "prance", "prism"],
			},
			tr: {
				title: "tr",
				description: 'Blend combining "t" and "r".',
				examples: ["truck", "trance", "trump"],
			},
			sk: {
				title: "sk",
				description: 'Blend combining "s" and "k".',
				examples: ["skate", "skunk", "skull"],
			},
			sl: {
				title: "sl",
				description: 'Blend combining "s" and "l".',
				examples: ["slide", "slime", "slimy"],
			},
			sp: {
				title: "sp",
				description: 'Blend combining "s" and "p".',
				examples: ["spill", "spike", "spill"],
			},
			st: {
				title: "st",
				description: 'Blend combining "s" and "t".',
				examples: ["stain", "stunt", "stitch"],
			},
			sw: {
				title: "sw",
				description: 'Blend combining "s" and "w".',
				examples: ["swim", "swirl", "swish"],
			},
			str: {
				title: "str",
				description: 'Blend combining "s" and "t" and "r".',
				examples: ["string", "stretch", "strength"],
			},
			spr: {
				title: "spr",
				description: 'Blend combining "s" and "p" and "r".',
				examples: ["spring", "spray", "sprout"],
			},
		},
	},
};
