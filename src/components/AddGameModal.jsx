import React, { useState } from 'react';
import { X, Plus, Eye, Code, AlertCircle } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
  currentTheme
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [embedInput, setEmbedInput] = useState('');
  const [description, setDescription] = useState('');
  const [controlsInput, setControlsInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const parsedIframeCode = embedInput.trim().startsWith('<iframe')
    ? embedInput.trim()
    : embedInput.trim().startsWith('http') || embedInput.trim().startsWith('/')
    ? `<iframe src="${embedInput.trim()}" title="${title || 'Custom Game'}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`
    : '';

  const parsedIframeSrc = embedInput.trim().startsWith('http') || embedInput.trim().startsWith('/')
    ? embedInput.trim()
    : embedInput.includes('src="')
    ? embedInput.split('src="')[1]?.split('"')[0] || ''
    : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a game title.');
      return;
    }
    if (!embedInput.trim()) {
      setError('Please enter an iframe embed code or game URL.');
      return;
    }

    const controls = controlsInput
      .split('\n')
      .map(c => c.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const gradients = [
      'from-blue-600 to-indigo-900',
      'from-purple-600 to-pink-900',
      'from-emerald-600 to-teal-900',
      'from-amber-600 to-red-900',
      'from-cyan-600 to-blue-900'
    ];

    const newGame = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      category: category,
      description: description.trim() || 'Custom user-added iframe game.',
      iframeCode: parsedIframeCode || embedInput,
      iframeSrc: parsedIframeSrc,
      thumbnailGradient: gradients[Math.floor(Math.random() * gradients.length)],
      iconName: 'Gamepad2',
      controls: controls.length > 0 ? controls : ['Standard mouse / keyboard controls'],
      tags: tags.length > 0 ? tags : ['Custom', category],
      plays: 1,
      rating: 5.0,
      releaseYear: new Date().getFullYear(),
      isCustom: true
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div id="add-game-modal-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center border"
              style={{
                backgroundColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.15)`,
                color: currentTheme?.primaryLight || '#818cf8',
                borderColor: `rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
              }}
            >
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Add Iframe Game</h2>
              <p className="text-xs text-slate-400">Save a custom game into the JSON store</p>
            </div>
          </div>
          <button
            id="close-add-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-950/60 border border-red-800 text-red-300 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Game Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Slope 3D / Super Mario"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
              >
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Action">Action</option>
                <option value="Retro">Retro</option>
                <option value="Strategy">Strategy</option>
                <option value="Sports">Sports</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
              Iframe Embed Code or URL *
            </label>
            <textarea
              required
              rows={3}
              placeholder='<iframe src="https://example.com/game" width="100%" height="100%"></iframe> or direct URL https://...'
              value={embedInput}
              onChange={(e) => setEmbedInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-200 outline-none resize-none focus-theme"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Accepts full <code className="text-theme-light">&lt;iframe&gt;</code> HTML markup or direct HTTPS game URLs.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
            <input
              type="text"
              placeholder="Short summary of the game..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Controls (1 per line)</label>
              <textarea
                rows={2}
                placeholder="Arrow Keys: Move&#10;Space: Jump"
                value={controlsInput}
                onChange={(e) => setControlsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-slate-200 outline-none resize-none focus-theme"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="3D, Runner, Fast"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 outline-none focus-theme"
              />
            </div>
          </div>

          {/* Live Preview Toggle */}
          {embedInput && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 text-xs font-bold text-theme-light hover:underline cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showPreview ? 'Hide Live Preview' : 'Test Live Iframe Preview'}</span>
              </button>

              {showPreview && (
                <div className="mt-2 h-44 w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  {parsedIframeSrc ? (
                    <iframe
                      src={parsedIframeSrc}
                      title="Preview"
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: parsedIframeCode }} 
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="submit-add-game-btn"
              className="flex items-center gap-1.5 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
              style={{
                backgroundColor: currentTheme?.primary || '#6366f1',
                boxShadow: `0 4px 14px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add to Games List</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
