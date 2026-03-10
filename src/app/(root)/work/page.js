"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/component/ScrollReveal";
import TiltCard from "@/component/TiltCard";

const projects = [
  {
    id: 1,
    title: "E-Commerce Revolution",
    category: "Full Stack Development",
    image: "/image/laptop.png",
    link: "#",
  },
  {
    id: 2,
    title: "Premium Real Estate",
    category: "UI/UX Design",
    image: "/image/black.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Crypto Dashboard",
    category: "React App",
    image: "/image/ccc.png",
    link: "#",
  },
  {
    id: 4,
    title: "Fitness Tracker",
    category: "Mobile App",
    image: "/image/fff.png",
    link: "#",
  },
];

const highlights = [
  { label: "Case Studies", value: "12+" },
  { label: "Industries", value: "6" },
  { label: "Avg. Performance", value: "95+" },
];

const Work = () => {
  return (
    <section className="relative bg-transparent pt-28 pb-14 px-4 sm:px-6 md:px-8 min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_85%_20%,rgba(250,204,21,0.10),transparent_36%),radial-gradient(circle_at_50%_84%,rgba(14,165,233,0.10),transparent_44%)]" />

      <ScrollReveal delay={0.1}>
        <motion.div 
          className="max-w-7xl mx-auto mb-10"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-blue-600 font-bold tracking-[0.24em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-sm mb-4">Portfolio</h2>
          <h1 className="luxury-title text-4xl sm:text-5xl md:text-7xl font-black text-slate-100 italic uppercase tracking-tighter leading-[0.95]">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Works</span>
          </h1>
          <div className="h-[3px] w-36 bg-gradient-to-r from-blue-600 to-yellow-500 mt-6 rounded-full"></div>
        </motion.div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <motion.div 
          className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {highlights.map((item) => (
            <TiltCard key={item.label} className="luxury-golden rounded-2xl p-5 cursor-pointer">
              <p className="text-3xl font-black text-slate-100">{item.value}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mt-2">{item.label}</p>
            </TiltCard>
          ))}
        </motion.div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <motion.div 
          className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {["All", "UI/UX", "Web Apps", "Branding", "E-commerce"].map((tag, idx) => (
            <span key={tag} className={`luxury-interactive text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border ${idx === 0 ? "bg-amber-300 text-slate-950 border-amber-300" : "border-slate-700 text-slate-300 bg-slate-900/55 hover:border-amber-300 hover:text-amber-100"}`}>
              {tag}
            </span>
          ))}
        </motion.div>
      </ScrollReveal>

      <ScrollReveal delay={0.4}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <TiltCard 
              key={project.id} 
              className="group relative cursor-pointer"
            >
              <div className="luxury-surface rounded-2xl relative overflow-hidden aspect-[16/10] shadow-sm">
                <div className="absolute inset-0 bg-amber-300/0 group-hover:bg-amber-300/22 transition-all duration-500 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white font-black uppercase tracking-widest text-xs border-2 border-amber-300 px-5 py-2 rounded-md">View Case Study</span>
                </div>

                <Image src={project.image} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>

              <div className="mt-5 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter group-hover:text-amber-100 transition-colors duration-300">{project.title}</h3>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">{project.category}</p>
                </div>
                <div className="text-blue-600 font-black text-2xl group-hover:translate-x-2 transition-transform">{"->"}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.5}>
        <motion.div 
          className="max-w-7xl mx-auto mt-14 grid md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="luxury-surface rounded-2xl p-6 md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.2em] text-blue-400">Client Feedback</p>
            <p className="text-xl md:text-2xl italic font-medium leading-relaxed mt-3 text-slate-200">
              The final product looked premium, loaded fast, and converted much better than our previous website.
            </p>
            <p className="text-slate-400 text-sm mt-4 uppercase tracking-[0.18em]">Founder, D2C Brand</p>
          </div>
          <div className="luxury-panel rounded-2xl p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-blue-100">Need Similar Results?</p>
            <p className="text-2xl font-black mt-3">Let us build your next launch page.</p>
            <a href="/contact" className="luxury-interactive inline-block mt-6 rounded-[10px] border border-yellow-400 bg-yellow-400 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:bg-amber-300 transition-colors">
              Start Now
            </a>
          </div>
        </motion.div>
      </ScrollReveal>

      <ScrollReveal delay={0.6}>
        <motion.div 
          className="max-w-7xl mx-auto mt-16 text-center border-t border-slate-700 pt-12"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h3 className="text-slate-400 uppercase tracking-[0.2em] text-sm mb-6">Have a project in mind?</h3>
          <a href="/contact" className="luxury-interactive inline-block w-full sm:w-auto rounded-[12px] text-sm font-black text-slate-900 hover:text-slate-950 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] uppercase tracking-[0.2em] px-8 sm:px-10 py-4 border border-yellow-400 bg-yellow-400 hover:bg-amber-300 hover:border-amber-300">
            Start a Project
          </a>
        </motion.div>
      </ScrollReveal>
    </section>
  );
};

export default Work;

