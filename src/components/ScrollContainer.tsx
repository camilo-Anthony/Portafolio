import { useState, useEffect, useRef } from 'react';
import { audioSystem } from '../lib/audio';
import { cn } from '../lib/utils';
import { Mail, Linkedin, ArrowRight, Send, Globe, Code2, Server, Cpu } from 'lucide-react';

const sections = [
    { id: 'hero', Component: HeroContent },
    { id: 'about', Component: AboutContent },
    { id: 'tech', Component: TechContent },
    { id: 'projects', Component: ProjectsContent },
    { id: 'philosophy', Component: PhilosophyContent },
    { id: 'contact', Component: ContactContent },
];

export default function ScrollContainer() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative w-full overflow-x-hidden bg-[var(--bg)] text-[var(--text)] selection:bg-accent selection:text-white transition-colors duration-500">
            {/* Dynamic Cursor Light (Flashlight effect) */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--glow-color), transparent 40%)`
                }}
            />

            {sections.map((section) => (
                <SectionWrapper
                    key={section.id}
                    id={section.id}
                    Component={section.Component}
                />
            ))}
        </div>
    );
}

function SectionWrapper({ id, Component }: { id: string; Component: React.ComponentType }) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={cn(
                "w-full min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-24 border-b border-black/[0.03] dark:border-white/[0.02]",
                isVisible ? "animate-fade-up" : "opacity-0"
            )}
        >
            <div className="max-w-7xl mx-auto w-full relative z-10">
                <Component />
            </div>
        </section>
    );
}

// ============================================
// HERO CONTENT
// ============================================

function HeroContent() {
    const fullText = "Camilo Anthony";
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let i = 0;
        let isDeleting = false;
        let timeout: ReturnType<typeof setTimeout>;

        const loop = () => {
            setIsTyping(true);

            if (!isDeleting) {
                setDisplayText(fullText.slice(0, i + 1));
                i++;
                if (i === fullText.length) {
                    isDeleting = true;
                    setIsTyping(false);
                    // Esperar 10 segundos antes de empezar a borrar
                    timeout = setTimeout(loop, 10000);
                } else {
                    timeout = setTimeout(loop, 80);
                }
            } else {
                setDisplayText(fullText.slice(0, i - 1));
                i--;
                if (i === 0) {
                    isDeleting = false;
                    // Esperar 1 segundo antes de volver a escribir
                    timeout = setTimeout(loop, 1000);
                } else {
                    timeout = setTimeout(loop, 40);
                }
            }
        };

        timeout = setTimeout(loop, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="space-y-12">
            <h1 className="text-5xl md:text-6xl lg:text-[6rem] font-black leading-[0.9] tracking-tighter uppercase italic pt-12">
                {displayText.split(' ')[0]} <br />
                <span className="opacity-30 dark:opacity-10">{displayText.split(' ')[1] || ''}</span>
                <span className={cn(
                    "inline-block w-[0.1em] h-[0.8em] bg-accent ml-2 translate-y-2",
                    !isTyping && "animate-blink"
                )} />
            </h1>

            <div className="max-w-3xl space-y-8">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-[var(--text)]">
                    Desarrollador web enfocado en la creación de aplicaciones y plataformas digitales orientadas a resolver problemas reales mediante tecnología.
                </p>
                <p className="text-lg md:text-xl font-light text-[var(--muted)] leading-relaxed max-w-2xl">
                    Diseño, desarrollo e implemento sistemas web completos que integran interfaces modernas, lógica de negocio robusta y servicios externos mediante APIs.
                </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-6">
                <button
                    onMouseEnter={() => audioSystem.play('hover')}
                    onClick={() => {
                        audioSystem.play('click');
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-4 px-10 py-5 bg-accent text-white text-xs font-bold uppercase tracking-[0.3em] hover:brightness-110 transition-all duration-300 shadow-[0_0_40px_var(--glow-color)] hover:shadow-[0_0_60px_var(--glow-color)] hover:-translate-y-1"
                >
                    Contactar <ArrowRight size={16} />
                </button>
                <button
                    onMouseEnter={() => audioSystem.play('hover')}
                    onClick={() => {
                        audioSystem.play('click');
                        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-4 px-10 py-5 border border-[var(--card-border)] text-[var(--text)] text-xs font-bold uppercase tracking-[0.3em] hover:bg-[var(--text)] hover:text-[var(--bg)] transition-all duration-300 hover:-translate-y-1"
                >
                    Ver Proyectos
                </button>
            </div>
        </div>
    );
}

// ============================================
// ABOUT CONTENT
// ============================================
function AboutContent() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12 pt-12">

                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1] text-[var(--text)]">
                    Sobre <span className="opacity-60 dark:opacity-30 font-light">mí</span>
                </h2>

                <div className="space-y-8 text-xl font-light text-[var(--muted)] leading-relaxed">
                    <p>
                        Soy desarrollador web con experiencia en la creación de aplicaciones completas que combinan desarrollo frontend, backend e integración de servicios externos.
                    </p>
                    <p>
                        Mi enfoque de desarrollo se centra en la organización del software mediante arquitecturas estructuradas, separación de responsabilidades y diseño modular del código.
                    </p>
                    <p>
                        Esto permite que los sistemas puedan evolucionar con el tiempo y adaptarse a nuevas necesidades sin comprometer su estabilidad.
                    </p>
                </div>
            </div>

            <div className="lg:pt-24 space-y-12">
                <div className="p-10 border border-[var(--card-border)] bg-[var(--card-bg)] space-y-6">
                    <div className="flex items-center gap-4 text-accent">
                        <Cpu size={20} />
                        <span className="font-mono text-[10px] tracking-widest uppercase">Specialization_Module</span>
                    </div>
                    <p className="text-sm font-light text-[var(--muted)] leading-relaxed">
                        Me interesa la creación de herramientas tecnológicas que integren inteligencia artificial, automatización de procesos y consumo de APIs externas para construir soluciones más inteligentes y eficientes.
                    </p>
                </div>


            </div>
        </div>
    );
}

// ============================================
// TECH CONTENT
// ============================================
function TechContent() {
    const stacks = [
        {
            icon: Code2,
            title: "Frontend Development",
            content: "React, Astro y Tailwind CSS. Interfaces responsivas, componentes reutilizables y rendimiento optimizado para una experiencia fluida."
        },
        {
            icon: Server,
            title: "Backend & Systems",
            content: "PHP y Python con FastAPI. APIs REST, autenticación, lógica de negocio y conexión con bases de datos y servicios externos."
        },
        {
            icon: Cpu,
            title: "Software Architecture",
            content: "Patrón MVC, separación de capas y código modular. Sistemas organizados que escalan sin acumular deuda técnica."
        },
        {
            icon: Globe,
            title: "Deployment & OPS",
            content: "Despliegue en VPS, Vercel y Render. Configuración de dominios, SSL, CI/CD y monitoreo en producción."
        }
    ];

    return (
        <div className="space-y-20 pt-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1] text-[var(--text)]">
                Stack <span className="opacity-60 dark:opacity-30 font-light">Tecnológico</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--card-border)] border border-[var(--card-border)]">
                {stacks.map((s, i) => (
                    <div key={i} className="hover-card-glow bg-[var(--bg)] p-10 space-y-8 transition-colors group">
                        <div className="p-4 border border-[var(--card-border)] w-fit group-hover:border-accent transition-colors">
                            <s.icon className="text-[var(--muted)] group-hover:text-accent transition-colors" size={24} />
                        </div>
                        <h3 className="text-sm md:text-base font-bold uppercase tracking-widest text-[var(--text)]">{s.title}</h3>
                        <p className="text-sm font-light text-[var(--muted)] leading-relaxed">{s.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// PROJECTS CONTENT
// ============================================
function ProjectsContent() {
    const projects = [
        {
            id: "01",
            name: "Sistema de gestión para hostales",
            desc: "Administración centralizada de habitaciones, reservas y clientes. Arquitectura organizada para mantenimiento y escalabilidad futura.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
            tech: ["PHP", "MySQL", "MVC"],
            link: "#"
        },
        {
            id: "02",
            name: "Automatización WhatsApp con IA",
            desc: "Plataforma que automatiza respuestas mediante inteligencia artificial, conectando via QR con mecanismos de control de flujo.",
            image: "https://images.unsplash.com/photo-1574767514286-88343ede5322?q=80&w=2070&auto=format&fit=crop",
            tech: ["Next.js", "Prisma", "Groq API"],
            link: "#"
        },
        {
            id: "03",
            name: "Plataforma de consultas APIs",
            desc: "Sistema diseñado para centralizar información de múltiples servicios externos mediante APIs estructuradas.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
            tech: ["Python", "FastAPI", "React"],
            link: "#"
        },
        {
            id: "04",
            name: "Plataforma SaaS por Créditos",
            desc: "Modelo de herramientas digitales como servicio basado en créditos, con registro de usuarios y pasarelas de pago.",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2070&auto=format&fit=crop",
            tech: ["React", "Node.js", "Stripe"],
            link: "#"
        }
    ];

    return (
        <div className="space-y-20 pt-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1] text-[var(--text)]">
                Proyectos <span className="opacity-60 dark:opacity-30 font-light">Destacados</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                {projects.map((p) => (
                    <div
                        key={p.id}
                        onMouseEnter={() => audioSystem.play('hover')}
                        className="hover-card-glow group relative border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden"
                    >
                        <div className="relative aspect-video overflow-hidden">
                            <img src={p.image} alt={p.name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                        </div>
                        <div className="p-8 space-y-4">
                            <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-accent transition-colors">
                                {p.name}
                            </h3>
                            <p className="text-sm font-light text-[var(--muted)] leading-relaxed">{p.desc}</p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {p.tech.map((t) => (
                                    <span key={t} className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider border border-[var(--card-border)] text-[var(--muted)]">{t}</span>
                                ))}
                            </div>
                            <a
                                href={p.link}
                                onClick={() => audioSystem.play('click')}
                                className="inline-flex items-center gap-2 pt-2 text-xs font-bold uppercase tracking-[0.2em] text-accent hover:gap-4 transition-all duration-300"
                            >
                                Ver Proyecto <ArrowRight size={14} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ============================================
// PHILOSOPHY CONTENT
// ============================================
function PhilosophyContent() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 pt-12">

            <div className="lg:col-span-7 space-y-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase leading-[1] tracking-tight text-[var(--text)]">
                    Enfoque de <br /> <span className="opacity-60 dark:opacity-20 font-light">desarrollo</span>
                </h2>
                <div className="space-y-8 text-xl font-light text-[var(--muted)] leading-relaxed max-w-2xl">
                    <p>
                        Código limpio, arquitectura clara y cero atajos. Cada proyecto está pensado para funcionar hoy y escalar mañana.
                    </p>
                    <p>
                        Prefiero invertir tiempo en una buena estructura desde el inicio que acumular deuda técnica después.
                    </p>
                </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center relative">
                {/* Micro-decoration grid */}
                <svg className="absolute -top-10 -right-10 w-48 h-48 text-accent/10 dark:text-accent/5" fill="none" viewBox="0 0 100 100">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid)" />
                </svg>

                <div className="bg-[var(--card-bg)] border border-[var(--card-border)] p-12 space-y-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8">
                        <div className="h-1 w-12 bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="font-mono text-[10px] tracking-widest text-accent font-bold opacity-60 dark:opacity-30">// Próximo nivel</div>
                    <p className="text-[var(--text)] font-light leading-relaxed">
                        Actualmente enfocado en construir productos SaaS, automatizar procesos con IA y dominar el ciclo completo: desde la idea hasta el despliegue en producción.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ============================================
// CONTACT CONTENT
// ============================================
function ContactContent() {
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        audioSystem.play('click');
        setStatus('Enviando...');
        setTimeout(() => setStatus('¡Mensaje enviado!'), 2000);
    };

    return (
        <div className="space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start pt-12">
                <div className="lg:col-span-5 space-y-12">

                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
                        Contacto.
                    </h2>

                    <p className="text-xl font-light text-[var(--muted)] leading-relaxed">
                        ¿Tienes un proyecto en mente o quieres colaborar? Escríbeme y hablemos.
                    </p>

                    <div className="flex flex-col gap-6 pt-10 border-t border-[var(--card-border)]">
                        <a href="mailto:hello@camiloanthony" className="group flex items-center gap-6">
                            <Mail size={16} className="text-[var(--muted)] group-hover:text-accent transition-colors" />
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">hello@camiloanthony</span>
                        </a>
                        <a href="https://linkedin.com" className="group flex items-center gap-6">
                            <Linkedin size={16} className="text-[var(--muted)] group-hover:text-accent transition-colors" />
                            <span className="font-mono text-[10px] tracking-widest uppercase opacity-80">/in/camiloanthony</span>
                        </a>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="p-8 md:p-12 border border-[var(--card-border)] bg-[var(--card-bg)] space-y-8 relative mt-10 lg:mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-70 dark:opacity-30 text-accent font-black">Nombre</label>
                                <input type="text" required className="w-full bg-transparent border-b border-[var(--card-border)] py-3 focus:outline-none focus:border-accent transition-colors font-light" placeholder="Tu nombre" />
                            </div>
                            <div className="space-y-4">
                                <label className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-70 dark:opacity-30 text-accent font-black">Email</label>
                                <input type="email" required className="w-full bg-transparent border-b border-[var(--card-border)] py-3 focus:outline-none focus:border-accent transition-colors font-light" placeholder="tu@email.com" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="font-mono text-[9px] uppercase tracking-[0.4em] opacity-70 dark:opacity-30 text-accent font-black">Mensaje</label>
                            <textarea rows={4} required className="w-full bg-transparent border-b border-[var(--card-border)] py-3 focus:outline-none focus:border-accent transition-colors font-light resize-none" placeholder="Cuéntame sobre tu proyecto..." />
                        </div>

                        <button className="w-full flex items-center justify-between group p-8 border border-accent/30 hover:bg-accent hover:text-white transition-all duration-500 shadow-[0_0_20px_var(--glow-color)] hover:shadow-[0_0_40px_var(--glow-color)]">
                            <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold">{status || 'Enviar Mensaje'}</span>
                            <Send size={18} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>

            <div className="pt-20 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[8px] uppercase tracking-[0.5em] opacity-50 dark:opacity-10">
                <span>© 2026 Camilo Anthony</span>
                <span>Desarrollado con React + Astro</span>
            </div>
        </div>
    );
}
