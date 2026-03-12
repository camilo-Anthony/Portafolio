import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface SectionContextType {
    activeSection: number;
    scrollDirection: number;
    setActiveSection: (index: number) => void;
    goToSection: (sectionId: string) => void;
    setScrollDirection: (direction: number) => void;
    sectionIds: string[];
}

const SectionContext = createContext<SectionContextType | null>(null);

export const sectionIds = ['hero', 'about', 'services', 'projects', 'contact'];

export function SectionProvider({ children }: { children: ReactNode }) {
    const [activeSection, setActiveSection] = useState(0);

    return (
        <SectionContext.Provider value={{
            activeSection,
            scrollDirection: 1, // Stays as legacy fallback
            setActiveSection,
            goToSection: () => {}, // No longer used but kept for type safety
            setScrollDirection: () => {},
            sectionIds
        }}>
            {children}
        </SectionContext.Provider>
    );
}

export function useSectionContext() {
    const context = useContext(SectionContext);
    if (!context) {
        throw new Error('useSectionContext must be used within SectionProvider');
    }
    return context;
}
