import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export const DeleteGameModal = ({
  isOpen,
  game,
  onClose,
  onConfirmDelete,
  currentTheme
}) => {
  if (!isOpen || !game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="delete-game-modal-box"
        className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <Trash2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Remove Game</h2>
              <p className="text-xs text-slate-400">Confirm game deletion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3.5">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-xs text-rose-200/90 leading-relaxed">
              Are you sure you want to remove <span className="font-bold text-white">"{game.title}"</span> from your games catalog?
            </div>
          </div>

          {/* Game Preview Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${game.thumbnailGradient || 'from-indigo-600 to-purple-800'} flex items-center justify-center shrink-0`}>
              <span className="text-[11px] font-bold text-white text-center px-1 truncate">
                {game.title.slice(0, 4)}
              </span>
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-slate-100 truncate">{game.title}</div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span className="uppercase text-[10px] font-semibold text-slate-500">{game.category}</span>
                <span>•</span>
                <span className="truncate">{game.tags?.join(', ') || 'Custom'}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500">
            Note: You can re-add custom games or restore all default games anytime from the <span className="text-theme-light">JSON Manager</span>.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/40 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            id="confirm-delete-game-btn"
            onClick={() => onConfirmDelete(game.id)}
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-rose-600/30 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove Game</span>
          </button>
        </div>
      </div>
    </div>
  );
};
