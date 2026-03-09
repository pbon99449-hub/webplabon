import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950/75 backdrop-blur-xl border-t border-slate-800/80 px-4 sm:px-6 md:px-8 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-center">
        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
          © {currentYear} <span className="text-slate-100 font-bold">Plabon</span> - All Rights Reserved.
        </div>

        <div className="flex flex-wrap justify-start md:justify-center gap-x-6 gap-y-3 text-[11px] uppercase tracking-widest font-bold">
          <a href="/work" className="luxury-interactive text-slate-400 hover:text-amber-100 transition-colors duration-300 italic">Works</a>
          <a href="/about" className="luxury-interactive text-slate-400 hover:text-amber-100 transition-colors duration-300 italic">About</a>
          <a href="/contact" className="luxury-interactive text-slate-400 hover:text-amber-100 transition-colors duration-300 italic">Contact</a>
          <a href="mailto:pbon99449@gmail.com" className="luxury-interactive text-slate-400 hover:text-amber-100 transition-colors duration-300 italic">Email</a>
        </div>

        <div className="text-slate-400 text-[10px] tracking-[0.16em] md:text-right uppercase">
          Crafted with <span className="text-yellow-500">❤</span> in Next.js
        </div>
      </div>
    </footer>
  );
};

export default Footer;
