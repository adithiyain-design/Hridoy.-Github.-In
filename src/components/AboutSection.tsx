import React from 'react';
import { Sparkles, MapPin, CheckCircle2, FileCheck, Layers, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#FF3F6C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Professional Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bridging Accounting Precision & Operational Growth
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Based in Jorhat, Assam, offering strong financial domain knowledge, hands-on computerized bookkeeping proficiency, and retail sales channel expertise.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {resumeData.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF5F7] to-white border border-pink-100 hover:border-pink-300 transition-all shadow-xs hover:shadow-md group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FF3F6C] group-hover:scale-105 transition-transform origin-left">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">{stat.label}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Detailed Two-Column About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900">
                Career Objective & Professional Philosophy
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {resumeData.personal.objective}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#FF3F6C] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Proven Bookkeeping & Tax Accuracy</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Over 3 years handling ledgers, reconciliations, and routine GST returns filing with zero compliance gaps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#FF3F6C] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Software & Computer Specialization</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Extensive working hours on Tally and Ezy Rakod complemented by a Post Graduate Diploma in Computer Application (PGDCA).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#FF3F6C] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Retail Distribution & Client Relations</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Direct ground experience managing Nestle brand supply pipelines, dealer relationships, and stock forecasting.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#FF3F6C] hover:text-[#E11D48] transition-colors"
              >
                <span>Read detailed curriculum vitae &bull; View resume sheet</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Card: Quick Identity Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#FFF0F4] via-white to-[#FFE8EF] border border-pink-200/80 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF3F6C]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 pb-6 border-b border-pink-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF3F6C] to-[#FF85A1] text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-pink-500/25">
                  HD
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900">{resumeData.personal.name}</h4>
                  <p className="text-xs text-[#FF3F6C] font-semibold">{resumeData.personal.role}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {resumeData.personal.location}
                  </p>
                </div>
              </div>

              <div className="py-4 space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Degree</span>
                  <span className="font-semibold text-slate-900">B.Com (Honors), Dibrugarh University</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Primary Software</span>
                  <span className="font-semibold text-slate-900">Tally ERP / Prime & Ezy Rakod</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Key Domain</span>
                  <span className="font-semibold text-slate-900">Accounting, GST Filing & Sales</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Languages</span>
                  <span className="font-semibold text-slate-900">Assamese, Hindi, English</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Availability</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Immediate / Open for Roles
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenResume}
                  className="w-full py-2.5 rounded-xl bg-white border border-pink-200 text-slate-700 hover:border-[#FF3F6C] hover:text-[#FF3F6C] text-xs font-bold transition-all shadow-xs"
                >
                  Inspect Complete Credentials & Experience
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
