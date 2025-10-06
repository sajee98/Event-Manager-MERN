// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust if needed
  ],
  theme: {
    extend: {
      
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
             colors: {
        'purple-ton': '#6B46C1',
        'purple-ton-dark': '#553C9A',
         'purple-ton-blue': '#6B5B95', // for hover effect
      },

      },
    },
  },
  plugins: [],
}
