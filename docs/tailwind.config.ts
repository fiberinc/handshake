/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: '"SF Pro Display",-apple-system,system-ui,sans-serif',
      mono: '"JetBrains Mono","IBM Plex Mono",monospace',
    },
    extend: {
      ringColor: {
        DEFAULT: "var(--border-primary)",
        primary: "var(--border-primary)",
        stronger: "var(--border-stronger)",
        lighter: "var(--border-lighter)",
      },
      borderColor: {
        DEFAULT: "var(--border-primary)",
        primary: "var(--border-primary)",
        stronger: "var(--border-stronger)",
        lighter: "var(--border-lighter)",
      },
      textColor: {
        secondary: "var(--text-secondary)",
      },
      backgroundColor: {
        background: "rgb(var(--bg-background) / <alpha-value>)",
        foreground: "rgb(var(--bg-foreground) / <alpha-value>)",
        tertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
      },
      colors: {
        // The "contrast" color is the highest contrast: black in light mode,
        // white in dark mode.
        contrast: "rgb(var(--text-contrast))",
        // The "default" text color is the near-primary: near-black in light,
        // and near-white in dark.
        default: "rgb(var(--text-default))",
        background: "#000212",
        foreground: "rgb(var(--bg-secondary) / <alpha-value>)",
        link: "var(--color-link)",
      },
      fontSize: {
        body: [
          "16px",
          {
            lineHeight: "1.6",
            fontWeight: "400",
          },
        ],
        "body-bold": [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "600",
          },
        ],
        subheader: [
          "23px",
          {
            lineHeight: "1.2",
            fontWeight: "500",
          },
        ],
        monospace: [
          "14px",
          {
            lineHeight: "20px",
            fontWeight: "400",
          },
        ],
        label: [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "400",
          },
        ],
        "label-bold": [
          "12px",
          {
            lineHeight: "16px",
            fontWeight: "600",
          },
        ],
      },
      container: {
        padding: {
          sm: "calc((100vw + 16px - 640px) / 2)",
          md: "calc((100vw + 16px - 768px) / 2)",
          lg: "calc((100vw + 16px - 1024px) / 2)",
          xl: "calc((100vw + 16px - 1280px) / 2)",
          "2xl": "calc((100vw + 16px - 1536px) / 2)",
        },
      },
      spacing: {
        112: "28rem",
        144: "36rem",
        192: "48rem",
      },
    },
  },
};

module.exports = config;
