/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        inter400: ["Inter-Regular"],
        inter500: ["Inter-Medium"],
        inter600: ["Inter-SemiBold"],
        inter700: ["Inter-Bold"],

        poppins400: ["Poppins-Regular"],
        poppins500: ["Poppins-Medium"],
        poppins600: ["Poppins-SemiBold"],
        poppins700: ["Poppins-Bold"]
      },
      backgroundImage: {
        'custom-price-gradient': 'linear-gradient(90deg, #1D5AD5 24%, #4D83F0 100%)',
      },
     
    },
  },
  plugins: [],
}