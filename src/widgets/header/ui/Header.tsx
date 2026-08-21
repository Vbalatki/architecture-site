import React from "react";

interface HeaderProps {
  view: "home" | "projects";
  onNavigate: (view: "home" | "projects", anchorId?: string) => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({ view, onNavigate }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4 cursor-pointer min-w-0" onClick={() => onNavigate("home")}>
          <div className="w-10 h-10 bg-slate-900 flex items-center justify-center text-white font-bold text-xl tracking-tighter transition-transform hover:rotate-3 flex-shrink-0">
            РСП
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-bold tracking-tight uppercase leading-none text-slate-900 truncate">Регионстройпроект</h1>
            <p className="hidden xs:block text-[9px] sm:text-[10px] text-slate-500 font-mono tracking-widest mt-1 uppercase truncate">Архитектурное проектирование & Инжиниринг</p>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-10 text-xs font-bold tracking-widest text-slate-600 uppercase">
          <button 
            onClick={() => onNavigate("home", "about")} 
            className="hover:text-slate-900 transition-colors tracking-widest uppercase font-bold text-xs bg-transparent border-none cursor-pointer focus:outline-none"
          >
            Обо мне
          </button>
          <button 
            onClick={() => onNavigate("home", "services")} 
            className="hover:text-slate-900 transition-colors tracking-widest uppercase font-bold text-xs bg-transparent border-none cursor-pointer focus:outline-none"
          >
            Услуги
          </button>
          <button 
            onClick={() => onNavigate("home", "projects")} 
            className={`hover:text-slate-900 transition-colors tracking-widest uppercase font-bold text-xs bg-transparent border-none cursor-pointer focus:outline-none ${view === "projects" ? "text-slate-950 underline underline-offset-4" : ""}`}
          >
            Проекты
          </button>
          <button 
            onClick={() => onNavigate("home", "contact")} 
            className="hover:text-slate-900 transition-colors tracking-widest uppercase font-bold text-xs bg-transparent border-none cursor-pointer focus:outline-none"
          >
            Контакты
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          {view === "projects" && (
            <button 
              onClick={() => onNavigate("home")} 
              className="text-xs font-mono tracking-widest uppercase text-slate-900 bg-white border border-slate-200 px-3 py-1.5 font-bold hover:bg-slate-100 transition-all cursor-pointer focus:outline-none"
            >
              Главная
            </button>
          )}
          <button 
            onClick={() => onNavigate("home", "contact")}
            className="px-4 py-2 bg-slate-900 text-white font-mono text-[10px] tracking-widest uppercase hover:bg-slate-800 transition-all font-bold cursor-pointer"
          >
            Связь
          </button>
        </div>
      </div>
    </nav>
  );
});
