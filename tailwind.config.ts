import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./lib/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: "384px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			spacing: {
				"safe-bottom": "env(safe-area-inset-bottom, 0px)",
				"safe-top": "env(safe-area-inset-top, 0px)",
				"safe-left": "env(safe-area-inset-left, 0px)",
				"safe-right": "env(safe-area-inset-right, 0px)",
			},
			padding: {
				"safe-bottom": "env(safe-area-inset-bottom, 0px)",
				"safe-top": "env(safe-area-inset-top, 0px)",
				"safe-left": "env(safe-area-inset-left, 0px)",
				"safe-right": "env(safe-area-inset-right, 0px)",
				"safe-bottom-2": "calc(0.5rem + env(safe-area-inset-bottom, 0px))",
				"safe-bottom-4": "calc(1rem + env(safe-area-inset-bottom, 0px))",
			},
			colors: {
				gray: {
					"1": "#fcfcfc",
					"2": "#f9f9f9",
					"3": "#f0f0f0",
					"4": "#e8e8e8",
					"5": "#e0e0e0",
					"6": "#d9d9d9",
					"7": "#cecece",
					"8": "#bbbbbb",
					"9": "#8d8d8d",
					"10": "#838383",
					"11": "#646464",
					"12": "#202020",
				},
				grayDark: {
					"1": "#111111",
					"2": "#191919",
					"3": "#222222",
					"4": "#2a2a2a",
					"5": "#313131",
					"6": "#3a3a3a",
					"7": "#484848",
					"8": "#606060",
					"9": "#6e6e6e",
					"10": "#7b7b7b",
					"11": "#b4b4b4",
					"12": "#eeeeee",
				},
				sandDark: {
					"1": "#111110",
					"2": "#191918",
					"3": "#222221",
					"4": "#2a2a28",
					"5": "#31312e",
					"6": "#3b3a37",
					"7": "#494844",
					"8": "#62605b",
					"9": "#6f6d66",
					"10": "#7c7b74",
					"11": "#b5b3ad",
					"12": "#eeeeec",
				},
				bg: "var(--bg)",
				"bg-strong": "var(--bg-strong)",
				"bg-xstrong": "var(--bg-xstrong)",
				fg: "var(--fg)",
				"fg-light": "var(--fg-light)",
				"fg-xlight": "var(--fg-xlight)",
				"border-2xlight": "var(--border-2xlight)",
				"border-xlight": "var(--border-xlight)",
				"border-light": "var(--border-light)",
				border: "var(--border)",
				"border-strong": "var(--border-strong)",
				background: "var(--background)",
				foreground: "var(--foreground)",
				card: {
					DEFAULT: "var(--card)",
					foreground: "var(--card-foreground)",
				},
				popover: {
					DEFAULT: "var(--popover)",
					foreground: "var(--popover-foreground)",
				},
				primary: {
					DEFAULT: "var(--primary)",
					foreground: "var(--primary-foreground)",
				},
				secondary: {
					DEFAULT: "var(--secondary)",
					foreground: "var(--secondary-foreground)",
				},
				muted: {
					DEFAULT: "var(--muted)",
					foreground: "var(--muted-foreground)",
				},
				accent: {
					DEFAULT: "var(--accent)",
					foreground: "var(--accent-foreground)",
				},
				destructive: {
					DEFAULT: "var(--destructive)",
					foreground: "var(--destructive-foreground)",
				},
				input: "var(--input)",
				ring: "var(--ring)",
				chart: {
					"1": "var(--chart-1)",
					"2": "var(--chart-2)",
					"3": "var(--chart-3)",
					"4": "var(--chart-4)",
					"5": "var(--chart-5)",
				},
			},
			gridTemplateColumns: {
				subgrid: "subgrid",
			},
			gridColumnEnd: {
				"20": "20",
				"25": "25",
			},
			gridColumn: {
				"span-16": "span 16 / span 16",
				"span-18": "span 18 / span 18",
				"span-19": "span 19 / span 19",
				"span-21": "span 21 / span 21",
				"span-24": "span 24 / span 24",
				"span-26": "span 26 / span 26",
				"span-32": "span 32 / span 32",
				"span-34": "span 34 / span 34",
				"span-40": "span 40 / span 40",
				"span-48": "span 48 / span 48",
			},
			fontSize: {
				"2xs": "0.625rem",
			},
			keyframes: {
				tooltip: {
					"0%": {
						transform: "scaleY(0.35)",
						transformOrigin: "top",
						opacity: "0.1",
					},
					"50%": {
						transform: "scaleY(1)",
						opacity: ".75",
					},
					"100%": {
						transform: "scaleY(1)",
						transformOrigin: "top",
						opacity: "1",
					},
				},
				tooltipContent: {
					"0%": {
						transform: "scaleY(2.857142857)",
						transformOrigin: "top",
					},
					"50%": {
						transform: "scaleY(1)",
						transformOrigin: "top",
					},
					"100%": {
						transform: "scaleY(1)",
						transformOrigin: "top",
					},
				},
			},
			animation: {
				tooltip: "tooltip 10.35s cubic-bezier(0.76,-0.04,0.23,1.02); forwards",
				tooltipContent:
					"tooltipContent 10.35s cubic-bezier(0.76,-0.04,0.23,1.02); forwards",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
export default config;
