import React from "react";
import { Maximize2, FileSpreadsheet } from "lucide-react";
import { Project } from "../model/types";

interface ProjectCardProps {
  project: Project;
  onOpenLightbox: (project: Project, index: number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onOpenLightbox }) => {
  // Use a modern architectural drawing blueprint fallback if no actual images exist in the folder yet
  const hasImages = !!project.image;
  
  const previewImage = hasImages
    ? project.image
    : "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"; // engineering details fallback

  return (
    <div 
      className="bg-white border border-slate-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow h-full"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
        {hasImages ? (
          <img 
            src={previewImage} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0 transition-all cursor-pointer"
            onClick={() => onOpenLightbox(project, 0)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div 
            onClick={() => onOpenLightbox(project, 0)}
            className="w-full h-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center cursor-pointer border-b border-slate-800"
          >
            <div className="absolute inset-0 technical-grid opacity-20 pointer-events-none" />
            <FileSpreadsheet className="text-slate-500 w-10 h-10 mb-3 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block mb-1">Синхронизация чертежей</span>
            <span className="text-[9px] text-slate-600 font-mono">Файлы JPG загружаются...</span>
          </div>
        )}

        {/* Technical Badges Overlaid on Image */}
        <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
          <span className="bg-slate-900/90 text-white text-[8px] font-mono uppercase tracking-widest px-2.5 py-1 backdrop-blur-sm border border-white/10">
            {project.type}
          </span>
          <span className="bg-slate-50 text-slate-900 text-[8px] font-mono px-2 py-0.5 border border-slate-200 shadow-sm font-semibold">
            {project.specs.scale}
          </span>
        </div>

        {/* Hover Overlay View Button */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <button 
            className="px-5 py-3 bg-white text-slate-950 font-semibold text-xs flex items-center gap-2 shadow-xl pointer-events-auto transition-transform scale-95 group-hover:scale-100 cursor-pointer focus:outline-none" 
            onClick={() => onOpenLightbox(project, 0)}
          >
            <Maximize2 size={12} /> Смотреть чертежи ({project.drawings.length})
          </button>
        </div>
      </div>

      {/* Info Panel under the preview */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 mb-2">
            {project.categoryLabel}
          </div>
          <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-1">
            {project.title}
          </h4>
          <h5 className="text-xs font-semibold text-slate-500 mb-4 font-mono">
            {project.subtitle}
          </h5>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-6">
            {project.description}
          </p>
        </div>

        {/* Specs Key Value Metrics */}
        <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4 font-mono text-[10px] text-slate-400">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-slate-300 block">Площадь:</span>
            <span className="text-slate-700 font-semibold">{project.specs.area}</span>
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider text-slate-300 block">Софт в работе:</span>
            <span className="text-slate-700 font-semibold">{project.specs.software}</span>
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider text-slate-300 block">Формат файла:</span>
            <span className="text-slate-700 font-semibold">{project.specs.format}</span>
          </div>
          <div>
            <span className="text-[8px] uppercase tracking-wider text-slate-300 block">Чертежи комплекта:</span>
            <span className="text-slate-700 font-semibold">{project.specs.sheets}</span>
          </div>
        </div>
      </div>
    </div>
  );
});
