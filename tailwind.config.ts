import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        border: "hsl(var(--border))",
        fg: "hsl(var(--fg))",
        "fg-2": "hsl(var(--fg-2))",
        "fg-3": "hsl(var(--fg-3))",
        down: "hsl(var(--down))",
        "down-bg": "hsl(var(--down-bg))",
      },
      fontFamily: {
        sans: ["var(--font-vazir)", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        badge: "12px",
        ctl: "8px",
      }
    },
  },
  plugins: [],
}

export default config
