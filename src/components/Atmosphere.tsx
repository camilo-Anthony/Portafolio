export const Atmosphere = () => {
    return (
        <div className="fixed inset-0 z-[-1] bg-[var(--bg)] overflow-hidden pointer-events-none transition-colors duration-500">
            {/* Very subtle noise texture for Deep Space depth */}
            <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] pointer-events-none mix-blend-overlay dark:mix-blend-overlay" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
            
            {/* Dynamic light sources / Auroras */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent blur-[120px] rounded-full opacity-[0.03] dark:opacity-40 mix-blend-multiply dark:mix-blend-screen animate-aurora pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent blur-[150px] rounded-full opacity-[0.02] dark:opacity-30 mix-blend-multiply dark:mix-blend-screen animate-aurora pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />
        </div>
    );
};
