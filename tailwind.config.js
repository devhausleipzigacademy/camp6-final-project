/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		screens: {
			// iphone 6/7/8
			// mobile: "640px",
		},
		extend: {
			fontFamily: {
				sora: [],
			},
			width: {
				mobile: "640px",
			},
		},
	},
	plugins: [],
};
