import { SectionProvider } from './SectionContext';
import ScrollContainer from './ScrollContainer';
import Navbar from './Navbar';
import { Atmosphere } from './Atmosphere';

export default function App() {
    return (
        <SectionProvider>
            <div className="relative">
                <Atmosphere />
                
                {/* Navbar - Always on top */}
                <Navbar />

                {/* Scroll-driven sections */}
                <ScrollContainer />
            </div>
        </SectionProvider>
    );
}
