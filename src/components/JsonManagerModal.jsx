import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Save, 
  AlertCircle,
  FileJson
} from 'lucide-react';

export const JsonManagerModal = ({
  isOpen,
  onClose,
  games = [],
  onSaveJson,
  onResetDefault,
  currentTheme
}) => {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(games, null, 2));
  const [copied, setCopied] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [parseError, setParseError] = useState('');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result;
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          setJsonText(JSON.stringify(parsed, null, 2));
          setParseError('');
        } else {
          setParseError('Uploaded file must contain a JSON array of game objects.');
        }
      } catch (err) {
        setParseError('Invalid JSON format in uploaded file.');
      }
    };
    reader.readAsText(file);
  };

  const handleApplyChanges = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        setParseError('Root must be an array of game objects.');
      } else {
        setParseError('');
        onSaveJson(parsed);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
          onClose();
        }, 1200);
      }
    } catch (err) {
      setParseError('JSON syntax error: ' + err.message);
    }
  };

  return (
    <div id="json-manager-modal-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
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
              <FileJson className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">games.json Database</h2>
              <p className="text-xs text-slate-400">Directly inspect, edit, export, or import game iframe schemas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Download .json</span>
            </button>

            <label className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 font-semibold cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={() => {
              onResetDefault();
              onClose();
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Factory Default</span>
          </button>
        </div>

        {/* JSON Editor Area */}
        <div className="p-6 flex-1 overflow-y-auto">
          {parseError && (
            <div className="mb-3 flex items-center gap-2 bg-red-950/60 border border-red-800 text-red-300 text-xs p-3 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{parseError}</span>
            </div>
          )}

          <textarea
            id="json-editor-textarea"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full h-80 font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-4 text-emerald-400/90 leading-relaxed outline-none resize-none focus-theme"
            spellCheck={false}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-950/40">
          <span className="text-xs text-slate-500 font-mono">
            {games.length} games registered in memory
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
            <button
              id="save-json-changes-btn"
              onClick={handleApplyChanges}
              className="flex items-center gap-1.5 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
              style={{
                backgroundColor: currentTheme?.primary || '#6366f1',
                boxShadow: `0 4px 14px 0 rgba(${currentTheme?.rgb || '99, 102, 241'}, 0.3)`
              }}
            >
              {saveSuccess ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? 'Saved & Synced!' : 'Save & Sync JSON'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
