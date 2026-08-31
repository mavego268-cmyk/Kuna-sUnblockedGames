import React from 'react';
import { 
  Gamepad2, 
  Search, 
  PlusCircle, 
  Code2, 
  ShieldAlert, 
  X,
  Shuffle,
  Palette
} from 'lucide-react';

export const Navbar = ({
  searchQuery = '',
  setSearchQuery,
  onOpenAddModal,
  onOpenJsonModal,
  onOpenCloakModal,
  onOpenThemeModal,
  currentTheme,
  onRandomGame,
  onPanicTrigger,
  onBackToHome,
}) => {
  return (
    <header id="main-navbar" className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button 
          id="nav-brand-btn"
          onClick={onBackToHome} 
          className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform"
            style={{
              backgroundColor: currentTheme?.primary || '#6366f1',
              boxShadow: `0 4px 14px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.35)`
            }}
          >
            <Gamepad2 className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-100 font-sans group-hover:text-theme-light transition-colors">
                KUNA'S
              </span>
              <span 
                className="text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-widest"
                style={{
                  backgroundColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.15)`,
                  color: currentTheme?.primaryLight || '#818cf8',
                  borderColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
                }}
              >
                UNBLOCKED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">HTML5 & JSON Embeds</p>
          </div>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              id="game-search-input"
              type="text"
              placeholder="Search games, tags, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-9 py-2 text-sm text-slate-200 placeholder-slate-500 transition-all outline-none focus-theme"
            />
            {searchQuery && (
              <button
                id="search-clear-btn"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="random-game-btn"
            onClick={onRandomGame}
            title="Play Random Game"
            className="hidden md:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-400" />
            <span>Random</span>
          </button>

          <button
            id="open-theme-btn"
            onClick={onOpenThemeModal}
            title="Customize Main Color"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-semibold px-2.5 sm:px-3 py-2 rounded-lg border border-slate-700 transition-colors cursor-pointer"
          >
            <div 
              className="w-3 h-3 rounded-full border border-white/20 shadow-xs" 
              style={{ backgroundColor: currentTheme?.primary || '#6366f1' }}
            />
            <span className="hidden sm:inline">Color</span>
          </button>

          <button
            id="open-add-game-btn"
            onClick={onOpenAddModal}
            title="Add Custom Iframe Game"
            className="flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
            style={{
              backgroundColor: currentTheme?.primary || '#6366f1',
              boxShadow: `0 2px 8px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
            }}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Game</span>
          </button>

          <button
            id="open-json-btn"
            onClick={onOpenJsonModal}
            title="View & Edit JSON Database"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700 cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <button
            id="open-cloak-btn"
            onClick={onOpenCloakModal}
            title="Tab Cloaker & Panic Settings"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            id="panic-quick-btn"
            onClick={onPanicTrigger}
            title="Panic Button (Quick Stealth Screen - Shortcut: Esc or ~)"
            className="hidden sm:flex items-center gap-1 bg-red-950/60 hover:bg-red-900/80 text-red-400 text-xs font-bold px-2.5 py-2 rounded-lg border border-red-800/60 transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span>Panic</span>
          </button>
        </div>
      </div>
    </header>
  );
};

