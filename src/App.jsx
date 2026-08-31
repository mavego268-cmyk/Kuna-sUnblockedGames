import React, { useState, useEffect, useMemo } from 'react';
import { defaultGames } from './data/defaultGames.js';
import { Navbar } from './components/Navbar.jsx';
import { CategoryPills } from './components/CategoryPills.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { EditGameModal } from './components/EditGameModal.jsx';
import { DeleteGameModal } from './components/DeleteGameModal.jsx';
import { JsonManagerModal } from './components/JsonManagerModal.jsx';
import { TabCloakModal, CLOAK_PROFILES } from './components/TabCloakModal.jsx';
import { PanicOverlay } from './components/PanicOverlay.jsx';
import { ThemeModal } from './components/ThemeModal.jsx';
import { THEME_PRESETS, applyThemeToDocument } from './utils/theme.js';
import { 
  Gamepad2, 
  Sparkles, 
  Search, 
  Plus, 
  FolderCode,
  History,
  Palette
} from 'lucide-react';

const STORAGE_GAMES_KEY = 'unblocked_portal_games_v1';
const STORAGE_FAVS_KEY = 'unblocked_portal_favs_v1';
const STORAGE_RECENTS_KEY = 'unblocked_portal_recents_v1';
const STORAGE_CLOAK_KEY = 'unblocked_portal_cloak_v1';
const STORAGE_PANIC_KEY = 'unblocked_portal_panic_key_v1';
const STORAGE_THEME_KEY = 'kuna_theme_color_v1';

export default function App() {
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem(STORAGE_GAMES_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Check if test-1 exists, if not prepend it so the user sees their requested game
          const hasTest1 = parsed.some(g => g.id === 'test-1' || g.title === 'test 1');
          if (!hasTest1) {
            const test1Game = defaultGames.find(g => g.id === 'test-1');
            if (test1Game) {
              return [test1Game, ...parsed];
            }
          }
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse saved games", e);
      }
    }
    return defaultGames;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(STORAGE_FAVS_KEY);
    return saved ? JSON.parse(saved) : ['test-1', 'snake-retro', '2048-classic'];
  });

  const [recentlyPlayed, setRecentlyPlayed] = useState(() => {
    const saved = localStorage.getItem(STORAGE_RECENTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Edit and Delete Game States
  const [editingGame, setEditingGame] = useState(null);
  const [deletingGame, setDeletingGame] = useState(null);

  // Theme Customization State
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    if (savedTheme) {
      try {
        return JSON.parse(savedTheme);
      } catch (e) {
        console.error("Failed to parse theme", e);
      }
    }
    return THEME_PRESETS[0];
  });

  // Modals & Cloaking State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isCloakModalOpen, setIsCloakModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);
  const [panicKey, setPanicKey] = useState(() => {
    return localStorage.getItem(STORAGE_PANIC_KEY) || 'Escape';
  });

  const [currentProfile, setCurrentProfile] = useState(() => {
    const savedId = localStorage.getItem(STORAGE_CLOAK_KEY);
    const found = CLOAK_PROFILES.find(p => p.id === savedId);
    return found || CLOAK_PROFILES[0];
  });

  // Apply Theme CSS variables on mount and theme change
  useEffect(() => {
    applyThemeToDocument(currentTheme);
    localStorage.setItem(STORAGE_THEME_KEY, JSON.stringify(currentTheme));
  }, [currentTheme]);

  // Sync with games.json on mount if available
  useEffect(() => {
    fetch('/games.json')
      .then(res => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge custom user games with latest games.json
          setGames(prev => {
            const customGames = prev.filter(g => g.isCustom);
            const merged = [...data];
            customGames.forEach(cg => {
              if (!merged.some(g => g.id === cg.id)) {
                merged.push(cg);
              }
            });
            return merged;
          });
        }
      })
      .catch(err => {
        console.log("Using static default games catalog fallback", err);
      });
  }, []);

  // Save games to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_GAMES_KEY, JSON.stringify(games));
  }, [games]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_FAVS_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Save recents to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_RECENTS_KEY, JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Handle Tab Cloaking
  useEffect(() => {
    document.title = currentProfile.title;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = currentProfile.favicon;
    localStorage.setItem(STORAGE_CLOAK_KEY, currentProfile.id);
  }, [currentProfile]);

  // Panic Key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === panicKey || (panicKey === '`' && (e.key === '`' || e.key === '~'))) {
        e.preventDefault();
        setIsPanicActive(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey]);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    // Track recent play
    setRecentlyPlayed(prev => [game.id, ...prev.filter(id => id !== game.id)].slice(0, 8));
    // Increment plays count in local state
    setGames(prev => prev.map(g => g.id === game.id ? { ...g, plays: (g.plays || 0) + 1 } : g));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddGame = (newGame) => {
    setGames(prev => [newGame, ...prev]);
    setSelectedGame(newGame);
  };

  // Edit Game Handler
  const handleOpenEditGame = (game) => {
    setEditingGame(game);
  };

  const handleSaveEditGame = (updatedGame) => {
    setGames(prev => prev.map(g => g.id === updatedGame.id ? updatedGame : g));
    if (selectedGame && selectedGame.id === updatedGame.id) {
      setSelectedGame(updatedGame);
    }
    setEditingGame(null);
  };

  // Delete Game Handler
  const handleOpenDeleteGame = (game) => {
    setDeletingGame(game);
  };

  const handleConfirmDeleteGame = (gameId) => {
    setGames(prev => prev.filter(g => g.id !== gameId));
    setFavorites(prev => prev.filter(id => id !== gameId));
    setRecentlyPlayed(prev => prev.filter(id => id !== gameId));
    if (selectedGame && selectedGame.id === gameId) {
      setSelectedGame(null);
    }
    setDeletingGame(null);
  };

  const handleSaveJson = (newGames) => {
    setGames(newGames);
  };

  const handleResetDefault = () => {
    setGames(defaultGames);
    localStorage.removeItem(STORAGE_GAMES_KEY);
  };

  const handleRandomGame = () => {
    if (games.length === 0) return;
    const rand = games[Math.floor(Math.random() * games.length)];
    handleSelectGame(rand);
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: games.length };
    games.forEach(g => {
      counts[g.category] = (counts[g.category] || 0) + 1;
    });
    return counts;
  }, [games]);

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      if (showFavoritesOnly && !favorites.includes(game.id)) {
        return false;
      }
      if (!showFavoritesOnly && selectedCategory !== 'All' && game.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = game.title.toLowerCase().includes(q);
        const matchDesc = game.description.toLowerCase().includes(q);
        const matchCat = game.category.toLowerCase().includes(q);
        const matchTag = game.tags && game.tags.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchCat && !matchTag) return false;
      }
      return true;
    });
  }, [games, selectedCategory, searchQuery, showFavoritesOnly, favorites]);

  const recentGameObjects = useMemo(() => {
    return recentlyPlayed
      .map(id => games.find(g => g.id === id))
      .filter(Boolean);
  }, [recentlyPlayed, games]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Panic Screen Disguise Overlay */}
      <PanicOverlay
        isOpen={isPanicActive}
        onExit={() => setIsPanicActive(false)}
        panicKey={panicKey}
      />

      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onOpenCloakModal={() => setIsCloakModalOpen(true)}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        currentTheme={currentTheme}
        onRandomGame={handleRandomGame}
        onPanicTrigger={() => setIsPanicActive(true)}
        activeGameTitle={selectedGame ? selectedGame.title : undefined}
        onBackToHome={() => setSelectedGame(null)}
        favoritesCount={favorites.length}
      />

      {/* Main App Content */}
      <main className="flex-1 pb-16">
        {selectedGame ? (
          <GamePlayer
            game={selectedGame}
            onBack={() => setSelectedGame(null)}
            isFavorite={favorites.includes(selectedGame.id)}
            onToggleFavorite={(id) => handleToggleFavorite(id)}
            onEditGame={handleOpenEditGame}
            onDeleteGame={handleOpenDeleteGame}
            recommendedGames={games.filter(g => g.id !== selectedGame.id && (g.category === selectedGame.category || g.featured))}
            onSelectGame={handleSelectGame}
            currentTheme={currentTheme}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
            {/* Hero Banner */}
            <div 
              id="hero-banner" 
              className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl"
            >
              {/* Dynamic Theme Radial Glow */}
              <div 
                className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${currentTheme.primary} 0%, transparent 70%)`
                }}
              />

              <div className="max-w-2xl relative z-10">
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 border"
                  style={{
                    backgroundColor: `rgba(${currentTheme.rgb}, 0.15)`,
                    color: currentTheme.primaryLight,
                    borderColor: `rgba(${currentTheme.rgb}, 0.35)`
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kuna's Games Catalog</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight mb-2">
                  Kuna's Unblocked Games
                </h1>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-6">
                  Curated collection of retro, arcade, and puzzle games stored cleanly in <code className="text-theme-light font-mono text-xs bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">games.json</code>. Edit titles, customize iframe codes, remove games, or disguise your tab with stealth cloak.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="hero-play-random-btn"
                    onClick={handleRandomGame}
                    className="flex items-center gap-2 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: currentTheme.primary,
                      boxShadow: `0 4px 16px 0 rgba(${currentTheme.rgb}, 0.35)`
                    }}
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Play Random Game</span>
                  </button>

                  <button
                    id="hero-customize-theme-btn"
                    onClick={() => setIsThemeModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs px-4 py-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                  >
                    <Palette className="w-4 h-4" style={{ color: currentTheme.primary }} />
                    <span>Customize Color</span>
                  </button>

                  <button
                    id="hero-add-custom-btn"
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs px-4 py-3 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Custom Game</span>
                  </button>

                  <button
                    id="hero-view-json-btn"
                    onClick={() => setIsJsonModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs px-4 py-3 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                  >
                    <FolderCode className="w-4 h-4 text-emerald-400" />
                    <span>View games.json</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Categories & Filters
                </span>
                <span className="text-xs text-slate-500">
                  Showing {filteredGames.length} of {games.length} games
                </span>
              </div>
              <CategoryPills
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
                showFavoritesOnly={showFavoritesOnly}
                onToggleFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
                favoritesCount={favorites.length}
                currentTheme={currentTheme}
              />
            </div>

            {/* Recently Played Section (if any) */}
            {recentGameObjects.length > 0 && !searchQuery && selectedCategory === 'All' && !showFavoritesOnly && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-theme-light" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                    Recently Played
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {recentGameObjects.map(rg => (
                    <div
                      key={rg.id}
                      onClick={() => handleSelectGame(rg)}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 group"
                    >
                      <div className={`h-12 rounded-lg bg-gradient-to-br ${rg.thumbnailGradient || 'from-indigo-600 to-purple-800'} mb-1.5 flex items-center justify-center`}>
                        <span className="text-[10px] font-bold text-white/90 group-hover:scale-105 transition-transform text-center px-1 truncate">
                          {rg.title}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-200 group-hover:text-theme-light truncate">{rg.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Games Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  {showFavoritesOnly ? (
                    <>
                      <span>Favorites</span>
                      <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                        {filteredGames.length}
                      </span>
                    </>
                  ) : selectedCategory !== 'All' ? (
                    <>
                      <span>{selectedCategory} Games</span>
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `rgba(${currentTheme.rgb}, 0.15)`,
                          color: currentTheme.primaryLight,
                          borderColor: `rgba(${currentTheme.rgb}, 0.35)`
                        }}
                      >
                        {filteredGames.length}
                      </span>
                    </>
                  ) : searchQuery ? (
                    <>
                      <span>Search Results for "{searchQuery}"</span>
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: `rgba(${currentTheme.rgb}, 0.15)`,
                          color: currentTheme.primaryLight,
                          borderColor: `rgba(${currentTheme.rgb}, 0.35)`
                        }}
                      >
                        {filteredGames.length}
                      </span>
                    </>
                  ) : (
                    <span>All Kuna's Unblocked Games</span>
                  )}
                </h2>
              </div>

              {filteredGames.length === 0 ? (
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-12 text-center max-w-md mx-auto my-8">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-200 mb-1">No games found</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    {showFavoritesOnly 
                      ? "You haven't added any games to your favorites yet. Click the heart icon on any game card!" 
                      : "Try searching for a different keyword or add a new custom iframe game."}
                  </p>
                  <div className="flex justify-center gap-2">
                    {showFavoritesOnly ? (
                      <button
                        onClick={() => setShowFavoritesOnly(false)}
                        className="text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                        style={{ backgroundColor: currentTheme.primary }}
                      >
                        View All Games
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                        style={{ backgroundColor: currentTheme.primary }}
                      >
                        Add Custom Game
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div id="games-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredGames.map((game) => (
                    <GameCard
                      key={game.id}
                      game={game}
                      onPlay={handleSelectGame}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onEditGame={handleOpenEditGame}
                      onDeleteGame={handleOpenDeleteGame}
                      currentTheme={currentTheme}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-medium">
          <span>Kuna's Unblocked Games</span>
          <span>•</span>
          <button onClick={() => setIsThemeModalOpen(true)} className="hover:text-theme-light underline cursor-pointer">
            Customize Color ({currentTheme.name.split(' (')[0]})
          </button>
          <span>•</span>
          <button onClick={() => setIsJsonModalOpen(true)} className="hover:text-theme-light underline cursor-pointer">
            Stored in games.json
          </button>
          <span>•</span>
          <button onClick={() => setIsCloakModalOpen(true)} className="hover:text-emerald-400 underline cursor-pointer">
            Tab Cloaker Enabled
          </button>
        </div>
        <p className="text-[11px] text-slate-600">
          All games run client-side in sandboxed iframes. No external telemetry or AI requirements.
        </p>
      </footer>

      {/* Modals */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
        currentTheme={currentTheme}
      />

      <EditGameModal
        isOpen={!!editingGame}
        game={editingGame}
        onClose={() => setEditingGame(null)}
        onSaveGame={handleSaveEditGame}
        currentTheme={currentTheme}
      />

      <DeleteGameModal
        isOpen={!!deletingGame}
        game={deletingGame}
        onClose={() => setDeletingGame(null)}
        onConfirmDelete={handleConfirmDeleteGame}
        currentTheme={currentTheme}
      />

      <JsonManagerModal
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        games={games}
        onSaveJson={handleSaveJson}
        onResetDefault={handleResetDefault}
        currentTheme={currentTheme}
      />

      <TabCloakModal
        isOpen={isCloakModalOpen}
        onClose={() => setIsCloakModalOpen(false)}
        currentProfileId={currentProfile.id}
        onSelectProfile={(p) => setCurrentProfile(p)}
        panicKey={panicKey}
        onChangePanicKey={(k) => {
          setPanicKey(k);
          localStorage.setItem(STORAGE_PANIC_KEY, k);
        }}
        currentTheme={currentTheme}
      />

      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={(t) => setCurrentTheme(t)}
        onResetDefaultTheme={() => setCurrentTheme(THEME_PRESETS[0])}
      />
    </div>
  );
}


