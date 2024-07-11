module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'darkBlue': '#091f4d',
      },
      width: {
        'customWidth': '400px',
        'customWidth2': '600px',
      },
      borderColor: {
        'BlueBorder': '#091f4d',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
