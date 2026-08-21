import React from "react";
import architecturalAboutImg from "../../../assets/images/architectural_about_1781540806104.jpg";

export const About: React.FC = React.memo(() => {
  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 group">
              <img 
                src={architecturalAboutImg} 
                alt="Architectural design" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-12">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-6 font-bold">О компании</p>
              <h3 className="text-5xl font-bold tracking-tighter leading-tight text-slate-900">Проектные решения <br/> любой сложности.</h3>
            </div>
            <div className="space-y-6 text-slate-600 leading-relaxed font-light text-sm">
              <p className="text-base text-slate-800 font-medium">
                ООО «РегионСтройПроект» предлагает услуги по проектированию и согласованию объектов строительства любой сложности. Более 20 лет на рынке строительства и проектирования. Более 100 объектов по всей стране.
              </p>
              <p>
                Комплексный подход к задачам Заказчика в части подготовки и организации проектирования, согласования.
              </p>
              <p>
                Наши сотрудники — профессионалы в документации, проектировании, экспертизе, техническом надзоре, согласовании в государственных службах: отделы архитектуры, благоустройства, Министерство строительства, Государственная экспертиза, Управление государственного архитектурно-строительного надзора; получении технических условий по подключению к сетям энергоснабжения, водоснабжения и водоотведения, газоснабжения.
              </p>
              <p>
                Структура и масштаб штата специалистов компании формируется под каждый конкретный объект, что позволяет оптимизировать бюджет Заказчика на реализацию проекта и получить конкурентное ценообразование.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
