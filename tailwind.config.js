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
				// needed for book thumbnails/previews
				"6/9": "6 / 9",
			},
			colors: {
				// needed for book thumbnails/previews
				linen: "#F8F3ED",
			},
			dropShadow: {
				// needed for book thumbnails/previews
				book: "2px 6px 20px rgba(0, 0, 0, 0.25)",
			},
			fontFamily: {
				sora: [],
			},
			height: {
				// needed for book thumbnails/previews
				45: "11.25rem /* 180 pixel*/",
				54: "13.5rem /* 216 pixel*/",
				89: "22.25rem /* 356pixel*/",
			},
			width: {
				mobile: "640px",
			},
		},
	},
	plugins: [],
	safelist: [
		// used for storybook testing
		"text-white",
		"text-black",
	],
};
