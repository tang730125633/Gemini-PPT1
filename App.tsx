import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import SlideRenderer from './components/SlideRenderer';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next

  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  const currentSlide = SLIDES[currentSlideIndex];

  // Framer Motion Variants for Slide Transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-100 overflow-hidden flex flex-col relative selection:bg-blue-500/30">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[100px]" />
      </div>

      {/* Header / Top Bar */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 opacity-50">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-xs font-mono tracking-widest uppercase">Gemini 3 Deck</span>
        </div>
        <div className="text-xs font-mono text-slate-500">
          {currentSlideIndex + 1} / {SLIDES.length}
        </div>
      </header>

      {/* Main Slide Area */}
      <main className="flex-1 relative z-10">
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute top-0 left-0 w-full h-full"
          >
             <SlideRenderer slide={currentSlide} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Controls */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex justify-between items-end pointer-events-none">
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="pointer-events-auto flex gap-2">
          <button 
            onClick={goToPrevSlide}
            disabled={currentSlideIndex === 0}
            className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={goToNextSlide}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="p-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="hidden md:block pointer-events-auto">
           <button className="p-2 text-slate-500 hover:text-slate-300 transition-colors" onClick={() => document.documentElement.requestFullscreen().catch(() => {})}>
             <Maximize2 size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default App;
