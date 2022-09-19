/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			// iphone 6/7/8
			// mobile: "640px",
		},
		extend: {
			aspectRatio: {
				"6/9": "6 / 9",
			},
			fontFamily: {
				sora: [],
			},
			height: {
				bookShadow: "90%",
			},
			width: {
				mobile: "640px",
			},
		},
	},
	plugins: [],
	safelist: ["text-white", "text-black"],
};
