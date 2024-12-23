/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'ec-yellow-50': '#FFFEE7',
        'ec-yellow-100': '#FFFCC1',
        'ec-yellow-200': '#FFF686',
        'ec-light-yellow': '#FFE941',
        'ec-yellow-400': '#FFD70D',
        'ec-yellow': '#F6D20C',
        'ec-yellow-600': '#D19100',
        'ec-yellow-700': '#A66702',
        'ec-yellow-800': '#89500A',
        'ec-yellow-900': '#74410F',
        'ec-yellow-950': '#442204',
        'ec-dark-blue-1': '#282C36',
        'ec-dark-blue-2': '#343946',
        'ec-dark-blue-3': '#3A4252',
        'ec-dark-blue-4': '#434D61',
        'ec-dark-blue-5': '#525E77',
        'ec-dark-blue-50':'#F6F7F9',
        'ec-dark-blue-100':'#ECEEF2',
        'ec-dark-blue-200':'#D5D9E2',
        'ec-dark-blue-300':'#B1BAC8',
        'ec-dark-blue-400':'#8694AA',
        'ec-dark-blue-500':'#677690',
        'ec-purple-50': '#FAF5FF',
        'ec-purple-100': '#F2E9FE',
        'ec-purple-200': '#E8D7FD',
        'ec-purple-300': '#D6B8FA',
        'ec-purple-400': '#BD8AF6',
        'ec-purple-500': '#A35DEF',
        'ec-purple-600': '#8E3CE1',
        'ec-purple': '#7228BB',
        'ec-purple-800': '#6628A1',
        'ec-purple-900': '#542182',
        'ec-purple-950': '#370B60',
        'ec-green': '#00A725',
        'ec-gray': '#878686',
      }, 
      fontSize:{
        'header-1': ['70px', { lineHeight: '1.2'}],
        'header-2': ['40px', { lineHeight: '1.2'}],
        topic: ['32px', { lineHeight: '1.2' }],
        sub: ['24px', { lineHeight: '1.4' }],
        small: ['14px', { lineHeight: '1.5' }],
      },
      backgroundImage: {
        'bg2': "url('bg2.png')",
      },
    },
  },
  plugins: [],
}

