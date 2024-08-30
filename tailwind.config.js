/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "460px",
        // => @media (min-width: 460px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "900px",
        // => @media (min-width: 900px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1B1B1B",

          secondary: "#eaeaec",

          // accent: "#2E603C",
          accent: "#27ae60",

          neutral: "#3D4451",

          "base-100": "#FFFFFF",

          info: "#3ABFF8",

          success: "#065f46",

          warning: "#FBBD23",

          error: "#dc2626",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
