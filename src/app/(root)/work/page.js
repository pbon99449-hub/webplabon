"use client";
import React, { useEffect } from "react";
import Image from "next/image";

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

const Work = () => {
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
    <section className="relative bg-transparent pt-28 pb-14 px-4 sm:px-6 md:px-8 min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-[1] bg-[radial-gradient(circle_at_12%_18%,rgba(59,130,246,0.14),transparent_42%),radial-gradient(circle_at_85%_20%,rgba(250,204,21,0.10),transparent_36%),radial-gradient(circle_at_50%_84%,rgba(14,165,233,0.10),transparent_44%)]" />

      <div className="max-w-7xl mx-auto mb-10 reveal">
        <h2 className="text-blue-600 font-bold tracking-[0.24em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-sm mb-4">Portfolio</h2>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-100 italic uppercase tracking-tighter leading-[0.95]">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-500">Works</span>
        </h1>
        <div className="h-[3px] w-36 bg-gradient-to-r from-blue-600 to-yellow-500 mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-8 reveal">
        {["All", "UI/UX", "Web Apps", "Branding", "E-commerce"].map((tag, idx) => (
          <span key={tag} className={`text-[11px] uppercase tracking-[0.2em] px-4 py-2 rounded-full border ${idx === 0 ? "bg-blue-600 text-white border-blue-600" : "border-slate-700 text-slate-300 bg-slate-900/55"}`}>
            {tag}
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group relative cursor-pointer reveal">
            <div className="rounded-2xl relative overflow-hidden bg-slate-900/60 backdrop-blur-[2px] aspect-[16/10] border border-slate-700 shadow-sm">
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/35 transition-all duration-500 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white font-black uppercase tracking-widest text-xs border-2 border-yellow-300 px-5 py-2 rounded-md">View Case Study</span>
              </div>

              <Image src={project.image} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>

            <div className="mt-5 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black text-slate-100 uppercase tracking-tighter group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">{project.category}</p>
              </div>
              <div className="text-blue-600 font-black text-2xl group-hover:translate-x-2 transition-transform">→</div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16 text-center border-t border-slate-700 pt-12 reveal">
        <h3 className="text-slate-400 uppercase tracking-[0.2em] text-sm mb-6">Have a project in mind?</h3>
        <button className="w-full sm:w-auto rounded-[12px] text-sm font-black text-slate-900 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] uppercase tracking-[0.2em] px-8 sm:px-10 py-4 border border-yellow-400 bg-yellow-400 hover:bg-blue-600 hover:border-blue-600">
          Start a Project
        </button>
      </div>

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
    </section>
  );
};

export default Work;
