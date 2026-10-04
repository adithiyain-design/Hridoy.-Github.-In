import React, { useState, useEffect, useRef } from 'react';
import { Camera, Sparkles, Volume2, VolumeX, Eye, Play, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { CharacterState, PhotoSnapshot } from '../types/portfolio';
import { playCameraShutterSound, playChimeSound } from '../utils/audio';

interface AnimeCameraHeroProps {
  normalizedX: number;
  normalizedY: number;
  onOpenResume: () => void;
  onPhotoCaptured?: (photo: PhotoSnapshot) => void;
  muted: boolean;
  onToggleMute: () => void;
}

export const AnimeCameraHero: React.FC<AnimeCameraHeroProps> = ({
  normalizedX,
  normalizedY,
  onOpenResume,
  onPhotoCaptured,
  muted,
  onToggleMute,
}) => {
  // Character tracking state with hysteresis
  const [characterState, setCharacterState] = useState<CharacterState>('center');
  const [isFlashing, setIsFlashing] = useState(false);
  const [snapshots, setSnapshots] = useState<PhotoSnapshot[]>([]);
  const [recentSnap, setRecentSnap] = useState<PhotoSnapshot | null>(null);
  const [isStoryPlaying, setIsStoryPlaying] = useState(false);
  const [storyStep, setStoryStep] = useState<string>('Hover cursor to interact');

  const snapCountRef = useRef(0);

  // Hysteresis dead-zones to prevent state jitter
  useEffect(() => {
    if (isStoryPlaying) return; // Story handles its own states

    // Left threshold: < 0.40, Right threshold: > 0.60, Center: 0.38 - 0.62
    if (characterState === 'center') {
      if (normalizedX < 0.38) setCharacterState('left');
      else if (normalizedX > 0.62) setCharacterState('right');
    } else if (characterState === 'left') {
      if (normalizedX > 0.45) setCharacterState('center');
    } else if (characterState === 'right') {
      if (normalizedX < 0.55) setCharacterState('center');
    }
  }, [normalizedX, characterState, isStoryPlaying]);

  // Trigger camera capture / shutter
  const triggerShutter = () => {
    setIsFlashing(true);
    playCameraShutterSound(muted);

    snapCountRef.current += 1;
    const angle = (Math.random() - 0.5) * 12;
    const captions = [
      'Butterfly locked at golden hour',
      'Perfect focus on fluttering wings',
      'Artistic bokeh & rose petals',
      'Captured in mid-flight balance',
      'Jorhat morning light capture',
    ];
    const newSnap: PhotoSnapshot = {
      id: `snap-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      title: `Capture #${snapCountRef.current} • ${characterState.toUpperCase()} ANGLE`,
      caption: captions[snapCountRef.current % captions.length],
      butterflyCoord: {
        x: Math.round(normalizedX * 100),
        y: Math.round(normalizedY * 100),
      },
      filter: characterState === 'left' ? 'warm-pink' : characterState === 'right' ? 'rose-sunset' : 'crystal-soft',
      angle,
    };

    setRecentSnap(newSnap);
    setSnapshots((prev) => [newSnap, ...prev.slice(0, 5)]);
    onPhotoCaptured?.(newSnap);

    setTimeout(() => {
      setIsFlashing(false);
    }, 180);

    setTimeout(() => {
      setRecentSnap(null);
    }, 3800);
  };

  // Run the scripted Story sequence: Center -> Left -> Right -> Center -> Final capture
  const runStorySequence = () => {
    if (isStoryPlaying) return;
    setIsStoryPlaying(true);
    setStoryStep('1. Center: Gentle smile & viewfinder ready...');
    setCharacterState('center');

    setTimeout(() => {
      setStoryStep('2. Butterfly drifts left: Character locks aim...');
      setCharacterState('left');
    }, 1200);

    setTimeout(() => {
      setStoryStep('3. Shutter click! Left camera capture 📸');
      triggerShutter();
    }, 2400);

    setTimeout(() => {
      setStoryStep('4. Character returns center, tracking gentle flight...');
      setCharacterState('center');
    }, 3600);

    setTimeout(() => {
      setStoryStep('5. Butterfly darts right: Camera tracks swiftly...');
      setCharacterState('right');
    }, 4800);

    setTimeout(() => {
      setStoryStep('6. Shutter click! Right angle captured 📸');
      triggerShutter();
    }, 6000);

    setTimeout(() => {
      setStoryStep('7. Final center smile: Story sequence complete! ✨');
      setCharacterState('center');
      playChimeSound(muted);
    }, 7200);

    setTimeout(() => {
      setIsStoryPlaying(false);
      setStoryStep('Hover cursor to interact');
    }, 8800);
  };

  // Eye and lens tracking offset
  const eyeOffsetX = Math.max(-6, Math.min(6, (normalizedX - 0.5) * 16));
  const eyeOffsetY = Math.max(-4, Math.min(4, (normalizedY - 0.5) * 10));

  // Camera tilt angles based on character state
  let cameraRotation = 0;
  let characterTranslateX = 0;
  let bodyRotation = 0;

  if (characterState === 'left') {
    cameraRotation = -14;
    characterTranslateX = -10;
    bodyRotation = -4;
  } else if (characterState === 'right') {
    cameraRotation = 14;
    characterTranslateX = 10;
    bodyRotation = 4;
  }

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-white border-b border-pink-100/80 pt-6 pb-12 select-none">
      {/* Background Soft Ambient Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-br from-[#FFD6E0]/60 to-[#FF85A1]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-gradient-to-bl from-[#FFE3EB]/70 to-[#FF3F6C]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Camera Shutter Flash Overlay */}
      {isFlashing && (
        <div
          className="fixed inset-0 bg-white pointer-events-none z-50 transition-opacity duration-150"
          style={{ animation: 'shutterFlash 0.18s ease-out forwards' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Floating Badge & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-200/80 shadow-xs text-xs font-semibold text-[#FF3F6C]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3F6C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3F6C]" />
            </span>
            <span>Interactive Camera Tracking Hero • srii_tech_</span>
            <span className="hidden sm:inline text-pink-300">|</span>
            <span className="hidden sm:inline text-slate-500 font-normal">State: <strong className="text-pink-600 capitalize">{characterState} View</strong></span>
          </div>

          <div className="flex items-center gap-2">
            {/* Story Auto-play button */}
            <button
              onClick={runStorySequence}
              disabled={isStoryPlaying}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                isStoryPlaying
                  ? 'bg-pink-100 text-pink-700 cursor-wait'
                  : 'bg-white hover:bg-pink-50 text-slate-700 border border-pink-200/80 shadow-xs hover:border-[#FF3F6C]'
              }`}
              title="Play 7-step cinematic camera story sequence"
            >
              <Play className="w-3.5 h-3.5 text-[#FF3F6C]" />
              <span>{isStoryPlaying ? 'Playing Story...' : 'Play Camera Story'}</span>
            </button>

            {/* Shutter Click button */}
            <button
              onClick={triggerShutter}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF3F6C] to-[#FF6B8B] text-white text-xs font-semibold shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Snap Photo</span>
            </button>

            {/* Audio Mute toggle */}
            <button
              onClick={onToggleMute}
              className="p-1.5 rounded-full bg-white border border-pink-200 text-slate-600 hover:text-[#FF3F6C] hover:bg-pink-50 transition-colors shadow-xs"
              title={muted ? 'Unmute camera sounds' : 'Mute camera sounds'}
              aria-label="Toggle Sound"
            >
              {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#FF3F6C]" />}
            </button>
          </div>
        </div>

        {/* Hero Main Grid: Left copy & Quick Actions, Right Character Viewfinder Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hemanta Dutta Title, Tagline, Value Proposition, Resume Trigger */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#FF3F6C] bg-pink-100/60 px-3 py-1 rounded-md">
                <Sparkles className="w-3.5 h-3.5" />
                Accounting &bull; Tax Advisory &bull; Sales Operations
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3F6C] via-[#FF6080] to-[#E11D48]">Hemanta</span> Dutta.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Dedicated professional with <strong>3 years of accounting, GST consulting, and sales operations</strong> experience.
                Expert in financial software including <strong>Tally ERP/Prime</strong>, <strong>Ezy Rakod</strong>, and corporate bookkeeping.
              </p>
            </div>

            {/* Micro Quick Stats */}
            <div className="grid grid-cols-3 gap-3 pt-1 max-w-md">
              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-pink-100/80 shadow-xs">
                <div className="text-xl font-bold text-[#FF3F6C]">3+ Yrs</div>
                <div className="text-xs text-slate-500 font-medium">Tax & Accounts</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-pink-100/80 shadow-xs">
                <div className="text-xl font-bold text-slate-800">B.Com</div>
                <div className="text-xs text-slate-500 font-medium">Honors (6.69)</div>
              </div>
              <div className="bg-white/80 backdrop-blur-xs rounded-xl p-3 border border-pink-100/80 shadow-xs">
                <div className="text-xl font-bold text-[#FF3F6C]">PGDCA</div>
                <div className="text-xs text-slate-500 font-medium">+ 2 Diplomas</div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Resume Modal Trigger */}
              <button
                onClick={onOpenResume}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF3F6C] to-[#FF547D] text-white font-semibold text-sm shadow-md shadow-[#FF3F6C]/25 hover:shadow-lg hover:shadow-[#FF3F6C]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <FileText className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>View Full Resume</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-slate-700 font-semibold text-sm border border-slate-200 hover:border-pink-300 hover:bg-pink-50/50 hover:text-[#FF3F6C] transition-all shadow-xs"
              >
                <span>Explore Experience</span>
              </a>
            </div>

            {/* Interactive Hero Tip / Story Status Bar */}
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-pink-50/80 border border-pink-100 text-xs text-slate-600 max-w-lg">
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#FF3F6C] animate-pulse" />
              <span className="font-medium text-slate-700">Guide:</span>
              <span className="text-slate-600 truncate">{storyStep}</span>
              <span className="ml-auto text-[11px] text-pink-500 font-semibold cursor-pointer" onClick={triggerShutter}>
                Click to snap 📸
              </span>
            </div>
          </div>

          {/* Right Column: The 16:9 Anime Character Camera Viewfinder Stage */}
          <div className="lg:col-span-6 relative">
            {/* Viewfinder Framed Canvas Box (16:9 aspect) */}
            <div
              onClick={triggerShutter}
              className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-b from-[#FFF0F4] via-[#FFE4EC] to-[#FFD8E2] border-2 border-pink-200/90 shadow-xl shadow-pink-500/10 cursor-crosshair group"
            >
              {/* Camera Viewfinder HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none z-20 p-4 sm:p-5 flex flex-col justify-between">
                {/* Top HUD Line */}
                <div className="flex items-center justify-between text-[11px] font-mono font-medium text-pink-800/80">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    <span className="font-bold tracking-wider">REC &bull; 4K 60FPS</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200">
                    <span>F/1.8</span>
                    <span>ISO 100</span>
                    <span>1/500s</span>
                    <span className="text-[#FF3F6C] font-bold">RAW</span>
                  </div>
                </div>

                {/* Viewfinder Target Reticle Tracking the Butterfly */}
                <div
                  className="absolute pointer-events-none transition-transform duration-75 ease-out"
                  style={{
                    left: `${Math.max(12, Math.min(88, normalizedX * 100))}%`,
                    top: `${Math.max(15, Math.min(85, normalizedY * 100))}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    {/* Viewfinder Corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FF3F6C]" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF3F6C]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF3F6C]" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FF3F6C]" />
                    {/* Center Crosshair Dot */}
                    <div className="w-2 h-2 rounded-full bg-[#FF3F6C]/80 shadow-xs" />
                    {/* Lock-on Label */}
                    <span className="absolute -bottom-4 text-[9px] font-mono font-bold tracking-wider text-[#FF3F6C] bg-white/90 px-1 rounded">
                      FOCUS LOCK
                    </span>
                  </div>
                </div>

                {/* Bottom HUD Line */}
                <div className="flex items-center justify-between text-[11px] font-mono text-pink-900/80">
                  <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-200">
                    <Eye className="w-3 h-3 text-[#FF3F6C]" />
                    <span>TRACKING: <span className="font-bold text-[#FF3F6C]">{characterState.toUpperCase()}</span></span>
                  </div>
                  <div className="bg-white/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-pink-200 font-semibold text-slate-700">
                    SNAPS: <span className="text-[#FF3F6C]">{snapshots.length}</span>
                  </div>
                </div>
              </div>

              {/* Character Illustration SVG Stage */}
              <div
                className="absolute inset-0 flex items-end justify-center transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${characterTranslateX}px) rotate(${bodyRotation}deg)`,
                }}
              >
                <svg
                  viewBox="0 0 500 500"
                  className="w-full h-full max-h-[110%] object-contain drop-shadow-[0_15px_25px_rgba(255,63,108,0.15)]"
                >
                  <defs>
                    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4A2E35" />
                      <stop offset="50%" stopColor="#2D151C" />
                      <stop offset="100%" stopColor="#1E0D13" />
                    </linearGradient>

                    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFF5ED" />
                      <stop offset="100%" stopColor="#FFE0D1" />
                    </linearGradient>

                    <linearGradient id="cameraPink" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF6B8B" />
                      <stop offset="50%" stopColor="#FF3F6C" />
                      <stop offset="100%" stopColor="#D81E5B" />
                    </linearGradient>

                    <radialGradient id="lensReflect" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#99E6FF" stopOpacity="0.9" />
                      <stop offset="35%" stopColor="#2563EB" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#1E1B4B" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#0B091E" />
                    </radialGradient>

                    <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="100%" stopColor="#FDE8EE" />
                    </linearGradient>
                  </defs>

                  {/* Character Back Hair Flow */}
                  <path
                    d="M 170 230 C 140 310, 130 420, 160 480 C 180 500, 200 480, 210 440 C 220 380, 220 320, 210 250 Z"
                    fill="url(#hairGrad)"
                  />
                  <path
                    d="M 330 230 C 360 310, 370 420, 340 480 C 320 500, 300 480, 290 440 C 280 380, 280 320, 290 250 Z"
                    fill="url(#hairGrad)"
                  />

                  {/* Shoulders / Torso with elegant collar */}
                  <path
                    d="M 160 490 C 170 380, 210 350, 250 350 C 290 350, 330 380, 340 490 Z"
                    fill="url(#shirtGrad)"
                    stroke="#FFCCD7"
                    strokeWidth="2"
                  />
                  {/* Chic rose ribbon collar */}
                  <path d="M 235 352 L 250 375 L 265 352 Z" fill="#FF3F6C" />
                  <path d="M 245 372 L 240 410 L 250 395 L 260 410 L 255 372 Z" fill="#FF6B8B" />

                  {/* Neck */}
                  <rect x="232" y="290" width="36" height="65" rx="10" fill="url(#skinGrad)" />
                  <path d="M 232 315 C 245 328, 255 328, 268 315" stroke="#F8B4A5" strokeWidth="2.5" fill="none" />

                  {/* Head / Face */}
                  <path
                    d="M 185 190 C 185 130, 220 90, 250 90 C 280 90, 315 130, 315 190 C 315 255, 275 295, 250 295 C 225 295, 185 255, 185 190 Z"
                    fill="url(#skinGrad)"
                  />

                  {/* Cheeks Blush */}
                  <ellipse cx="205" cy="225" rx="16" ry="9" fill="#FF6B8B" opacity="0.35" />
                  <ellipse cx="295" cy="225" rx="16" ry="9" fill="#FF6B8B" opacity="0.35" />

                  {/* Eyes with Dynamic Pupil Gaze Tracking */}
                  {/* Left Eye */}
                  <g transform={`translate(${eyeOffsetX * 0.7}, ${eyeOffsetY * 0.7})`}>
                    <ellipse cx="218" cy="195" rx="15" ry="17" fill="#FFFFFF" />
                    <ellipse cx="219" cy="195" rx="10" ry="13" fill="#6A1B38" />
                    <ellipse cx="220" cy="196" rx="6" ry="8" fill="#1A050E" />
                    {/* Cute Anime Catchlights */}
                    <circle cx="216" cy="190" r="3.5" fill="#FFFFFF" />
                    <circle cx="222" cy="199" r="1.8" fill="#FFFFFF" />
                    {/* Eyelash / Eyelid */}
                    <path d="M 200 188 C 210 178, 226 178, 236 188" stroke="#3A121E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  </g>

                  {/* Right Eye */}
                  <g transform={`translate(${eyeOffsetX * 0.7}, ${eyeOffsetY * 0.7})`}>
                    <ellipse cx="282" cy="195" rx="15" ry="17" fill="#FFFFFF" />
                    <ellipse cx="281" cy="195" rx="10" ry="13" fill="#6A1B38" />
                    <ellipse cx="280" cy="196" rx="6" ry="8" fill="#1A050E" />
                    {/* Cute Anime Catchlights */}
                    <circle cx="277" cy="190" r="3.5" fill="#FFFFFF" />
                    <circle cx="283" cy="199" r="1.8" fill="#FFFFFF" />
                    {/* Eyelash / Eyelid */}
                    <path d="M 264 188 C 274 178, 290 178, 300 188" stroke="#3A121E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                  </g>

                  {/* Eyebrows */}
                  <path d="M 205 174 C 215 168, 228 171, 234 175" stroke="#4A2E35" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M 266 175 C 272 171, 285 168, 295 174" stroke="#4A2E35" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Cute Nose */}
                  <path d="M 249 210 L 251 216" stroke="#E59888" strokeWidth="2" strokeLinecap="round" />

                  {/* Mouth: Smile changes subtly with state */}
                  {characterState === 'center' ? (
                    <path d="M 240 236 C 246 244, 254 244, 260 236" stroke="#C54865" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  ) : (
                    <path d="M 242 237 C 247 241, 253 241, 258 237" stroke="#C54865" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  )}

                  {/* Front Hair Bangs with Soft Shine */}
                  <path
                    d="M 180 160 C 185 95, 240 75, 250 75 C 260 75, 315 95, 320 160 C 310 140, 290 120, 275 145 C 265 125, 245 120, 235 150 C 225 125, 205 130, 195 165 C 188 150, 184 140, 180 160 Z"
                    fill="url(#hairGrad)"
                  />
                  {/* Soft Hair Highlights */}
                  <path d="M 215 105 C 235 96, 265 96, 285 105" stroke="#8A4A58" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />

                  {/* Camera Strap draped over shoulders */}
                  <path
                    d="M 190 350 C 200 410, 205 450, 215 470"
                    stroke="#FF8DA6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 310 350 C 300 410, 295 450, 285 470"
                    stroke="#FF8DA6"
                    strokeWidth="6"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* CUTE PINK CAMERA HELD IN HANDS (Interactive Aiming) */}
                  <g
                    transform={`translate(250, 420) rotate(${cameraRotation}) translate(-250, -420)`}
                    className="transition-transform duration-200 ease-out"
                  >
                    {/* Camera Body */}
                    <rect
                      x="180"
                      y="370"
                      width="140"
                      height="95"
                      rx="22"
                      fill="url(#cameraPink)"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                    />

                    {/* Camera Top Details: Shutter button & dial */}
                    <rect x="200" y="358" width="22" height="12" rx="4" fill="#FFCCD7" stroke="#FF3F6C" strokeWidth="1.5" />
                    <rect x="275" y="362" width="28" height="8" rx="3" fill="#471424" />

                    {/* Camera Flash LED */}
                    <circle cx="210" cy="392" r="6" fill={isFlashing ? '#FFFFFF' : '#FFD6E0'} stroke="#FF3F6C" strokeWidth="1.5" />

                    {/* Camera Lens Outer Metallic Rim */}
                    <circle cx="250" cy="420" r="38" fill="#F8E8EE" stroke="#FFFFFF" strokeWidth="4" />
                    <circle cx="250" cy="420" r="32" fill="#2E0E1B" stroke="#FF8DA6" strokeWidth="2" />

                    {/* Camera Glass Lens with Aperture Reflections */}
                    <circle cx="250" cy="420" r="26" fill="url(#lensReflect)" />
                    {/* Lens Glint / Optical Flare */}
                    <ellipse cx="242" cy="412" rx="10" ry="6" fill="#FFFFFF" opacity="0.65" transform="rotate(-30 242 412)" />
                    <ellipse cx="258" cy="428" rx="4" ry="2" fill="#FFFFFF" opacity="0.45" />

                    {/* Camera Branding Label */}
                    <text x="250" y="456" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700" letterSpacing="1">
                      HEMANTA &bull; CAM
                    </text>

                    {/* Cute Hands Holding the Camera */}
                    <ellipse cx="175" cy="425" rx="16" ry="12" fill="url(#skinGrad)" stroke="#FFCCD7" strokeWidth="2" />
                    <ellipse cx="325" cy="425" rx="16" ry="12" fill="url(#skinGrad)" stroke="#FFCCD7" strokeWidth="2" />
                  </g>
                </svg>
              </div>

              {/* Floating Camera Shutter Pulse button in corner */}
              <div className="absolute bottom-4 right-4 z-30">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerShutter();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-[#FF3F6C] hover:text-[#D81E5B] text-xs font-bold rounded-full shadow-md border border-pink-200 transition-all hover:scale-105 active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Click to Snap</span>
                </button>
              </div>
            </div>

            {/* Instant Polaroid Preview Pop-up */}
            {recentSnap && (
              <div
                className="absolute -bottom-6 -left-4 sm:left-4 z-40 bg-white p-2.5 pb-4 rounded-xl shadow-2xl border-2 border-pink-200 transition-all duration-300 animate-in fade-in zoom-in"
                style={{
                  transform: `rotate(${recentSnap.angle}deg)`,
                  maxWidth: '220px',
                }}
              >
                <div className="relative aspect-[4/3] rounded-lg bg-gradient-to-tr from-pink-200 via-pink-100 to-rose-50 overflow-hidden flex items-center justify-center p-3 border border-pink-100">
                  <div className="flex flex-col items-center text-center">
                    <Sparkles className="w-6 h-6 text-[#FF3F6C] animate-spin" />
                    <span className="text-[10px] font-bold text-pink-700 mt-1 uppercase tracking-wider">
                      {recentSnap.title}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-left">
                  <p className="text-[11px] font-medium text-slate-800 leading-tight">
                    {recentSnap.caption}
                  </p>
                  <div className="flex justify-between items-center text-[9px] text-slate-400 mt-1 font-mono">
                    <span>{recentSnap.timestamp}</span>
                    <span className="text-[#FF3F6C] font-semibold">Captured</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
