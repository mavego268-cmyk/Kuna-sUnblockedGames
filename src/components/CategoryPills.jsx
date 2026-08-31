import React from 'react';
import { 
  Gamepad2, 
  Puzzle, 
  Flame, 
  Sparkles, 
  History, 
  Trophy, 
  Heart,
  Layers,
  Zap
} from 'lucide-react';

export const CategoryPills = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
  showFavoritesOnly,
  onToggleFavorites,
  favoritesCount = 0,
  currentTheme
}) => {
  const categories = [
    { id: 'All', label: 'All Games', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'Arcade', label: 'Arcade', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'Puzzle', label: 'Puzzle', icon: <Puzzle className="w-3.5 h-3.5" /> },
    { id: 'Action', label: 'Action', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'Retro', label: 'Retro', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'Strategy', label: 'Strategy', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'Sports', label: 'Sports', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'Casual', label: 'Casual', icon: <Zap className="w-3.5 h-3.5" /> },
  ];

  return (
    <div id="category-filter-container" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {/* Favorites Toggle Pill */}
      <button
        id="pill-favorites-toggle"
        onClick={onToggleFavorites}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
          showFavoritesOnly
            ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/25'
            : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100'
        }`}
      >
        <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-white text-white' : 'text-rose-400'}`} />
        <span>Favorites</span>
        {favoritesCount > 0 && (
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
            showFavoritesOnly ? 'bg-rose-700 text-white' : 'bg-slate-800 text-rose-300'
          }`}>
            {favoritesCount}
          </span>
        )}
      </button>

      <div className="w-px h-5 bg-slate-800 shrink-0 mx-1"></div>

      {/* Category Pills */}
      {categories.map((cat) => {
        const isSelected = !showFavoritesOnly && selectedCategory === cat.id;
        const count = categoryCounts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            id={`pill-cat-${cat.id.toLowerCase()}`}
            onClick={() => {
              if (showFavoritesOnly) onToggleFavorites();
              onSelectCategory(cat.id);
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 cursor-pointer ${
              isSelected
                ? 'text-white shadow-md'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-slate-100'
            }`}
            style={isSelected ? {
              backgroundColor: currentTheme?.primary || '#6366f1',
              borderColor: currentTheme?.primaryLight || '#818cf8',
              boxShadow: `0 4px 12px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
            } : undefined}
          >
            {cat.icon}
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
              isSelected ? 'bg-black/25 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
