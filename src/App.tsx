/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Cpu, Globe, Zap, ArrowRight, Share2, MapPin } from 'lucide-react';
import ParticleNetwork from './components/ParticleNetwork';

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [count, setCount] = useState(10);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCount(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden flex flex-col items-center justify-between font-sans selection:bg-io-blue/30">
      <ParticleNetwork isLaunched={count === 0} />
      
      {/* Background Neural Gradient */}
      <div className="absolute inset-0 neural-gradient pointer-events-none" />

      {/* Top Navigation */}
      <nav className="w-full p-10 flex justify-between items-center z-20 relative">
        <div className="font-bold text-2xl -tracking-[2px] text-white">Google I/O</div>
        <div className="flex gap-6">
          <div className="pill">
            <span className="w-2 h-2 rounded-full bg-io-green animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">System Online</span>
          </div>
          <div className="pill">
             <span className="font-mono text-[10px] tracking-widest uppercase text-white/80">May 19, 2026</span>
          </div>
        </div>
      </nav>

      {/* Main Centerpiece */}
      <AnimatePresence mode="wait">
        {mounted && (
          <section className="relative z-10 flex flex-col items-center justify-center flex-1 w-full">
            {/* Background Orbits - Now anchored to this section's center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="dashed-orbit w-[450px] h-[450px] border-io-blue/20" 
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                className="dashed-orbit w-[650px] h-[650px] border-io-green/10" 
              />
            </div>

            <div className="header-label mb-[-40px] z-20 opacity-60">
              {count === 0 ? "Sequence Complete" : "Seconds to Commencement"}
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: count === 0 ? [1, 1.2, 1] : 1,
                rotate: count === 0 ? [0, 5, -5, 0] : 0
              }}
              transition={{ 
                duration: count === 0 ? 0.5 : 0.3,
                ease: "easeOut"
              }}
              key={count}
              className="relative cursor-pointer group flex items-center justify-center min-w-[400px] min-h-[400px]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {count === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center"
                >
                  <h1 className="font-sans font-black text-8xl md:text-9xl neon-glow text-white tracking-tighter text-center">
                    GOOGLE<br />I/O
                  </h1>
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="header-label mt-8 text-io-blue"
                  >
                    Event Initiated
                  </motion.div>
                </motion.div>
              ) : (
                <h1 className="font-sans font-black text-[320px] leading-[0.8] neon-glow text-white select-none z-10">
                  {count}
                </h1>
              )}

              {/* Glowing Background (Reactive) */}
              <motion.div 
                animate={{ 
                  scale: (hovered || count === 0) ? 1.5 : 1,
                  opacity: (hovered || count === 0) ? 0.6 : 0.15,
                  backgroundColor: count === 0 ? ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#4285F4'] : '#4285F4'
                }}
                transition={{
                  backgroundColor: { duration: 4, repeat: Infinity, ease: "linear" }
                }}
                className="absolute w-[300px] h-[300px] bg-io-blue rounded-full blur-[120px] -z-10 transition-all duration-700"
              />
            </motion.div>
            
            {/* White-out Flash on Launch */}
            {count === 0 && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="fixed inset-0 bg-white z-[100] pointer-events-none"
              />
            )}
          </section>
        )}
      </AnimatePresence>

      {/* Footer Information */}
      <footer className="w-full p-10 flex justify-between items-end z-20 relative">
        <div className="max-w-[300px]">
          <div className="header-label flex items-center gap-2">
            <MapPin size={10} />
            Location
          </div>
          <div className="text-sm mt-3 text-white/80 leading-relaxed font-light">
            Shoreline Amphitheatre<br />
            Mountain View, California
          </div>
        </div>

        <div className="text-right">
          <div className="header-label">AI Research Lab</div>
          <div className="text-sm mt-3 text-white/40 font-mono italic">
            Neural Synthesis Module v4.7.2
          </div>
          <div className="h-[2px] w-32 mt-4 ml-auto overflow-hidden bg-white/5 rounded-full relative">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 bg-gradient-to-r from-io-blue via-io-green to-io-red" 
            />
          </div>
        </div>
      </footer>

      {/* Atmospheric Particles (Static from theme) */}
      <div className="absolute top-[20%] left-[30%] w-1 h-1 bg-io-blue rounded-full shadow-[0_0_10px_#4285F4] opacity-40" />
      <div className="absolute top-[45%] left-[70%] w-[3px] h-[3px] bg-io-green rounded-full shadow-[0_0_10px_#34A853] opacity-40" />
      <div className="absolute top-[70%] left-[25%] w-[5px] h-[5px] bg-io-red rounded-full shadow-[0_0_10px_#EA4335] opacity-40" />
    </main>
  );
}
