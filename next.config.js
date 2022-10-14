/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["page.tsx", "api.ts"],
	reactStrictMode: true,
	images: {
		domains: [
			"loremflickr.com",
			"picsum.photos",
			"images.booklooker.de",
			"books.google.com",
			"books.google.com",
		],
	},
	swcMinify: true,
};

module.exports = nextConfig;
