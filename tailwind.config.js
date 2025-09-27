/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#01B0FF',
        secondary: '#015880',
        accent: '#E80057',
        success: '#00C569',
        warning: '#FF9800',
        error: '#F44336',
      },
      fontFamily: {
        'raleway-regular': ['Raleway-Regular', 'sans-serif'],
        'raleway-bold': ['Raleway-Bold', 'sans-serif'],
        'raleway-semibold': ['Raleway-SemiBold', 'sans-serif'],
        'raleway-light': ['Raleway-Light', 'sans-serif'],
        'raleway-medium': ['Raleway-Medium', 'sans-serif'],
        'expo-bold': ['expo-bold', 'sans-serif'],
        'isf-kut': ['ISF kut', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}