import React, { useState, useEffect } from 'react';
import { 
  X, 
  Edit3, 
  Eye, 
  Save, 
  Gamepad2, 
  Flame, 
  Rocket, 
  Layers, 
  Zap, 
  Grid3X3, 
  Boxes, 
  Swords, 
  Bomb, 
  CircleDot, 
  Sparkles, 
  SpellCheck,
  Check
} from 'lucide-react';

const GRADIENTS = [
  { name: 'Indigo Nebula', value: 'from-indigo-600 to-purple-900' },
  { name: 'Rose Inferno', value: 'from-rose-600 to-slate-950' },
  { name: 'Emerald Forest', value: 'from-emerald-500 to-teal-800' },
  { name: 'Cyan Tech', value: 'from-cyan-500 to-blue-800' },
  { name: 'Amber Forge', value: 'from-amber-500 to-orange-700' },
  { name: 'Neon Synth', value: 'from-pink-500 to-indigo-800' },
  { name: 'Lime Rush', value: 'from-lime-500 to-emerald-900' },
  { name: 'Slate Dark', value: 'from-slate-700 to-zinc-950' }
];

const ICONS = [
  'Gamepad2', 'Flame', 'Rocket', 'Layers', 'Zap', 
  'Grid3X3', 'Boxes', 'Swords', 'Bomb', 'CircleDot', 'Sparkles', 'SpellCheck'
];

export const EditGameModal = ({
  isOpen,
  game,
  onClose,
  onSaveGame,
  currentTheme
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [embedInput, setEmbedInput] = useState('');
  const [description, setDescription] = useState('');
  const [controlsInput, setControlsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [thumbnailGradient, setThumbnailGradient] = useState(GRADIENTS[0].value);
  const [iconName, setIconName] = useState('Gamepad2');
  const [showPreview, setShowPreview] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Populate form when game changes or modal opens
  useEffect(() => {
    if (game) {
      setTitle(game.title || '');
      setCategory(game.category || 'Arcade');
      setEmbedInput(game.iframeCode || game.iframeSrc || '');
      setDescription(game.description || '');
      setControlsInput(Array.isArray(game.controls) ? game.controls.join('\n') : (game.controls || ''));
      setTagsInput(Array.isArray(game.tags) ? game.tags.join(', ') : (game.tags || ''));
      setThumbnailGradient(game.thumbnailGradient || GRADIENTS[0].value);
      setIconName(game.iconName || 'Gamepad2');
      setShowPreview(false);
      setSaveSuccess(false);
    }
  }, [game, isOpen]);

  if (!isOpen || !game) return null;

  // Extract clean src from input (whether raw URL or full iframe code)
  const extractSrc = (input) => {
    const trimmed = input.trim();
    if (trimmed.startsWith('<iframe') || trimmed.includes('<iframe')) {
      const match = trimmed.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        return match[1];
      }
    }
    return trimmed;
  };

  const currentSrc = extractSrc(embedInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a game title.');
      return;
    }
    if (!embedInput.trim()) {
      alert('Please enter an iframe embed code or game URL.');
      return;
    }

    const trimmedInput = embedInput.trim();
    let finalIframeCode = trimmedInput;
    let finalSrc = currentSrc;

    // If input is purely a URL, wrap in iframe code
    if (!trimmedInput.startsWith('<iframe') && (trimmedInput.startsWith('http://') || trimmedInput.startsWith('https://') || trimmedInput.startsWith('/'))) {
      finalIframeCode = `<iframe src="${trimmedInput}" title="${title.trim()}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`;
    }

    const controlsList = controlsInput
      .split('\n')
      .map(c => c.trim())
      .filter(Boolean);

    const tagsList = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const updatedGame = {
      ...game,
      title: title.trim(),
      category: category.trim(),
      iframeCode: finalIframeCode,
      iframeSrc: finalSrc,
      description: description.trim() || `Play ${title.trim()} unblocked in high quality!`,
      controls: controlsList.length > 0 ? controlsList : game.controls || ['Use keyboard / mouse to interact'],
      tags: tagsList.length > 0 ? tagsList : game.tags || [category],
      thumbnailGradient,
      iconName
    };

    onSaveGame(updatedGame);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="edit-game-modal-box"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{
                backgroundColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.15)`,
                color: currentTheme?.primaryLight || '#818cf8',
                borderColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
              }}
            >
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Edit Game Details</h2>
              <p className="text-xs text-slate-400">Update title, iframe source, controls & visual styling</p>
            </div>
          </div>
          <button
            id="close-edit-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Game Title *
              </label>
              <input
                id="edit-game-title-input"
                type="text"
                required
                placeholder="e.g. test 1 / Slope / 2048"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                id="edit-game-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
              >
                <option value="Action">Action</option>
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Iframe Embed Code or Game URL *
            </label>
            <textarea
              id="edit-game-iframe-textarea"
              rows={3}
              required
              placeholder='<iframe src="https://example.com/game" width="100%" height="100%"></iframe> or direct URL https://...'
              value={embedInput}
              onChange={(e) => setEmbedInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 outline-none resize-none focus-theme"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Paste the full HTML <code className="text-theme-light">&lt;iframe&gt;</code> tag or a direct game URL / relative path.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <input
              id="edit-game-description-input"
              type="text"
              placeholder="Short summary of the game..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Controls Guide (One per line)
              </label>
              <textarea
                id="edit-game-controls-textarea"
                rows={3}
                placeholder="Arrow Keys: Move&#10;Space: Jump"
                value={controlsInput}
                onChange={(e) => setControlsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 outline-none resize-none focus-theme"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Tags (Comma separated)
              </label>
              <input
                id="edit-game-tags-input"
                type="text"
                placeholder="Physics, Sandbox, Action"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
              />
            </div>
          </div>

          {/* Color Gradient Theme Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Card Banner Gradient
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {GRADIENTS.map((g, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setThumbnailGradient(g.value)}
                  className={`h-8 rounded-lg bg-gradient-to-br ${g.value} border transition-all cursor-pointer ${
                    thumbnailGradient === g.value ? 'border-white scale-105 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                  title={g.name}
                />
              ))}
            </div>
          </div>

          {/* Live Preview Toggle */}
          {currentSrc && (
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1.5 text-xs font-bold text-theme-light hover:underline cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showPreview ? 'Hide Live Preview' : 'Test Live Iframe Preview'}</span>
                </button>
              </div>

              {showPreview && (
                <div className="w-full h-56 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative">
                  <iframe
                    src={currentSrc}
                    title="Live Test Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
                  />
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-edit-game-btn"
              className="flex items-center gap-1.5 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
              style={{
                backgroundColor: currentTheme?.primary || '#6366f1',
                boxShadow: `0 4px 14px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
              }}
            >
              {saveSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? 'Changes Saved!' : 'Save Game Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
