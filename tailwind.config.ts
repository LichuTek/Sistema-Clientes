import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        lora: ['"Lora"', 'serif'],
        raleway: ['"Raleway"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        customGreen: '#8DECB4',
        customGreen2: '#41B06E',
        customBlue: '#141E46',
        customBeige: '#FFF5E0',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ] 
};
export default config;
