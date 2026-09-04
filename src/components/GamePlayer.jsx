import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Maximize2, 
  RotateCcw, 
  ExternalLink, 
  Heart, 
  Info, 
  Star, 
  Sparkles, 
  Tv, 
  Check, 
  Code, 
  Edit3, 
  Trash2 
} from 'lucide-react';
import { resolveGameUrl, resolveIframeCode } from '../utils/url';

export const GamePlayer = ({
  game,
  onBack,
  isFavorite,
  onToggleFavorite,
  onEditGame,
  onDeleteGame,
  recommendedGames = [],
  onSelectGame,
  currentTheme
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const iframeContainerRef = useRef(null);

  const resolvedIframeSrc = resolveGameUrl(game.iframeSrc);
  const resolvedIframeCode = resolveIframeCode(game.iframeCode);

  const handleFullscreen = () => {
    if (iframeContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeContainerRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting fullscreen:", err);
        });
      }
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  const handleOpenNewTab = () => {
    if (resolvedIframeSrc) {
      window.open(resolvedIframeSrc, '_blank');
    }
  };

  const handleCopyIframe = () => {
    const embedText = game.iframeCode 
      ? resolvedIframeCode 
      : `<iframe src="${resolvedIframeSrc}" width="100%" height="600px" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(embedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="game-player-view" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <button
          id="player-back-btn"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-800 transition-colors text-sm font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </button>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {onEditGame && (
            <button
              id="player-edit-game-btn"
              onClick={() => onEditGame(game)}
              title="Edit Game Title, Iframe & Info"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-slate-800 transition-colors text-xs font-bold cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" style={{ color: currentTheme?.primary || '#6366f1' }} />
              <span className="hidden sm:inline">Edit Game</span>
            </button>
          )}

          {onDeleteGame && (
            <button
              id="player-delete-game-btn"
              onClick={() => onDeleteGame(game)}
              title="Remove Game from List"
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-rose-950/80 text-slate-300 hover:text-rose-400 px-3 py-2 rounded-xl border border-slate-800 hover:border-rose-500/40 transition-colors text-xs font-bold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Remove</span>
            </button>
          )}

          <button
            id="player-fav-btn"
            onClick={() => onToggleFavorite(game.id)}
            title={isFavorite ? "Favorited" : "Add to favorites"}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
            <span className="hidden sm:inline">{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            id="player-copy-iframe-btn"
            onClick={handleCopyIframe}
            title="Copy iframe embed code"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 px-3 py-2 rounded-xl border border-slate-800 transition-colors text-xs font-bold cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" style={{ color: currentTheme?.primary || '#6366f1' }} />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Embed'}</span>
          </button>

          <button
            id="player-reload-btn"
            onClick={handleReload}
            title="Restart / Reload Game"
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            id="player-theater-btn"
            onClick={() => setIsTheater(!isTheater)}
            title="Toggle Theater Mode"
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isTheater
                ? 'text-white border-transparent'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
            style={isTheater ? { backgroundColor: currentTheme?.primary || '#6366f1' } : undefined}
          >
            <Tv className="w-4 h-4" />
          </button>

          {game.iframeSrc && (
            <button
              id="player-open-tab-btn"
              onClick={handleOpenNewTab}
              title="Open in Full Window / Tab"
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}

          <button
            id="player-fullscreen-btn"
            onClick={handleFullscreen}
            title="Toggle Fullscreen"
            className="flex items-center gap-1.5 text-white px-3.5 py-2 rounded-xl shadow-md transition-colors text-xs font-bold cursor-pointer"
            style={{
              backgroundColor: currentTheme?.primary || '#6366f1',
              boxShadow: `0 4px 14px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
            }}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Main Game Container */}
      <div className={`transition-all duration-300 ${isTheater ? 'max-w-none' : 'max-w-5xl mx-auto'}`}>
        <div
          ref={iframeContainerRef}
          id="iframe-active-wrapper"
          className="relative w-full aspect-video min-h-[440px] max-h-[75vh] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center"
        >
          {game.iframeSrc ? (
            <iframe
              key={iframeKey}
              id={`game-frame-${game.id}`}
              src={resolvedIframeSrc}
              title={game.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-pointer-lock"
            />
          ) : (
            <div 
              key={iframeKey}
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: resolvedIframeCode }} 
            />
          )}
        </div>
      </div>

      {/* Game Details & Controls Drawer */}
      <div className={`mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 ${isTheater ? 'max-w-none' : 'max-w-5xl mx-auto'}`}>
        {/* Left 2 Cols: Title, Info, Category, Description */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span 
                  className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.15)`,
                    color: currentTheme?.primaryLight || '#818cf8',
                    borderColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
                  }}
                >
                  {game.category}
                </span>
                {game.releaseYear && (
                  <span className="text-xs text-slate-500 font-semibold">{game.releaseYear}</span>
                )}
                {game.isCustom && (
                  <span className="text-xs font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    Custom Iframe
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                {game.title}
              </h1>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{game.rating || 4.8} / 5</span>
              </div>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400 font-medium">{game.plays ? game.plays.toLocaleString() : '1,000+'} plays</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            {game.description}
          </p>

          {/* Tags */}
          {game.tags && game.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tags:</span>
              {game.tags.map((tag, idx) => (
                <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Controls Guide */}
        <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-200 font-bold text-sm mb-3">
              <Info className="w-4 h-4" style={{ color: currentTheme?.primary || '#6366f1' }} />
              <span>Game Controls</span>
            </div>
            
            <div className="space-y-2">
              {game.controls && game.controls.length > 0 ? (
                game.controls.map((ctrl, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ backgroundColor: currentTheme?.primary || '#6366f1' }}
                    />
                    <span>{ctrl}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">Use standard keyboard arrow keys or mouse to interact with this game.</p>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80">
            <div className="text-[11px] text-slate-500">
              Stored as iframe embed in <span className="font-mono text-theme-light">games.json</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended / More Games */}
      {recommendedGames.length > 0 && (
        <div className={`mt-10 ${isTheater ? 'max-w-none' : 'max-w-5xl mx-auto'}`}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100">More Games to Play</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendedGames.slice(0, 4).map((rec) => (
              <div
                key={rec.id}
                id={`rec-card-${rec.id}`}
                onClick={() => onSelectGame(rec)}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl p-3 cursor-pointer transition-all hover:-translate-y-0.5 group"
              >
                <div className={`h-20 rounded-lg bg-gradient-to-br ${rec.thumbnailGradient || 'from-indigo-600 to-purple-800'} mb-2 flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-xs font-bold text-white/90 group-hover:scale-110 transition-transform">
                    {rec.title}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-theme-light truncate">
                  {rec.title}
                </div>
                <div className="text-[10px] text-slate-500 uppercase font-semibold">
                  {rec.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
