import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {},
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#50FA7B',
                    secondary: '#E3E354',
                    accent: '#00a3ff',
                    neutral: '#100F13',
                    'base-100': '#282C2B',
                    'base-200': '#1D231C',
                    'base-300': '#171818',
                    info: '#5CF5F5',
                    success: '#238636',
                    warning: '#DFA554',
                    error: '#FF5861',
                    '--rounded-box': '12px', // border radius rounded-box utility class, used in card and other large boxes
                    '--rounded-btn': '12px', // border radius rounded-btn utility class, used in buttons and similar element
                    '--rounded-badge': '12px', // border radius rounded-badge utility class, used in badges and similar
                    '--tab-radius': '12px' // border radius of tabs
                }
            }
        ]
    }
};
export default config;
