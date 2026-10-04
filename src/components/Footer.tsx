import React from 'react';
import { Camera, Heart, FileText, ArrowUp } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF3F6C] text-white flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-bold text-sm">{resumeData.personal.name}</span>
              <p className="text-[11px] text-slate-500">
                Interactive Developer & Accountant Portfolio &bull; Jorhat, Assam
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#camera-roll" className="hover:text-white transition-colors">Camera Roll</a>
            <button
              onClick={onOpenResume}
              className="text-[#FF3F6C] hover:underline font-semibold flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>&copy; {new Date().getFullYear()} Hemanta Dutta. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#FF3F6C] fill-current" />
            <span>&bull; Anime Camera & Butterfly Tracking</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
