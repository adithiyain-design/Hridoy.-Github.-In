import React, { useState } from 'react';
import { Camera, FileText, Menu, X, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
  muted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, muted, onToggleMute }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Camera Roll', href: '#camera-roll' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-pink-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF3F6C] to-[#FF6B8B] flex items-center justify-center text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-[#FF3F6C] transition-colors">
                Hemanta Dutta
              </span>
              <span className="hidden sm:block text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Tax &bull; Accounts &bull; Sales
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-slate-600 hover:text-[#FF3F6C] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 rounded-xl bg-pink-50 text-slate-600 hover:text-[#FF3F6C] border border-pink-100 transition-colors"
              title={muted ? 'Unmute sounds' : 'Mute sounds'}
              aria-label="Toggle Sound"
            >
              {muted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#FF3F6C]" />}
            </button>

            {/* View Resume Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF3F6C] to-[#FF547D] text-white text-xs font-bold shadow-sm shadow-[#FF3F6C]/25 hover:shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <Sparkles className="w-3 h-3 text-pink-200" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-[#FF3F6C] hover:bg-pink-50 md:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-pink-100 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-pink-50 hover:text-[#FF3F6C] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FF3F6C] text-white text-sm font-bold shadow-md shadow-[#FF3F6C]/20"
            >
              <FileText className="w-4 h-4" />
              <span>Open Complete Resume Document</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
