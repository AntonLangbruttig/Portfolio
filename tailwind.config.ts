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
        sm: '640px',   // Custom small screen
        md: '1273px',   // Custom medium screen
        lg: '900px',  // Custom large screen
        xl: '1273px',  // Custom extra-large screen
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};
export default config;
