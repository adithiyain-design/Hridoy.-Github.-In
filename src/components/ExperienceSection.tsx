import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface ExperienceSectionProps {
  onOpenResume: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="experience" className="py-20 bg-[#FFF9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-[#FF3F6C] text-xs font-bold uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            Work History
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Professional Experience Timeline
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Detailed breakdown of roles, core responsibilities, and financial software mastered across accounting consultancy and FMCG distribution.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {resumeData.experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md shadow-pink-500/5 hover:border-pink-300 transition-all hover:shadow-xl relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: exp.badgeColor || '#FF3F6C' }}
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-100 text-[#FF3F6C]">
                      Role 0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Duration: {exp.duration}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                    <span className="font-bold text-slate-800 text-sm">{exp.company}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FF3F6C]" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#FF3F6C]" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <div className="self-start sm:self-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-xl bg-pink-50 border border-pink-200 text-xs font-bold text-[#FF3F6C]">
                    {exp.duration} Full-Time
                  </span>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="py-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Responsibilities & Deliverables
                </h4>
                <ul className="space-y-2.5">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#FF3F6C] flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech / Skills Badges */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 mr-1">Software & Skills:</span>
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-lg bg-pink-50/70 border border-pink-100 text-[#FF3F6C] text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-pink-200 text-slate-800 text-xs font-bold hover:border-[#FF3F6C] hover:text-[#FF3F6C] transition-all shadow-xs"
          >
            <FileText className="w-4 h-4 text-[#FF3F6C]" />
            <span>Open Verified Resume View</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
