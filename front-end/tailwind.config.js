/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'ec-yello': '#FFC700',
        'ec-light-yello': '#F7CB4E',
        'ec-dark-bule': '#282C36',
        'ec-purple': '#7228BB',
        'ec-green': '#00A725',
        'ec-gray': '#878686',
      },
    },
  },
  plugins: [],
}

