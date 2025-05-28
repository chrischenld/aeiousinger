interface TooltipContent {
	description: string;
	examples?: string[];
}

interface ContentData {
	durations: Record<string, TooltipContent>;
	pitches: Record<string, TooltipContent>;
	phonemes: Record<string, TooltipContent>;
}

export const tooltipContent: ContentData = {
	durations: {
		// Regular durations
		"1": {
			description: "Whole note",
			examples: ["4 beats"],
		},
		"1/2": {
			description: "Half note",
			examples: ["2 beats"],
		},
		"1/4": {
			description: "Quarter note",
			examples: ["1 beat"],
		},
		"1/8": {
			description: "Eighth note",
			examples: ["1/2 beat"],
		},
		"1/16": {
			description: "Sixteenth note",
			examples: ["1/4 beat"],
		},
		"1/32": {
			description: "Thirty-second note",
			examples: ["1/8 beat"],
		},
		"1/64": {
			description: "Sixty-fourth note",
			examples: ["1/16 beat"],
		},
		"2": {
			description: "Double whole note",
			examples: ["8 beats"],
		},
		"4": {
			description: "Quadruple whole note",
			examples: ["16 beats"],
		},
		"8": {
			description: "Octuple whole note",
			examples: ["32 beats"],
		},
		// Dotted durations
		"1·": {
			description: "Dotted whole note",
			examples: ["6 beats"],
		},
		"1/2·": {
			description: "Dotted half note",
			examples: ["3 beats"],
		},
		"1/4·": {
			description: "Dotted quarter note",
			examples: ["1.5 beats"],
		},
		"1/8·": {
			description: "Dotted eighth note",
			examples: ["3/4 beat"],
		},
		"1/16·": {
			description: "Dotted sixteenth note",
			examples: ["3/8 beat"],
		},
		"1/32·": {
			description: "Dotted thirty-second note",
			examples: ["3/16 beat"],
		},
		"1/64·": {
			description: "Dotted sixty-fourth note",
			examples: ["3/32 beat"],
		},
		"2·": {
			description: "Dotted double whole note",
			examples: ["12 beats"],
		},
		// Triplet durations
		"1tr": {
			description: "Whole note triplet",
			examples: ["3 notes in 8 beats"],
		},
		"1/2tr": {
			description: "Half note triplet",
			examples: ["3 notes in 4 beats"],
		},
		"1/4tr": {
			description: "Quarter note triplet",
			examples: ["3 notes in 2 beats"],
		},
		"1/8tr": {
			description: "Eighth note triplet",
			examples: ["3 notes in 1 beat"],
		},
		"1/16tr": {
			description: "Sixteenth note triplet",
			examples: ["3 notes in 1/2 beat"],
		},
	},

	pitches: {
		// Generate basic descriptions for pitches
		// Lower octaves
		"A♭1": { description: "A flat in octave 1" },
		A1: { description: "A in octave 1" },
		"A♯1": { description: "A sharp in octave 1" },
		"B♭1": { description: "B flat in octave 1" },
		B1: { description: "B in octave 1" },
		C1: { description: "C in octave 1" },
		"C♯1": { description: "C sharp in octave 1" },
		"D♭1": { description: "D flat in octave 1" },
		D1: { description: "D in octave 1" },
		"D♯1": { description: "D sharp in octave 1" },
		"E♭1": { description: "E flat in octave 1" },
		E1: { description: "E in octave 1" },
		F1: { description: "F in octave 1" },
		"F♯1": { description: "F sharp in octave 1" },
		"G♭1": { description: "G flat in octave 1" },
		G1: { description: "G in octave 1" },
		"G♯1": { description: "G sharp in octave 1" },

		// Octave 2
		"A♭2": { description: "A flat in octave 2" },
		A2: { description: "A in octave 2" },
		"A♯2": { description: "A sharp in octave 2" },
		"B♭2": { description: "B flat in octave 2" },
		B2: { description: "B in octave 2" },
		C2: { description: "C in octave 2" },
		"C♯2": { description: "C sharp in octave 2" },
		"D♭2": { description: "D flat in octave 2" },
		D2: { description: "D in octave 2" },
		"D♯2": { description: "D sharp in octave 2" },
		"E♭2": { description: "E flat in octave 2" },
		E2: { description: "E in octave 2" },
		F2: { description: "F in octave 2" },
		"F♯2": { description: "F sharp in octave 2" },
		"G♭2": { description: "G flat in octave 2" },
		G2: { description: "G in octave 2" },
		"G♯2": { description: "G sharp in octave 2" },

		// Octave 3
		"A♭3": { description: "A flat in octave 3" },
		A3: { description: "A in octave 3" },
		"A♯3": { description: "A sharp in octave 3" },
		"B♭3": { description: "B flat in octave 3" },
		B3: { description: "B in octave 3" },
		C3: { description: "C in octave 3" },
		"C♯3": { description: "C sharp in octave 3" },
		"D♭3": { description: "D flat in octave 3" },
		D3: { description: "D in octave 3" },
		"D♯3": { description: "D sharp in octave 3" },
		"E♭3": { description: "E flat in octave 3" },
		E3: { description: "E in octave 3" },
		F3: { description: "F in octave 3" },
		"F♯3": { description: "F sharp in octave 3" },
		"G♭3": { description: "G flat in octave 3" },
		G3: { description: "G in octave 3" },
		"G♯3": { description: "G sharp in octave 3" },

		// Octave 4 (middle range)
		"A♭4": { description: "A flat in octave 4" },
		A4: { description: "A in octave 4 (concert pitch)" },
		"A♯4": { description: "A sharp in octave 4" },
		"B♭4": { description: "B flat in octave 4" },
		B4: { description: "B in octave 4" },
		C4: { description: "Middle C" },
		"C♯4": { description: "C sharp in octave 4" },
		"D♭4": { description: "D flat in octave 4" },
		D4: { description: "D in octave 4" },
		"D♯4": { description: "D sharp in octave 4" },
		"E♭4": { description: "E flat in octave 4" },
		E4: { description: "E in octave 4" },
		F4: { description: "F in octave 4" },
		"F♯4": { description: "F sharp in octave 4" },
		"G♭4": { description: "G flat in octave 4" },
		G4: { description: "G in octave 4" },
		"G♯4": { description: "G sharp in octave 4" },

		// Octave 5
		"A♭5": { description: "A flat in octave 5" },
		A5: { description: "A in octave 5" },
		"A♯5": { description: "A sharp in octave 5" },
		"B♭5": { description: "B flat in octave 5" },
		B5: { description: "B in octave 5" },
		C5: { description: "C in octave 5" },
		"C♯5": { description: "C sharp in octave 5" },
		"D♭5": { description: "D flat in octave 5" },
		D5: { description: "D in octave 5" },
		"D♯5": { description: "D sharp in octave 5" },
		"E♭5": { description: "E flat in octave 5" },
		E5: { description: "E in octave 5" },
		F5: { description: "F in octave 5" },
		"F♯5": { description: "F sharp in octave 5" },
		"G♭5": { description: "G flat in octave 5" },
		G5: { description: "G in octave 5" },
		"G♯5": { description: "G sharp in octave 5" },

		// Octave 6
		"A♭6": { description: "A flat in octave 6" },
		A6: { description: "A in octave 6" },
		"A♯6": { description: "A sharp in octave 6" },
		"B♭6": { description: "B flat in octave 6" },
		B6: { description: "B in octave 6" },
		C6: { description: "C in octave 6" },
		"C♯6": { description: "C sharp in octave 6" },
		"D♭6": { description: "D flat in octave 6" },
		D6: { description: "D in octave 6" },
		"D♯6": { description: "D sharp in octave 6" },
		"E♭6": { description: "E flat in octave 6" },
		E6: { description: "E in octave 6" },
		"F♭6": { description: "F flat in octave 6" },
		F6: { description: "F in octave 6" },
		"F♯6": { description: "F sharp in octave 6" },
		"G♭6": { description: "G flat in octave 6" },
		G6: { description: "G in octave 6" },
		"G♯6": { description: "G sharp in octave 6" },

		// Octave 7
		"A♭7": { description: "A flat in octave 7" },
		A7: { description: "A in octave 7" },
		"A♯7": { description: "A sharp in octave 7" },
		"B♭7": { description: "B flat in octave 7" },
	},

	phonemes: {
		// None phoneme
		_: {
			description: "No phoneme selected",
		},

		// Consonant phonemes
		b: {
			description: "Standard b sound",
			examples: ["bat", "ball", "big"],
		},
		d: {
			description: "Standard d sound",
			examples: ["dog", "dad", "door"],
		},
		f: {
			description: "Standard f sound",
			examples: ["fish", "fun", "fall"],
		},
		g: {
			description: "Standard hard g sound",
			examples: ["go", "get", "good"],
		},
		hx: {
			description: "Voiced, 'hard' h sound",
			examples: ["hat", "hot", "hand"],
		},
		j: {
			description: "Standard hard j sound",
			examples: ["jump", "jam", "jet"],
		},
		k: {
			description: "Standard k sound. Could apply to words with a hard c sound",
			examples: ["cat", "cookie", "kick"],
		},
		m: {
			description: "Standard m sound",
			examples: ["man", "mom", "make"],
		},
		n: {
			description: "Standard n sound",
			examples: ["no", "new", "nice"],
		},
		p: {
			description: "Standard p sound",
			examples: ["pat", "pen", "pig"],
		},
		r: {
			description:
				"Standard r sound, typically the one used in the beginning of a word",
			examples: ["red", "run", "rat"],
		},
		t: {
			description: "Standard t sound",
			examples: ["top", "ten", "take"],
		},
		s: {
			description: "Standard s sound",
			examples: ["sit", "see", "sun"],
		},
		v: {
			description: "Standard v sound",
			examples: ["van", "very", "save"],
		},
		w: {
			description: "Standard w sound",
			examples: ["win", "way", "walk"],
		},
		y: {
			description:
				"Voiced y sound. Use for the beginning of words, not the long e sound",
			examples: ["use", "yes", "yard"],
		},
		z: {
			description:
				"Standard z sound. A harder, buzzing sound compared to s or a softer zh",
			examples: ["zoo", "zip", "zero"],
		},
		ch: {
			description: "Combination of c and h that make the 'ch' sound",
			examples: ["chair", "church", "catch"],
		},
		gh: {
			description:
				"Combination of g and h that make the 'g' sound or can be silent",
			examples: ["ghost", "ghoul", "high"],
		},
		ng: {
			description: "Combination of n and g that make the 'ng' sound",
			examples: ["sing", "ring", "long"],
		},
		ph: {
			description: "Combination of p and h that make the 'f' sound",
			examples: ["phone", "photo", "graph"],
		},
		sh: {
			description: "Combination of s and h that make the 'sh' sound",
			examples: ["ship", "shop", "fish"],
		},
		th: {
			description:
				"Combination of t and h that make the 'th' sound (can be voiced or unvoiced)",
			examples: ["this", "that", "think"],
		},
		wh: {
			description:
				"Combination of w and h that make the 'w' sound or 'hw' sound",
			examples: ["what", "when", "where"],
		},
		zh: {
			description: "Combination of z and h that make a softer 'j' sound",
			examples: ["zhou"],
		},
		rx: {
			description: "When r follows a vowel. Softer r",
			examples: ["car", "star", "park"],
		},
		tx: {
			description:
				"When t comes at the end of a word. Softer t. Can also be used for an -ed ending",
			examples: ["text", "fact", "packed"],
		},

		// Vowel phonemes
		ey: {
			description: "Long a sound",
			examples: ["make", "take", "late"],
		},
		iy: {
			description: "Long e sound",
			examples: ["team", "feet", "leave"],
		},
		ay: {
			description: "Long i sound",
			examples: ["lie", "bye", "sigh"],
		},
		ow: {
			description: "Long o sound",
			examples: ["know", "toe", "pro"],
		},
		uw: {
			description: "Long u sound",
			examples: ["use", "tube", "sue"],
		},
		ae: {
			description: "Short a sound",
			examples: ["matte", "cat", "bag"],
		},
		eh: {
			description: "Short e sound",
			examples: ["bed", "let", "pet"],
		},
		ih: {
			description: "Short i sound",
			examples: ["hit", "fit", "kid"],
		},
		aa: {
			description: "Short o sound",
			examples: ["pot", "sought", "broad"],
		},
		ah: {
			description: "Short u sound",
			examples: ["cuff", "bug", "bump"],
		},
		uh: {
			description: "Similar to a ooo sound",
			examples: ["moon", "boom", "tomb"],
		},
		oy: {
			description: "Starts with an o sound, ends with an y sound",
			examples: ["coin", "groin", "boy"],
		},
		ao: {
			description: "An 'ou' or 'oa' sound",
			examples: ["war", "ore", "four"],
		},

		// Blend phonemes
		bl: {
			description: "Blend combining 'b' and 'l'",
			examples: ["blue", "black", "blend"],
		},
		cl: {
			description: "Blend combining 'c' and 'l'",
			examples: ["clap", "clean", "climb"],
		},
		fl: {
			description: "Blend combining 'f' and 'l'",
			examples: ["flag", "flap", "fly"],
		},
		gl: {
			description: "Blend combining 'g' and 'l'",
			examples: ["glove", "glide", "gloom"],
		},
		pl: {
			description: "Blend combining 'p' and 'l'",
			examples: ["plop", "pluck", "plumb"],
		},
		br: {
			description: "Blend combining 'b' and 'r'",
			examples: ["bread", "break", "bright"],
		},
		cr: {
			description: "Blend combining 'c' and 'r'",
			examples: ["crawl", "creek", "crane"],
		},
		dr: {
			description: "Blend combining 'd' and 'r'",
			examples: ["drown", "dare", "dream"],
		},
		fr: {
			description: "Blend combining 'f' and 'r'",
			examples: ["fray", "free", "from"],
		},
		gr: {
			description: "Blend combining 'g' and 'r'",
			examples: ["grief", "green", "grab"],
		},
		pr: {
			description: "Blend combining 'p' and 'r'",
			examples: ["prank", "prance", "prism"],
		},
		tr: {
			description: "Blend combining 't' and 'r'",
			examples: ["train", "true", "control"],
		},
		sk: {
			description: "Blend combining 's' and 'k'",
			examples: ["skate", "skunk", "skull"],
		},
		sl: {
			description: "Blend combining 's' and 'l'",
			examples: ["slide", "slime", "slimy"],
		},
		sp: {
			description: "Blend combining 's' and 'p'",
			examples: ["spill", "conspire", "spot"],
		},
		st: {
			description: "Blend combining 's' and 't'",
			examples: ["stain", "stunt", "stitch"],
		},
		sw: {
			description: "Blend combining 's' and 'w'",
			examples: ["swim", "swirl", "swish"],
		},
		str: {
			description: "Blend combining 's' and 't' and 'r'",
			examples: ["string", "backstroke", "strength"],
		},
		spr: {
			description: "Blend combining 's' and 'p' and 'r'",
			examples: ["spring", "spray", "sprout"],
		},
	},
};

// Helper function to get tooltip content
export function getTooltipContent(
	type: "durations" | "pitches" | "phonemes",
	value: string | number
): TooltipContent | null {
	const content = tooltipContent[type][String(value)];
	return content || null;
}

// Helper function to format tooltip text
export function formatTooltipText(content: TooltipContent): {
	description: string;
	examples?: string[];
} {
	return {
		description: content.description,
		examples: content.examples,
	};
}
