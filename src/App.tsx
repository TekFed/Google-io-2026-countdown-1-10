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
  const [time, setTime] = useState({ m: 10, s: 0 });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(prev => {
        let { m, s } = prev;
        if (m === 0 && s === 0) return prev;
        s--;
        if (s < 0) { s = 59; m--; }
        return { m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-bg-dark overflow-hidden flex flex-col items-center justify-between font-sans selection:bg-io-blue/30">
      <ParticleNetwork />
      
      {/* Background Neural Gradient */}
      <div className="absolute inset-0 neural-gradient pointer-events-none" />

      {/* Decorative Dashed Orbits */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="dashed-orbit w-[400px] h-[400px] border-io-blue/20" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="dashed-orbit w-[600px] h-[600px] border-io-green/10" 
        />
      </div>

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
      <AnimatePresence>
        {mounted && (
          <section className="relative z-10 flex flex-col items-center justify-center flex-1">
            <div className="header-label mb-[-20px] transition-all duration-700 opacity-60">Minutes to Commencement</div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              key={Math.ceil((time.m * 60 + time.s) / 60)}
              className="relative cursor-pointer group"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <h1 className="font-sans font-black text-[320px] leading-none tracking-tighter neon-glow text-white select-none">
                {Math.max(0, Math.ceil((time.m * 60 + time.s) / 60))}
              </h1>

              {/* Hover effect particles */}
              <motion.div 
                animate={{ 
                  scale: hovered ? 1.2 : 1,
                  opacity: hovered ? 0.4 : 0.1
                }}
                className="absolute inset-0 bg-io-blue rounded-full blur-[100px] -z-10 transition-all duration-700"
              />
            </motion.div>

            {/* Sub-counters */}
            <div className="flex gap-10 mt-[-20px] items-start">
              {[
                { label: "Minutes", value: time.m, color: "text-io-green" },
                { label: "Seconds", value: time.s, color: "text-io-red" }
              ].map((item, i) => (
                <div key={item.label} className="text-center group">
                  <div className={`text-3xl font-semibold tracking-tight transition-colors ${item.color}`}>
                    {item.value.toString().padStart(2, '0')}
                  </div>
                  <div className="header-label text-[9px] mt-1 group-hover:text-white transition-colors">{item.label}</div>
                </div>
              ))}
            </div>
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
