import React from 'react';
import { Camera, Sparkles, Image as ImageIcon, Heart } from 'lucide-react';
import { PhotoSnapshot } from '../types/portfolio';

interface CameraRollSectionProps {
  snapshots: PhotoSnapshot[];
  onTriggerSnap: () => void;
}

export const CameraRollSection: React.FC<CameraRollSectionProps> = ({ snapshots, onTriggerSnap }) => {
  // Pre-seeded starter photos if user hasn't snapped yet
  const displayPhotos =
    snapshots.length > 0
      ? snapshots
      : [
          {
            id: 'sample-1',
            timestamp: '10:14:22 AM',
            title: 'Capture #01 • CENTER ANGLE',
            caption: 'Butterfly locked in mid-flight above pink viewfinder',
            butterflyCoord: { x: 50, y: 42 },
            filter: 'crystal-soft',
            angle: -2.5,
          },
          {
            id: 'sample-2',
            timestamp: '10:15:08 AM',
            title: 'Capture #02 • LEFT ANGLE',
            caption: 'Anime camera character tracking left wing flutter',
            butterflyCoord: { x: 28, y: 35 },
            filter: 'warm-pink',
            angle: 3.2,
          },
          {
            id: 'sample-3',
            timestamp: '10:16:45 AM',
            title: 'Capture #03 • RIGHT ANGLE',
            caption: 'Golden bokeh highlights and lens flash capture',
            butterflyCoord: { x: 74, y: 48 },
            filter: 'rose-sunset',
            angle: -1.8,
          },
        ];

  return (
    <section id="camera-roll" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#FF3F6C] text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              Interactive Camera Gallery
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Polaroids from the Pink Camera
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl">
              Every time the camera character aims and the shutter clicks, a fresh memory card snapshot is logged here!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onTriggerSnap}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF3F6C] to-[#FF6B8B] text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Snap New Photo</span>
            </button>
          </div>
        </div>

        {/* Polaroids Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-white p-4 pb-6 rounded-2xl border-2 border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 relative"
              style={{
                transform: `rotate(${photo.angle * 0.4}deg)`,
              }}
            >
              {/* Photo Area */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-tr from-[#FFE5EC] via-[#FFF0F4] to-[#FFD1DC] flex items-center justify-center p-4 border border-pink-100/80">
                {/* Floating butterfly graphic in Polaroid */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative w-12 h-12 flex items-center justify-center float-animation">
                    <span className="text-3xl drop-shadow-md">🦋</span>
                  </div>
                  <span className="text-[11px] font-bold text-pink-700 uppercase tracking-wider mt-2">
                    {photo.title}
                  </span>
                  <span className="text-[9px] font-mono text-pink-500 mt-0.5">
                    COORDS: X={photo.butterflyCoord.x}% Y={photo.butterflyCoord.y}%
                  </span>
                </div>

                {/* Shutter corner badge */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-xs text-[10px] font-mono font-bold text-[#FF3F6C] border border-pink-200">
                  RAW
                </div>
              </div>

              {/* Polaroid Caption Info */}
              <div className="mt-3.5 space-y-1">
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {photo.caption}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                  <span>{photo.timestamp}</span>
                  <span className="inline-flex items-center gap-1 text-[#FF3F6C] font-semibold">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Captured</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
