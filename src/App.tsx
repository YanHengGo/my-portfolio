/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Tent, 
  Car, 
  Code2, 
  Cpu, 
  Smartphone, 
  Layers,
  ChevronRight
} from 'lucide-react';

// --- Particle Background Component ---
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: 0, y: 0, radius: 100 };

    class Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      density: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2 + 1;
        this.density = (Math.random() * 30) + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx / 20;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy / 20;
          }
        }
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
    />
  );
};

// --- Main App Component ---
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const skills = [
    { name: 'Claude Code', icon: <Cpu size={16} /> },
    { name: 'Kotlin', icon: <Smartphone size={16} /> },
    { name: 'Java', icon: <Code2 size={16} /> },
    { name: 'Ruby', icon: <Layers size={16} /> },
  ];

  const projects = [
    {
      title: "Notion Blog",
      description: "技術的な知見や日常の思考をまとめたパーソナルブログ。",
      link: "https://yanheng.notion.site/",
      type: "Blog"
    },
    {
      title: "子供タスク管理サービス",
      description: "子供が楽しみながらタスクを完了できる、ゲーミフィケーションを取り入れた管理ツール。",
      link: "https://learning-app-web-tan.vercel.app/login",
      type: "Web Service"
    },
    {
      title: "GitHub Profile",
      description: "AndroidアプリやAI関連の実験的プロジェクトを公開しています。",
      link: "https://github.com/YanHengGo",
      type: "Open Source"
    }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-black selection:text-white">
      <ParticleBackground />

      <main className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* Hero Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              厳恒 <span className="text-gray-400 font-light">Yan Heng</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light tracking-tight mb-8">
              Androidエンジニア / AI活用クリエイター
            </p>
            
            <div className="flex flex-wrap gap-3 mb-12">
              {skills.map((skill) => (
                <span 
                  key={skill.name}
                  className="flex items-center gap-2 px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-full text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors duration-300"
                >
                  {skill.icon}
                  {skill.name}
                </span>
              ))}
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Tent size={18} className="text-gray-400" />
                <span>キャンプ</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Car size={18} className="text-gray-400" />
                <span>ドライブ</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section className="mb-24">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-10 font-bold"
          >
            Projects & Links
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="group relative p-8 bg-white border border-gray-100 rounded-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 py-1 bg-gray-50 rounded">
                    {project.type}
                  </span>
                  <ExternalLink size={16} className="text-gray-300 group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-black transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-6 flex items-center text-xs font-bold text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  VIEW PROJECT <ChevronRight size={14} className="ml-1" />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="pt-12 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          >
            <div>
              <p className="text-sm text-gray-400 mb-2">Get in touch</p>
              <a 
                href="mailto:genmanabu@gmail.com" 
                className="text-xl font-medium hover:text-gray-500 transition-colors duration-300 flex items-center gap-2"
              >
                <Mail size={20} />
                genmanabu@gmail.com
              </a>
            </div>
            
            <div className="flex gap-6">
              <a 
                href="https://github.com/YanHengGo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="mt-20 text-[10px] text-gray-300 tracking-widest uppercase text-center"
          >
            © 2026 Yan Heng. Built with Passion & AI.
          </motion.p>
        </footer>
      </main>
    </div>
  );
}
