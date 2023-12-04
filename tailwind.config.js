/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: 'Inter',
      },
      brightness: {
        25: '.25',
        40: '.4',
      }
    },
    // screens: {
    //   '3xl': '1600px',
    // },
  },
  plugins: [require("daisyui"),require("tailwindcss-animated")],
}

