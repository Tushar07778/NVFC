
import React, { useState, useRef } from 'react';
import { INITIAL_PLAYERS } from '../../constants';
import { Player, Position } from '../../types';
import { geminiService } from '../../services/geminiService';
import { 
  Users, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Camera, 
  Upload, 
  X, 
  Sparkles,
  Loader2,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react';

const POSITIONS: Position[] = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Coach', 'Staff'];

const SquadManager: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Partial<Player> | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.number.toString().includes(searchQuery)
  );

  const handleAddPlayer = () => {
    setEditingPlayer({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      number: players.length + 1,
      position: 'Forward',
      nationality: 'Indian',
      image: '',
      bio: '',
      stats: { appearances: 0, goals: 0, assists: 0 }
    });
    setIsModalOpen(true);
  };

  const handleEditPlayer = (player: Player) => {
    setEditingPlayer({ ...player });
    setIsModalOpen(true);
  };

  const handleDeletePlayer = (id: string) => {
    if (window.confirm('Are you sure you want to release this player?')) {
      setPlayers(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!editingPlayer || !editingPlayer.name) return;
    
    setPlayers(prev => {
      const exists = prev.find(p => p.id === editingPlayer.id);
      if (exists) {
        return prev.map(p => p.id === editingPlayer.id ? (editingPlayer as Player) : p);
      }
      return [...prev, editingPlayer as Player];
    });
    setIsModalOpen(false);
    setEditingPlayer(null);
    stopCamera();
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Could not access camera.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setEditingPlayer(prev => ({ ...prev, image: dataUrl }));
        stopCamera();
      }
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPlayer(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const generateBio = async () => {
    if (!editingPlayer?.name) return;
    setIsGeneratingBio(true);
    try {
      const bio = await geminiService.summarizePlayerStats(editingPlayer.name, editingPlayer.stats);
      setEditingPlayer(prev => ({ ...prev, bio }));
    } catch (err) {
      console.error("Bio gen error:", err);
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const removeImage = () => {
    setEditingPlayer(prev => ({ ...prev, image: '' }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic flex items-center gap-3">
            <Users className="w-10 h-10 text-nv-yellow" /> SQUAD MANAGEMENT
          </h1>
          <p className="text-slate-500 font-medium">Directly manage player rosters and official club profiles.</p>
        </div>
        <button 
          onClick={handleAddPlayer}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-nv-blue transition-all flex items-center gap-3 shadow-xl shadow-slate-200"
        >
          <Plus className="w-5 h-5" /> Add New Player
        </button>
      </header>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search squad..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-nv-blue outline-none font-medium text-slate-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400 px-4">
             <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
             {players.length} Active Profiles
          </div>
        </div>
      </div>

      {/* Players List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPlayers.map(player => (
          <div key={player.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              <img 
                src={player.image || 'https://via.placeholder.com/400x533?text=NO+IMAGE'} 
                alt={player.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-slate-900 font-black text-xs">
                #{player.number}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <div className="flex gap-2 w-full">
                  <button onClick={() => handleEditPlayer(player)} className="flex-1 bg-white text-slate-900 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-nv-yellow transition-colors flex items-center justify-center gap-2">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDeletePlayer(player.id)} className="bg-rose-500 text-white p-2.5 rounded-xl hover:bg-rose-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-[10px] font-black text-nv-yellow uppercase tracking-widest mb-1">{player.position}</p>
              <h3 className="font-oswald text-2xl font-bold italic uppercase text-slate-900 leading-none mb-4">{player.name}</h3>
              <div className="flex justify-between border-t border-slate-50 pt-4">
                 <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Goals</p>
                    <p className="font-black text-slate-900">{player.stats.goals}</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Apps</p>
                    <p className="font-black text-slate-900">{player.stats.appearances}</p>
                 </div>
                 <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Nat</p>
                    <p className="font-black text-slate-900">{player.nationality.substr(0, 3).toUpperCase()}</p>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Sidebar for Add-Edit */}
      {isModalOpen && editingPlayer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { stopCamera(); setIsModalOpen(false); }} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-reveal">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-black text-slate-900 italic uppercase">
                {editingPlayer.name ? 'Update Player' : 'Register Player'}
              </h2>
              <button onClick={() => { stopCamera(); setIsModalOpen(false); }} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {/* Enhanced Photo Upload Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Profile Media</label>
                  {editingPlayer.image && !isCameraActive && (
                    <button onClick={removeImage} className="text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                      <RotateCcw className="w-3 h-3" /> Clear Image
                    </button>
                  )}
                </div>
                
                <div 
                  className={`relative group rounded-[2.5rem] overflow-hidden bg-slate-50 aspect-[4/3] flex flex-col items-center justify-center border-4 border-dashed transition-all duration-300 ${
                    dragActive ? 'border-nv-blue bg-blue-50 scale-[0.98]' : 'border-slate-200'
                  } ${editingPlayer.image ? 'border-none' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {editingPlayer.image && !isCameraActive ? (
                    <>
                      <img src={editingPlayer.image} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button onClick={() => fileInputRef.current?.click()} className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-black uppercase text-xs hover:bg-nv-yellow transition-all flex items-center gap-2">
                          <Upload className="w-4 h-4" /> Replace
                        </button>
                        <button onClick={startCamera} className="bg-white text-slate-900 p-4 rounded-2xl hover:bg-nv-yellow transition-all">
                          <Camera className="w-6 h-6" />
                        </button>
                      </div>
                    </>
                  ) : isCameraActive ? (
                    <div className="absolute inset-0 bg-black">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                        <button onClick={capturePhoto} className="bg-white text-slate-900 px-8 py-4 rounded-full font-black uppercase text-xs hover:bg-nv-yellow transition-all flex items-center gap-3 shadow-2xl">
                           <Camera className="w-5 h-5" /> CAPTURE
                        </button>
                        <button onClick={stopCamera} className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-black uppercase text-xs hover:bg-white/30 transition-all">
                           CANCEL
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-12 pointer-events-none">
                      <div className="bg-slate-200/50 p-6 rounded-full inline-block mb-4">
                        <ImageIcon className="w-10 h-10 text-slate-400" />
                      </div>
                      <p className="text-slate-800 font-black uppercase text-sm tracking-widest mb-2">Drag & Drop Image</p>
                      <p className="text-slate-400 text-xs font-bold mb-6">or click to browse your files</p>
                      <div className="flex gap-4 justify-center pointer-events-auto">
                        <button 
                          onClick={() => fileInputRef.current?.click()} 
                          className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-nv-blue transition-all"
                        >
                          Upload File
                        </button>
                        <button 
                          onClick={startCamera} 
                          className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-50 transition-all"
                        >
                          Use Camera
                        </button>
                      </div>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-nv-blue outline-none font-bold"
                    value={editingPlayer.name}
                    onChange={(e) => setEditingPlayer(prev => ({ ...prev!, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Squad Number</label>
                  <input 
                    type="number" 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-nv-blue outline-none font-bold text-center"
                    value={editingPlayer.number}
                    onChange={(e) => setEditingPlayer(prev => ({ ...prev!, number: parseInt(e.target.value) }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Field Position</label>
                  <select 
                    className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-nv-blue outline-none font-bold appearance-none cursor-pointer"
                    value={editingPlayer.position}
                    onChange={(e) => setEditingPlayer(prev => ({ ...prev!, position: e.target.value as Position }))}
                  >
                    {POSITIONS.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                  </select>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Season Statistics</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: 'appearances', label: 'Apps' },
                    { key: 'goals', label: 'Goals' },
                    { key: 'assists', label: 'Assists' }
                  ].map(stat => (
                    <div key={stat.key} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 focus-within:border-nv-blue transition-colors">
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{stat.label}</p>
                      <input 
                        type="number" 
                        className="w-full bg-transparent border-none p-0 focus:ring-0 font-black text-xl text-center"
                        value={editingPlayer.stats?.[stat.key as keyof typeof editingPlayer.stats] || 0}
                        onChange={(e) => setEditingPlayer(prev => ({ 
                          ...prev!, 
                          stats: { ...prev!.stats!, [stat.key]: parseInt(e.target.value) } 
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Bio */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Career Profile</label>
                  <button 
                    onClick={generateBio}
                    disabled={isGeneratingBio || !editingPlayer.name}
                    className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-800 disabled:opacity-50"
                  >
                    {isGeneratingBio ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} 
                    AI Summary
                  </button>
                </div>
                <textarea 
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-nv-blue outline-none font-medium text-slate-600 leading-relaxed"
                  placeholder="Official club biography..."
                  value={editingPlayer.bio}
                  onChange={(e) => setEditingPlayer(prev => ({ ...prev!, bio: e.target.value }))}
                />
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-white sticky bottom-0 z-10 flex gap-4">
              <button 
                onClick={handleSave}
                className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-nv-blue transition-all shadow-xl active:scale-95"
              >
                Apply Changes
              </button>
              <button 
                onClick={() => { stopCamera(); setIsModalOpen(false); }}
                className="px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest border-2 border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all"
              >
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquadManager;
