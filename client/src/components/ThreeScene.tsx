import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null); //хук

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000); // 50-размер
        const renderer = new THREE.WebGLRenderer();

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xdddddd, 1); {/* цвет заднего фона */}

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x0095dd });
        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);
        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on unmount
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeScene;