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
                'brand-primary': '#0056b3', // Placeholder Blue from logo
                'brand-secondary': '#e5e5e5', // Placeholder Gray from logo
            },
        },
    },
    plugins: [],
}
