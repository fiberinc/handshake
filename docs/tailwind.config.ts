/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    // https://www.willliu.com/blog/Why-your-Tailwind-styles-aren-t-working-in-your-Turborepo
  ],
  theme: {
    fontFamily: {
      sans: '"SF Pro Display",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu, Cantarell,"Open Sans","Helvetica Neue",sans-serif',
      mono: ['"JetBrains Mono"', '"IBM Plex Mono"', "monospace"],
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
        primary: "rgb(var(--bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
      },
      colors: {
        // The "contrast" color is the highest contrast: black in light mode,
        // white in dark mode.
        contrast: "rgb(var(--text-contrast))",
        // The "default" text color is the near-primary: near-black in light,
        // and near-white in dark.
        default: "rgb(var(--text-default))",

        transparent: "transparent",
        white: "#fff",
        "off-white": "#f7f8f8",
        "transparent-white": "rgba(255, 255, 255, 0.08)",
        background: "#000212",
        grey: "#858699",
        "grey-dark": "#222326",
        foreground: "rgb(var(--bg-secondary) / <alpha-value>)",
        link: "var(--color-link)",
        highlight: "var(--color-highlight)",
        primary: "rgb(var(--text-primary) / <alpha-value>)",
        "dark-foreground": "#222",
        "dark-background": "#111",
        secondary: "#ecc94b",
        lightbg: "#FAFAFA",
        "blue-light": "rgb(212, 232, 247)",
        "red-lightest": "rgb(248, 225, 228)",
        "blue-lighten": "rgb(111, 160, 219)",
        "blue-dark": "rgb(15 41 107)",
        "blue-darken": "rgb(38, 105, 206)",
        "yellow-lightest": "rgb(249 243 232)",
        "green-light": "rgb(212 247 230)",
        "blue-darkest": "rgb(25, 46, 78)",
        "gray-lightmode": {
          100: "rgb(250, 250, 250)",
          200: "rgb(214, 214, 215)",
          300: "rgb(117, 117, 128)",
          400: "rgb(249, 249, 251)",
          1200: "hsl(210 16% 20%)",
        },
        "blue-lightmode": {
          100: "hsl(198 100% 98.5%)",
          300: "hsl(198 100% 94.5%)",
          700: "hsl(208 77% 77%)",
          1100: "hsl(211 100% 43%)",
        },
        "gray-darkmode": {
          50: "rgb(28, 28, 35)",
          100: "rgb(36, 36, 46)",
          200: "rgb(88, 88, 95)",
          300: "rgb(170, 170, 175)",
          400: "rgb(250, 250, 252)",
        },
        // From subframe 👇
        brand: {
          50: "rgb(238, 242, 255)",
          100: "rgb(224, 231, 255)",
          200: "rgb(199, 210, 254)",
          300: "rgb(165, 180, 252)",
          400: "rgb(129, 140, 248)",
          500: "rgb(99, 102, 241)",
          600: "rgb(79, 70, 229)",
          700: "rgb(67, 56, 202)",
          800: "rgb(55, 48, 163)",
          900: "rgb(49, 46, 129)",
        },
        neutral: {
          50: "rgb(249, 250, 251)",
          100: "rgb(243, 244, 246)",
          200: "rgb(229, 231, 235)",
          300: "rgb(209, 213, 219)",
          400: "rgb(156, 163, 175)",
          500: "rgb(107, 114, 128)",
          600: "rgb(75, 85, 99)",
          700: "rgb(55, 65, 81)",
          800: "rgb(31, 41, 55)",
          900: "rgb(17, 24, 39)",
        },
        error: {
          50: "rgb(254, 242, 242)",
          100: "rgb(254, 226, 226)",
          200: "rgb(254, 202, 202)",
          300: "rgb(252, 165, 165)",
          400: "rgb(248, 113, 113)",
          500: "rgb(239, 68, 68)",
          600: "rgb(220, 38, 38)",
          700: "rgb(185, 28, 28)",
          800: "rgb(153, 27, 27)",
          900: "rgb(127, 29, 29)",
        },
        warning: {
          50: "rgb(254, 252, 232)",
          100: "rgb(254, 249, 195)",
          200: "rgb(254, 240, 138)",
          300: "rgb(253, 224, 71)",
          400: "rgb(250, 204, 21)",
          500: "rgb(234, 179, 8)",
          600: "rgb(202, 138, 4)",
          700: "rgb(161, 98, 7)",
          800: "rgb(133, 77, 14)",
          900: "rgb(113, 63, 18)",
        },
        success: {
          50: "rgb(240, 253, 244)",
          100: "rgb(220, 252, 231)",
          200: "rgb(187, 247, 208)",
          300: "rgb(134, 239, 172)",
          400: "rgb(74, 222, 128)",
          500: "rgb(34, 197, 94)",
          600: "rgb(22, 163, 74)",
          700: "rgb(21, 128, 61)",
          800: "rgb(22, 101, 52)",
          900: "rgb(20, 83, 45)",
        },
        "brand-primary": "rgb(79, 70, 229)",
        "default-font": "rgb(17, 24, 39)",
        "subtext-color": "rgb(107, 114, 128)",
        "neutral-border": "rgb(229, 231, 235)",
        "default-background": "rgb(255, 255, 255)",
      },
      fontSize: {
        header: [
          "36px",
          {
            lineHeight: "40px",
            fontWeight: "500",
          },
        ],
        "section-header": [
          "30px",
          {
            lineHeight: "38px",
            fontWeight: "500",
          },
        ],
        "card-title": [
          "20px",
          {
            lineHeight: "24px",
            fontWeight: "500",
          },
        ],
        "home-section-header": [
          "35px",
          {
            lineHeight: "1.2",
            fontWeight: "400",
          },
        ],
        "home-section-subheader": [
          "17px",
          {
            lineHeight: "1.5",
            fontWeight: "450",
          },
        ],
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
          "17px",
          {
            lineHeight: "28px",
            fontWeight: "500",
          },
        ],
        "monospace-body": [
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
