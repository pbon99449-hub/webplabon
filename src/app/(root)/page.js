"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import vvimg from "../../../public/image/vv.png";
import ppimg from "../../../public/image/pp.png";
import HeroScene from "@/component/HeroScene";

const metrics = [
  { label: "Projects", value: "10+" },
  { label: "Clients", value: "5+" },
  { label: "Experience", value: "1 Years" },
];

const Page = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-transparent text-slate-100 min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute -top-28 -left-16 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute top-[28%] -right-20 w-80 h-80 bg-yellow-200/60 rounded-full blur-3xl"></div>

      <section className="max-w-7xl mx-auto pt-24 md:pt-28 pb-10 md:pb-12 px-4 sm:px-6 md:px-8 reveal">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <h2 className="text-blue-600 font-bold mb-4 tracking-[0.24em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-sm">Available for Freelance</h2>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black leading-[0.95] italic tracking-tighter">
              CRAFTING
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-slate-100 to-yellow-400">DIGITAL ART</span>
            </h1>

            <p className="mt-8 text-slate-300 max-w-xl text-lg leading-relaxed">
              I design immersive websites with performance-first code, bold visual direction, and modern interaction patterns tailored for premium brands.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="w-full sm:w-auto rounded-[12px] relative group overflow-hidden bg-yellow-400 text-slate-900 px-8 sm:px-10 py-4 font-black uppercase tracking-[0.2em] text-xs border border-yellow-400 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]">
                <span className="relative z-10 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-white">Start Project</span>
                <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"></div>
              </button>
              <a href="/work" className="w-full sm:w-auto text-center rounded-[12px] px-8 sm:px-10 py-4 font-black uppercase tracking-[0.2em] text-xs border border-slate-600 text-slate-200 hover:border-blue-400 hover:text-blue-400 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                View Work
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <HeroScene />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-700 bg-slate-900/65 backdrop-blur-sm p-5 shadow-sm">
                  <p className="text-2xl md:text-3xl font-black text-slate-100 whitespace-nowrap">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-12 md:py-14 px-4 sm:px-6 md:px-8 reveal">
        <div className="flex justify-between items-end mb-12 border-b border-slate-700 pb-6">
          <div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
              Selected <span className="text-blue-600">Work</span>
            </h3>
            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-yellow-500 mt-4"></div>
          </div>
          <p className="text-slate-400 hidden md:block font-mono tracking-widest uppercase">02 / 2026</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {[{ image: vvimg, title: "Luxury Real Estate App", tag: "React / UI Design", desc: "Modern UI for high-end properties." }, { image: ppimg, title: "Fashion Brand Store", tag: "E-commerce Store", desc: "A premium product browsing experience." }].map((project) => (
            <div key={project.title} className="group cursor-pointer reveal">
              <div className="rounded-2xl relative overflow-hidden aspect-video bg-slate-900/55 border border-slate-700 group-hover:border-blue-400 transition-all duration-500 shadow-sm">
                <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-blue-600/20 transition-all duration-500 z-10"></div>
                <Image src={project.image} alt={project.title} className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute bottom-5 left-5 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="bg-yellow-400 text-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-md shadow-xl">{project.tag}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter group-hover:text-blue-600 transition-colors duration-300">{project.title}</h4>
                  <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest">{project.desc}</p>
                </div>
                <span className="text-blue-600 text-3xl group-hover:translate-x-3 transition-transform duration-300">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 md:py-20 px-4 sm:px-6 md:px-8 text-center relative reveal">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-600 to-yellow-500 absolute top-0 left-0"></div>
        <h2 className="text-6xl md:text-[10rem] font-black uppercase tracking-[0.1em] text-slate-100/[0.05] absolute inset-x-0 top-1/2 -translate-y-1/2 italic">PLABON</h2>

        <div className="relative z-10">
          <p className="text-blue-600 font-black tracking-[0.35em] sm:tracking-[0.6em] uppercase mb-6 text-[11px] sm:text-xs">Start a conversation</p>
          <a href="mailto:pbon99449@gmail.com" className="text-xl sm:text-3xl md:text-6xl break-all font-black hover:text-blue-400 transition-colors duration-500 border-b-2 border-slate-600 hover:border-yellow-500 pb-4 italic tracking-tighter">
            pbon99449@gmail.com
          </a>
        </div>
      </section>

      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(80px);
          transition: all 0.9s ease;
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Page;
