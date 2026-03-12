import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';
import { useSectionContext } from './SectionContext';

const navLinks = [
    { name: 'Inicio', id: 'hero' },
    { name: 'Sobre mí', id: 'about' },
    { name: 'Servicios', id: 'services' },
    { name: 'Proyectos', id: 'projects' },
    { name: 'Contacto', id: 'contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { activeSection, setActiveSection } = useSectionContext();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = navLinks.findIndex(link => link.id === entry.target.id);
                    if (index !== -1) {
                        setActiveSection(index);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        navLinks.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [setActiveSection]);

    const handleNavClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-5xl",
                )}
            >
                <div className={cn(
                    "rounded-full border border-white/5 bg-bg/60 backdrop-blur-xl shadow-lg transition-all duration-300 px-6 py-3 flex justify-between items-center",
                    isScrolled && "bg-bg/80 border-white/10 shadow-xl shadow-accent/5"
                )}>
                    {/* Logo */}
                    <button
                        onClick={() => handleNavClick('hero')}
                        className="flex items-center gap-2 group"
                    >
                        <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm overflow-hidden relative">
                            <span className="relative z-10">CA</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white hidden sm:block">
                            Camilo<span className="text-muted font-normal"> Anthony</span>
                        </span>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full px-2 py-1 border border-white/5">
                        {navLinks.map((link, index) => (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.id)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
                                    activeSection === index
                                        ? "bg-accent/20 text-accent"
                                        : "text-muted hover:text-white hover:bg-white/10"
                                )}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Social / Contact / Theme */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-muted hover:text-white hover:bg-white/10 transition-colors">
                            <Github size={18} />
                        </a>
                        <button
                            onClick={() => handleNavClick('contact')}
                            className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 active:scale-95 transition-transform flex items-center gap-2"
                        >
                            Hablemos <ArrowUpRight size={16} />
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-muted hover:text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-3xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                    key={link.name}
                                    onClick={() => handleNavClick(link.id)}
                                    className={cn(
                                        "text-3xl font-bold transition-colors text-left",
                                        activeSection === i ? "text-accent" : "text-white hover:text-accent"
                                    )}
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
