/**
 * Theme & Accent Color Utilities for Kuna's Unblocked Games
 */

export const THEME_PRESETS = [
  {
    id: 'indigo',
    name: 'Electric Indigo (Default)',
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    primaryLight: '#818cf8',
    primaryDark: '#3730a3',
    rgb: '99, 102, 241',
    gradient: 'from-indigo-600 to-violet-600',
  },
  {
    id: 'violet',
    name: 'Cyber Purple / Violet',
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    primaryLight: '#a78bfa',
    primaryDark: '#5b21b6',
    rgb: '139, 92, 246',
    gradient: 'from-purple-600 to-indigo-600',
  },
  {
    id: 'cyan',
    name: 'Neon Cyan / Aqua',
    primary: '#06b6d4',
    primaryHover: '#0891b2',
    primaryLight: '#22d3ee',
    primaryDark: '#155e75',
    rgb: '6, 182, 212',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'emerald',
    name: 'Matrix Emerald / Mint',
    primary: '#10b981',
    primaryHover: '#059669',
    primaryLight: '#34d399',
    primaryDark: '#065f46',
    rgb: '16, 185, 129',
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'crimson',
    name: 'Crimson Flame / Ruby',
    primary: '#ef4444',
    primaryHover: '#dc2626',
    primaryLight: '#f87171',
    primaryDark: '#991b1b',
    rgb: '239, 68, 68',
    gradient: 'from-red-500 to-rose-700',
  },
  {
    id: 'amber',
    name: 'Solar Amber / Gold',
    primary: '#f59e0b',
    primaryHover: '#d97706',
    primaryLight: '#fbbf24',
    primaryDark: '#92400e',
    rgb: '245, 158, 11',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'magenta',
    name: 'Neon Magenta / Pink',
    primary: '#ec4899',
    primaryHover: '#db2777',
    primaryLight: '#f472b6',
    primaryDark: '#9d174d',
    rgb: '236, 72, 153',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 'sky',
    name: 'Sky Blue / Horizon',
    primary: '#0284c7',
    primaryHover: '#0369a1',
    primaryLight: '#38bdf8',
    primaryDark: '#075985',
    rgb: '2, 132, 199',
    gradient: 'from-sky-500 to-indigo-600',
  },
  {
    id: 'lime',
    name: 'Toxic Lime / Viper',
    primary: '#84cc16',
    primaryHover: '#65a30d',
    primaryLight: '#a3e635',
    primaryDark: '#3f6212',
    rgb: '132, 204, 22',
    gradient: 'from-lime-500 to-emerald-600',
  },
  {
    id: 'orange',
    name: 'Sunset Orange',
    primary: '#ea580c',
    primaryHover: '#c2410c',
    primaryLight: '#fb923c',
    primaryDark: '#7c2d12',
    rgb: '234, 88, 12',
    gradient: 'from-orange-500 to-red-600',
  }
];

export function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}

export function adjustBrightness(hex, percent) {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  let num = parseInt(c, 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function getCustomTheme(customHex) {
  const rgb = hexToRgb(customHex);
  const primaryHover = adjustBrightness(customHex, -15);
  const primaryLight = adjustBrightness(customHex, 20);
  const primaryDark = adjustBrightness(customHex, -35);

  return {
    id: 'custom',
    name: `Custom (${customHex.toUpperCase()})`,
    primary: customHex,
    primaryHover,
    primaryLight,
    primaryDark,
    rgb,
    gradient: `from-[${customHex}] to-[${primaryDark}]`,
    isCustom: true,
  };
}

export function applyThemeToDocument(theme) {
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-primary-hover', theme.primaryHover);
  root.style.setProperty('--theme-primary-light', theme.primaryLight);
  root.style.setProperty('--theme-primary-dark', theme.primaryDark);
  root.style.setProperty('--theme-primary-rgb', theme.rgb);
}
