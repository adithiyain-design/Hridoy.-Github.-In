import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-[#FFF9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-[#FF3F6C] text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Education & Professional Certifications
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Formal commerce degree from Dibrugarh University combined with specialized computer application and hardware diplomas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Formal Degrees */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-pink-200/60">
              <BookOpen className="w-5 h-5 text-[#FF3F6C]" />
              <h3 className="text-xl font-bold text-slate-900">
                Formal Academic Qualifications
              </h3>
            </div>

            <div className="space-y-4">
              {resumeData.education.map((edu, idx) => (
                <div
                  key={edu.degree}
                  className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs hover:border-pink-300 transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#FF3F6C] uppercase tracking-wider">
                        {idx === 0 ? 'University Degree' : 'Board Certificate'}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {edu.degree}
                      </h4>
                      <p className="text-xs font-semibold text-slate-600 mt-1">
                        {edu.institution} &bull; <span className="text-slate-500 font-normal">{edu.boardOrUniversity}</span>
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-pink-50 border border-pink-100 text-xs font-bold text-[#FF3F6C]">
                        {edu.grade}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-end gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{edu.year}</span>
                      </div>
                    </div>
                  </div>

                  {edu.details && (
                    <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-50 leading-relaxed">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Diplomas & Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-pink-200/60">
              <Award className="w-5 h-5 text-[#FF3F6C]" />
              <h3 className="text-xl font-bold text-slate-900">
                Technical Diplomas & Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {resumeData.certifications.map((cert) => (
                <div
                  key={cert.code}
                  className="bg-white rounded-2xl p-5 border border-pink-100 shadow-xs hover:border-pink-300 transition-all hover:shadow-md relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-100 to-rose-50 border border-pink-200 flex items-center justify-center text-[#FF3F6C] font-extrabold text-sm flex-shrink-0">
                      {cert.code.length > 5 ? 'DTP' : cert.code}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">
                          {cert.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Diploma Verified & Completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
