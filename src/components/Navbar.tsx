import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';
import { useSectionContext } from './SectionContext';
import { audioSystem } from '../lib/audio';

const navLinks = [
    { name: 'Inicio', id: 'hero' },
    { name: 'Sobre mí', id: 'about' },
    { name: 'Stack', id: 'tech' },
    { name: 'Proyectos', id: 'projects' },
    { name: 'Contacto', id: 'contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { activeSection, setActiveSection } = useSectionContext();

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            
            setScrollProgress(Number(scroll));
            setIsScrolled(totalScroll > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        audioSystem.play('click');
        setIsMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
                <div 
                    className="h-full bg-accent transition-all duration-75 ease-out" 
                    style={{ width: `${scrollProgress * 100}%` }}
                />
            </div>

            <nav
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                    isScrolled 
                        ? "bg-[var(--bg)]/80 border-b border-black/5 dark:border-white/10 py-4 backdrop-blur-xl" 
                        : "bg-transparent py-8"
                )}
            >
                <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center font-mono text-[10px] tracking-[0.3em] uppercase">
                    
                    {/* Logo */}
                    <button
                        onClick={() => handleNavClick('hero')}
                        onMouseEnter={() => audioSystem.play('hover')}
                        className="flex items-center gap-2 font-bold group relative z-[60]"
                    >
                        <span className="text-[var(--text-strong)]">Camilo Anthony</span>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link, index) => (
                            <button
                                key={link.id}
                                onClick={() => handleNavClick(link.id)}
                                onMouseEnter={() => audioSystem.play('hover')}
                                className="group relative py-2"
                            >
                                <div className={cn(
                                    "flex items-center gap-2 transition-colors duration-300",
                                    activeSection === index ? "text-[var(--text-strong)]" : "text-[var(--muted)] group-hover:text-[var(--text-strong)]"
                                )}>
                                    <span>{link.name}</span>
                                </div>
                                {/* Active Indicator Line */}
                                <div className={cn(
                                    "absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ease-out",
                                    activeSection === index ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50"
                                )} />
                            </button>
                        ))}
                    </div>

                    {/* Right UI Elements */}
                    <div className="flex items-center gap-6 relative z-[60]">
                        <ThemeToggle />
                        
                        <button
                            onClick={() => handleNavClick('contact')}
                            onMouseEnter={() => audioSystem.play('hover')}
                            className="hidden sm:flex items-center gap-2 border border-[var(--card-border)] bg-[var(--surface)] px-5 py-2 hover:bg-[var(--text-strong)] hover:text-[var(--bg)] hover:border-[var(--text-strong)] transition-all font-bold group"
                        >
                            Contactar
                            <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button 
                            className="md:hidden p-2 text-[var(--text)] hover:text-accent transition-colors"
                            onClick={() => {
                                audioSystem.play('click');
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                            }}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Immersive Mobile Overlay */}
            <div className={cn(
                "fixed inset-0 z-40 bg-[var(--bg)]/95 backdrop-blur-3xl flex flex-col justify-center px-12 transition-all duration-500 md:hidden",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <div className="flex flex-col gap-8 font-mono tracking-[0.3em] uppercase text-sm">
                    {navLinks.map((link, index) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link.id)}
                            className={cn(
                                "flex flex-col items-start gap-2 group transition-all duration-300",
                                activeSection === index ? "text-accent" : "text-[var(--muted)] hover:text-[var(--text-strong)]",
                                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                            )}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <span className="text-2xl font-black">{link.name}</span>
                        </button>
                    ))}
                    <div className={cn(
                        "mt-12 pt-8 border-t border-black/5 dark:border-white/5 transition-all duration-500 delay-500",
                        isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    )}>
                        <button
                            onClick={() => handleNavClick('contact')}
                            className="flex items-center gap-4 text-xs font-bold text-[var(--text-strong)]"
                        >
                            <div className="w-8 h-px bg-accent" />
                            Contactar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

