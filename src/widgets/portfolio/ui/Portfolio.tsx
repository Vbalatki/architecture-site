import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "../../../entities/project/model/types";
import { ProjectCard } from "../../../entities/project/ui/ProjectCard";

interface PortfolioProps {
  projects: Project[];
  onOpenLightbox: (project: Project, index: number) => void;
  onShowAll: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = React.memo(({ projects, onOpenLightbox, onShowAll }) => {
  // Group projects for visual sections
  const commercial = projects.filter(
    (p) => p.category === "commercial" || p.id === "g-survey"
  );
  const privateHouses = projects.filter(
    (p) => p.id === "s-house"
  );
  const multiFamily = projects.filter(
    (p) => p.folder.startsWith("многокв")
  );

  return (
    <section id="projects" className="py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Избранное портфолио</p>
            <h3 className="text-5xl font-bold tracking-tighter text-slate-900">Выполненные чертежи.</h3>
          </div>
          <button 
            onClick={onShowAll}
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-all cursor-pointer focus:outline-none"
          >
            Все чертежи ({projects.length}) <ArrowUpRight size={12} />
          </button>
        </div>

        {/* 1. Commercial Construction Division */}
        <div className="space-y-12">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-extrabold">[РСП // 01]</span>
            <h4 className="text-2xl font-bold tracking-tight text-slate-950 mt-1">Коммерческие & Производственные объекты</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commercial.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenLightbox={onOpenLightbox} 
              />
            ))}
          </div>
        </div>

        {/* 2. Private Living Houses Division */}
        <div className="space-y-12">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-extrabold">[РСП // 02]</span>
            <h4 className="text-2xl font-bold tracking-tight text-slate-950 mt-1">Индивидуальное малоэтажное жилье</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {privateHouses.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenLightbox={onOpenLightbox} 
              />
            ))}
          </div>
        </div>

        {/* 3. Multi-apartment Section Division */}
        <div className="space-y-12">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-extrabold">[РСП // 03]</span>
            <h4 className="text-2xl font-bold tracking-tight text-slate-950 mt-1">Многоквартирные жилые дома</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {multiFamily.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenLightbox={onOpenLightbox} 
              />
            ))}
          </div>
        </div>

        {/* Call to action at bottom of section */}
        <div className="pt-10 flex justify-center">
          <button 
            onClick={onShowAll}
            className="px-12 py-5 border border-slate-300 hover:border-slate-900 text-slate-900 font-mono text-[11px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none"
          >
            Перейти к полному каталогу чертежей
          </button>
        </div>
      </div>
    </section>
  );
});
