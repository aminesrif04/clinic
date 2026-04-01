"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { Departments } from "@/sections/Departments";
import { Doctors } from "@/sections/Doctors";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, HeartPulse, Lightbulb, Award, ChevronRight, Activity, Phone } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const values = [
    {
      icon: <Award size={32} className="text-secondary" />,
      title_fr: "L'Excellence",
      title_ar: "التميز",
      desc_fr: "Un niveau d'exigence maximal dans la sélection de nos experts et dans l'exécution de nos protocoles de soins.",
      desc_ar: "مستوى طلب أقصى في اختيار خبرائنا وفي تنفيذ بروتوكولات الرعاية الخاصة بنا.",
    },
    {
      icon: <Lightbulb size={32} className="text-secondary" />,
      title_fr: "L'Avant-Garde",
      title_ar: "الابتكار الرائد",
      desc_fr: "Des blocs opératoires exclusifs et une technologie de diagnostic de rupture, mis à la disposition directe de nos patients.",
      desc_ar: "غرف عمليات حصرية وتكنولوجيا تشخيص مبتكرة، موضوعة مباشرة رهن إشارة مرضانا.",
    },
    {
      icon: <HeartPulse size={32} className="text-secondary" />,
      title_fr: "L'Humanité",
      title_ar: "الرعاية الإنسانية",
      desc_fr: "Une dimension humaine au centre de notre pratique. Vous n'êtes pas un dossier médical, vous êtes notre priorité absolue.",
      desc_ar: "بُعد إنساني في صميم ممارستنا. أنتم لستم مجرد ملف طبي، بل أنتم أولويتنا المطلقة.",
    },
    {
      icon: <ShieldCheck size={32} className="text-secondary" />,
      title_fr: "L'Intégrité",
      title_ar: "النزاهة والأمان",
      desc_fr: "Une transparence totale, une asepsie rigoureuse et le respect inconditionnel de votre dignité et du secret médical.",
      desc_ar: "شفافية تامة، تعقيم صارم، واحترام غير مشروط لكرامتكم وللسرية الطبية.",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-[#051c2e]">
        {/* Abstract animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-secondary/10 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto flex flex-col ${isAr ? 'items-end text-right' : 'items-start text-left'}`}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full mb-6">
              <Activity className="text-secondary" size={18} />
              <span className="text-white font-bold tracking-widest uppercase text-xs md:text-sm">
                {isAr ? 'تعرف علينا' : 'À Propos de Nous'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              {isAr ? 'التميز الطبي، ' : 'L\'Excellence Médicale, '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-[#00f2f2]">
                {isAr ? 'في قلب حياتكم' : 'Au Cœur de Votre Vie'}
              </span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              {isAr 
                ? 'أكثر من مجرد بنية تحتية طبية، مصحة تافيلالت هي نظام بيئي متكامل مكرس لرفاهيتكم. نحن نجمع بين التكنولوجيا الرائدة ودفء الخبرة الإنسانية.'
                : 'Plus qu\'une infrastructure médicale, la Polyclinique Tafilalet est un écosystème de soins dédié à votre bien-être. Nous allions l\'avant-garde technologique à la chaleur de l\'expertise humaine.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Qui Sommes-Nous */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-6">
          <div className={`flex flex-col lg:flex-row gap-16 items-center ${isAr ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Image / Visual */}
            <motion.div 
              initial={{ opacity: 0, x: isAr ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-[0_30px_60px_rgba(5,28,46,0.15)] group">
                <div className="absolute inset-0 bg-primary/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1600" alt="Clinic Interior" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                
                {/* Floating Satisfaction Card */}
                <div className={`absolute bottom-8 ${isAr ? 'left-8' : 'right-8'} bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl z-20 border border-white/50 animate-bounce-slow`}>
                  <div className="text-4xl font-black text-secondary mb-1">10+</div>
                  <div className="text-primary font-bold text-sm tracking-widest uppercase">
                    {isAr ? 'سنوات من الخبرة' : 'Années d\'Expertise'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: isAr ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`lg:w-1/2 flex flex-col ${isAr ? 'text-right' : 'text-left'}`}
            >
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-8">
                {isAr ? 'تاريخنا، صحتكم' : 'Notre Histoire, Votre Santé'}
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                <p>
                  {isAr 
                    ? 'تأسست مصحة تافيلالت على رؤية تجمع بين التميز والقرب، لتعيد اليوم صياغة معايير الرعاية الصحية. صُممت مؤسستنا لتكون قطباً حقيقياً للتميز متعدد التخصصات، يجمع تحت سقف واحد أحدث التخصصات الطبية والجراحية وأكثر منصات استكشاف الأشعة والمختبرات تقدماً.'
                    : 'Fondée sur une vision d\'excellence et de proximité, la Polyclinique Tafilalet redéfinit aujourd\'hui les standards de la prise en charge médicale. Notre institution, conçue comme un véritable pôle d\'excellence multidisciplinaire, réunit sous un même toit les spécialités d\'avant-garde et les plateaux d\'exploration les plus avancés.'
                  }
                </p>
                <p>
                  {isAr
                    ? 'إلى جانب منصتنا التقنية من الجيل الأخير، فإن قوتنا الحقيقية تكمن في رأس مالنا البشري. لقد جمعنا نخبة من الأطباء والجراحين والممارسين المتمرسين، تحركهم غاية واحدة: مرافقة كل مريض بدقة تشخيصية لا متناهية وبروتوكولات علاجية مصممة خصيصاً له.'
                    : 'Au-delà de notre plateau technique de dernière génération, ce qui fait notre force, c\'est notre capital humain. Nous avons réuni un collège de médecins, de chirurgiens d\'élite et de praticiens chevronnés, tous mus par une vocation : accompagner chaque patient avec une précision diagnostique infaillible.'
                  }
                </p>
                <blockquote className="border-l-4 border-secondary pl-6 pr-6 bg-secondary/5 py-4 rounded-r-xl italic text-primary dark-theme-border-fix relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Award size={64} />
                  </div>
                  <span className="relative z-10">
                    {isAr
                      ? '« طموحنا يتجاوز مجرد الرعاية السريرية: نحن نبني علاقة ثقة مستدامة مع كل مريض، حيث تمتزج الصرامة العلمية العالية مع أقصى درجات التعاطف الإنساني. »'
                      : '« Notre ambition dépasse le soin clinique : nous bâtissons une relation de confiance pérenne avec chaque patient, où rigueur scientifique et empathie ne font qu\'un. »'
                    }
                  </span>
                </blockquote>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Engagement Service (Full Width Premium Banner) */}
      <section className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-secondary/20 blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ShieldCheck size={48} className="mx-auto text-secondary mb-8" />
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              {isAr ? 'مسار رعاية سلس ومبتكر' : 'Une Trajectoire de Soins Fluide & Innovante'}
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed">
              {isAr
                ? 'لأن كل ثانية مهمة في مسار تعافيكم، قمنا بتجميع كافة الأقطاب الحيوية — من التصوير الطبي الدقيق إلى غرف العمليات، ومن قسم المستعجلات إلى الإقامة المتميزة. النتيجة: رعاية شاملة وبدون فترات انتظار، حيث يتولى فريقنا متعدد التخصصات تنسيق صحتكم على مدار 24 ساعة.'
                : 'Parce que chaque seconde compte dans votre parcours de guérison, nous avons centralisé l\'ensemble des pôles vitaux — de l\'imagerie au bloc opératoire, des urgences à l\'hospitalisation. Résultat : une prise en charge globale, sans délais d\'attente, où votre santé est coordonnée avec excellence 24h/24.'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Les Valeurs / Pillars section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
              {isAr ? 'قيمنا الأساسية' : 'Nos Piliers & Valeurs'}
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              {isAr ? 'الأسس التي نبني عليها ثقتكم.' : 'Les fondations sur lesquelles repose votre confiance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`group relative overflow-hidden bg-white p-8 rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_25px_50px_rgba(0,168,168,0.15)] hover:border-secondary/30 transition-all duration-500 ${isAr ? 'text-right' : 'text-left'}`}
              >
                {/* Elegant glow effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] group-hover:bg-secondary/20 transition-colors duration-500" />
                
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm border border-slate-100">
                  {val.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                  {isAr ? val.title_ar : val.title_fr}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {isAr ? val.desc_ar : val.desc_fr}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Missing PiRA Sections for Completeness (Nos spécialités & Notre corps médical) */}
      <Departments />
      <Doctors />

      {/* Assistance Santé / Contact CTA */}
      <section className="py-24 bg-white relative border-t border-slate-200/60 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`max-w-4xl mx-auto bg-slate-50 border border-slate-200/60 p-10 md:p-16 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group`}
          >
            {/* Gloss shine over CTA */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-secondary text-white mb-8 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <Phone size={32} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-6">
              {isAr ? 'أنتم بين أيدٍ أمينة' : 'Vous Êtes Entre De Bonnes Mains'}
            </h2>
            <p className="text-slate-600 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              {isAr 
                ? 'سواء كان الأمر يتعلق ببرمجة تدخل جراحي دقيق، أو تنظيم فحص وقائي شامل، أو الاستجابة لحالة طوارئ ليلية، فإن مصحة تافيلالت تقف دائماً بجانبكم.'
                : 'Que ce soit pour programmer une intervention de pointe, organiser un bilan de santé préventif ou répondre à une urgence nocturne critique, la Polyclinique Tafilalet reste à vos côtés.'
              }
            </p>
            
            <div className={`flex flex-col sm:flex-row justify-center items-center gap-6 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
              <a href="/faq" className="px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary shadow-sm hover:text-white transition-colors duration-300 w-full sm:w-auto">
                {isAr ? 'الأسئلة المتكررة' : 'Consulter la F.A.Q'}
              </a>
              <a href="/contact" className="px-8 py-4 bg-secondary text-white font-bold rounded-full shadow-[0_10px_20px_rgba(0,168,168,0.3)] hover:shadow-[0_15px_30px_rgba(0,168,168,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex justify-center items-center gap-2">
                {isAr ? 'اتصل بالاستقبال' : 'Contactez la Réception'} 
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
}
