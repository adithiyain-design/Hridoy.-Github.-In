import React from 'react';
import { Wrench, CheckCircle, Globe, Terminal, BarChart3, Database } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#FF3F6C] text-xs font-bold uppercase tracking-wider">
            <Wrench className="w-3.5 h-3.5" />
            Skills & Software
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Technical Software & Core Competencies
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Proficiency across accounting applications, office document suites, financial reconciliation, and computer maintenance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Software & Tools with Progress Meters */}
          <div className="lg:col-span-6 bg-[#FFF8FA] rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-pink-200/60">
              <Database className="w-5 h-5 text-[#FF3F6C]" />
              <h3 className="text-lg font-bold text-slate-900">
                Software & Tools Mastery
              </h3>
            </div>

            <div className="space-y-5">
              {resumeData.softwareSkills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-800">{skill.name}</span>
                    <span className="text-[#FF3F6C] font-mono">{skill.level}%</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 rounded-full bg-pink-100/80 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#FF6B8B] to-[#FF3F6C] transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">{skill.category}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white border border-pink-100 text-xs text-slate-600">
              <strong className="text-slate-900">Key Expertise:</strong> Daily computerized transaction entries, sales & purchase vouchers, ledger generation, bank reconciliation, and trial balance export on Tally and Ezy Rakod.
            </div>
          </div>

          {/* Right Column: Core Competencies and Languages */}
          <div className="lg:col-span-6 space-y-8">
            {/* Core Competencies Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <BarChart3 className="w-5 h-5 text-[#FF3F6C]" />
                <h3 className="text-lg font-bold text-slate-900">
                  Core Accounting & Operational Competencies
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {resumeData.coreCompetencies.map((comp) => (
                  <div
                    key={comp}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-pink-50/50 border border-pink-100/80 hover:border-pink-300 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-[#FF3F6C] flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-800">{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Spoken Card */}
            <div className="bg-gradient-to-br from-[#FFF5F7] to-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-pink-100">
                <Globe className="w-5 h-5 text-[#FF3F6C]" />
                <h3 className="text-lg font-bold text-slate-900">
                  Languages Spoken
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {resumeData.languages.map((lang) => (
                  <div key={lang.name} className="p-3.5 rounded-xl bg-white border border-pink-100 text-center shadow-2xs">
                    <div className="text-sm font-bold text-slate-900">{lang.name}</div>
                    <div className="text-[11px] text-[#FF3F6C] font-medium mt-0.5">{lang.proficiency}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
