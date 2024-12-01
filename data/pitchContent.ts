type PitchSection = {
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

export const pitchSections = [
	{
		title: "Octave2",
		items: [
			"C2",
			"C#2/Db2",
			"D2",
			"D#2/Eb2",
			"E2",
			"F2",
			"F#2/Gb2",
			"G2",
			"G#2/Ab2",
			"A2",
			"A#2/Bb2",
			"B2",
		],
	},
	{
		title: "Octave3",
		items: [
			"C3",
			"C#3/Db3",
			"D3",
			"D#3/Eb3",
			"E3",
			"F3",
			"F#3/Gb3",
			"G3",
			"G#3/Ab3",
			"A3",
			"A#3/Bb3",
			"B3",
		],
	},
	{
		title: "Octave4",
		items: [
			"C4",
			"C#4/Db4",
			"D4",
			"D#4/Eb4",
			"E4",
			"F4",
			"F#4/Gb4",
			"G4",
			"G#4/Ab4",
			"A4",
			"A#4/Bb4",
			"B4",
		],
	},
	{
		title: "Octave5",
		items: [
			"C5",
			"C#5/Db5",
			"D5",
			"D#5/Eb5",
			"E5",
			"F5",
			"F#5/Gb5",
			"G5",
			"G#5/Ab5",
			"A5",
			"A#5/Bb5",
			"B5",
		],
	},
];

export const pitchContent: Record<string, PitchSection> = {
	octave2: {
		title: "Octave2",
		description: "Second octave on the keyboard",
		items: {
			C2: {
				title: "C2",
				description: "C at octave 2, 1 semitone",
			},
			"C#2/Db2": {
				title: "C#2/Db2",
				description: "C# or Db at octave 2, 2 semitones",
			},
			D2: {
				title: "D2",
				description: "D at octave 2, 3 semitones",
			},
			"D#2/Eb2": {
				title: "D#2/Eb2",
				description: "D# or Ebat octave 2, 4 semitones",
			},
			E2: {
				title: "E2",
				description: "E at octave 2, 5 semitones",
			},
			F2: {
				title: "F2",
				description: "F at octave 2, 6 semitones",
			},
			"F#2/Gb2": {
				title: "F#2/Gb2",
				description: "F# or Gb at octave 2, 7 semitones",
			},
			G2: {
				title: "G2",
				description: "G at octave 2, 8 semitones",
			},
			"G#2/Ab2": {
				title: "G#2/Ab2",
				description: "G# or Ab at octave 2, 9 semitones",
			},
			A2: {
				title: "A2",
				description: "A at octave 2, 10 semitones",
			},
			"A#2/Bb2": {
				title: "A#2/Bb2",
				description: "A# or Bb at octave 2, 11 semitones",
			},
			B2: {
				title: "B2",
				description: "B at octave 2, 12 semitones",
			},
		},
	},
	octave3: {
		title: "Octave 3",
		description: "Third octave on the keyboard",
		items: {
			C3: {
				title: "C3",
				description: "C at octave 3, 13 semitones",
			},
			"C#3/Db3": {
				title: "C#3/Db3",
				description: "C# or Db at octave 3, 14 semitones",
			},
			D3: {
				title: "D3",
				description: "D at octave 3, 15 semitones",
			},
			"D#3/Eb3": {
				title: "D#3/Eb3",
				description: "D# or Eb at octave 3, 16 semitones",
			},
			E3: {
				title: "E3",
				description: "E at octave 3, 17 semitones",
			},
			F3: {
				title: "F3",
				description: "F at octave 3, 18 semitones",
			},
			"F#3/Gb3": {
				title: "F#3/Gb3",
				description: "F# or Gb at octave 3, 19 semitones",
			},
			G3: {
				title: "G3",
				description: "G at octave 3, 20 semitones",
			},
			"G#3/Ab3": {
				title: "G#3/Ab3",
				description: "G# or Ab at octave 3, 21 semitones",
			},
			A3: {
				title: "A3",
				description: "A at octave 3, 22 semitones",
			},
			"A#3/Bb3": {
				title: "A#3/Bb3",
				description: "A# or Bb at octave 3, 23 semitones",
			},
			B3: {
				title: "B3",
				description: "B at octave 3, 24 semitones",
			},
		},
	},
	octave4: {
		title: "Octave 4",
		description: "Fourth octave on the keyboard",
		items: {
			C4: {
				title: "C4",
				description: "C at octave 4, 25 semitones. Middle C",
			},
			"C#4/Db4": {
				title: "C#4/Db4",
				description: "C# or Db at octave 4, 26 semitones",
			},
			D4: {
				title: "D4",
				description: "D at octave 4, 27 semitones",
			},
			"D#4/Eb4": {
				title: "D#4/Eb4",
				description: "D# or Eb at octave 4, 28 semitones",
			},
			E4: {
				title: "E4",
				description: "E at octave 4, 29 semitones",
			},
			F4: {
				title: "F4",
				description: "F at octave 4, 30 semitones",
			},
			"F#4/Gb4": {
				title: "F#4/Gb4",
				description: "F# or Gb at octave 4, 31 semitones",
			},
			G4: {
				title: "G4",
				description: "G at octave 4, 32 semitones",
			},
			"G#4/Ab4": {
				title: "G#4/Ab4",
				description: "G# or Ab at octave 4, 33 semitones",
			},
			A4: {
				title: "A4",
				description: "A at octave 4, 34 semitones",
			},
			"A#4/Bb4": {
				title: "A#4/Bb4",
				description: "A# or Bb at octave 4, 35 semitones",
			},
			B4: {
				title: "B4",
				description: "B at octave 4, 36 semitones",
			},
		},
	},
	octave5: {
		title: "Octave 5",
		description: "Fifth octave on the keyboard",
		items: {
			C5: {
				title: "C5",
				description: "C at octave 5, 37 semitones",
			},
			"C#5/Db5": {
				title: "C#5/Db5",
				description: "C# or Db at octave 5, 38 semitones",
			},
			D5: {
				title: "D5",
				description: "D at octave 5, 39 semitones",
			},
			"D#5/Eb5": {
				title: "D#5/Eb5",
				description: "D# or Eb at octave 5, 40 semitones",
			},
			E5: {
				title: "E5",
				description: "E at octave 5, 41 semitones",
			},
			F5: {
				title: "F5",
				description: "F at octave 5, 42 semitones",
			},
			"F#5/Gb5": {
				title: "F#5/Gb5",
				description: "F# or Gb at octave 5, 43 semitones",
			},
			G5: {
				title: "G5",
				description: "G at octave 5, 44 semitones",
			},
			"G#5/Ab5": {
				title: "G#5/Ab5",
				description: "G# or Ab at octave 5, 45 semitones",
			},
			A5: {
				title: "A5",
				description: "A at octave 5, 46 semitones",
			},
			"A#5/Bb5": {
				title: "A#5/Bb5",
				description: "A# or Bb at octave 5, 47 semitones",
			},
			B5: {
				title: "B5",
				description: "B at octave 5, 48 semitones",
			},
		},
	},
};
