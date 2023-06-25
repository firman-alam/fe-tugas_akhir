/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mabry_pro: ['Mabry Pro', 'sans-serif'],
      },
      colors: {
        'primary-orange': '#FF5722',
        'green-fir': '#23A094',
        'orange-fir': '#FFC900',
        'yellow-fir': '#F1F333',
        'pink-fir': '#FF90E8',
        'paleblue-fir': '#90A8ED',
        'red-fir': '#E2242F',
      },
      textColor: {
        black: '#000000',
      },
    },
  },
  plugins: [],
}
