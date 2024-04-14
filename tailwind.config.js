/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            bgcolor: '#030712',
            bgl: '#0f172a',
            white: '#FFF',
            red: 'red',
            green: '#a7f3d0',
            ywhite: '#fef9c3',
            black: '#0000',
            textHover: '#0284c7',
            'dark-grey': '#52525b',
            'light-grey': '#a1a1aa',
            blue: '#2563eb',
            'dark-blue': '#1e3a8a',
            'light-bg': '#1e293b',
            'lb-f-bg': '#93c5fd',
        },
    },
    plugins: [require('tailwind-scrollbar-hide')],
};