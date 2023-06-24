/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['loremflickr.com', 'res.cloudinary.com', 'tailwindui.com', 'via.placeholder.com', 'source.unsplash.com'],
    },
}

module.exports = nextConfig
