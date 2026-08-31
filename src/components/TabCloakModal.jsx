import React from 'react';
import { X, Shield, EyeOff, Check } from 'lucide-react';

export const CLOAK_PROFILES = [
  {
    id: 'default',
    name: "Kuna's Unblocked Games (Default)",
    title: "Kuna's Unblocked Games",
    favicon: 'https://cdn-icons-png.flaticon.com/512/686/686589.png'
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Classes - Google Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Plate tectonics - Wikipedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard | Canvas LMS',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  },
  {
    id: 'desmos',
    name: 'Desmos Graphing',
    title: 'Desmos | Graphing Calculator',
    favicon: 'https://www.desmos.com/favicon.ico'
  }
];

export const TabCloakModal = ({
  isOpen,
  onClose,
  currentProfileId,
  onSelectProfile,
  panicKey,
  onChangePanicKey,
  currentTheme
}) => {
  if (!isOpen) return null;

  return (
    <div id="cloak-modal-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Tab Cloaker & Stealth</h2>
              <p className="text-xs text-slate-400">Disguise browser tab title & favicon icon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Preset Profiles */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-400 mb-2.5">
              Select Tab Disguise Preset
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {CLOAK_PROFILES.map((prof) => {
                const isSelected = currentProfileId === prof.id;
                return (
                  <button
                    key={prof.id}
                    onClick={() => onSelectProfile(prof)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 text-slate-100'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center bg-slate-800 overflow-hidden shrink-0">
                        <img 
                          src={prof.favicon} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="w-4 h-4 object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-200">{prof.name}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">{prof.title}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panic Hotkey Setting */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-red-400" />
                  <span>Panic Hotkey (Instant Disguise Screen)</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pressing this key triggers an educational disguise overlay immediately.
                </p>
              </div>
              <select
                value={panicKey}
                onChange={(e) => onChangePanicKey(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 outline-none font-mono cursor-pointer"
              >
                <option value="Escape">Escape</option>
                <option value="`">` (Backtick / ~)</option>
                <option value="F4">F4</option>
                <option value="q">Q</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 flex justify-end bg-slate-950/40">
          <button
            onClick={onClose}
            className="text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md cursor-pointer"
            style={{
              backgroundColor: currentTheme?.primary || '#6366f1',
              boxShadow: `0 4px 12px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
