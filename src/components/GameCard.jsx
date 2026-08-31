import React from 'react';
import { 
  Play, 
  Heart, 
  Star, 
  Edit3,
  Trash2,
  Gamepad2, 
  Grid3X3, 
  Boxes, 
  Swords, 
  Flame, 
  Rocket, 
  Layers, 
  Zap, 
  Bomb, 
  CircleDot, 
  Sparkles, 
  SpellCheck,
  Code
} from 'lucide-react';

export const GameCard = ({
  game,
  onPlay,
  isFavorite,
  onToggleFavorite,
  onEditGame,
  onDeleteGame,
  currentTheme
}) => {
  const getIcon = (name) => {
    switch (name) {
      case 'Gamepad2': return <Gamepad2 className="w-8 h-8 text-white/90" />;
      case 'Grid3X3': return <Grid3X3 className="w-8 h-8 text-white/90" />;
      case 'Boxes': return <Boxes className="w-8 h-8 text-white/90" />;
      case 'Swords': return <Swords className="w-8 h-8 text-white/90" />;
      case 'Flame': return <Flame className="w-8 h-8 text-white/90" />;
      case 'Rocket': return <Rocket className="w-8 h-8 text-white/90" />;
      case 'Layers': return <Layers className="w-8 h-8 text-white/90" />;
      case 'Zap': return <Zap className="w-8 h-8 text-white/90" />;
      case 'Bomb': return <Bomb className="w-8 h-8 text-white/90" />;
      case 'CircleDot': return <CircleDot className="w-8 h-8 text-white/90" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8 text-white/90" />;
      case 'SpellCheck': return <SpellCheck className="w-8 h-8 text-white/90" />;
      default: return <Gamepad2 className="w-8 h-8 text-white/90" />;
    }
  };

  const gradient = game.thumbnailGradient || 'from-indigo-600 to-purple-900';

  return (
    <div
      id={`game-card-${game.id}`}
      onClick={() => onPlay(game)}
      className="group relative bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col"
    >
      {/* Thumbnail Banner */}
      <div className={`h-36 w-full bg-gradient-to-br ${gradient} p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden`}>
        {/* Background ambient pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:12px_12px] opacity-40"></div>
        
        {/* Top Badges & Actions */}
        <div className="flex items-center justify-between z-30">
          <span className="bg-slate-950/70 backdrop-blur-sm text-[11px] font-bold text-slate-200 px-2.5 py-0.5 rounded-full border border-white/10 uppercase tracking-wider">
            {game.category}
          </span>
          <div className="flex items-center gap-1">
            {onEditGame && (
              <button
                id={`edit-btn-${game.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEditGame(game);
                }}
                title="Edit Game Title & Iframe"
                className="w-7 h-7 rounded-full bg-slate-950/60 hover:bg-slate-950/90 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDeleteGame && (
              <button
                id={`delete-btn-${game.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteGame(game);
                }}
                title="Remove Game"
                className="w-7 h-7 rounded-full bg-slate-950/60 hover:bg-rose-950/80 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              id={`fav-btn-${game.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(game.id, e);
              }}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className="w-7 h-7 rounded-full bg-slate-950/60 hover:bg-slate-950/90 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center Game Icon */}
        <div className="flex items-center justify-center my-auto z-10 group-hover:scale-110 transition-transform duration-300">
          <div className="w-14 h-14 rounded-2xl bg-black/25 backdrop-blur-xs flex items-center justify-center border border-white/15 shadow-inner">
            {getIcon(game.iconName)}
          </div>
        </div>

        {/* Play Now Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
          <div 
            className="flex items-center gap-2 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg transition-transform group-hover:scale-105"
            style={{
              backgroundColor: currentTheme?.primary || '#6366f1',
              boxShadow: `0 4px 14px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.4)`
            }}
          >
            <Play className="w-4 h-4 fill-white" />
            <span>PLAY GAME</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-bold text-base text-slate-100 group-hover:text-theme-light transition-colors truncate">
              {game.title}
            </h3>
            {game.isCustom && (
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1 shrink-0">
                <Code className="w-2.5 h-2.5" />
                Custom
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {game.description}
          </p>
        </div>

        {/* Stats & Tags */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-200">{game.rating || 4.8}</span>
            <span className="text-slate-500">•</span>
            <span>{game.plays ? game.plays.toLocaleString() : '1,000+'} plays</span>
          </div>
          {game.releaseYear && (
            <span className="text-slate-500">{game.releaseYear}</span>
          )}
        </div>
      </div>
    </div>
  );
};

