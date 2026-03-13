import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
// maath removed

const Stars = (props: any) => {
    const ref = useRef<any>(null);

    // Generate random points in a sphere manually
    // We strive to avoid external math deps for stability here
    const count = 5000;
    const radius = 15;
    const sphere = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = radius * Math.cbrt(Math.random());
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        sphere[i * 3] = x;
        sphere[i * 3 + 1] = y;
        sphere[i * 3 + 2] = z;
    }

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#F59E0B"
                    size={0.02} // Smaller for subtle effect
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    );
};

const FloatingShapes = () => {
    // Add some larger floating geometric shapes for depth
    return (
        <group>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5} position={[2, 2, -2]}>
                <mesh>
                    <icosahedronGeometry args={[0.5, 0]} />
                    <meshStandardMaterial color="#F59E0B" wireframe opacity={0.1} transparent />
                </mesh>
            </Float>
            <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8} position={[-2, -1, -1]}>
                <mesh>
                    <octahedronGeometry args={[0.4, 0]} />
                    <meshStandardMaterial color="#9CA3AF" wireframe opacity={0.1} transparent />
                </mesh>
            </Float>
        </group>
    )
}

export default function BackgroundFX() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <fog attach="fog" args={['#0A0F1F', 0, 20]} />
                <ambientLight intensity={0.5} />
                <Stars />
                <FloatingShapes />
            </Canvas>
        </div>
    );
}
