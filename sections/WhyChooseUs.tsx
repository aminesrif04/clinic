"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export const WhyChooseUs = () => {
  const { t, language } = useLanguage();

  const reasons = [
    {
      title: t("why.quality"),
      image: "/images/best-quality.png"
    },
    {
      title: t("why.experience"),
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80"
    },
    {
      title: t("why.tech"),
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80"
    },
    {
      title: t("why.approach"),
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] relative overflow-hidden" id="about">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[400px] bg-[#91B5C4]/20 rounded-[100%] blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rotate-45" />

      <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-widest text-sm mb-4 uppercase"
          >
            {t("why.subtitle")}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-secondary inline-block"
          >
            {t("why.title")}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, type: "spring" }}
              className="group cursor-pointer perspective-1000"
            >
              <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(0,168,168,0.15)] hover:bg-white/90 transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-60 overflow-hidden rounded-xl mb-6 shadow-inner">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-2"
                    style={{ backgroundImage: `url(${reason.image})` }}
                  />
                  {/* Premium gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                </div>
                <h3 className={`font-bold text-primary group-hover:text-secondary transition-all duration-300 px-2 pb-2 ${language === 'ar' ? 'text-lg group-hover:-translate-x-2' : 'text-[15px] md:text-base group-hover:translate-x-2'}`}>
                  {reason.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
