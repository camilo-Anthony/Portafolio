import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        if (stored) {
            setIsDark(stored === 'dark');
        } else {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className="group relative p-2 overflow-hidden transition-all duration-300"
            aria-label="Toggle theme"
        >
            <div className={isDark ? "rotate-0 opacity-100" : "rotate-90 opacity-0 absolute"} style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <Moon size={16} className="text-[#444] group-hover:text-white transition-colors" />
            </div>
            <div className={!isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"} style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <Sun size={16} className="text-yellow-500" />
            </div>
        </button>
    );
}
