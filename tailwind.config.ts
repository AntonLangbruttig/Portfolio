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
        sm: '0px',   // Custom small screen
        md: '923px',   // Custom medium screen
        lg: '1273px',  // Custom large screen
      },
    },
  },
  plugins: [],
};
export default config;
