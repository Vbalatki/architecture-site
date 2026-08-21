import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export const Contact: React.FC = React.memo(() => {
  return (
    <section id="contact" className="py-32 bg-white border-t border-slate-200 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Контакты</p>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12 text-slate-900">Начнем работу вместе.</h3>
        
        <div className="grid md:grid-cols-3 gap-8 bg-slate-50 p-10 border border-slate-200/80 divide-y md:divide-y-0 md:divide-x divide-slate-200 shadow-sm text-slate-750">
          <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-3 font-mono text-xs">
            <Mail size={18} strokeWidth={1.5} className="text-slate-400" />
            <span className="text-[9px] uppercase tracking-wider text-slate-400">Напишите нам</span>
            <a href="mailto:rsp_21@bk.ru" className="font-bold text-slate-850 hover:text-slate-500 transition-colors lowercase">rsp_21@bk.ru</a>
          </div>
          <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-3 font-mono text-xs">
            <Phone size={18} strokeWidth={1.5} className="text-slate-400" />
            <span className="text-[9px] uppercase tracking-wider text-slate-400">Позвоните нам</span>
            <a href="tel:+79196620356" className="font-bold text-slate-850 hover:text-slate-500 transition-colors">+7 (919) 662-03-56</a>
          </div>
          <div className="py-6 md:py-0 flex flex-col items-center justify-center space-y-3 font-mono text-xs">
            <MapPin size={18} strokeWidth={1.5} className="text-slate-400" />
            <span className="text-[9px] uppercase tracking-wider text-slate-400">Адрес компании</span>
            <span className="font-bold text-slate-850 text-center whitespace-nowrap px-2">428034, ул. Филиппа Лукина, д. 1</span>
          </div>
        </div>
      </div>
    </section>
  );
});
