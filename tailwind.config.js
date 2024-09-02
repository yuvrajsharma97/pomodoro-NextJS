/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "backgroundGif": "url('/mainbg.gif')",
      },
      colors: {
        color1: "#0B0C10",
        color2: "#1F2833",
        color3: "#C5C6C7",
        color4: "#c21500",
      },
      boxShadow: {
        custom: "0.5px 0.5px 10px #fceabb",
      },
      screens: {
        xs: { min: "300px", max: "640px" }, // Custom media query
      },
    },
  },
  plugins: [],
};
