import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Text colors for module themes (primary and lighter variants)
    'text-cyan-500', 'text-cyan-400',
    'text-amber-500', 'text-amber-400',
    'text-purple-500', 'text-purple-400',
    'text-emerald-500', 'text-emerald-400',
    'text-red-500', 'text-red-400',
    'text-blue-500', 'text-blue-400',
    
    // Background colors with opacity for module cards/sections
    'bg-cyan-950/20', 'bg-cyan-500/30',
    'bg-amber-950/20', 'bg-amber-500/30',
    'bg-purple-950/20', 'bg-purple-500/30',
    'bg-emerald-950/20', 'bg-emerald-500/30',
    'bg-red-950/20', 'bg-red-500/30',
    'bg-blue-950/20', 'bg-blue-500/30',
    
    // Border colors with opacity for module cards
    'border-cyan-500/30',
    'border-amber-500/30',
    'border-purple-500/30',
    'border-emerald-500/30',
    'border-red-500/30',
    'border-blue-500/30',
  ],
} satisfies Config