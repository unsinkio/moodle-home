/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                'brand-primary': '#199EDA', // Tech Blue
                'brand-secondary': '#E30613', // Energetic Red
                'brand-gray-light': '#A2A2A1',
                'brand-gray-dark': '#535158',
                'brand-black': '#000000',
            },
        },
    },
    plugins: [],
}
