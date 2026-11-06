// Tailwind for the Webpack dev server (used because Turbopack's native file is blocked on this machine).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
