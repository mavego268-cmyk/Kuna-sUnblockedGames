import React, { useState } from 'react';
import { X, Palette, Check, Sparkles, RotateCcw, Paintbrush, Sliders } from 'lucide-react';
import { THEME_PRESETS, getCustomTheme } from '../utils/theme.js';

export const ThemeModal = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  onResetDefaultTheme
}) => {
  const [customHex, setCustomHex] = useState(
    currentTheme.isCustom ? currentTheme.primary : '#6366f1'
  );

  if (!isOpen) return null;

  const handleCustomHexChange = (hex) => {
    setCustomHex(hex);
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
      const newCustomTheme = getCustomTheme(hex);
      onSelectTheme(newCustomTheme);
    }
  };

  return (
    <div id="theme-modal-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center border text-white shadow-sm"
              style={{ 
                backgroundColor: currentTheme.primary,
                borderColor: currentTheme.primaryLight 
              }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Customize Main Color</h2>
              <p className="text-xs text-slate-400">Personalize the website's accent and theme style</p>
            </div>
          </div>
          <button
            id="close-theme-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Preset Color Swatches */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
              <span>Theme Color Presets</span>
              <span className="text-[11px] text-slate-500 font-normal">Instant live preview</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {THEME_PRESETS.map((preset) => {
                const isSelected = currentTheme.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    id={`theme-preset-${preset.id}`}
                    onClick={() => {
                      setCustomHex(preset.primary);
                      onSelectTheme(preset);
                    }}
                    className={`flex flex-col items-center gap-2 p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 shadow-md ring-2'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                    }`}
                    style={{
                      borderColor: isSelected ? preset.primary : undefined,
                      boxShadow: isSelected ? `0 0 16px -2px ${preset.primary}50` : undefined,
                      outlineColor: preset.primary
                    }}
                  >
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center shadow-inner relative transition-transform group-hover:scale-105"
                      style={{ backgroundColor: preset.primary }}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white drop-shadow-md stroke-[3]" />}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-200 truncate w-full">
                      {preset.name.split(' (')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Hex Color Picker */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Paintbrush className="w-3.5 h-3.5" style={{ color: currentTheme.primary }} />
                <span>Custom Color Picker</span>
              </div>
              <span className="text-[10px] text-slate-400">Choose any hex color</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Native Color Input */}
              <div className="relative">
                <input
                  id="custom-color-native-picker"
                  type="color"
                  value={customHex.startsWith('#') && customHex.length === 7 ? customHex : '#6366f1'}
                  onChange={(e) => handleCustomHexChange(e.target.value)}
                  className="w-12 h-10 rounded-xl cursor-pointer bg-transparent border-0 p-0 block"
                />
              </div>

              {/* Text Input */}
              <div className="flex-1">
                <div className="flex items-center bg-slate-900 border border-slate-700 focus-within:border-indigo-500 rounded-xl px-3 py-2 text-xs font-mono text-slate-200">
                  <span className="text-slate-500 mr-1">HEX</span>
                  <input
                    id="custom-hex-text-input"
                    type="text"
                    placeholder="#6366f1"
                    value={customHex}
                    onChange={(e) => handleCustomHexChange(e.target.value)}
                    className="w-full bg-transparent outline-none uppercase font-bold tracking-wider text-slate-100"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCustomHexChange(customHex)}
                className="px-3.5 py-2 text-xs font-bold rounded-xl text-white shadow-sm transition-all"
                style={{ backgroundColor: currentTheme.primary }}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Live Preview Demonstration */}
          <div className="border border-slate-800 bg-slate-950/50 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" style={{ color: currentTheme.primary }} />
                <span>Live UI Component Preview</span>
              </span>
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `rgba(${currentTheme.rgb}, 0.15)`,
                  color: currentTheme.primaryLight,
                  borderColor: `rgba(${currentTheme.rgb}, 0.35)`
                }}
              >
                {currentTheme.name}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Sample Button */}
              <button
                type="button"
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: currentTheme.primary,
                  boxShadow: `0 4px 14px 0 rgba(${currentTheme.rgb}, 0.35)`
                }}
              >
                <span>Play Game</span>
              </button>

              {/* Sample Category Pill */}
              <div
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-white border flex items-center gap-1.5"
                style={{
                  backgroundColor: currentTheme.primary,
                  borderColor: currentTheme.primaryLight
                }}
              >
                <span>Arcade</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-extrabold bg-black/25">
                  12
                </span>
              </div>

              {/* Sample Tag / Badge */}
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-lg border"
                style={{
                  backgroundColor: `rgba(${currentTheme.rgb}, 0.15)`,
                  color: currentTheme.primaryLight,
                  borderColor: `rgba(${currentTheme.rgb}, 0.35)`
                }}
              >
                #Featured
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/40">
          <button
            id="reset-theme-btn"
            onClick={onResetDefaultTheme}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            id="close-theme-confirm-btn"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md cursor-pointer"
            style={{
              backgroundColor: currentTheme.primary,
              boxShadow: `0 4px 14px 0 rgba(${currentTheme.rgb}, 0.3)`
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
