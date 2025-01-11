import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,mjs}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,mjs}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,mjs}",
    "./src/app/layout.tsx",
    "./src/Views/**/*.{js,ts,jsx,tsx,mdx,mjs}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,mjs}",
  ],  
  theme: {
  },
  plugins: [],
};
export default config;
