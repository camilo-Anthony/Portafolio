import { lazy, Suspense } from 'react';
import { SectionProvider } from './SectionContext';
import ScrollContainer from './ScrollContainer';
import Navbar from './Navbar';

// Lazy load the heavy 3D background (Three.js ~800KB)
const BackgroundFX = lazy(() => import('./BackgroundFX'));

export default function App() {
    return (
        <SectionProvider>
            <div className="relative">
                {/* Background Effect - Lazy loaded for faster initial paint */}
                <div className="fixed inset-0 z-0">
                    <Suspense fallback={<div className="fixed inset-0 bg-bg" />}>
                        <BackgroundFX />
                    </Suspense>
                </div>

                {/* Navbar - Always on top */}
                <Navbar />

                {/* Scroll-driven sections */}
                <ScrollContainer />
            </div>
        </SectionProvider>
    );
}
