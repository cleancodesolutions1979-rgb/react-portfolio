module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    'text-3xl', 'font-bold', 'text-rose-600',
    'bg-rose-50', 'border-rose-100', 'text-rose-800', 'text-rose-700',
    'bg-rose-600', 'hover:bg-rose-700', 'rounded-lg', 'shadow-md',
    'px-4', 'py-2', 'mt-8', 'flex', 'justify-center', 'max-w-md', 'w-full'
  ],
  plugins: [],
}
