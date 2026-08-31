import React from 'react';
import { BookOpen, Search } from 'lucide-react';

export const PanicOverlay = ({
  isOpen,
  onExit,
  panicKey = 'Escape'
}) => {
  if (!isOpen) return null;

  return (
    <div id="panic-overlay-screen" className="fixed inset-0 z-50 bg-white text-slate-900 font-serif overflow-y-auto select-text">
      {/* Top Wikipedia style header */}
      <header className="border-b border-slate-300 px-6 py-3 flex items-center justify-between bg-slate-50 font-sans text-xs">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-slate-700" />
          <span className="font-bold text-sm tracking-tight text-slate-800">Wikipedia: The Free Encyclopedia</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1.5 border border-slate-300 bg-white px-3 py-1 rounded-md">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <input 
              type="text" 
              readOnly 
              value="Plate tectonics" 
              className="outline-none text-xs text-slate-700 w-36 bg-transparent"
            />
          </div>
          <button
            onClick={onExit}
            title={`Resume (or press ${panicKey})`}
            className="text-[11px] text-slate-500 hover:text-slate-900 font-sans px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"
          >
            [Resume / Press {panicKey}]
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-8 py-8">
        <h1 className="text-3xl font-normal border-b border-slate-300 pb-2 mb-4 font-serif text-slate-900">
          Plate tectonics
        </h1>
        <div className="text-xs text-slate-500 mb-6 font-sans">
          From Wikipedia, the free encyclopedia • Earth Sciences & Geology
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-sm leading-relaxed text-slate-800">
            <p>
              <strong>Plate tectonics</strong> (from the Late Latin <em>tectonicus</em>, from the Ancient Greek <em>τεκτονικός</em> 'pertaining to building') is the generally accepted scientific theory that considers the Earth's lithosphere to comprise a number of large tectonic plates which have been slowly moving since roughly 3.4 billion years ago.
            </p>

            <h2 className="text-xl font-medium border-b border-slate-200 pb-1 mt-6 font-serif">
              Key Principles
            </h2>
            <p>
              The model builds on the concept of continental drift, an idea developed during the first decades of the 20th century. The geoscientific community accepted plate-tectonic theory after seafloor spreading was validated in the late 1950s and early 1960s.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li><strong>Convergent Boundaries:</strong> Where two plates slide towards each other, forming either a subduction zone or a continental collision.</li>
              <li><strong>Divergent Boundaries:</strong> Where two plates slide apart from each other, leading to seafloor spreading and rift valleys.</li>
              <li><strong>Transform Boundaries:</strong> Where plates slide past one another horizontally (such as the San Andreas Fault).</li>
            </ul>

            <h2 className="text-xl font-medium border-b border-slate-200 pb-1 mt-6 font-serif">
              Mantle Convection
            </h2>
            <p>
              The primary driving forces of plate motion are mantle convection currents, gravitational sliding at ocean ridges (ridge push), and subducting plate suction (slab pull).
            </p>
          </div>

          {/* Sidebar infobox */}
          <div className="border border-slate-300 bg-slate-50 p-4 rounded text-xs font-sans space-y-3 h-fit">
            <div className="font-bold text-center border-b border-slate-300 pb-2 text-slate-800">
              Plate Tectonics
            </div>
            <div className="space-y-1.5 text-slate-700">
              <div><strong>Field:</strong> Geophysics, Geology</div>
              <div><strong>First proposed:</strong> Alfred Wegener (1912)</div>
              <div><strong>Validated:</strong> Mid-20th century</div>
              <div><strong>Major plates:</strong> Pacific, North American, Eurasian, African, Antarctic, Indo-Australian, South American</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
