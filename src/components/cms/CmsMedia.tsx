import React, { useState, useMemo } from 'react';
import { useCms, CmsMedia as CmsMediaItem } from '../../context/CmsContext';
import { 
  Image as ImageIcon, 
  Search, 
  Folder, 
  Plus, 
  Trash2, 
  Check, 
  Upload, 
  AlertTriangle, 
  FileText, 
  Layers,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';

export default function CmsMedia() {
  const { media, uploadMedia, deleteMedia, updateMediaAltText } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  
  // Modal / details editor state
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const [altTextInput, setAltTextInput] = useState('');
  
  // Custom mock folders list
  const folders = useMemo(() => {
    const list = new Set<string>();
    media.forEach(m => list.add(m.folder));
    return Array.from(list);
  }, [media]);

  // Filtered media list
  const filteredMedia = useMemo(() => {
    return media.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            m.altText.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFolder = selectedFolder === 'all' || m.folder === selectedFolder;
      return matchesSearch && matchesFolder;
    });
  }, [media, searchQuery, selectedFolder]);

  // Active item details load
  const handleSelectMedia = (m: CmsMediaItem) => {
    setActiveMediaId(m.id);
    setAltTextInput(m.altText);
  };

  const handleSaveAltText = () => {
    if (!activeMediaId) return;
    updateMediaAltText(activeMediaId, altTextInput);
    setActiveMediaId(null);
  };

  // Mock Upload Handler
  const handleMockUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    const randomKeywords = ['investment-metrics', 'wealth-compound', 'tax-form-standard', 'saving-jar-icon', 'gold-retirement-coins'];
    const selectedKeyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    const randomNum = Math.floor(Math.random() * 900) + 100;
    
    uploadMedia({
      name: `${selectedKeyword}-${randomNum}.webp`,
      folder: selectedFolder === 'all' ? 'general' : selectedFolder,
      type: 'image/webp',
      size: `${(Math.random() * 150 + 40).toFixed(1)} KB`,
      altText: `Optimized visual chart representation showing ${selectedKeyword.replace('-', ' ')} metrics`,
      url: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=600'
    });
  };

  // Automated Alt Text generator simulation
  const handleSuggestAltText = () => {
    const activeItem = media.find(m => m.id === activeMediaId);
    if (!activeItem) return;

    const baseName = activeItem.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ');
    setAltTextInput(`Premium graphical banner showcasing ${baseName} styled in modern minimalist theme layout`);
  };

  const activeMediaItem = useMemo(() => {
    return media.find(m => m.id === activeMediaId);
  }, [media, activeMediaId]);

  return (
    <div className="flex flex-col gap-6" id="cms-media-panel">
      
      {/* Upper Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Folder list & Grid viewer */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Folder filters horizontal pill tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <button
                onClick={() => setSelectedFolder('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0 ${selectedFolder === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-950 text-slate-500 hover:text-slate-800'}`}
              >
                <Layers className="w-3.5 h-3.5" />
                All Folders
              </button>
              {folders.map(f => (
                <button
                  key={f}
                  onClick={() => setSelectedFolder(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 flex-shrink-0 capitalize ${selectedFolder === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-950 text-slate-500 hover:text-slate-800'}`}
                >
                  <Folder className="w-3.5 h-3.5" />
                  {f}
                </button>
              ))}
            </div>

            {/* Quick Simulation upload button */}
            <button
              onClick={handleMockUpload}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 self-start transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload Image Asset (Mock)
            </button>
          </div>

          {/* Search tool */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search images, icons, logo or avatars by slug name or alt tags..."
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Grid display cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredMedia.map(item => (
              <div 
                key={item.id} 
                onClick={() => handleSelectMedia(item)}
                className={`group relative overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 cursor-pointer transition-all aspect-video ${activeMediaId === item.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'}`}
              >
                <img 
                  src={item.url} 
                  alt={item.altText} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-white font-bold truncate">{item.name}</span>
                  <span className="text-[8px] text-slate-300 font-mono mt-0.5">{item.size} • WebP</span>
                </div>

                {/* Folder tag marker upper right */}
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-900/60 text-white font-mono text-[8px] uppercase">
                  {item.folder}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Image Optimizer details configuration */}
        <div className="lg:col-span-4">
          {activeMediaItem ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-4 sticky top-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Google-WebP Image Optimizer</h3>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono text-[8px] font-bold">100% OK</span>
              </div>

              {/* Mini visual frame */}
              <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 aspect-video relative">
                <img src={activeMediaItem.url} alt="" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-900/70 text-white font-mono text-[9px]">
                  {activeMediaItem.dimensions || '1200x800'}
                </div>
              </div>

              {/* Specs parameters list */}
              <div className="flex flex-col gap-2.5 text-xs py-2 border-b border-slate-100 dark:border-slate-800/40">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">File Name:</span>
                  <strong className="font-mono text-slate-700 dark:text-slate-300 text-[10px] truncate max-w-[150px]">{activeMediaItem.name}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Physical Size:</span>
                  <strong className="font-mono text-slate-700 dark:text-slate-300">{activeMediaItem.size}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Compress Quality:</span>
                  <strong className="text-emerald-500 font-bold flex items-center gap-0.5 text-[11px]"><Sparkles className="w-3 h-3" /> WebP Lossless (85%)</strong>
                </div>
              </div>

              {/* Alt Text custom input */}
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400 flex items-center justify-between">
                  <span>Google Alt Image Text</span>
                  <button 
                    onClick={handleSuggestAltText}
                    className="text-blue-500 hover:text-blue-600 font-bold uppercase text-[9px] flex items-center gap-0.5"
                  >
                    <Sparkles className="w-3 h-3" /> Suggest optimized alt
                  </button>
                </label>
                <textarea
                  value={altTextInput}
                  onChange={e => setAltTextInput(e.target.value)}
                  rows={3}
                  placeholder="Describe image visual elements..."
                  className="w-full mt-1.5 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-normal"
                />
              </div>

              {/* Safe action button */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleSaveAltText}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4" />
                  Save Alt Metadata
                </button>
                <button
                  onClick={() => deleteMedia(activeMediaItem.id)}
                  className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Asset
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-950/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center text-slate-400 flex flex-col items-center justify-center min-h-[250px]">
              <ImageIcon className="w-8 h-8 text-slate-300 mb-3" />
              <p className="text-xs font-medium">Select any visual media file from the library to configure dimensions, compress assets, and write alt-texts.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
