/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Footer: '#243642',
        Buttons: '#E2F1E7',
        AddCam:'#387478',
        howitworks:'#EED3B1',
        together:'#E2F1E7',
        Profile:'#629584',
     
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'synthwave'], 
  },
}

