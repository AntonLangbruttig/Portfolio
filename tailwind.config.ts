import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      screens: {
        sm: '0px',   
        md: '980px',   
        lg: '1267px',  
        xl: '1354px',
      },
      boxShadow: {
        "tv-glow": "0 0 20px #00ffff, 0 0 40px #00ffff",
      },
    },
  },
  plugins: [],
};

export default config;