import { useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionContext } from './SectionContext';

const sections = [
    { id: 'hero', Component: HeroContent },
    { id: 'about', Component: AboutContent },
    { id: 'services', Component: ServicesContent },
    { id: 'projects', Component: ProjectsContent },
    { id: 'contact', Component: ContactContent },
];

// Directional animation variants
const variants = {
    enter: (direction: number) => ({
        y: direction > 0 ? '100%' : '-100%',
        opacity: 0,
        scale: 0.95,
    }),
    center: {
        y: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        y: direction > 0 ? '-15%' : '15%',
        opacity: 0,
        scale: 0.95,
    }),
};

const transition = {
    duration: 1.2,
    ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
};

export default function ScrollContainer() {
    return (
        <div className="relative w-full overflow-x-hidden">
            {sections.map((section, index) => (
                <SectionWrapper
                    key={section.id}
                    id={section.id}
                    Component={section.Component}
                    index={index}
                />
            ))}
        </div>
    );
}

function SectionWrapper({
    id,
    Component,
    index
}: {
    id: string;
    Component: React.ComponentType;
    index: number;
}) {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full min-h-[80vh] flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 md:py-24"
        >
            <div className="max-w-7xl mx-auto w-full">
                <Component />
            </div>
        </motion.section>
    );
}

// ============================================
// HERO CONTENT
// ============================================
function HeroContent() {
    const highlights = [
        "Desarrollo de aplicaciones y sistemas web",
        "Estructura y organización del software",
        "Implementación de soluciones digitales",
        "Mantenimiento y mejora de aplicaciones web"
    ];

    return (
        <div className="text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-muted font-medium">Disponible para proyectos</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-4"
            >
                Camilo Anthony
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-accent font-medium mb-2"
            >
                Desarrollador Web
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base md:text-lg text-muted mb-6"
            >
                Desarrollo de aplicaciones y sistemas web
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-lg text-muted max-w-3xl mx-auto mb-8 leading-relaxed"
            >
                Trabajo en el desarrollo de aplicaciones y sistemas web, participando en el diseño,
                la estructura y la implementación de soluciones digitales. Mi enfoque se basa en crear
                aplicaciones claras, organizadas y funcionales, adaptadas a las necesidades de cada proyecto.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mb-10 max-w-2xl mx-auto"
            >
                {highlights.map((item, i) => (
                    <motion.span
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-muted"
                    >
                        {item}
                    </motion.span>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <button
                    onClick={() => { }}
                    className="group px-8 py-4 rounded-full bg-white text-black font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                >
                    Ver proyectos →
                </button>
                <button
                    onClick={() => { }}
                    className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300"
                >
                    Contactarme
                </button>
            </motion.div>
        </div>
    );
}

// ============================================
// ABOUT CONTENT
// ============================================
function AboutContent() {
    const paragraphs = [
        "Cuento con formación en diseño y programación web, lo que me permite comprender tanto la parte técnica como la experiencia de uso de las aplicaciones.",
        "Trabajo con un enfoque ordenado y estructurado, priorizando la claridad, la organización y la facilidad de mantenimiento de cada sistema.",
        "Me adapto a las necesidades de cada proyecto, buscando siempre desarrollar soluciones que puedan mantenerse y evolucionar en el tiempo."
    ];

    const highlights = [
        "Desarrollo de aplicaciones y sistemas web",
        "Organización y estructura del software",
        "Implementación y mantenimiento de soluciones digitales",
        "Trabajo responsable y orientado a la calidad"
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start md:items-center">
            <div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-accent font-medium mb-4 tracking-wide uppercase text-sm"
                >
                    Sobre mí
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight"
                >
                    Camilo Anthony
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-muted text-base md:text-lg leading-relaxed mb-6"
                >
                    Soy Camilo Anthony, desarrollador web dedicado al desarrollo de aplicaciones y sistemas web.
                    Participo en todas las etapas del proceso, desde la planificación y estructura del sistema
                    hasta su implementación y mantenimiento. Mi trabajo se basa en crear soluciones digitales
                    claras, organizadas y funcionales, cuidando la calidad del código y la correcta estructura del software.
                </motion.p>
                {paragraphs.map((text, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                        className="text-muted text-sm leading-relaxed mb-4"
                    >
                        {text}
                    </motion.p>
                ))}
            </div>
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Enfoque</h3>
                    <ul className="space-y-3">
                        {highlights.map((item, i) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                className="flex items-start gap-3 text-muted text-sm"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}

// ============================================
// SERVICES CONTENT
// ============================================
function ServicesContent() {
    const services = [
        {
            name: "Análisis y planificación",
            description: "Análisis de requerimientos y planificación del sistema web, definiendo la estructura y el alcance del proyecto antes de su desarrollo."
        },
        {
            name: "Desarrollo de sistemas web",
            description: "Desarrollo de sistemas web a medida, participando en la estructura, implementación y organización del sistema según las necesidades del proyecto."
        },
        {
            name: "Mantenimiento y mejora de sistemas web",
            description: "Mantenimiento, ajustes y mejoras en sistemas web existentes, cuidando su estabilidad, organización y correcto funcionamiento."
        },
        {
            name: "Soporte técnico",
            description: "Soporte técnico para sistemas web, realizando correcciones y ajustes necesarios durante su uso."
        }
    ];

    return (
        <div>
            <div className="text-center mb-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-accent font-medium mb-4 tracking-wide uppercase text-sm"
                >
                    Servicios
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                    Lo que puedo hacer por ti
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-muted max-w-2xl mx-auto"
                >
                    Ofrezco servicios orientados al desarrollo y mantenimiento de sistemas web,
                    trabajando de forma organizada y adaptándome a los requerimientos de cada proyecto.
                </motion.p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {services.map((service, i) => (
                    <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-500"
                    >
                        <h3 className="text-lg font-semibold text-white mb-3">{service.name}</h3>
                        <p className="text-muted text-sm leading-relaxed">{service.description}</p>
                    </motion.div>
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
            name: "Sistema de gestión hotelera",
            description: "Sistema web desarrollado para la gestión y organización de información en hostales y hoteles.",
            image: "/projects/hotel-system.png",
            gradient: "from-blue-500/20 to-purple-500/20"
        },
        {
            name: "Sistema de consultas por créditos",
            description: "Sistema web orientado a la gestión de consultas y control de uso por parte de los usuarios.",
            image: "/projects/credits-system.png",
            gradient: "from-green-500/20 to-teal-500/20"
        },
        {
            name: "Sistema de consulta de información",
            description: "Sistema web desarrollado para la consulta y procesamiento de información estructurada.",
            image: "/projects/info-system.png",
            gradient: "from-orange-500/20 to-red-500/20"
        }
    ];

    return (
        <div>
            <div className="text-center mb-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-accent font-medium mb-4 tracking-wide uppercase text-sm"
                >
                    Proyectos
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                    Experiencia en sistemas reales
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-muted max-w-2xl mx-auto"
                >
                    A continuación se muestran algunos proyectos desarrollados como parte de mi experiencia
                    en el desarrollo de sistemas web.
                </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {projects.map((project, i) => (
                    <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        className="rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all duration-500 group overflow-hidden"
                    >
                        {/* Thumbnail placeholder - replace image src with your own */}
                        <div className={`relative h-40 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Placeholder pattern */}
                                <div className="w-full h-full opacity-30">
                                    <div className="absolute top-4 left-4 right-4 h-6 bg-white/20 rounded"></div>
                                    <div className="absolute top-14 left-4 w-1/3 h-20 bg-white/10 rounded"></div>
                                    <div className="absolute top-14 left-1/3 right-4 ml-6 h-20 bg-white/10 rounded"></div>
                                    <div className="absolute bottom-4 left-4 right-4 h-4 bg-white/10 rounded"></div>
                                </div>
                                {/* Icon overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500"></div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                                {project.name}
                            </h3>
                            <p className="text-muted text-sm leading-relaxed">{project.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center text-muted text-sm italic"
            >
                La lista de proyectos se ampliará progresivamente conforme se desarrollen nuevos sistemas.
            </motion.p>
        </div>
    );
}

// ============================================
// CONTACT CONTENT
// ============================================
function ContactContent() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-accent font-medium mb-4 tracking-wide uppercase text-sm"
                >
                    Contacto
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                    Hablemos sobre tu proyecto
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-muted text-base md:text-lg max-w-2xl mx-auto"
                >
                    Si necesitas desarrollar un sistema web o realizar mejoras en uno existente,
                    puedes ponerte en contacto para evaluar tu proyecto y definir una posible solución.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10"
                >
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Nombre <span className="text-accent">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-colors"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Correo electrónico <span className="text-accent">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-colors"
                                placeholder="tu@correo.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                Mensaje <span className="text-accent">*</span>
                            </label>
                            <textarea
                                required
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-muted focus:border-accent/50 focus:outline-none focus:ring-1 focus:ring-accent/50 transition-colors resize-none"
                                placeholder="Cuéntame sobre tu proyecto..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-white/10"
                        >
                            Enviar mensaje →
                        </button>
                    </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col justify-between"
                >
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-4">
                        <h3 className="text-lg font-semibold text-white mb-4">Información de contacto</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-muted">Correo electrónico</p>
                                    <p className="text-white">contacto@camiloanthony.dev</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                        <p className="text-muted text-sm leading-relaxed">
                            También puedes comunicarte directamente a través del correo electrónico.
                            Respondo a la brevedad posible.
                        </p>
                    </div>
                </motion.div>
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-16 text-center text-muted text-xs"
            >
                © {new Date().getFullYear()} Camilo Anthony · Desarrollo de sistemas web
            </motion.p>
        </div>
    );
}
