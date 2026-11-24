/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    fontFamily: { vazirmatn: ['Vazirmatn', 'system-ui', 'sans-serif'] },
    colors: { accent: '#b9a5ff' },
    keyframes: {
      fadeInUp: { from: { opacity: '0', transform: 'translateY(22px)', filter: 'blur(5px)' }, to: { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' } },
      breathe: { '50%': { opacity: '.35', transform: 'scaleY(.58)' } }
    },
    animation: { 'fade-in-up': 'fadeInUp .85s cubic-bezier(.2,.7,.25,1) both', breathe: 'breathe 1.15s ease-in-out infinite alternate', marquee: 'marquee 28s linear infinite' }
  } },
  plugins: []
};
