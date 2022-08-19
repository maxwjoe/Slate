/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors : {
      'slate-lightdark' : "#333232",
      'slate-dark' : '#252525',
      'slate-super-dark' : "#0F0F0F",
      'slate-black' : '#000000',
      'text-main' : "#dee0e4",
      'text-danger' : '#FD5D5D',
      'text-secondary' : "#999ba2",
      'text-tertiary' : "#999ba2",
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
}