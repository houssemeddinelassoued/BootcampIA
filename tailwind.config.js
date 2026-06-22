/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out both',
        'slide-up':   'slideUp 0.5s ease-out both',
        'slide-right':'slideRight 0.4s ease-out both',
        'bounce-in':  'bounceIn 0.5s ease-out both',
        'blink':      'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn:    { from:{ opacity:'0' }, to:{ opacity:'1' } },
        slideUp:   { from:{ opacity:'0', transform:'translateY(20px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        slideRight:{ from:{ opacity:'0', transform:'translateX(-16px)' }, to:{ opacity:'1', transform:'translateX(0)' } },
        bounceIn:  { '0%':{ transform:'scale(0.8)', opacity:'0' }, '60%':{ transform:'scale(1.04)' }, '100%':{ transform:'scale(1)', opacity:'1' } },
        blink:     { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0' } },
      },
    },
  },
  plugins: [],
}
