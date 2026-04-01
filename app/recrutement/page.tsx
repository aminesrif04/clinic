"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Briefcase, Users, Sparkles, Send, Upload, ShieldCheck, HeartPulse, CheckCircle2 } from "lucide-react";

export default function RecruitmentPage() {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Content Dictionaries (Shortened Text)
  const content = {
    heroTitle: {
      fr: "Rejoignez l'Excellence",
      ar: "انضم إلى التميز"
    },
    heroSubtitle: {
      fr: "Intégrez une équipe motivée à améliorer le quotidien de nos patients.",
      ar: "انضم إلى فريق متحمس لتحسين الحياة اليومية لمرضانا."
    },
    whyUsTitle: {
      fr: "Pourquoi nous ?",
      ar: "لماذا نحن؟"
    },
    applyTitle: {
      fr: "Candidature Spontanée",
      ar: "طلب توظيف"
    },
    applyDesc: {
      fr: "Envoyez-nous votre profil, notre département prendra contact avec vous.",
      ar: "أرسل لنا ملفك، وسيتواصل قسمنا معك قريباً."
    },
    form: {
      name: { fr: "Nom Complet", ar: "الاسم الكامل" },
      email: { fr: "Email", ar: "البريد الإلكتروني" },
      phone: { fr: "Téléphone", ar: "الهاتف" },
      position: { fr: "Poste souhaité", ar: "المنصب المطلوب" },
      cv: { fr: "Joindre mon CV", ar: "إرفاق السيرة الذاتية" },
      message: { fr: "Votre message (Optionnel)", ar: "رسالتك (اختياري)" },
      submit: { fr: "Envoyer ma candidature", ar: "إرسال الطلب" },
      sending: { fr: "Envoi en cours...", ar: "جاري الإرسال..." },
      success: { fr: "Candidature envoyée avec succès !", ar: "تم إرسال الطلب بنجاح!" }
    }
  };

  const benefits = [
    {
      icon: <Users size={28} />,
      title_fr: "Équipe Multidisciplinaire",
      title_ar: "فريق متعدد التخصصات",
      desc_fr: "Évoluez au sein d'une équipe soudée et performante.",
      desc_ar: "طور مهاراتك داخل فريق متماسك وعالي الأداء."
    },
    {
      icon: <Sparkles size={28} />,
      title_fr: "Plateau Moderne",
      title_ar: "منصة حديثة",
      desc_fr: "Travaillez avec des équipements de dernière génération.",
      desc_ar: "العمل باستخدام أحدث المعدات الطبية."
    },
    {
      icon: <ShieldCheck size={28} />,
      title_fr: "Évolution Professionnelle",
      title_ar: "تطور مهني",
      desc_fr: "Profitez d'opportunités de formation continue.",
      desc_ar: "استفد من فرص التدريب والتطوير المستمر."
    },
    {
      icon: <HeartPulse size={28} />,
      title_fr: "Impact Quotidien",
      title_ar: "تأثير يومي",
      desc_fr: "Sauvez des vies et procurez du réconfort chaque jour.",
      desc_ar: "أنقذ الأرواح وقدم الرعاية كل يوم."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-24 flex flex-col items-center justify-center bg-[#051c2e] overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-secondary/20 blur-[120px] rounded-full mix-blend-screen" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.15, 0.1] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-1/2 -left-1/4 w-[60vw] h-[60vw] bg-primary/30 blur-[150px] rounded-full mix-blend-screen" 
          />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-secondary/20 border border-white/10"
          >
            <Briefcase size={40} className="text-secondary" strokeWidth={1.5} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight mb-6"
          >
            {language === 'ar' ? content.heroTitle.ar : content.heroTitle.fr}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[#9fc1d8] max-w-2xl mx-auto font-medium"
          >
            {language === 'ar' ? content.heroSubtitle.ar : content.heroSubtitle.fr}
          </motion.p>
        </div>

        {/* Diagonal Cut */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-[50px] md:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120H0V0l1200 120z" fill="#f4f7fb"></path>
            </svg>
        </div>
      </section>

      {/* Main Content Split Layout */}
      <main className="relative z-20 w-full max-w-[1200px] px-6 mx-auto py-12 md:py-16">
        <div className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-start `}>
          
          {/* Left: Value Proposition */}
          <div className="flex-1 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: language === 'ar' ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-3xl font-black text-[#051c2e] mb-2 flex items-center gap-4 justify-start`}>
                 <span className="w-10 h-1 bg-secondary rounded-full inline-block"></span>
                {language === 'ar' ? content.whyUsTitle.ar : content.whyUsTitle.fr}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="bg-white p-6 rounded-3xl shadow-[0_10px_30px_rgba(5,28,46,0.03)] border border-slate-100 hover:border-secondary/30 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-4 `}>
                    {benefit.icon}
                  </div>
                  <h3 className={`text-lg font-bold text-[#051c2e] mb-2 text-left`}>
                    {language === 'ar' ? benefit.title_ar : benefit.title_fr}
                  </h3>
                  <p className={`text-slate-500 font-medium text-sm leading-relaxed text-left`}>
                    {language === 'ar' ? benefit.desc_ar : benefit.desc_fr}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: The Form Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[480px] shrink-0"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(5,28,46,0.08)] border border-slate-100 relative overflow-hidden">
              
              <div className={`mb-8 text-left`}>
                <h3 className="text-2xl font-black text-[#051c2e] mb-2">
                  {language === 'ar' ? content.applyTitle.ar : content.applyTitle.fr}
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  {language === 'ar' ? content.applyDesc.ar : content.applyDesc.fr}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Basic Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <input 
                      type="text" 
                      required
                      placeholder={language === 'ar' ? content.form.name.ar : content.form.name.fr} 
                      className={`w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-left`}
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      required
                      placeholder={language === 'ar' ? content.form.phone.ar : content.form.phone.fr} 
                      className={`w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-left`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input 
                    type="email" 
                    required
                    placeholder={language === 'ar' ? content.form.email.ar : content.form.email.fr} 
                    className={`w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-left`}
                  />
                </div>

                {/* Position */}
                <div>
                  <select 
                    required
                    className={`w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all appearance-none cursor-pointer text-left`}
                    
                  >
                    <option value="" disabled selected>{language === 'ar' ? content.form.position.ar : content.form.position.fr}</option>
                    <option value="medecin">{language === 'ar' ? 'طبيب متخصص' : 'Médecin Spécialiste'}</option>
                    <option value="infirmier">{language === 'ar' ? 'ممرض(ة)' : 'Infirmier / Infirmière'}</option>
                    <option value="admin">{language === 'ar' ? 'إدارة' : 'Administration'}</option>
                    <option value="autre">{language === 'ar' ? 'أخرى' : 'Autre'}</option>
                  </select>
                </div>

                {/* CV Upload */}
                <div>
                  <label className={`w-full flex items-center justify-center gap-3 bg-secondary/10 border-2 border-dashed border-secondary/30 text-secondary hover:bg-secondary/20 hover:border-secondary px-5 py-4 rounded-2xl cursor-pointer transition-all `}>
                    <Upload size={20} />
                    <span className="font-bold">{language === 'ar' ? content.form.cv.ar : content.form.cv.fr}</span>
                    <input type="file" required className="hidden" accept=".pdf,.doc,.docx" />
                  </label>
                </div>

                {/* Message */}
                <div>
                  <textarea 
                    rows={3}
                    placeholder={language === 'ar' ? content.form.message.ar : content.form.message.fr} 
                    className={`w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all resize-none text-left`}
                  ></textarea>
                </div>

                {/* Submit */}
                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`w-full py-4 px-8 rounded-2xl bg-[#051c2e] hover:bg-secondary text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_20px_rgba(5,28,46,0.15)] hover:shadow-[0_10px_25px_rgba(0,198,198,0.3)] disabled:opacity-70 disabled:cursor-not-allowed `}
                >
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <CheckCircle2 size={24} />
                        <span>{language === 'ar' ? content.form.success.ar : content.form.success.fr}</span>
                      </motion.div>
                    ) : isSubmitting ? (
                      <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <Upload size={20} />
                        </motion.div>
                        <span>{language === 'ar' ? content.form.sending.ar : content.form.sending.fr}</span>
                      </motion.div>
                    ) : (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Send size={20} className={isHovered ? 'animate-bounce' : ''} />
                        <span>{language === 'ar' ? content.form.submit.ar : content.form.submit.fr}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
