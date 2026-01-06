"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Float, Points, PointMaterial, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

/**
 * Neural Network Scene Component
 */
function NeuralNetwork({ isHovered }: { isHovered: boolean }) {
    const { mouse, viewport } = useThree();
    const { resolvedTheme } = useTheme();

    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const [scrollSpeed, setScrollSpeed] = useState(1);
    const [isPaused, setIsPaused] = useState(false);

    // Dynamic colors based on theme
    const colors = useMemo(() => {
        const isDark = resolvedTheme === "dark";
        return {
            core: isDark ? "#5EEAD4" : "#4338CA",
            emissive: isDark ? "#2DD4BF" : "#3730A3",
            lines: isDark ? "#5EEAD4" : "#4338CA",
            opacity: isDark ? 0.2 : 0.3,
        };
    }, [resolvedTheme]);

    // Handle visibility change to pause animation
    useEffect(() => {
        const handleVisibility = () => setIsPaused(document.hidden);
        document.addEventListener("visibilitychange", handleVisibility);

        // Cleanup scroll listener correctly
        const handleScroll = () => {
            const speed = 1 + window.scrollY * 0.003;
            setScrollSpeed(Math.min(speed, 3));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Optimized procedural geometry for nodes and neural connections
    const { nodePositions, linePositions } = useMemo(() => {
        const count = 40; // Reduced count for performance
        const nodes = new Float32Array(count * 3);
        const lines: number[] = [];
        const radius = 2.4;

        for (let i = 0; i < count; i++) {
            const theta = Math.acos(2 * Math.random() - 1);
            const phi = Math.random() * Math.PI * 2;
            const r = radius * (0.8 + Math.random() * 0.4);

            nodes[i * 3] = r * Math.sin(theta) * Math.cos(phi);
            nodes[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
            nodes[i * 3 + 2] = r * Math.cos(theta);
        }

        // Connect nodes within a certain proximity
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = nodes[i * 3] - nodes[j * 3];
                const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
                const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < 3) { // Use squared distance for optimization
                    lines.push(nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2]);
                    lines.push(nodes[j * 3], nodes[j * 3 + 1], nodes[j * 3 + 2]);
                }
            }
        }

        return {
            nodePositions: nodes,
            linePositions: new Float32Array(lines),
        };
    }, []);

    useFrame((state) => {
        if (isPaused) return;

        const t = state.clock.getElapsedTime();

        // 1. Smooth rotation + Scroll influence
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003 * scrollSpeed;

            // 2. Subtle mouse follow
            const targetX = (mouse.x * viewport.width) / 12;
            const targetY = (mouse.y * viewport.height) / 12;
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.03);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.03);
        }

        // 3. Core Pulse (Breathing)
        if (coreRef.current) {
            const pulse = 1 + Math.sin(t * 1.2) * 0.04;
            coreRef.current.scale.set(pulse, pulse, pulse);

            const material = coreRef.current.material as THREE.MeshStandardMaterial;
            const targetIntensity = isHovered ? 3.5 : 1.2;
            material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, targetIntensity, 0.05);
        }
    });

    return (
        <group ref={groupRef}>
            {/* Central Core */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                    color={colors.core}
                    emissive={colors.emissive}
                    emissiveIntensity={1.2}
                    roughness={0.2}
                    metalness={0.5}
                />
            </mesh>

            {/* Point Nodes */}
            <Points positions={nodePositions} stride={3}>
                <PointMaterial
                    transparent
                    color={colors.lines}
                    size={0.06}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={resolvedTheme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
                />
            </Points>

            {/* Neural Lines */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={linePositions.length / 3}
                        array={linePositions}
                        itemSize={3}
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color={colors.lines}
                    transparent
                    opacity={colors.opacity}
                    blending={resolvedTheme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
                />
            </lineSegments>

            {/* Decorative Outer Wireframe */}
            <Sphere args={[1.3, 24, 24]}>
                <MeshDistortMaterial
                    color={colors.core}
                    speed={1.5}
                    distort={0.3}
                    radius={1}
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </Sphere>
        </group>
    );
}

/**
 * Mobile-optimized Neural Drift Component
 * Purely dots and lines, no core, high performance
 */
function NeuralDrift() {
    const { resolvedTheme } = useTheme();
    const groupRef = useRef<THREE.Group>(null);

    const colors = useMemo(() => {
        const isDark = resolvedTheme === "dark";
        return {
            lines: isDark ? "#5EEAD4" : "#4338CA",
            opacity: isDark ? 0.15 : 0.25,
            size: isDark ? 0.04 : 0.05,
        };
    }, [resolvedTheme]);

    const { nodePositions, linePositions } = useMemo(() => {
        const count = 30; // Further reduced for mobile
        const nodes = new Float32Array(count * 3);
        const lines: number[] = [];
        const spread = 4;

        for (let i = 0; i < count; i++) {
            nodes[i * 3] = (Math.random() - 0.5) * spread;
            nodes[i * 3 + 1] = (Math.random() - 0.5) * spread;
            nodes[i * 3 + 2] = (Math.random() - 0.5) * spread;
        }

        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = nodes[i * 3] - nodes[j * 3];
                const dy = nodes[i * 3 + 1] - nodes[j * 3 + 1];
                const dz = nodes[i * 3 + 2] - nodes[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < 4) {
                    lines.push(nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2]);
                    lines.push(nodes[j * 3], nodes[j * 3 + 1], nodes[j * 3 + 2]);
                }
            }
        }

        return {
            nodePositions: nodes,
            linePositions: new Float32Array(lines),
        };
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.getElapsedTime();
            groupRef.current.rotation.y = t * 0.05;
            groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
            // Added subtle position drift
            groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
            groupRef.current.position.x = Math.cos(t * 0.3) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <Points positions={nodePositions} stride={3}>
                <PointMaterial
                    transparent
                    color={colors.lines}
                    size={colors.size}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={resolvedTheme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
                />
            </Points>

            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={linePositions.length / 3}
                        array={linePositions}
                        itemSize={3}
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color={colors.lines}
                    transparent
                    opacity={colors.opacity}
                    blending={resolvedTheme === "dark" ? THREE.AdditiveBlending : THREE.NormalBlending}
                />
            </lineSegments>
        </group>
    );
}

/**
 * Main Scene Export
 */
export function Scene({ isMobile }: { isMobile: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const { resolvedTheme } = useTheme();

    return (
        <div
            className="h-full w-full outline-none"
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <Canvas
                dpr={[1, 1.2]} // Lower DPR for performance on mobile
                shadows={false}
                gl={{
                    antialias: true,
                    powerPreference: "high-performance",
                    alpha: true
                }}
                camera={{ position: [0, 0, 6], fov: 45 }}
            >
                <ambientLight intensity={resolvedTheme === "dark" ? 0.4 : 0.8} />
                <pointLight position={[5, 5, 5]} intensity={1} color={resolvedTheme === "dark" ? "#5EEAD4" : "#4338CA"} />

                <Float speed={isMobile ? 0.5 : 1.5} rotationIntensity={isMobile ? 0.2 : 0.3} floatIntensity={isMobile ? 0.2 : 0.4}>
                    {isMobile ? <NeuralDrift /> : <NeuralNetwork isHovered={isHovered} />}
                </Float>
            </Canvas>
        </div>
    );
}
