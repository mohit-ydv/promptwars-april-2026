/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1a73e8",
                secondary: "#5f6368",
                premium: {
                    bg: "#0a0a0e",
                    card: "#161b22",
                    accent: "#3fb950",
                    highlight: "#f0f6fc",
                }
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
