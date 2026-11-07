import React from "react";
import { Wind, Building2, Boxes, FileCheck2, Eye, Gauge } from "lucide-react";

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    id: "hvac",
    icon: Wind,
    title: "Проектирование ОВиК и ВК",
    description: "Отопление, вентиляция, водоснабжение и водоотведение.",
  },
  {
    id: "architecture",
    icon: Building2,
    title: "Архитектурное проектирование",
    description: "Эскизы, планировки, фасады и рабочие чертежи.",
  },
  {
    id: "bim",
    icon: Boxes,
    title: "BIM-моделирование",
    description: "Модели в Revit и проверка коллизий.",
  },
  {
    id: "approvals",
    icon: FileCheck2,
    title: "Согласования и экспертиза",
    description: "Техусловия и сопровождение экспертизы.",
  },
  {
    id: "supervision",
    icon: Eye,
    title: "Авторский надзор",
    description: "Выезды на объект и контроль работ по проекту.",
  },
  {
    id: "audit",
    icon: Gauge,
    title: "Энергоаудит и промышленный инжиниринг",
    description: "Оценка энергоэффективности и технологические решения.",
  },
];

export const Services: React.FC = React.memo(() => {
  return (
    <section id="services" aria-labelledby="services-heading" className="min-w-0 scroll-mt-24">
      <h3 id="services-heading" className="mb-4 text-2xl font-bold tracking-tight text-slate-900">Услуги</h3>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SERVICES.map(({ id, icon: Icon, title, description }) => (
          <li key={id} className="border border-slate-200 bg-slate-50 p-4">
            <Icon aria-hidden="true" size={18} strokeWidth={1.5} className="mb-2 text-slate-700" />
            <h4 className="text-base font-semibold leading-snug text-slate-900">{title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
});
