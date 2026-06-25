/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.css",
    ],
    theme: {
        extend: {
            colors: {
                spotifyGreen: '#1ed760',
                spotifyBase: '#000000',
                spotifyBlack: '#121212',
                spotifyHover: '#1f1f1f',
                spotifyDarkGray: '#242424',
                spotifyLightGray: '#a7a7a7',
                spotifyWhite: '#ffffff',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}