/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			// primary colors to use
			black: "#2E312F",
			blue: "#A4C5C6",
			brown: "#A69F95",
			cream: "#FEF1E0",
			dustyRose: "#E5BABA",
			green: "#B5C285",
			grey: "#C4C3C2",
			textGrey: "#A39C94",
			salmon: "#F4A298",
			yellow: "#F3DE8A",
			white: "#FFFFFF",
		},
		dropShadow: {
			// needed for book thumbnails/previews
			DEFAULT: "2px 6px 20px rgba(0, 0, 0, 0.25)",
			//needed for toggle switch
			togglePin: "2px 1px 6px rgba(0, 0, 0, 0.25)",
			// needed for add-book button
			plusButton: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		},

		extend: {
			borderWidth: { 0.75: "0.75px" },
			// Iphone Screen width
			screens: {
				sm: "414px",
			},
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
			fontSize: {
				"2xs": "10px",
			},
			width: {
				mobile: "640px",
				// needed for library buttons
				25: "6.25rem /* 98 pixel*/",
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
