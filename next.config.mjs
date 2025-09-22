/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	output: "standalone",
	images: {
		loader: 'custom',
		loaderFile: '/next-image-loader.js',
	},
	reactStrictMode: process.env.NODE_ENV === "production",
};

export default withNextIntl(nextConfig);
