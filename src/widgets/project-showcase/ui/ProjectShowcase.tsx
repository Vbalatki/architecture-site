import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

import sosnovka from "../../../assets/visualizations/01-sosnovka.webp";
import apartment from "../../../assets/visualizations/02-apartment.webp";
import showroom from "../../../assets/visualizations/03-showroom.webp";
import church from "../../../assets/visualizations/04-church.webp";
import workshop from "../../../assets/visualizations/05-workshop.webp";

const slides = [
  { image: sosnovka, title: "Сосновка" },
  { image: apartment, title: "Многоквартирный дом № 2" },
  { image: showroom, title: "Автосалон" },
  { image: church, title: "Храмовый комплекс" },
  { image: workshop, title: "Цех убоя и переработки" },
];

const lastIndex = slides.length - 1;

interface ShowcaseSlideProps {
  slide: typeof slides[number];
  index: number;
  position: MotionValue<number>;
  active: boolean;
  reducedMotion: boolean;
}

const ShowcaseSlide: React.FC<ShowcaseSlideProps> = ({ slide, index, position, active, reducedMotion }: ShowcaseSlideProps) => {
  const distance = useTransform(position, (value) => index - value);
  const x = useTransform(distance, (value) => `${value * 100}%`);
  const rotateY = useTransform(distance, [-1, 0, 1], [12, 0, -12]);
  const scale = useTransform(distance, [-1, 0, 1], [0.96, 1, 0.96]);

  return (
    <motion.figure
      className="relative col-start-1 row-start-1 h-full w-full overflow-hidden"
      aria-hidden={!active}
      style={reducedMotion ? { display: active ? undefined : "none" } : { x, rotateY, scale, zIndex: active ? 2 : 1 }}
    >
      <img src={slide.image} alt={slide.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
    </motion.figure>
  );
};

function MobileShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  function goTo(index: number) {
    const carousel = track.current;
    if (!carousel) return;
    carousel.scrollTo({
      left: carousel.clientWidth * index,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <section aria-labelledby="mobile-showcase-heading" className="bg-[#101619] py-5 text-[#f0cd80] md:hidden">
      <div className="mx-4 mb-3 grid min-h-12 grid-cols-2 items-start gap-3 border-b border-[#f0cd80]/55 pb-3 text-xs font-semibold uppercase leading-tight tracking-wide">
        <h2 id="mobile-showcase-heading">Избранные работы</h2>
        <p className="text-right" aria-live="polite">{slides[activeIndex].title}</p>
      </div>
      <div
        ref={track}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={({ currentTarget }) => {
          if (currentTarget.clientWidth === 0) return;
          const index = Math.round(currentTarget.scrollLeft / currentTarget.clientWidth);
          setActiveIndex(Math.max(0, Math.min(lastIndex, index)));
        }}
      >
        {slides.map((slide) => (
          <img
            key={slide.title}
            src={slide.image}
            alt={slide.title}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full shrink-0 snap-center snap-always object-cover"
          />
        ))}
      </div>
      <div className="mx-auto mt-2 flex w-fit max-w-full rounded-full bg-[#0b1931] px-2" aria-label="Выбор проекта" role="group">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={slide.title}
            aria-current={index === activeIndex ? "true" : undefined}
            className="flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-[#f0cd80]"
          >
            <span className={`h-0.5 w-7 rounded-full ${index === activeIndex ? "bg-[#f0cd80]" : "bg-[#f0cd80]/50"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}

function DesktopShowcase() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const position = useTransform(scrollYProgress, [0, 1], [0, lastIndex]);

  useMotionValueEvent(position, "change", (value) => setActiveIndex(Math.round(value)));

  function goTo(index: number) {
    if (!section.current || !stage.current) return;
    const start = window.scrollY + section.current.getBoundingClientRect().top;
    const distance = section.current.clientHeight - stage.current.clientHeight;
    window.scrollTo({ top: start + distance * index / lastIndex, behavior: reducedMotion ? "instant" : "smooth" });
  }

  return (
    <section ref={section} aria-labelledby="showcase-heading" className="relative hidden h-[230svh] bg-[#101619] md:block">
      <div ref={stage} className="sticky top-0 z-[51] h-svh overflow-hidden">
        <div className="absolute inset-0 grid [perspective:1600px]">
          {slides.map((slide, index) => (
            <ShowcaseSlide key={slide.title} slide={slide} index={index} position={position} active={index === activeIndex} reducedMotion={reducedMotion} />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#0b1931]/85 to-transparent px-4 pb-5 pt-4 sm:px-[10vw] sm:pb-7 sm:pt-6">
          <div className="flex items-start justify-between gap-4 border-b border-[#f0cd80]/55 pb-2.5 text-xs font-semibold uppercase leading-tight tracking-wide text-[#f0cd80] sm:pb-4 sm:text-sm">
            <h2 id="showcase-heading" className="shrink-0">Избранные работы</h2>
            <p className="min-w-0 text-right">{slides[activeIndex].title}</p>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full border border-[#f0cd80]/25 bg-[#0b1931] px-3 shadow-xl sm:bottom-6 sm:gap-2 sm:px-4" aria-label="Выбор проекта" role="group">
          {slides.map((slide, index) => (
            <button key={slide.title} type="button" onClick={() => goTo(index)}
              aria-label={slide.title} aria-current={index === activeIndex ? "true" : undefined}
              className="group flex h-[29px] w-7 cursor-pointer items-center justify-center rounded-full px-0.5 focus-visible:outline-2 focus-visible:outline-[#f0cd80] sm:w-12"
            >
              <span className={`h-0.5 w-full rounded-full transition-colors ${index === activeIndex ? "bg-[#f0cd80]" : "bg-[#f0cd80]/50 group-hover:bg-[#f0cd80]/80"}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectShowcase() {
  return (
    <>
      <MobileShowcase />
      <DesktopShowcase />
    </>
  );
}
