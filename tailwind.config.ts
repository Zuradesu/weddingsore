import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./sections/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: { deep: "#263B4B", cloud: "#607989", mist: "#87949A", paper: "#E5E8E6" },
        sun: { amber: "#D6A477", peach: "#E8B99B", orange: "#C77F59", ivory: "#F1E9D9" },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "serif"],
      },
      keyframes: {
        drift: { "0%": { transform: "scale(1.02) translate3d(0,0,0)" }, "100%": { transform: "scale(1.1) translate3d(-1.5%,1%,0)" } },
        grain: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "20%": { transform: "translate3d(-3%,2%,0)" },
          "40%": { transform: "translate3d(2%,-3%,0)" },
          "60%": { transform: "translate3d(-2%,-1%,0)" },
          "80%": { transform: "translate3d(3%,3%,0)" },
        },
        leak: { "0%": { transform: "translate3d(-8%,0,0)" }, "100%": { transform: "translate3d(8%,3%,0)" } },
        eq: { "0%,100%": { transform: "scaleY(0.3)" }, "50%": { transform: "scaleY(1)" } },
      },
      animation: {
        drift: "drift 32s ease-in-out infinite alternate",
        grain: "grain 1.2s steps(1) infinite",
        leak: "leak 22s ease-in-out infinite alternate",
        eq: "eq 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
