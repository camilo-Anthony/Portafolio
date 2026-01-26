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
    const [activeSection, setActiveSectionState] = useState(0);
    const [scrollDirection, setScrollDirection] = useState(1);

    const setActiveSection = useCallback((index: number) => {
        // Calculate direction based on navigation
        setScrollDirection(index > activeSection ? 1 : -1);
        setActiveSectionState(index);
    }, [activeSection]);

    const goToSection = useCallback((sectionId: string) => {
        const index = sectionIds.indexOf(sectionId);
        if (index !== -1) {
            // Calculate direction: positive = going forward, negative = going back
            const direction = index > activeSection ? 1 : -1;
            setScrollDirection(direction);
            setActiveSectionState(index);
        }
    }, [activeSection]);

    return (
        <SectionContext.Provider value={{
            activeSection,
            scrollDirection,
            setActiveSection,
            goToSection,
            setScrollDirection,
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
