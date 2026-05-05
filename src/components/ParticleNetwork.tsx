import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
  angle: number;
  radius: number;
  color: string;
}

interface ParticleNetworkProps {
  isLaunched?: boolean;
}

export default function ParticleNetwork({ isLaunched }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 150;
    const connectionDistance = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 400 + 100;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          baseX: centerX,
          baseY: centerY,
          angle: angle,
          radius: radius,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach((p, i) => {
        // Orbit logic - speeds up when launched
        p.angle += isLaunched ? 0.02 : 0.002;
        if (isLaunched) {
          p.radius += 2; // Particles fly outwards
        }
        
        const targetX = centerX + Math.cos(p.angle) * p.radius;
        const targetY = centerY + Math.sin(p.angle) * p.radius;

        // Smoothly move towards orbit target
        const speedRatio = isLaunched ? 0.3 : 0.05;
        p.x += (targetX - p.x) * speedRatio;
        p.y += (targetY - p.y) * speedRatio;

        // Mouse interaction (disabled when launched for cleaner effect)
        if (mouseRef.current.active && !isLaunched) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 200) {
            const force = (200 - dist) / 200;
            p.x -= dx * force * 0.1;
            p.y -= dy * force * 0.1;
          }
        }

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            // Use the first particle's color for the connection with low opacity
            ctx.strokeStyle = `${p.color}${Math.floor(0.15 * (1 - dist / connectionDistance) * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset for next drawings
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    });
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-60"
      id="particle-canvas"
    />
  );
}
