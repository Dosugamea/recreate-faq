/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        kirara: {
          green: '#8CC63F', // The main bright green
          'green-dark': '#7AB232',
          gray: '#555555', // Text color
          'gray-light': '#F4F4F4', // Q background
          'gray-dark': '#777777', // Q icon bg, tab bg
          beige: '#FDFDE6', // A background
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      fontFamily: {
        maru: ['"Zen Maru Gothic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
