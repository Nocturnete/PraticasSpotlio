/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)'
          },
        },
      },
      width: {
        '14.5': '3.925rem'
      },
      colors: {
        darkBlue: '#1f104f',
        purpleCart: '#6e4794',
      },
    },
  },
  plugins: [],
}
