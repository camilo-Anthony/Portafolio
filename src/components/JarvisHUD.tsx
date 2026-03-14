import { useEffect, useState } from 'react';

/**
 * Jarvis-style HUD — faithful to Iron Man's JARVIS interface
 * Compact, layered, data-rich arc reactor with glow, particles and pulse
 */
export default function JarvisHUD() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 200);
        return () => clearTimeout(t);
    }, []);

    // Helper to generate perfect SVG arcs based on angles
    const polarToCartesian = (x: number, y: number, r: number, angle: number) => {
        const rad = (angle - 90) * Math.PI / 180.0;
        return { x: x + (r * Math.cos(rad)), y: y + (r * Math.sin(rad)) };
    };

    const getArcPath = (x: number, y: number, r: number, startA: number, endA: number) => {
        const start = polarToCartesian(x, y, r, endA);
        const end = polarToCartesian(x, y, r, startA);
        const largeArc = endA - startA <= 180 ? "0" : "1";
        return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
    };

    // Generate orbital particles
    const particles = Array.from({ length: 8 }).map((_, i) => {
        const radius = 120 + (i % 4) * 25; // R=120, 145, 170, 195
        const startAngle = (i * 45); // Evenly spaced
        const duration = 15 + i * 3; // Varying speeds
        const size = 1.5 + (i % 3) * 0.5;
        return { radius, startAngle, duration, size, i };
    });

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* ── JARVIS Arc Reactor ── */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:translate-x-0 md:right-[-5%] lg:right-[0%] opacity-30 md:opacity-100 -z-10">
                <svg viewBox="-50 -50 500 500" className="w-[350px] h-[350px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]" style={{ overflow: 'visible' }}>

                    {/* === CENTER GLOW === */}
                    <defs>
                        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
                            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="pingGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                            <stop offset="80%" stopColor="var(--accent)" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <circle cx="200" cy="200" r="160" fill="url(#coreGlow)" />
                    <circle cx="200" cy="200" r="10" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0" className="hud-ping" />

                    {/* === PARALLEL GROUP 1: OUTER === */}
                    <g>
                        {/* Dashed structural rings */}
                        <circle className="hud-ring-outer" style={{ animationDuration: '103s' }} cx="200" cy="200" r="250" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="15 5 5 5" opacity="0.15" />
                        <circle className="hud-ring-arc3" style={{ animationDuration: '127s' }} cx="200" cy="200" r="245" fill="none" stroke="var(--accent)" strokeWidth="0.2" strokeDasharray="2 6 2 6 4 8" opacity="0.25" />
                        <circle className="hud-ring-arc3" style={{ animationDuration: '83s' }} cx="200" cy="200" r="230" fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="30 10" opacity="0.1" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '97s' }} cx="200" cy="200" r="215" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="8 4 2 4" opacity="0.18" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '71s' }} cx="200" cy="200" r="210" fill="none" stroke="var(--accent)" strokeWidth="0.2" strokeDasharray="5 5" opacity="0.2" />

                        {/* 4 parallel tracks on the wide sides */}
                        <path className="hud-ring-outer" style={{ animationDuration: '89s' }} d={getArcPath(200, 200, 260, 60, 120)} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
                        <path className="hud-ring-outer" style={{ animationDuration: '89s' }} d={getArcPath(200, 200, 260, 240, 300)} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />

                        <path className="hud-ring-arc3" style={{ animationDuration: '73s' }} d={getArcPath(200, 200, 240, 60, 120)} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
                        <path className="hud-ring-arc3" style={{ animationDuration: '73s' }} d={getArcPath(200, 200, 240, 240, 300)} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />

                        <path className="hud-ring-outer" style={{ animationDuration: '61s' }} d={getArcPath(200, 200, 220, 60, 120)} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />
                        <path className="hud-ring-outer" style={{ animationDuration: '61s' }} d={getArcPath(200, 200, 220, 240, 300)} fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" opacity="0.3" />

                        <path className="hud-ring-arc3" style={{ animationDuration: '47s' }} d={getArcPath(200, 200, 195, 60, 120)} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
                        <path className="hud-ring-arc3" style={{ animationDuration: '47s' }} d={getArcPath(200, 200, 195, 240, 300)} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

                        {/* Faint connecting circles */}
                        <circle cx="200" cy="200" r="193" fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.4" />
                    </g>

                    {/* === PARALLEL GROUP 2: MID === */}
                    <g>
                        {/* Connecting base rings */}
                        <circle cx="200" cy="200" r="170" fill="none" stroke="var(--accent)" strokeWidth="0.4" opacity="0.2" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '59s' }} cx="200" cy="200" r="175" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="25 8 6 8" opacity="0.22" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '73s' }} cx="200" cy="200" r="165" fill="none" stroke="var(--accent)" strokeWidth="0.2" strokeDasharray="2 4 1 8" opacity="0.25" />
                        <circle className="hud-ring-arc3" style={{ animationDuration: '67s' }} cx="200" cy="200" r="160" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="12 6" opacity="0.18" />

                        <circle className="hud-ring-arc3" style={{ animationDuration: '41s' }} cx="200" cy="200" r="148" fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="4 2 8 2" opacity="0.4" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '47s' }} cx="200" cy="200" r="140" fill="none" stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="10 4 2 4" opacity="0.2" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '61s' }} cx="200" cy="200" r="135" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="12 4 2 2 2 4" opacity="0.2" />
                        <circle className="hud-ring-arc3" style={{ animationDuration: '47s' }} cx="200" cy="200" r="122" fill="none" stroke="var(--accent)" strokeWidth="0.2" strokeDasharray="2 2" opacity="0.3" />

                        <circle className="hud-ring-arc3" style={{ animationDuration: '53s' }} cx="200" cy="200" r="115" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="20 10 5 10" opacity="0.15" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '31s' }} cx="200" cy="200" r="105" fill="none" stroke="var(--accent)" strokeWidth="0.2" strokeDasharray="8 6 2 6" opacity="0.25" />

                        <path className="hud-ring-outer" style={{ animationDuration: '53s' }} d={getArcPath(200, 200, 175, 150, 210)} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
                        <path className="hud-ring-outer" style={{ animationDuration: '53s' }} d={getArcPath(200, 200, 175, 330, 390)} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.45" />

                        <path className="hud-ring-arc3" style={{ animationDuration: '43s' }} d={getArcPath(200, 200, 155, 150, 210)} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
                        <path className="hud-ring-arc3" style={{ animationDuration: '43s' }} d={getArcPath(200, 200, 155, 330, 390)} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />

                        <path className="hud-ring-outer" style={{ animationDuration: '31s' }} d={getArcPath(200, 200, 130, 150, 210)} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
                        <path className="hud-ring-outer" style={{ animationDuration: '31s' }} d={getArcPath(200, 200, 130, 330, 390)} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />

                        <circle className="hud-ring-arc3" style={{ animationDuration: '83s' }} cx="200" cy="200" r="150" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="3 6" opacity="0.12" />
                    </g>

                    {/* === PARALLEL GROUP 3: CORE === */}
                    <g>
                        {/* Inner 3 parallel tracks */}
                        <circle className="hud-ring-arc3" style={{ animationDuration: '41s' }} cx="200" cy="200" r="100" fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.18" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '67s' }} cx="200" cy="200" r="95" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="8 5" opacity="0.12" />
                        <circle className="hud-ring-arc3" style={{ animationDuration: '43s' }} cx="200" cy="200" r="90" fill="none" stroke="var(--accent)" strokeWidth="0.2" strokeDasharray="1 3" opacity="0.3" />

                        <path className="hud-ring-outer" style={{ animationDuration: '37s' }} d={getArcPath(200, 200, 100, -20, 20)} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                        <path className="hud-ring-outer" style={{ animationDuration: '37s' }} d={getArcPath(200, 200, 100, 160, 200)} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

                        <path className="hud-ring-arc3" style={{ animationDuration: '29s' }} d={getArcPath(200, 200, 85, -20, 20)} fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
                        <path className="hud-ring-arc3" style={{ animationDuration: '29s' }} d={getArcPath(200, 200, 85, 160, 200)} fill="none" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" opacity="0.25" />

                        <circle className="hud-ring-outer" style={{ animationDuration: '37s' }} cx="200" cy="200" r="80" fill="none" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="15 5" opacity="0.15" />
                        <circle className="hud-ring-arc3" style={{ animationDuration: '59s' }} cx="200" cy="200" r="75" fill="none" stroke="var(--accent)" strokeWidth="0.2" strokeDasharray="5 2 1 2" opacity="0.2" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '23s' }} cx="200" cy="200" r="65" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="8 8 2 8" opacity="0.12" />

                        <path className="hud-ring-outer" style={{ animationDuration: '19s' }} d={getArcPath(200, 200, 70, -20, 20)} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                        <path className="hud-ring-outer" style={{ animationDuration: '19s' }} d={getArcPath(200, 200, 70, 160, 200)} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

                        <circle className="hud-ring-arc3" style={{ animationDuration: '23s' }} cx="200" cy="200" r="60" fill="none" stroke="var(--accent)" strokeWidth="0.3" strokeDasharray="4 8" opacity="0.1" />
                        <circle className="hud-ring-outer" style={{ animationDuration: '17s' }} cx="200" cy="200" r="55" fill="none" stroke="var(--accent)" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.25" />
                    </g>

                    {/* === FLOATING PARTICLES (orbiting dots) === */}
                    {particles.map(({ radius, startAngle, duration, size, i }) => (
                        <circle
                            key={i}
                            cx="200"
                            cy="200"
                            r={size}
                            fill="var(--accent)"
                            opacity="0.4"
                            className="hud-particle"
                            style={{
                                transformOrigin: '200px 200px',
                                offsetPath: `path("M ${200 + radius} 200 A ${radius} ${radius} 0 1 1 ${200 + radius - 0.01} 200")`,
                                offsetRotate: '0deg',
                                offsetDistance: `${(startAngle / 360) * 100}%`,
                                animation: `hudParticleOrbit ${duration}s linear infinite`,
                            }}
                        />
                    ))}

                    {/* === CENTER === */}
                    {/* Hexagonal core shape */}
                    <polygon
                        points="200,175 222,187.5 222,212.5 200,225 178,212.5 178,187.5"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="0.8"
                        opacity="0.25"
                        className="hud-ring-arc2"
                    />

                    {/* Center glow — brighter */}
                    <circle cx="200" cy="200" r="15" fill="var(--accent)" opacity="0.08" />
                    <circle cx="200" cy="200" r="8" fill="var(--accent)" opacity="0.12" />
                    <circle cx="200" cy="200" r="4" fill="var(--accent)" opacity="0.35" className="hud-node-pulse" />

                    {/* Crosshair */}
                    <line x1="185" y1="200" x2="165" y2="200" stroke="var(--accent)" strokeWidth="0.5" opacity="0.18" />
                    <line x1="215" y1="200" x2="235" y2="200" stroke="var(--accent)" strokeWidth="0.5" opacity="0.18" />
                    <line x1="200" y1="185" x2="200" y2="165" stroke="var(--accent)" strokeWidth="0.5" opacity="0.18" />
                    <line x1="200" y1="215" x2="200" y2="235" stroke="var(--accent)" strokeWidth="0.5" opacity="0.18" />
                </svg>
            </div>
        </div>
    );
}
