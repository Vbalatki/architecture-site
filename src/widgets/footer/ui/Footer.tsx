import React from "react";

interface FooterProps {
  onNavigate: (view: "home" | "projects", anchorId?: string) => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({ onNavigate }) => {
  return (
    <footer className="py-14 bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => onNavigate("home")}>
            <div className="w-8 h-8 bg-slate-900 flex items-center justify-center text-white font-bold text-lg tracking-tighter">
              РСП
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight uppercase leading-none text-slate-900">Регионстройпроект</h2>
              <p className="text-[8px] text-slate-500 font-mono tracking-widest mt-1 uppercase">Архитектурное проектирование & Инжиниринг</p>
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center sm:text-right">
            © 2026 ООО «РЕГИОНСТРОЙПРОЕКТ». Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  );
});
