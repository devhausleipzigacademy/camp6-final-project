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
			backgroundImage: {
				//needed for toggle switch
				toggleGradient: "linear-gradient(180deg, #FFFFFF 0%, #E8EAEA 100%)",
			},
			boxShadow: {
				//needed for toggle switch
				toggleSwitch: "inset 0px 6px 8px 3px rgba(0, 0, 0, 0.1)",
			},
			colors: {
				// primary colors to use
				customGreen: "#B5C285",
				customYellow: "#F3DE8A",
				customGrey: "#C4C3C2",
				customCream: "#FEF1E0",
				CustomSalmon: "#F4A298",
				CustomDustyRose: "#E5BABA",
				CustomBlue: "#A4C5C6",
				CustomBrown: "#A69F95",
				CustomBlack: "#2E312F",
				// needed for book thumbnails/previews
				linen: "#F8F3ED",
				//needed for toggle switch
				buttonGrey: "#D4D3D3",
			},
			dropShadow: {
				// needed for book thumbnails/previews
				book: "2px 6px 20px rgba(0, 0, 0, 0.25)",
				//needed for toggle switch
				togglePin: "2px 1px 6px rgba(0, 0, 0, 0.25)",
			},
			fontFamily: {
				sora: [],
				montserrat: [],
				arnoPro: [],
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
