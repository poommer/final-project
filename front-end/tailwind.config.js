/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'ec-yellow': '#FFC700',
        'ec-light-yellow': '#F7CB4E',
        'ec-dark-blue-1': '#282C36',
        'ec-dark-blue-2': '#373C4A',
        'ec-dark-blue-3': '#484E5F',
        'ec-purple': '#7228BB',
        'ec-green': '#00A725',
        'ec-gray': '#878686',
      }, 
      backgroundImage: {
        'bg2': "url('bg2.png')",
      },
    },
  },
  plugins: [],
}

