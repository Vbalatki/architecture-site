import React from "react";
import { Project } from "../../../entities/project/model/types";
import { ProjectCard } from "../../../entities/project/ui/ProjectCard";

interface PortfolioProps {
  projects: Project[];
  onOpenLightbox: (project: Project, index: number) => void;
}

const sections = [
  { category: "commercial", title: "Коммерческие объекты" },
  { category: "industrial", title: "Производственные объекты" },
  { category: "business_center", title: "Бизнес-центры" },
  { category: "residential_private", title: "Индивидуальное малоэтажное жилье" },
  { category: "residential_multi", title: "Многоквартирные жилые дома" },
  { category: "religious_public", title: "Культовые и общественные здания" },
];

export const Portfolio: React.FC<PortfolioProps> = React.memo(({ projects, onOpenLightbox }) => (
  <section id="projects" className="py-28 lg:py-32 bg-[#0b1931] border-t border-[#263b57]">
    <div className="max-w-7xl mx-auto px-6 space-y-24 lg:space-y-28">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#f0cd80] mb-4 font-bold">Портфолио проектов</p>
        <h3 className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-50">Выполненные проекты и чертежи.</h3>
      </div>

      {sections.map(({ category, title }) => {
        const sectionProjects = projects.filter((project) => project.category === category);
        if (sectionProjects.length === 0) return null;

        return (
          <section key={category} aria-labelledby={`portfolio-${category}`} className="space-y-8 lg:space-y-10">
            <div className="border-b border-[#314660] pb-4">
              <h4 id={`portfolio-${category}`} className="text-2xl font-bold tracking-tight text-slate-100">{title}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectionProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isPriority={category === "commercial" && index < 3}
                  onOpenLightbox={onOpenLightbox}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  </section>
));
