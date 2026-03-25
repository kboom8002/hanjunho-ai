import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#0F2744',
          800: '#12365E',
          700: '#004EA2',
          600: '#2563B8',
          100: '#EAF3FF',
          "050": '#F4F8FD',
        },
        neutral: {
          900: '#10253E',
          800: '#24405F',
          700: '#35506D',
          600: '#53657A',
          500: '#6C7E93',
          400: '#7A8C9F',
          300: '#B7C9DB',
          200: '#D8E2ED',
          100: '#EEF3F8',
          "050": '#F6F8FB',
        },
        success: {
          text: '#2E7D32',
          bg: '#EFFAF2',
          line: '#BDE0C1',
        },
        warning: {
          text: '#8A6200',
          bg: '#FFF7E8',
          line: '#F0D39A',
        },
        danger: {
          text: '#B3261E',
          bg: '#FFF2F2',
          line: '#F2CACA',
        },
        line: {
          default: '#D8E2ED',
          strong: '#B7C9DB',
        },
        surface: {
          page: '#F6F8FB',
          card: '#FFFFFF',
          soft: '#FBFDFF',
          muted: '#F5F7FA',
        }
      },
      fontFamily: {
        sans: ["Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", "sans-serif"],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(16, 37, 62, 0.04)',
        md: '0 6px 20px rgba(16, 37, 62, 0.06)',
        lg: '0 10px 28px rgba(16, 37, 62, 0.08)',
        focus: '0 0 0 3px rgba(0, 78, 162, 0.18)',
      },
    },
  },
  plugins: [],
};
export default config;
