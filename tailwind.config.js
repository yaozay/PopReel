/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Include all files in the `app` folder
    "./components/**/*.{js,ts,jsx,tsx}", // Include all files in the `components` folder
    "./pages/**/*.{js,ts,jsx,tsx}", // (Optional) Include pages if using the `pages` folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
