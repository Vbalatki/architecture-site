import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "motion/react";

import { ALL_PROJECTS } from "../../../entities/project/model/projects";
import { Project } from "../../../entities/project/model/types";

import { Header } from "../../../widgets/header/ui/Header";
import { Footer } from "../../../widgets/footer/ui/Footer";
import { Hero } from "../../../widgets/hero/ui/Hero";
import { About } from "../../../widgets/about/ui/About";
import { Contact } from "../../../widgets/contact/ui/Contact";
import { Lightbox } from "../../../widgets/lightbox/ui/Lightbox";
import { Portfolio } from "../../../widgets/portfolio/ui/Portfolio";

export const MainPage: React.FC = () => {
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

  const handleNavigate = useCallback((anchorId?: string) => {
    if (anchorId) {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

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
      <Header onNavigate={handleNavigate} />

      {/* Primary Page Layouts */}
      <main className="flex-1 pt-20">
        {/* Hero showcase */}
        <Hero onNavigate={handleNavigate} />

        {/* About company section */}
        <About />

        {/* Portfolio gallery section with all project folders */}
        <Portfolio 
          projects={ALL_PROJECTS} 
          onOpenLightbox={handleOpenLightbox} 
        />

        {/* Contact details */}
        <Contact />
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
