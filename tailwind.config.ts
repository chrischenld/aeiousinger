import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./lib/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	screens: {
    		sm: '640px',
    		md: '768px',
    		lg: '1024px',
    		xl: '1280px',
    		'2xl': '1536px'
    	},
    	extend: {
    		colors: {
    			gray: {
    				'1': '#fcfcfc',
    				'2': '#f9f9f9',
    				'3': '#f0f0f0',
    				'4': '#e8e8e8',
    				'5': '#e0e0e0',
    				'6': '#d9d9d9',
    				'7': '#cecece',
    				'8': '#bbbbbb',
    				'9': '#8d8d8d',
    				'10': '#838383',
    				'11': '#646464',
    				'12': '#202020'
    			},
    			grayDark: {
    				'1': '#111111',
    				'2': '#191919',
    				'3': '#222222',
    				'4': '#2a2a2a',
    				'5': '#313131',
    				'6': '#3a3a3a',
    				'7': '#484848',
    				'8': '#606060',
    				'9': '#6e6e6e',
    				'10': '#7b7b7b',
    				'11': '#b4b4b4',
    				'12': '#eeeeee'
    			},
    			bg: 'var(--bg)',
    			'bg-strong': 'var(--bg-strong)',
    			'bg-xstrong': 'var(--bg-xstrong)',
    			fg: 'var(--fg)',
    			'fg-light': 'var(--fg-light)',
    			'fg-xlight': 'var(--fg-xlight)',
    			'border-2xlight': 'var(--border-2xlight)',
    			'border-xlight': 'var(--border-xlight)',
    			'border-light': 'var(--border-light)',
    			border: 'hsl(var(--border))',
    			'border-strong': 'var(--border-strong)',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		gridTemplateColumns: {
    			subgrid: 'subgrid'
    		},
    		gridColumnEnd: {
    			'20': '20',
    			'25': '25'
    		},
    		gridColumn: {
    			'span-18': 'span 18 / span 18',
    			'span-19': 'span 19 / span 19',
    			'span-21': 'span 21 / span 21'
    		},
    		fontSize: {
    			'2xs': '0.625rem'
    		},
    		keyframes: {
    			tooltip: {
    				'0%': {
    					transform: 'scaleY(0.35)',
    					transformOrigin: 'top',
    					opacity: '0.1'
    				},
    				'50%': {
    					transform: 'scaleY(1)',
    					opacity: '.75'
    				},
    				'100%': {
    					transform: 'scaleY(1)',
    					transformOrigin: 'top',
    					opacity: '1'
    				}
    			},
    			tooltipContent: {
    				'0%': {
    					transform: 'scaleY(2.857142857)',
    					transformOrigin: 'top'
    				},
    				'50%': {
    					transform: 'scaleY(1)',
    					transformOrigin: 'top'
    				},
    				'100%': {
    					transform: 'scaleY(1)',
    					transformOrigin: 'top'
    				}
    			}
    		},
    		animation: {
    			tooltip: 'tooltip 10.35s cubic-bezier(0.76,-0.04,0.23,1.02); forwards',
    			tooltipContent: 'tooltipContent 10.35s cubic-bezier(0.76,-0.04,0.23,1.02); forwards'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
	darkMode: ["class", "class"],
};
export default config;
