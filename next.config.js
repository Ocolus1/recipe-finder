/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ['spoonacular.com', 'img.spoonacular.com'],
	},
};

module.exports = nextConfig;