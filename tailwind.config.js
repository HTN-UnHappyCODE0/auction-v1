const animate = require('tailwindcss-animate');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	safelist: ['dark'],
	prefix: '',

	content: ['./pages/**/*.{ts,tsx,vue}', './components/**/*.{ts,tsx,vue}', './app/**/*.{ts,tsx,vue}', './src/**/*.{ts,tsx,vue}'],

	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: {height: 0},
					to: {height: 'var(--radix-accordion-content-height)'},
				},
				'accordion-up': {
					from: {height: 'var(--radix-accordion-content-height)'},
					to: {height: 0},
				},
				'collapsible-down': {
					from: {height: 0},
					to: {height: 'var(--radix-collapsible-content-height)'},
				},
				'collapsible-up': {
					from: {height: 'var(--radix-collapsible-content-height)'},
					to: {height: 0},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'collapsible-down': 'collapsible-down 0.2s ease-in-out',
				'collapsible-up': 'collapsible-up 0.2s ease-in-out',
			},
			gridTemplateColumns: {
				// Simple 16 row grid
				auto: 'repeat(auto-fill, minmax(320px, 1fr))',

				// Complex site-specific row configuration
				layout: '200px minmax(900px, 1fr) 100px',
			},
			gridAutoRows: {
				25: '25px',
			},
			gridRowEnd: {
				16: 'span 16',
				17: 'span 17',
				18: 'span 18',
				19: 'span 19',
				20: 'span 20',
				21: 'span 21',
				22: 'span 22',
				23: 'span 23',
				24: 'span 24',
				25: 'span 25',
				26: 'span 26',
				27: 'span 27',
				28: 'span 28',
				29: 'span 29',
				30: 'span 30',
				31: 'span 31',
				32: 'span 32',
			},
			letterSpacing: {
				2: '0.125em',
			},
			padding: {
				'2/3': '66.666667%',
			},
		},
	},
	plugins: [animate],
};
