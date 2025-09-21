// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
      },
      backgroundColor: {
        primary: 'var(--bg-color)',
        card: 'var(--card-bg)',
      },
      fontFamily: {
        graphic: ['Poppins', 'sans-serif'],
      },
      textColor: {
        primary: 'var(--text-color)',
      },
      backgroundImage: {
        'gradient-custom': 'var(--gradient)',
      },
    },
  },
  plugins: [],
}