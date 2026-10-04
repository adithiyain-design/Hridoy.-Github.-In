import React, { useEffect, useRef, useState } from 'react';

interface ButterflyCursorProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  isHeroHovered: boolean;
  onPositionUpdate?: (normalizedX: number, normalizedY: number, rawX: number, rawY: number) => void;
  onSnapTrigger?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  hue: number;
}

export const ButterflyCursor: React.FC<ButterflyCursorProps> = ({
  heroRef,
  isHeroHovered,
  onPositionUpdate,
  onSnapTrigger,
}) => {
  const butterflyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Position state refs to avoid React re-renders in rAF loop
  const targetPos = useRef({ x: window.innerWidth * 0.5, y: 350 });
  const currentPos = useRef({ x: window.innerWidth * 0.5, y: 350 });
  const velocity = useRef({ x: 0, y: 0 });
  const bankAngle = useRef(0);
  const idleTime = useRef(0);
  const particles = useRef<Particle[]>([]);
  const isInside = useRef(false);

  // Keep track of hover state for rendering visibility
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    isInside.current = isHeroHovered;
    setIsVisible(isHeroHovered);
  }, [isHeroHovered]);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    // Desktop Mouse Move
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;

      const inside =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

      isInside.current = inside;
      setIsVisible(inside);

      if (inside) {
        targetPos.current = { x, y };
        const normX = (x - rect.left) / rect.width;
        const normY = (y - rect.top) / rect.height;
        onPositionUpdate?.(normX, normY, x, y);
      }
    };

    // Mobile / Touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = heroEl.getBoundingClientRect();
      const x = touch.clientX;
      const y = touch.clientY;

      const inside =
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

      isInside.current = inside;
      setIsVisible(inside);

      if (inside) {
        targetPos.current = { x, y };
        const normX = (x - rect.left) / rect.width;
        const normY = (y - rect.top) / rect.height;
        onPositionUpdate?.(normX, normY, x, y);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (inside && onSnapTrigger) {
        onSnapTrigger();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Set initial target center of hero
    const rect = heroEl.getBoundingClientRect();
    if (rect.width > 0) {
      targetPos.current = {
        x: rect.left + rect.width * 0.5,
        y: rect.top + rect.height * 0.45,
      };
      currentPos.current = { ...targetPos.current };
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [heroRef, onPositionUpdate, onSnapTrigger]);

  // Main high-performance spring & particle animation loop
  useEffect(() => {
    let animId: number;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      // Lerp / Spring dynamics
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;
      const dist = Math.hypot(dx, dy);

      // Spring stiffness & damping factor for organic natural lag
      const easing = 0.085;
      velocity.current.x = velocity.current.x * 0.78 + dx * easing;
      velocity.current.y = velocity.current.y * 0.78 + dy * easing;

      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;

      // Idle drifting when stationary
      idleTime.current += 0.04;
      let idleOffsetX = 0;
      let idleOffsetY = 0;
      if (dist < 10) {
        idleOffsetX = Math.sin(idleTime.current * 1.5) * 3.5;
        idleOffsetY = Math.cos(idleTime.current * 2) * 4.5;
      }

      // Calculate banking angle based on horizontal acceleration
      const targetBank = Math.max(-25, Math.min(25, velocity.current.x * 1.8));
      bankAngle.current += (targetBank - bankAngle.current) * 0.12;

      // Apply transform directly to DOM ref
      if (butterflyRef.current) {
        const renderX = currentPos.current.x + idleOffsetX;
        const renderY = currentPos.current.y + idleOffsetY;
        butterflyRef.current.style.transform = `translate3d(${renderX}px, ${renderY}px, 0) rotate(${bankAngle.current}deg)`;
      }

      // Spawn subtle pollen / sparkle particle trails when moving
      if (dist > 3 && isInside.current && Math.random() < 0.45) {
        particles.current.push({
          x: currentPos.current.x + (Math.random() - 0.5) * 8,
          y: currentPos.current.y + (Math.random() - 0.5) * 8,
          size: Math.random() * 2.8 + 1.2,
          opacity: 0.85,
          vx: (Math.random() - 0.5) * 0.8 - velocity.current.x * 0.08,
          vy: (Math.random() - 0.5) * 0.8 + 0.4,
          hue: Math.random() > 0.4 ? 346 : 280, // Pink & Soft Gold/Purple
        });
      }

      // Render sparkle particle trail on canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.opacity -= 0.022;

          if (p.opacity <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.opacity})`;
          ctx.shadowColor = '#FF3F6C';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Particle trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40 transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Butterfly DOM element */}
      <div
        ref={butterflyRef}
        className="fixed top-0 left-0 -ml-5 -mt-5 pointer-events-none z-50 transition-opacity duration-300 select-none"
        style={{
          opacity: isVisible ? 1 : 0,
          perspective: '600px',
          willChange: 'transform',
        }}
      >
        <div className="relative w-10 h-10 flex items-center justify-center butterfly-body-hover">
          {/* Subtle Pink Glow aura around butterfly */}
          <div className="absolute inset-0 bg-pink-400/25 blur-md rounded-full -z-10" />

          {/* SVG 3D Butterfly */}
          <div className="flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {/* Left Wing with 3D Flap */}
            <div className="wing-left w-5 h-7 relative">
              <svg viewBox="0 0 40 50" className="w-full h-full drop-shadow-[0_2px_4px_rgba(255,63,108,0.35)]">
                <defs>
                  <linearGradient id="leftWingGrad" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="#FF3F6C" />
                    <stop offset="60%" stopColor="#FF85A1" />
                    <stop offset="100%" stopColor="#FFF0F5" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Upper forewing */}
                <path
                  d="M 38 25 C 25 15, 8 2, 2 12 C -2 18, 5 32, 38 25 Z"
                  fill="url(#leftWingGrad)"
                  stroke="#FF1A53"
                  strokeWidth="0.8"
                />
                {/* Lower hindwing */}
                <path
                  d="M 38 24 C 20 28, 4 36, 12 45 C 20 50, 32 38, 38 26 Z"
                  fill="url(#leftWingGrad)"
                  stroke="#FF1A53"
                  strokeWidth="0.8"
                />
                {/* Delicate wing vein patterns */}
                <path d="M 38 25 C 24 20, 15 16, 6 15" stroke="rgba(255,255,255,0.7)" strokeWidth="0.6" fill="none" />
                <path d="M 38 25 C 26 27, 18 34, 15 42" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" fill="none" />
              </svg>
            </div>

            {/* Butterfly Slim Body & Antennae */}
            <div className="relative z-10 w-[3px] h-6 flex flex-col items-center justify-center mx-[1px]">
              {/* Antennae */}
              <div className="absolute -top-2 flex justify-between w-3">
                <div className="w-[1px] h-2.5 bg-[#641A2E] -rotate-25 rounded-full" />
                <div className="w-[1px] h-2.5 bg-[#641A2E] rotate-25 rounded-full" />
              </div>
              {/* Head */}
              <div className="w-1.5 h-1.5 bg-[#4A1525] rounded-full" />
              {/* Thorax and Abdomen */}
              <div className="w-1 h-4 bg-gradient-to-b from-[#641A2E] to-[#3B0E1B] rounded-full shadow-sm" />
            </div>

            {/* Right Wing with 3D Flap */}
            <div className="wing-right w-5 h-7 relative">
              <svg viewBox="0 0 40 50" className="w-full h-full drop-shadow-[0_2px_4px_rgba(255,63,108,0.35)]">
                <defs>
                  <linearGradient id="rightWingGrad" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#FF3F6C" />
                    <stop offset="60%" stopColor="#FF85A1" />
                    <stop offset="100%" stopColor="#FFF0F5" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Upper forewing */}
                <path
                  d="M 2 25 C 15 15, 32 2, 38 12 C 42 18, 35 32, 2 25 Z"
                  fill="url(#rightWingGrad)"
                  stroke="#FF1A53"
                  strokeWidth="0.8"
                />
                {/* Lower hindwing */}
                <path
                  d="M 2 24 C 20 28, 36 36, 28 45 C 20 50, 8 38, 2 26 Z"
                  fill="url(#rightWingGrad)"
                  stroke="#FF1A53"
                  strokeWidth="0.8"
                />
                {/* Delicate wing vein patterns */}
                <path d="M 2 25 C 16 20, 25 16, 34 15" stroke="rgba(255,255,255,0.7)" strokeWidth="0.6" fill="none" />
                <path d="M 2 25 C 14 27, 22 34, 25 42" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
