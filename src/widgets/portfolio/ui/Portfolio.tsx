import React from "react";
import { Project } from "../../../entities/project/model/types";
import { ProjectCard } from "../../../entities/project/ui/ProjectCard";

interface PortfolioProps {
  projects: Project[];
  onOpenLightbox: (project: Project, index: number) => void;
}

export const Portfolio: React.FC<PortfolioProps> = React.memo(({ projects, onOpenLightbox }) => {
  // Group projects for visual sections
  const religiousAndPublic = projects.filter(
    (p) => p.category === "religious_public" || p.folder === "церквь"
  );
  const commercial = projects.filter(
    (p) => p.category === "commercial" || p.folder === "автосалон" || p.folder === "автосервис" || p.folder === "Тула" || p.folder === "подольск" || p.folder === "кукморы" || p.folder === "хвойнинский" || p.folder === "гражданская"
  );
  const privateHouses = projects.filter(
    (p) => p.category === "residential_private" || p.folder === "сосновка"
  );
  const multiFamily = projects.filter(
    (p) => p.category === "residential_multi" || p.folder.startsWith("многокв") || p.folder.startsWith("mnogokv")
  );

  return (
    <section id="projects" className="py-28 lg:py-32 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 space-y-24 lg:space-y-28">
        {/* Section Header */}
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-4 font-bold">Портфолио проектов</p>
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900">Выполненные проекты и чертежи.</h3>
        </div>

        {/* 1. Commercial & Industrial Construction Division */}
        {commercial.length > 0 && (
          <div className="space-y-8 lg:space-y-10">
            <div className="border-b border-slate-200 pb-4">
              <h4 className="text-2xl font-bold tracking-tight text-slate-950">Коммерческие & Производственные объекты</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commercial.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  isPriority={index < 3}
                  onOpenLightbox={onOpenLightbox} 
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. Private Living Houses Division */}
        {privateHouses.length > 0 && (
          <div className="space-y-8 lg:space-y-10">
            <div className="border-b border-slate-200 pb-4">
              <h4 className="text-2xl font-bold tracking-tight text-slate-950">Индивидуальное малоэтажное жилье</h4>
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
        )}

        {/* 3. Multi-apartment Section Division */}
        {multiFamily.length > 0 && (
          <div className="space-y-8 lg:space-y-10">
            <div className="border-b border-slate-200 pb-4">
              <h4 className="text-2xl font-bold tracking-tight text-slate-950">Многоквартирные жилые дома</h4>
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
        )}

        {/* 4. Religious & Public Buildings */}
        {religiousAndPublic.length > 0 && (
          <div className="space-y-8 lg:space-y-10">
            <div className="border-b border-slate-200 pb-4">
              <h4 className="text-2xl font-bold tracking-tight text-slate-950">Культовые и общественные здания</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {religiousAndPublic.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onOpenLightbox={onOpenLightbox} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});
