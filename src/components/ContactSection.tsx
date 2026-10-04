import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, FileText, Download } from 'lucide-react';
import { resumeData } from '../data/resumeData';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Accounting / Tax Opportunity',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Accounting / Tax Opportunity', message: '' });
    }, 4500);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#FFF8FA] to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 border border-pink-200 text-[#FF3F6C] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Let's Discuss Business, Taxation & Opportunities
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Feel free to reach out directly via phone, email, or send a quick message below. Available for accounting, tax compliance, and commercial operations roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Direct Contact Information</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`tel:${resumeData.personal.phone}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-pink-50/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#FF3F6C] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Call or WhatsApp</div>
                    <div className="font-bold text-slate-900 mt-0.5">{resumeData.personal.phone}</div>
                    <div className="text-slate-500 text-xs mt-0.5">Assam & Nationwide</div>
                  </div>
                </a>

                <a
                  href={`mailto:${resumeData.personal.email}`}
                  className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-pink-50/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#FF3F6C] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Email Address</div>
                    <div className="font-bold text-slate-900 mt-0.5 break-all">{resumeData.personal.email}</div>
                    <div className="text-slate-500 text-xs mt-0.5">Prompt responses</div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#FF3F6C] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-400 uppercase">Postal Address</div>
                    <div className="font-semibold text-slate-800 mt-0.5 text-xs leading-relaxed">
                      {resumeData.personal.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Resume Download Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FFF0F4] to-white border border-pink-200/80 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF3F6C]" />
                <h4 className="text-sm font-bold text-slate-900">Need Hemanta's Resume PDF?</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Open the interactive slide-in modal to view, print, or download the official curriculum vitae.
              </p>
              <button
                onClick={onOpenResume}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FF3F6C] text-white text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 shadow-md shadow-pink-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Resume</span>
              </button>
            </div>
          </div>

          {/* Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-pink-100 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Send a Message</h3>
              <p className="text-xs text-slate-500 mb-6">
                Looking for an accountant, tax consultant, or sales operations specialist? Send an inquiry directly.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-emerald-900">Message Sent Successfully!</h4>
                  <p className="text-xs text-emerald-700">
                    Thank you for reaching out. Hemanta will reply to your message promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe / Company"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF3F6C] focus:ring-2 focus:ring-[#FF3F6C]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF3F6C] focus:ring-2 focus:ring-[#FF3F6C]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF3F6C] focus:ring-2 focus:ring-[#FF3F6C]/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Message / Job Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the opportunity or query..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#FF3F6C] focus:ring-2 focus:ring-[#FF3F6C]/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF3F6C] to-[#FF547D] text-white font-bold text-xs shadow-md shadow-pink-500/20 hover:brightness-105 active:scale-95 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry to Hemanta</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
