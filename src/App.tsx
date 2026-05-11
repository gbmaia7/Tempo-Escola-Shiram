import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { planData, roadmapData } from './data';

// --- Icons & Assets ---

const Ankh = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5">
    <path d="M12 2a4 4 0 0 0-4 4c0 1.8 1 3.3 2.5 3.84V11H8v2h2.5v9h3v-9H16v-2h-2.5v-1.16A4 4 0 0 0 12 2zm0 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2z" />
  </svg>
);

const TemploLogo = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className={`text-[#d4af37] ${className}`}>
    {/* Mandorla */}
    <path d="M50 20 Q 80 50 50 80 Q 20 50 50 20 Z" fill="rgba(212, 175, 55, 0.05)" />
    {/* Eye */}
    <path d="M35 50 Q 50 40 65 50 Q 50 60 35 50 Z" />
    <circle cx="50" cy="50" r="5" fill="currentColor" />
    {/* Anchor */}
    <path d="M50 80 V 95 M 45 95 H 55 M 40 85 Q 50 100 60 85" strokeWidth="2" />
    {/* Snake */}
    <path d="M50 35 Q 40 40 50 45 Q 60 50 50 55 Q 40 60 50 65" strokeWidth="1.5" />
  </svg>
);

const Divider = () => (
  <div className="flex items-center justify-center my-12 opacity-60">
    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
    <div className="mx-4 text-[#d4af37] flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
      </svg>
    </div>
    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
  </div>
);

const BackgroundGeometry = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] z-0 flex items-center justify-center">
    <svg width="800" height="800" viewBox="0 0 100 100" stroke="#d4af37" strokeWidth="0.2" fill="none">
      <circle cx="50" cy="50" r="48" />
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="32" />
      <circle cx="50" cy="50" r="24" />
      <circle cx="50" cy="50" r="16" />
      <circle cx="50" cy="50" r="8" />
      {/* Flower of life hints */}
      <circle cx="50" cy="18" r="32" />
      <circle cx="50" cy="82" r="32" />
      <circle cx="18" cy="50" r="32" />
      <circle cx="82" cy="50" r="32" />
    </svg>
  </div>
);

const HieroglyphPattern = ({ side }: { side: 'left' | 'right' }) => (
  <div className={`fixed top-0 bottom-0 w-16 ${side === 'left' ? 'left-0 border-r' : 'right-0 border-l'} border-[#d4af37]/20 pointer-events-none z-0 hidden lg:flex flex-col items-center py-10 opacity-40 mix-blend-screen`}>
    {Array.from({ length: 15 }).map((_, i) => (
      <svg key={i} className="w-8 h-8 text-[#d4af37] mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        {i % 3 === 0 && <path d="M12 2v20 M7 7l10 10 M17 7L7 17 M2 12h20" />}
        {i % 3 === 1 && <path d="M5 12h14 M12 5v14 M8 8l8 8 M16 8l-8 8" />}
        {i % 3 === 2 && <circle cx="12" cy="12" r="8" />}
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ))}
  </div>
);

function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, r: number, vx: number, vy: number, alpha: number }[] = [];
    const numParticles = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2 - 0.1, // slightly move upwards
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`; // gold dust
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1]" />;
}


// --- UI Components ---

const FormatParagraphs = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('\n\n').map((paragraph, idx) => (
        <p key={idx} className="mb-4 leading-relaxed text-lg tracking-wide text-white/85">
          {paragraph}
        </p>
      ))}
    </>
  );
};

const Accordion = ({ title, text, isOpen, onClick }: { title: string, text: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="mb-4 rounded-lg overflow-hidden border border-[#d4af37]/30 bg-[#0a1122]">
      <button
        onClick={onClick}
        className="w-full text-left px-6 py-4 bg-[#101931] hover:bg-[#16213e] transition-colors flex justify-between items-center group cursor-pointer"
      >
        <span className="font-serif text-lg text-[#d4af37] group-hover:text-glow transition-all">{title}</span>
        <svg
          className={`w-5 h-5 text-[#d4af37] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 py-4 border-l-4 border-[#d4af37] bg-opacity-50"
          >
            <FormatParagraphs text={text} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SectionCard = ({ section, id }: { section: any, id: string }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <section id={id} className="mb-16 relative z-10 scroll-mt-24">
      <BackgroundGeometry />
      <div className="relative bg-[#0a1122] rounded-xl border border-[#d4af37]/40 p-8 shadow-2xl overflow-hidden backdrop-blur-sm">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-serif text-[#d4af37] text-glow">{section.title}</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#d4af37]/70 hover:text-[#d4af37] transition-colors p-2"
          >
            {isExpanded ? 'Colapsar' : 'Expandir'}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="mb-8">
                <FormatParagraphs text={section.intro} />
              </div>

              {section.subsections && section.subsections.length > 0 && (
                <div className="mt-8 space-y-4">
                  {section.subsections.map((sub: any, idx: number) => (
                    <Accordion
                      key={idx}
                      title={sub.title}
                      text={sub.text}
                      isOpen={openAccordion === idx}
                      onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Divider />
    </section>
  );
};

const RoadmapCard = ({ phase, isActive, onClick }: { phase: any, isActive: boolean, onClick: () => void }) => {
  return (
    <div className="mb-6">
      <button
        onClick={onClick}
        className={`w-full text-left p-6 rounded-lg border transition-all ${isActive ? 'border-[#d4af37] bg-[#101931] shadow-[0_0_15px_rgba(212,175,55,0.2)]' : 'border-[#d4af37]/30 bg-[#0a1122] hover:border-[#d4af37]/60'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded text-sm font-bold font-serif ${isActive ? 'bg-[#d4af37] text-[#02050f]' : 'bg-[#101931] text-[#d4af37] border border-[#d4af37]/50'}`}>
            Fase {phase.phase}
          </div>
          <h3 className={`text-xl font-serif transition-colors ${isActive ? 'text-[#d4af37] text-glow' : 'text-[#d4af37]/80'}`}>
            {phase.title}
          </h3>
        </div>
      </button>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-6 ml-4 border-l-4 border-[#d4af37] bg-[#0a1122]/80 rounded-r-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-3">
                <Ankh />
                <div>
                  <h4 className="text-[#d4af37]/70 text-sm uppercase tracking-widest font-serif mb-1">Duração</h4>
                  <p className="text-white">{phase.duration}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Ankh />
                <div>
                  <h4 className="text-[#d4af37]/70 text-sm uppercase tracking-widest font-serif mb-1">Foco</h4>
                  <p className="text-white">{phase.focus}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <Ankh />
                <div>
                  <h4 className="text-[#d4af37]/70 text-sm uppercase tracking-widest font-serif mb-1">Produtos Ativos</h4>
                  <p className="text-[#d4af37]">{phase.products}</p>
                </div>
              </div>
            </div>
            <div className="pl-8 border-l border-[#d4af37]/20">
              <FormatParagraphs text={phase.details} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Update active section based on scroll
      const sections = ['intro', 's1', 's2', 's3', 's4', 's5', 'roadmap'];
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.4) {
            setActiveSection(sectionId);
          } else if (rect.top < 0 && rect.bottom > window.innerHeight * 0.4) {
             setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-[#d4af37]/30 selection:text-[#d4af37]">
      <ParticleEffect />
      <HieroglyphPattern side="left" />
      <HieroglyphPattern side="right" />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#02050f] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37] to-[#00ffff]/50 cyan-glow"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex relative">
        
        {/* Sidebar Navigation */}
        <aside className="w-64 shrink-0 hidden md:block pt-32">
          <div className="sticky top-24 pr-8">
            <TemploLogo className="w-24 h-24 mb-12 opacity-80" />
            <nav className="space-y-4">
              {['intro', 's1', 's2', 's3', 's4', 's5', 'roadmap'].map((id, index) => {
                const labels = [
                  'Introdução',
                  'Seção 1 (Big Idea)',
                  'Seção 2 (Identidade de Marca)',
                  'Seção 3 (Linha Editorial)',
                  'Seção 4 (Escada de Valor)',
                  'Seção 5 (Operacionalização)',
                  'Roadmap de Fases'
                ];
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`block w-full text-left px-4 py-2 rounded transition-all border-l-2 ${
                      isActive
                        ? 'border-[#d4af37] text-[#d4af37] text-glow bg-[#101931]'
                        : 'border-transparent text-white/50 hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#0a1122]'
                    } font-sans uppercase tracking-wider text-xs font-semibold`}
                  >
                    {labels[index]}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl pt-16 md:pt-32 pb-32">
          <div className="mb-24 text-center md:text-left">
            <div className="flex md:hidden justify-center mb-8">
              <TemploLogo className="w-20 h-20 opacity-80" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#d4af37] text-glow leading-tight mb-6">
              Plano de posicionamento
              <br />
              <span className="text-3xl md:text-4xl opacity-80">Versão 2.0</span>
            </h1>
            <p className="text-[#00ffff]/60 uppercase tracking-[0.3em] font-serif text-sm">Templo Escola Shiram</p>
          </div>

          <div className="space-y-0">
            {planData.sections.map((section, index) => (
              <SectionCard key={section.id} id={section.id} section={section} />
            ))}

            {/* Roadmap Section */}
            <section id="roadmap" className="mb-16 relative z-10 scroll-mt-24">
              <BackgroundGeometry />
              <div className="relative bg-[#0a1122] rounded-xl border border-[#d4af37]/40 p-8 shadow-2xl backdrop-blur-sm">
                 <div className="flex justify-between items-start mb-8">
                  <h2 className="text-3xl font-serif text-[#d4af37] text-glow">Roadmap de Fases</h2>
                </div>
                <div className="mb-8 border-l-4 border-[#00ffff]/30 pl-6 bg-[#101931]/50 p-4 rounded-r">
                   <p className="text-white/85 text-lg">
                    Este roadmap consolida todas as iniciativas mapeadas ao longo das cinco seções, organizadas em ciclos com objetivos claros e critérios de avanço entre fases.
                   </p>
                </div>

                <div className="space-y-4">
                  {roadmapData.map((phase, idx) => (
                    <RoadmapCard
                      key={idx}
                      phase={phase}
                      isActive={activePhaseIndex === idx}
                      onClick={() => setActivePhaseIndex(activePhaseIndex === idx ? null : idx)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
