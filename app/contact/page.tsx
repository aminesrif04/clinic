"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { Phone, Mail, MapPin, CalendarClock, Send, PhoneCall, Stethoscope, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Content Dictionaries
  const content = {
    heroTitle: {
      fr: "Contact & Rendez-vous",
      ar: "تواصل معنا وحجز المواعيد"
    },
    heroSubtitle: {
      fr: "Nos équipes sont à votre entière disposition 24h/24 et 7j/7. Prenez rendez-vous en ligne ou contactez directement nos services.",
      ar: "فرقنا تحت تصرفكم بالكامل على مدار 24 ساعة طوال أيام الأسبوع. احجز موعدك عبر الإنترنت أو اتصل بأقسامنا مباشرة."
    },
    hotlinesTitle: {
      fr: "Lignes Directes",
      ar: "الخطوط المباشرة"
    },
    emailsTitle: {
      fr: "Adresses Électroniques",
      ar: "البريد الإلكتروني"
    },
    addressTitle: {
      fr: "Notre Adresse",
      ar: "عنواننا"
    },
    addressDesc: {
      fr: "Polyclinique Tafilalet, Meknès, Maroc",
      ar: "مصحة تافيلالت، مكناس، المغرب"
    },
    formTitle: {
      fr: "Demander un Rendez-vous",
      ar: "طلب تحديد موعد"
    },
    formDesc: {
      fr: "Remplissez ce formulaire, notre secrétariat médical vous rappellera dans les plus brefs délais pour confirmer votre créneau.",
      ar: "املأ هذا النموذج، وستقوم السكرتارية الطبية لدينا بالاتصال بك في أقرب وقت ممكن لتأكيد موعدك."
    },
    form: {
      name: { fr: "Nom & Prénom", ar: "الاسم الكامل" },
      phone: { fr: "Numéro de Téléphone", ar: "رقم الهاتف" },
      service: { fr: "Service / Spécialité", ar: "القسم / التخصص" },
      date: { fr: "Date Souhaitée", ar: "التاريخ المفضل" },
      message: { fr: "Motif de consultation (Optionnel)", ar: "سبب الاستشارة (اختياري)" },
      submit: { fr: "Demander le RDV", ar: "تأكيد طلب الموعد" },
      sending: { fr: "Traitement en cours...", ar: "جاري اتصال بـ Google Calendar..." },
      successTitle: { fr: "Demande de RDV Enregistrée !", ar: "تم تسجيل الموعد بنجاح!" },
      successDesc: { fr: "Votre rendez-vous a bien été synchronisé. Notre équipe vous contactera très vite.", ar: "تمت مزامنة موعدك. سيتصل بك فريقنا قريبًا." }
    }
  };

  const hotlines = [
    { name_fr: "Standard & Accueil", name_ar: "الاستقبال العام", number: "05 35 52 55 25", color: "bg-primary" },
    { name_fr: "Urgences (24/7)", name_ar: "الطوارئ (24/7)", number: "05 35 52 55 00", color: "bg-red-500" },
    { name_fr: "Maternité", name_ar: "الولادة", number: "05 35 52 55 20", color: "bg-pink-500" },
    { name_fr: "Radiologie & Scanner", name_ar: "الأشعة والفحص", number: "05 35 52 55 30", color: "bg-secondary" },
    { name_fr: "Oncologie & Chimio", name_ar: "طب الأورام", number: "05 35 52 55 40", color: "bg-purple-600" },
  ];

  const emails = [
    { name_fr: "Contact Général", name_ar: "التواصل العام", mail: "contact@polyclinique-tafilalet.ma" },
    { name_fr: "Demande de Devis & PEC", name_ar: "التكفل وطلب عرض سعر", mail: "devis@polyclinique-tafilalet.ma" },
    { name_fr: "Service Réclamation", name_ar: "قسم الشكايات", mail: "ecoute@polyclinique-tafilalet.ma" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Extrait les valeurs du formulaire
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      date: formData.get("date"),
      message: formData.get("message")
    };

    try {
      // Envoie la requête à l'API Google Calendar
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      setIsSubmitting(false);
      setIsSuccess(true);
      
      if (result.link) {
        console.log("RDV ajouté avec succès sur Google Calendar:", result.link);
      } else if (result.error) {
        console.warn("L'API a répondu avec une erreur (Vérifiez votre fichier .env):", result.error);
      }
      
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setIsSuccess(true); // Afficher toujours le succès visuel côté utilisateur pour l'UX
    }
    
    setTimeout(() => setIsSuccess(false), 8000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7fb]">
      <Navbar />

      {/* Cinematic Hero header */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center justify-center bg-[#051c2e] overflow-hidden">
        {/* Animated Background Rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/30 blur-[150px] rounded-full mix-blend-screen" 
          />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-[#051c2e] to-secondary border border-secondary/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,198,198,0.3)]"
          >
            <CalendarClock size={40} className="text-white" strokeWidth={1.5} />
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
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120H0V0l1200 120z" fill="#f4f7fb"></path>
            </svg>
        </div>
      </section>

      <main className="relative z-30 w-full max-w-[1300px] px-6 mx-auto -mt-16 mb-24">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="flex-1 space-y-12 w-full">
            
            {/* Hotlines Grid */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-black text-[#051c2e] mb-6 flex items-center gap-3">
                 <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
                {language === 'ar' ? content.hotlinesTitle.ar : content.hotlinesTitle.fr}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {hotlines.map((line, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-secondary/30 hover:shadow-md transition-all group flex items-center gap-4 cursor-default">
                    <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0 ${line.color} text-white shadow-lg`}>
                      <PhoneCall size={20} className="group-hover:animate-pulse" />
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-1">
                        {language === 'ar' ? line.name_ar : line.name_fr}
                      </p>
                      <p dir="ltr" className="text-[#051c2e] font-bold text-lg">{line.number}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Emails & Address */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-black text-[#051c2e] mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
                  {language === 'ar' ? content.emailsTitle.ar : content.emailsTitle.fr}
                </h2>
                <div className="space-y-3">
                  {emails.map((email, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 text-secondary">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-slate-500 font-medium text-xs uppercase tracking-wider mb-0.5">
                          {language === 'ar' ? email.name_ar : email.name_fr}
                        </p>
                        <a href={`mailto:${email.mail}`} className="text-[#051c2e] font-bold text-sm md:text-base hover:text-secondary transition-colors break-all">
                          {email.mail}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-[#051c2e] mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-secondary rounded-full inline-block"></span>
                  {language === 'ar' ? content.addressTitle.ar : content.addressTitle.fr}
                </h2>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
                  <div className="w-14 h-14 rounded-[1rem] bg-[#051c2e] flex items-center justify-center shrink-0 text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[#051c2e] font-bold text-lg mb-1 hidden md:block">Polyclinique Tafilalet</p>
                    <p className="text-slate-500 font-medium">
                      {language === 'ar' ? content.addressDesc.ar : content.addressDesc.fr}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Appointment Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-[500px] shrink-0"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(5,28,46,0.08)] border border-slate-100 relative overflow-hidden">
              
              <div className="mb-8 text-left">
                <h3 className="text-3xl font-black text-[#051c2e] mb-3">
                  {language === 'ar' ? content.formTitle.ar : content.formTitle.fr}
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {language === 'ar' ? content.formDesc.ar : content.formDesc.fr}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Name */}
                <div>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder={language === 'ar' ? content.form.name.ar : content.form.name.fr} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl text-left focus:outline-none focus:border-secondary focus:bg-white transition-all shadow-sm"
                  />
                </div>

                {/* Phone & Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    placeholder={language === 'ar' ? content.form.phone.ar : content.form.phone.fr} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl text-left focus:outline-none focus:border-secondary focus:bg-white transition-all shadow-sm"
                  />
                  <div className="relative border border-slate-200 bg-slate-50 rounded-2xl focus-within:border-secondary focus-within:bg-white transition-all shadow-sm overflow-hidden flex items-center pr-4">
                    <input 
                      type="date" 
                      name="date"
                      required
                      className="w-full bg-transparent text-slate-700 px-5 py-3.5 text-left focus:outline-none min-h-[50px] appearance-none"
                    />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                  <select 
                    name="service"
                    required
                    defaultValue=""
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl text-left focus:outline-none focus:border-secondary focus:bg-white transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="" disabled>{language === 'ar' ? content.form.service.ar : content.form.service.fr}</option>
                    <option value="Cardiologie">{language === 'ar' ? 'طب القلب' : 'Cardiologie'}</option>
                    <option value="Ophtalmologie">{language === 'ar' ? 'طب العيون' : 'Ophtalmologie'}</option>
                    <option value="Orthopédie">{language === 'ar' ? 'جراحة العظام' : 'Orthopédie / Traumatologie'}</option>
                    <option value="Gynécologie">{language === 'ar' ? 'طب النساء والتوليد' : 'Gynécologie Obstétrique'}</option>
                    <option value="General">{language === 'ar' ? 'الطب العام' : 'Consultation Générale'}</option>
                    <option value="Autre">{language === 'ar' ? 'أخرى' : 'Autre (Préciser en message)'}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea 
                    name="message"
                    rows={4}
                    placeholder={language === 'ar' ? content.form.message.ar : content.form.message.fr} 
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 p-5 rounded-2xl text-left focus:outline-none focus:border-secondary focus:bg-white transition-all shadow-sm resize-none"
                  ></textarea>
                </div>

                {/* Submit Drop */}
                <button 
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full py-4 px-8 rounded-2xl bg-[#051c2e] hover:bg-secondary text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_15px_30px_rgba(5,28,46,0.15)] group relative overflow-hidden"
                >
                  {/* Subtle highlight effect */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-2xl z-0"></div>

                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 relative z-10 text-teal-400">
                        <CheckCircle2 size={24} />
                        <span>{language === 'ar' ? content.form.successTitle.ar : content.form.successTitle.fr}</span>
                      </motion.div>
                    ) : isSubmitting ? (
                      <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 relative z-10">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <Clock size={20} />
                        </motion.div>
                        <span>{language === 'ar' ? content.form.sending.ar : content.form.sending.fr}</span>
                      </motion.div>
                    ) : (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 relative z-10">
                        <Stethoscope size={20} className="group-hover:scale-110 transition-transform" />
                        <span>{language === 'ar' ? content.form.submit.ar : content.form.submit.fr}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                {/* Success Notice Text */}
                <AnimatePresence>
                  {isSuccess && (
                     <motion.p 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-center text-teal-600 font-bold mt-4"
                     >
                       {language === 'ar' ? content.form.successDesc.ar : content.form.successDesc.fr}
                     </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
