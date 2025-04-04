/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100":"#d4eaf7",
        "primary-200":"#b6ccd8",
        "primary-300":"#3b3c3d",
        "accent-100":"#71c4ef",
        "accent-200":"#00668c",
        "text-100":"#1d1c1c",
        "text-200":"#313d44",
        "bg-100":"#fffefb",
        "bg-200":"#f5f4f1",
        "bg-300":"#cccbc8",
          
      },
    },
  },
  plugins: [],
}

