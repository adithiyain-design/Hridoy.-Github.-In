/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { ButterflyCursor } from './components/ButterflyCursor';
import { AnimeCameraHero } from './components/AnimeCameraHero';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { CameraRollSection } from './components/CameraRollSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PhotoSnapshot } from './types/portfolio';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [muted, setMuted] = useState(false);

  // Normalized cursor coordinates inside hero [0..1]
  const [normalizedPos, setNormalizedPos] = useState({ x: 0.5, y: 0.45 });

  // Camera Roll Snapshots
  const [snapshots, setSnapshots] = useState<PhotoSnapshot[]>([]);

  // Hero container reference
  const heroRef = useRef<HTMLDivElement>(null);

  // Position update from Butterfly cursor
  const handlePositionUpdate = useCallback(
    (normX: number, normY: number) => {
      setNormalizedPos({ x: normX, y: normY });
    },
    []
  );

  const handlePhotoCaptured = (snap: PhotoSnapshot) => {
    setSnapshots((prev) => [snap, ...prev]);
  };

  const triggerSnapFromGallery = () => {
    // Scroll smoothly to hero and open focus
    const heroEl = document.getElementById('hero');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F9] text-slate-800 flex flex-col font-sans">
      {/* Butterfly Cursor Component */}
      <ButterflyCursor
        heroRef={heroRef}
        isHeroHovered={isHeroHovered}
        onPositionUpdate={handlePositionUpdate}
      />

      {/* Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        muted={muted}
        onToggleMute={() => setMuted((prev) => !prev)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Interactive Hero Section - Cursor hidden inside hero as requested */}
        <section
          id="hero"
          ref={heroRef}
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          className={`relative ${isHeroHovered ? 'cursor-none' : ''}`}
        >
          <AnimeCameraHero
            normalizedX={normalizedPos.x}
            normalizedY={normalizedPos.y}
            onOpenResume={() => setIsResumeOpen(true)}
            onPhotoCaptured={handlePhotoCaptured}
            muted={muted}
            onToggleMute={() => setMuted((prev) => !prev)}
          />
        </section>

        {/* About & Profile Summary */}
        <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* Experience Timeline */}
        <ExperienceSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* Skills & Software Matrix */}
        <SkillsSection />

        {/* Education & Certifications */}
        <EducationSection />

        {/* Camera Roll / Captured Polaroids */}
        <CameraRollSection
          snapshots={snapshots}
          onTriggerSnap={triggerSnapFromGallery}
        />

        {/* Contact & Direct Inquiries */}
        <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Resume Modal with Smooth Slide-in & Hover Scale on 'Download PDF' */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
