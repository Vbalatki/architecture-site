import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, MapPin } from "lucide-react";

import { ALL_PROJECTS } from "../../../entities/project/model/projects";
import { Project } from "../../../entities/project/model/types";
import { ProjectCard } from "../../../entities/project/ui/ProjectCard";

import { Header } from "../../../widgets/header/ui/Header";
import { Footer } from "../../../widgets/footer/ui/Footer";
import { Hero } from "../../../widgets/hero/ui/Hero";
import { About } from "../../../widgets/about/ui/About";
import { Contact } from "../../../widgets/contact/ui/Contact";
import { Lightbox } from "../../../widgets/lightbox/ui/Lightbox";
import { Portfolio } from "../../../widgets/portfolio/ui/Portfolio";

import { ProjectFilter } from "../../../features/project-filter/ui/ProjectFilter";
import { ProjectSearch } from "../../../features/project-search/ui/ProjectSearch";

export const MainPage: React.FC = () => {
  const [view, setView] = useState<"home" | "projects">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeLightbox, setActiveLightbox] = useState<{
    project: Project;
    currentIndex: number;
  } | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightbox) return;
      if (e.key === "Escape") {
        setActiveLightbox(null);
      } else if (e.key === "ArrowLeft") {
        setActiveLightbox((prev) => {
          if (!prev || prev.project.drawings.length === 0) return prev;
          const { project, currentIndex } = prev;
          const prevIndex = (currentIndex - 1 + project.drawings.length) % project.drawings.length;
          return { project, currentIndex: prevIndex };
        });
      } else if (e.key === "ArrowRight") {
        setActiveLightbox((prev) => {
          if (!prev || prev.project.drawings.length === 0) return prev;
          const { project, currentIndex } = prev;
          const nextIndex = (currentIndex + 1) % project.drawings.length;
          return { project, currentIndex: nextIndex };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox]);

  const handleNavigate = useCallback((targetView: "home" | "projects", anchorId?: string) => {
    setView(targetView);
    if (targetView === "home") {
      setSearchQuery("");
      setSelectedCategory("all");
      
      // Delay slightly to allow state and view to reconcile
      setTimeout(() => {
        if (anchorId) {
          const element = document.getElementById(anchorId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleOpenLightbox = useCallback((project: Project, index: number) => {
    setActiveLightbox({ project, currentIndex: index });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActiveLightbox(null);
  }, []);

  const handleChangeDrawingIndex = useCallback((index: number) => {
    setActiveLightbox((prev) => {
      if (!prev) return null;
      return { ...prev, currentIndex: index };
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header Layer */}
      <Header view={view} onNavigate={handleNavigate} />

      {/* Primary Page Layouts */}
      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero showcase */}
              <Hero onNavigate={handleNavigate} />

              {/* History & coordination coordinates */}
              <About />

              {/* Grid-based highlights section */}
              <Portfolio 
                projects={ALL_PROJECTS} 
                onOpenLightbox={handleOpenLightbox} 
                onShowAll={() => handleNavigate("projects")} 
              />

              {/* Business requests details */}
              <Contact />
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="py-16 max-w-7xl mx-auto px-6 space-y-12"
            >
              {/* Breadcrumb row */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavigate("home")}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-900 transition-colors focus:outline-none font-semibold cursor-pointer"
                >
                  <ArrowLeft size={14} /> На главную
                </button>
                <span className="text-slate-300 text-xs">/</span>
                <span className="text-xs text-slate-500 font-mono">Архитектурный каталог</span>
              </div>

              {/* Catalogue Title */}
              <div>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950">Архив проектной документации</h3>
                <p className="text-xs text-slate-500 font-mono tracking-wider mt-2 uppercase">Список эскизных, проектных и рабочих чертежей</p>
              </div>

              {/* Search + Filter Features Row */}
              <div className="p-8 bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center">
                <ProjectSearch searchQuery={searchQuery} onChangeSearchQuery={setSearchQuery} />
                <ProjectFilter selectedCategory={selectedCategory} onChangeCategory={setSelectedCategory} />
              </div>

              {/* Filtered Grid View */}
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isPriority={index < 3}
                      onOpenLightbox={handleOpenLightbox}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center border border-dashed border-slate-200 bg-white">
                  <p className="text-sm font-mono text-slate-400 uppercase tracking-widest">Ничего не найдено</p>
                  <p className="text-xs text-slate-300 mt-2">Попробуйте изменить поисковый запрос или фильтры</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Layer */}
      <Footer onNavigate={handleNavigate} />

      {/* Immersive drawing inspection dialog */}
      <AnimatePresence>
        {activeLightbox && (
          <Lightbox
            project={activeLightbox.project}
            currentIndex={activeLightbox.currentIndex}
            onClose={handleCloseLightbox}
            onChangeIndex={handleChangeDrawingIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
