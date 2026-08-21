import React from "react";
import { 
  Wind, Building2, Boxes, FileCheck2, Eye, Gauge, ArrowRight 
} from "lucide-react";

interface Service {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  bullets: string[];
}

const SERVICES: Service[] = [
  {
    id: "hvac",
    number: "01",
    icon: Wind,
    title: "Проектирование ОВиК и ВК",
    description: "Разработка систем отопления, вентиляции, кондиционирования, водоснабжения и водоотведения для зданий любого назначения.",
    bullets: ["Расчёт нагрузок и подбор оборудования", "Рабочая документация (Стадия Р)", "Спецификации и сметы"],
  },
  {
    id: "architecture",
    number: "02",
    icon: Building2,
    title: "Архитектурное проектирование",
    description: "Полный цикл от эскизной концепции до комплекта рабочих чертежей АР по объекту любой сложности.",
    bullets: ["Эскизный проект и визуализация", "Планировочные решения", "Фасады и разрезы"],
  },
  {
    id: "bim",
    number: "03",
    icon: Boxes,
    title: "BIM-моделирование",
    description: "Информационное моделирование в Revit с проверкой коллизий инженерных систем и автоматической генерацией спецификаций.",
    bullets: ["3D-модель здания и инженерных сетей", "Выявление коллизий на этапе проектирования", "Координация разделов"],
  },
  {
    id: "approvals",
    number: "04",
    icon: FileCheck2,
    title: "Согласования и экспертиза",
    description: "Сопровождение проекта во всех инстанциях — от получения техусловий до заключения Госэкспертизы.",
    bullets: ["Госэкспертиза и Минстрой", "Управление ГАСН", "Техусловия на подключение к сетям"],
  },
  {
    id: "supervision",
    number: "05",
    icon: Eye,
    title: "Авторский надзор",
    description: "Контроль за соответствием выполняемых строительных работ проектной документации на всех этапах стройки.",
    bullets: ["Выезды на объект", "Ведение журнала авторского надзора", "Оперативные корректировки решений"],
  },
  {
    id: "audit",
    number: "06",
    icon: Gauge,
    title: "Энергоаудит и промышленный инжиниринг",
    description: "Оценка энергоэффективности зданий и технологическое проектирование для производственных и коммерческих объектов.",
    bullets: ["Энергетические паспорта", "Технологические решения ТХ", "Оптимизация эксплуатационных затрат"],
  },
];

export const Services: React.FC = React.memo(() => {
  return (
    <section id="services" className="py-28 lg:py-32 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20 max-w-2xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">
            Услуги
          </p>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 mb-6">
            Инженерные решения под ключ.
          </h3>
          <p className="text-slate-600 leading-relaxed font-light">
            От эскизной концепции до получения заключения экспертизы — берём на себя 
            весь комплекс проектных и согласовательных задач.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="bg-white p-8 lg:p-10 flex flex-col hover:bg-slate-50/60 transition-colors group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 bg-slate-900 flex items-center justify-center text-white group-hover:bg-slate-700 transition-colors">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 font-bold">
                    {service.number}
                  </span>
                </div>

                <h4 className="text-lg font-bold tracking-tight text-slate-900 mb-3 leading-snug">
                  {service.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>

                <ul className="space-y-2.5 pt-5 border-t border-slate-100 font-mono text-[10px] text-slate-500">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-slate-400 mt-1.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Strip */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-900 text-white p-8 lg:p-10">
          <p className="text-sm lg:text-base font-light max-w-md text-center sm:text-left">
            Не нашли нужную услугу в списке? Обсудим ваш объект и подберём решение.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-3.5 bg-white text-slate-900 font-bold text-xs tracking-widest uppercase hover:bg-slate-100 transition-all flex items-center gap-2 cursor-pointer focus:outline-none flex-shrink-0"
          >
            Обсудить проект <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
});
