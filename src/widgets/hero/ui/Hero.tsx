import React from "react";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  onNavigate: (view: "home" | "projects", anchorId?: string) => void;
}

export const Hero: React.FC<HeroProps> = React.memo(({ onNavigate }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden border-b border-slate-200">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern house architecture" 
          className="w-full h-full object-cover opacity-30 hover:scale-105 transition-transform duration-[12s] ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/40" />
        <div className="absolute inset-0 technical-grid opacity-15" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8 lg:gap-12 py-12 lg:py-16 relative z-10 w-full">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center space-y-8 lg:space-y-10">
          <div className="space-y-4 lg:space-y-6">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
              <span className="w-8 h-px bg-slate-400" />
              <span>РЕГИОНСТРОЙПРОЕКТ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.0] tracking-tighter text-slate-900">
              <span className="whitespace-nowrap inline-block">Проектирование</span> <br />
              <span className="text-slate-400 inline-block mt-2 font-display">жизненного пространства.</span>
            </h2>
            <p className="text-base sm:text-xl text-slate-600 max-w-lg leading-relaxed font-light">
              Создаю инновационные инженерные решения для современной архитектуры. 
              Авторский подход к проектированию зданий и сооружений по всей стране.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 pt-2 lg:pt-4">
            <button 
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-4 sm:px-10 sm:py-5 bg-slate-900 text-white font-bold text-xs tracking-widest uppercase hover:bg-slate-800 transition-all cursor-pointer focus:outline-none"
            >
              Обсудить проект
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-4 sm:px-10 sm:py-5 border border-slate-200 text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              Портфолио <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-center space-y-6 lg:space-y-8">
          <div className="bg-white p-6 sm:p-10 border border-slate-200 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 lg:mb-8">Ключевые компетенции</h3>
            <ul className="space-y-4 lg:space-y-6 font-mono text-sm max-w-full overflow-hidden">
              {[
                { label: "Проектирование ОВиК / ВК", id: "01" },
                { label: "BIM-моделирование (Revit)", id: "02" },
                { label: "Авторский надзор", id: "03" },
                { label: "Аудит энергоэффективности", id: "04" },
                { label: "Промышленный инжиниринг", id: "05" }
              ].map((item, i) => (
                <li key={i} className="flex justify-between items-center border-b border-slate-50 pb-3 hover:text-slate-500 transition-colors cursor-default text-slate-800">
                  <span className="truncate mr-2">{item.label}</span>
                  <span className="text-slate-300 text-[10px] flex-shrink-0">[{item.id}]</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="p-6 sm:p-8 bg-slate-900 text-white">
              <p className="text-3xl sm:text-4xl font-bold font-display">20+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-50 mt-2 font-mono">лет стажа</p>
            </div>
            <div className="p-6 sm:p-8 bg-white border border-slate-200">
              <p className="text-3xl sm:text-4xl font-bold font-display text-slate-900">100+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-mono">объектов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
