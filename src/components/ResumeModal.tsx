import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Download, Printer, Copy, Check, Sparkles, MapPin, Mail, Phone, Calendar, Briefcase, GraduationCap, Award, Wrench } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyText = () => {
    const fullText = `
${resumeData.personal.name}
${resumeData.personal.address}
Phone: ${resumeData.personal.phone} | Email: ${resumeData.personal.email}

OBJECTIVE:
${resumeData.personal.objective}

EXPERIENCE:
1. Tax Consultant Firm - Accountant (3 Years)
${resumeData.experiences[0].description.map((d) => `• ${d}`).join('\n')}

2. Nestle Distributor - Sales Representative (1 Year)
${resumeData.experiences[1].description.map((d) => `• ${d}`).join('\n')}

EDUCATION:
${resumeData.education.map((e) => `• ${e.degree} - ${e.institution} (${e.boardOrUniversity}) | ${e.year} | ${e.grade}`).join('\n')}

CERTIFICATIONS:
${resumeData.certifications.map((c) => `• ${c.code}: ${c.title}`).join('\n')}

SKILLS & TOOLS:
Software: Tally, Ezy Rakod, MS Excel, MS Word, MS PowerPoint
Core Competencies: Accounting, GST Filing, Sales & Distribution, Computer Hardware Repairing, DTP
Languages: Assamese, Hindi, English
    `.trim();

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end sm:justify-center overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container with Smooth Slide-in Animation */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 280,
              mass: 0.9,
            }}
            className="relative z-10 w-full max-w-4xl h-full sm:h-auto sm:max-h-[92vh] flex flex-col bg-white sm:rounded-2xl shadow-2xl overflow-hidden my-auto"
          >
            {/* Modal Header Bar with Actions */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100 bg-[#FFF5F7] sticky top-0 z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FF3F6C] flex items-center justify-center text-white shadow-xs">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Official Resume Document
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Hemanta Dutta &bull; Jorhat, Assam
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyText}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                  title="Copy resume text to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-2xs"
                  title="Print resume"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>Print</span>
                </button>

                {/* THE DOWNLOAD PDF BUTTON WITH SUBTLE HOVER SCALE EFFECT */}
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF3F6C] to-[#FF547D] text-white text-xs font-bold shadow-md shadow-pink-500/20 transform transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-pink-500/30"
                  title="Download and print clean PDF of this resume"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Resume Sheet matching PDF accurately */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/50">
              <div
                id="printable-resume"
                className="max-w-3xl mx-auto bg-white rounded-xl shadow-xs border border-slate-200/80 p-6 sm:p-10 font-sans text-slate-800 leading-normal"
              >
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
                  <div className="space-y-1.5">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                      {resumeData.personal.name}
                    </h1>
                    <div className="flex items-start gap-1.5 text-xs text-slate-600 max-w-md pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#FF3F6C] flex-shrink-0 mt-0.5" />
                      <span>{resumeData.personal.address}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#FF3F6C]" />
                        {resumeData.personal.phone}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#FF3F6C]" />
                        {resumeData.personal.email}
                      </span>
                    </div>
                  </div>

                  {/* Profile photo badge */}
                  <div className="w-20 h-24 rounded-lg bg-gradient-to-br from-pink-100 to-rose-200 border-2 border-pink-300 flex flex-col items-center justify-center p-2 text-center shadow-inner self-end sm:self-start">
                    <span className="text-2xl">👨‍💼</span>
                    <span className="text-[9px] font-bold text-slate-800 mt-1 uppercase tracking-wider">
                      HEMANTA
                    </span>
                  </div>
                </div>

                {/* OBJECTIVE */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-l-4 border-[#FF3F6C] pl-2.5 flex items-center gap-2">
                    OBJECTIVE
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-3.5 text-justify">
                    {resumeData.personal.objective}
                  </p>
                </div>

                {/* EXPERIENCE */}
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-l-4 border-[#FF3F6C] pl-2.5 flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#FF3F6C]" />
                    EXPERIENCE
                  </h3>

                  <div className="space-y-4 pl-3.5">
                    {/* Tax Consultant Firm */}
                    <div className="space-y-1.5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                        <strong className="text-slate-900 font-bold">Tax Consultant Firm</strong>
                        <span className="text-slate-500 font-medium">Jorhat, Assam</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 italic">
                        <span className="font-semibold text-slate-700 not-italic">Accountant</span>
                        <span>Duration: 3 Years</span>
                      </div>
                      <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1 pt-1">
                        <li>Managed and recorded daily financial transactions, ensuring accurate accounting practices.</li>
                        <li>Operated Tally software and Ezy Rakod for comprehensive bookkeeping and taxation data entry.</li>
                        <li>Assisted in the preparation and filing of Goods and Services Tax (GST) returns.</li>
                        <li>Maintained ledgers, reconciled bank statements, and generated financial reports for clients.</li>
                      </ul>
                    </div>

                    {/* Nestle Distributor */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm">
                        <strong className="text-slate-900 font-bold">Nestle Distributor</strong>
                        <span className="text-slate-500 font-medium">Jorhat, Assam</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 italic">
                        <span className="font-semibold text-slate-700 not-italic">Sales Representative</span>
                        <span>Duration: 1 Year</span>
                      </div>
                      <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1 pt-1">
                        <li>Facilitated the distribution and sales of Nestle products within the designated territory.</li>
                        <li>Developed and maintained relationships with local retailers to optimize product placement and volume.</li>
                        <li>Tracked inventory levels and ensured timely delivery of consumer goods.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-l-4 border-[#FF3F6C] pl-2.5 flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-[#FF3F6C]" />
                    EDUCATION
                  </h3>

                  <div className="space-y-3 pl-3.5 text-xs sm:text-sm">
                    {/* B.Com */}
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>C.K.B. College, Teok (Dibrugarh University)</span>
                        <span className="text-xs text-slate-500 font-normal">Jorhat, Assam</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Bachelor of Commerce (B.Com) Honors; CGPA: 6.69</span>
                        <span className="font-semibold text-slate-700">Graduated: 2023</span>
                      </div>
                    </div>

                    {/* AHSEC */}
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>AHSEC Board</span>
                        <span className="text-xs text-slate-500 font-normal">Assam</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>12th Standard (Higher Secondary); 39.8%</span>
                        <span className="font-semibold text-slate-700">2020</span>
                      </div>
                    </div>

                    {/* SEBA */}
                    <div>
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>SEBA Board</span>
                        <span className="text-xs text-slate-500 font-normal">Assam</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>10th Standard (High School); 42.0%</span>
                        <span className="font-semibold text-slate-700">2018</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CERTIFICATIONS & QUALIFICATIONS */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-l-4 border-[#FF3F6C] pl-2.5 flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-[#FF3F6C]" />
                    CERTIFICATIONS & QUALIFICATIONS
                  </h3>
                  <ul className="list-disc list-outside pl-7 text-xs text-slate-700 space-y-1">
                    <li><strong>PGDCA:</strong> Post Graduate Diploma in Computer Application</li>
                    <li><strong>Hardware & DTP:</strong> Diploma in Computer Hardware Repairing & Desktop Publishing</li>
                    <li><strong>Computer Application:</strong> Diploma in Computer Application</li>
                  </ul>
                </div>

                {/* SKILLS */}
                <div className="mt-6 space-y-2.5">
                  <h3 className="text-sm font-bold tracking-wider text-slate-900 uppercase border-l-4 border-[#FF3F6C] pl-2.5 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 text-[#FF3F6C]" />
                    SKILLS
                  </h3>
                  <div className="pl-3.5 space-y-1.5 text-xs text-slate-700">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                      <span className="font-bold sm:col-span-4 text-slate-900">Software & Tools:</span>
                      <span className="sm:col-span-8">Tally, Ezy Rakod, MS Excel, MS Word, MS PowerPoint</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                      <span className="font-bold sm:col-span-4 text-slate-900">Core Competencies:</span>
                      <span className="sm:col-span-8">Accounting, GST Filing, Sales & Distribution, Computer Hardware Repairing, DTP</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                      <span className="font-bold sm:col-span-4 text-slate-900">Languages:</span>
                      <span className="sm:col-span-8">Assamese, Hindi, English</span>
                    </div>
                  </div>
                </div>

                {/* DECLARATION */}
                <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-700 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase border-l-4 border-[#FF3F6C] pl-2 mb-1.5">
                      DECLARATION
                    </h3>
                    <p className="italic pl-3 text-slate-600">
                      {resumeData.personal.declaration}
                    </p>
                  </div>

                  <div className="flex justify-between items-end pt-3 pl-3">
                    <div className="space-y-1">
                      <div><strong className="text-slate-800">Date:</strong> {new Date().toLocaleDateString('en-GB')}</div>
                      <div><strong className="text-slate-800">Place:</strong> {resumeData.personal.place}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 tracking-wide">
                        ({resumeData.personal.name})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="px-6 py-3.5 bg-white border-t border-pink-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Verified authentic resume data from official PDF document
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors font-medium"
                >
                  Close
                </button>
                {/* Second subtle scale hover button in footer */}
                <button
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#FF3F6C] text-white font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
