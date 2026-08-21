import React from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Project } from "../../../entities/project/model/types";

interface LightboxProps {
  project: Project;
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = React.memo(({
  project,
  currentIndex,
  onClose,
  onChangeIndex,
}) => {
  const handlePrev = () => {
    onChangeIndex((currentIndex - 1 + project.drawings.length) % project.drawings.length);
  };

  const handleNext = () => {
    onChangeIndex((currentIndex + 1) % project.drawings.length);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      {/* Click outside target */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Lightbox panel */}
      <motion.div 
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-slate-900 border border-slate-800 text-white w-full max-w-[95vw] md:max-w-[92vw] lg:max-w-[88vw] h-[92vh] max-h-[92vh] shadow-2xl flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/60 text-white hover:bg-slate-800 flex items-center justify-center rounded-none transition-colors border border-white/10 cursor-pointer"
          title="Закрыть [ESC]"
        >
          <X size={18} />
        </button>

        {/* Drawing image viewport */}
        <div className="flex-1 bg-slate-950 flex items-center justify-center relative min-h-[350px] md:min-h-[500px] h-full overflow-hidden select-none">
          {/* Active drawing index badge */}
          <div className="absolute top-4 left-4 bg-slate-950/85 text-[10px] font-mono border border-white/5 px-3 py-1.5 text-slate-400 select-none uppercase tracking-widest z-10 shadow-lg">
            Лист {currentIndex + 1} из {project.drawings.length}
          </div>

          {/* Drawing content image */}
          <div className="w-full h-full flex items-center justify-center p-4 md:p-12 relative">
            <motion.img 
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={project.drawings[currentIndex]} 
              alt={`${project.title} - Чертеж ${currentIndex + 1}`} 
              className="max-h-[70vh] md:max-h-[76vh] w-auto max-w-full object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Left/Right Arrows for multi-sheet portfolios */}
          {project.drawings.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-slate-800 text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer shadow-xl focus:outline-none"
                title="Предыдущий чертеж [←]"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-slate-800 text-white flex items-center justify-center transition-all border border-white/10 cursor-pointer shadow-xl focus:outline-none"
                title="Следующий чертеж [→]"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Thumbnail strip */}
          {project.drawings.length > 1 && (
            <div className="absolute bottom-4 inset-x-4 flex justify-start md:justify-center gap-2 overflow-x-auto py-2 px-2 bg-slate-950/80 backdrop-blur-sm border border-white/5 max-w-[90%] mx-auto scrollbar-thin scrollbar-thumb-slate-700">
              {project.drawings.map((drawingUrl, index) => (
                <button
                  key={index}
                  onClick={() => onChangeIndex(index)}
                  className={`w-10 h-10 border transition-all shrink-0 bg-slate-900 overflow-hidden cursor-pointer ${
                    currentIndex === index 
                      ? "border-blue-500 scale-105 ring-2 ring-blue-500/30" 
                      : "border-white/10 hover:border-white/30 brightness-50 hover:brightness-100"
                  }`}
                >
                  <img src={drawingUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar content */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 p-8 flex flex-col justify-between max-h-[40vh] md:max-h-none overflow-y-auto bg-slate-900 z-10">
          <div className="space-y-6">
            <div>
              <span className="text-[8px] font-mono tracking-widest text-[#60a5fa] uppercase px-2 py-1 bg-blue-500/10 border border-blue-500/20 inline-block mb-3">
                {project.type}
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white mb-1.5 leading-snug">
                {project.title}
              </h3>
              <h4 className="text-xs text-slate-400 font-mono leading-relaxed">
                {project.subtitle}
              </h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-5 border-t border-slate-800">
              {project.description}
            </p>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-800 mt-6 font-mono text-[11px]">
            <h4 className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-2">Технические данные:</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Масштаб:</span>
                <span className="text-slate-200">{project.specs.scale}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Площадь ОКС:</span>
                <span className="text-slate-200">{project.specs.area}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Формат файлов:</span>
                <span className="text-slate-200 text-blue-400">{project.specs.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Программа:</span>
                <span className="text-slate-200">{project.specs.software}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Объем:</span>
                <span className="text-slate-200">{project.specs.sheets}</span>
              </div>
            </div>
            
            {project.drawings[currentIndex] && (
              <div className="pt-4">
                <a 
                  href={project.drawings[currentIndex]} 
                  download={`${project.title}_sheet_${currentIndex+1}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 border border-slate-700 hover:border-white text-xs text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all font-mono uppercase tracking-wider text-[10px] bg-transparent cursor-pointer"
                >
                  <Download size={12} /> Скачать этот лист
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});
