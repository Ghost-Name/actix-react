import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        
        const currentMountRef = mountRef.current; // Сохранение текущего значения рефа

        if (currentMountRef) {
            currentMountRef.appendChild(renderer.domElement);
        }

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xdddddd, 1);

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

        // Функция очистки
        return () => {
            if (currentMountRef) {
                currentMountRef.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} />;
};

export default ThreeScene;
