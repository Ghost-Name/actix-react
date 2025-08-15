import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { AStarFinder } from 'astar-typescript';
import './ThreeScene.css';


const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [markers, setMarkers] = useState<{x: number, y: number, z: number}[]>([]);
    const [coordinates, setCoordinates] = useState({x: '', z: ''});
    const sceneRef = useRef<THREE.Scene | null>(null);
    const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const floorPlaneRef = useRef<THREE.Mesh | null>(null);
    const pathRef = useRef<THREE.Line | null>(null);
    const mazeGridRef = useRef<number[][]>([]);
    const mazeObjectRef = useRef<THREE.Object3D | null>(null);

    const CONSTANT_Y = 0.1;
    const GRID_SIZE = 50;

    // Инициализация сцены
    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            preserveDrawingBuffer: true // Добавьте эту опцию
        });

        // Освещение (увеличьте интенсивность)
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // Увеличено до 1.0
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(10, 20, 10);
        scene.add(directionalLight);

        // Оси для отладки
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        renderer.setSize(mount.clientWidth, mount.clientHeight);
        mount.appendChild(renderer.domElement);
        renderer.setClearColor(0xdddddd, 1);

        // Камера
        camera.position.set(0, 20, 30);
        camera.lookAt(0, 0, 0);
        const gridHelper = new THREE.GridHelper(50, 50);
        scene.add(gridHelper);

        // Невидимая плоскость для кликов
        const floorGeometry = new THREE.PlaneGeometry(100, 100);
        const floorMaterial = new THREE.MeshBasicMaterial({
            visible: false,
            side: THREE.DoubleSide
        });
        const floorPlane = new THREE.Mesh(floorGeometry, floorMaterial);
        floorPlane.rotation.x = -Math.PI / 2;
        floorPlane.position.y = CONSTANT_Y;
        scene.add(floorPlane);
        floorPlaneRef.current = floorPlane;

        // Загрузка лабиринта
        // labyrinth.obj
        const mtlLoader = new MTLLoader();
        mtlLoader.load(
            '/obj/floor.mtl',
            (materials) => {
                materials.preload();
                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                
                objLoader.load('/obj/floor.obj', (object) => {
                    console.log('Дочерние объекты модели:', object.children);
                    
                    // Временное упрощение материалов
                    object.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.material = new THREE.MeshBasicMaterial({
                                color: 0xff0000, // Ярко-красный
                                wireframe: true  // Режим проволочной сетки
                            });
                        }
                    });
                
                    // Отключите временно центрирование и масштабирование
                    // const box = new THREE.Box3().setFromObject(object);
                    // const center = box.getCenter(new THREE.Vector3());
                    // object.position.sub(center);
                    // const size = box.getSize(new THREE.Vector3()).length();
                    // const scale = 10 / size;
                    // object.scale.set(scale, scale, scale);
                
                    scene.add(object);
                    mazeObjectRef.current = object;
                    createMazeGrid(object);
                });
            },
            undefined,
            (error) => console.error('MTL Loader error:', error)
        );

        // Обработчик кликов
        const handleClick = (event: MouseEvent) => {
            if (!mountRef.current || !sceneRef.current || !cameraRef.current || !floorPlaneRef.current) return;

            const rect = mountRef.current.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            mouseRef.current.set(x, y);
            raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

            const intersects = raycasterRef.current.intersectObject(floorPlaneRef.current);

            if (intersects.length > 0) {
                const point = intersects[0].point;
                const newMarker = {
                    x: point.x,
                    y: CONSTANT_Y,
                    z: point.z
                };
                setMarkers(prev => [...prev, newMarker]);
                setCoordinates({
                    x: point.x.toFixed(2),
                    z: point.z.toFixed(2)
                });
            }
        };

        mountRef.current?.addEventListener('click', handleClick);

        // Респонсив
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        });

        if (mountRef.current) {
            resizeObserver.observe(mountRef.current);
        }

        // Анимация
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();


        return () => {
            mount.removeChild(renderer.domElement);
            mount.removeEventListener('click', handleClick);
            resizeObserver.disconnect();
            renderer.dispose();
        };
    }, []);

    // Создание навигационной сетки
    const createMazeGrid = (mazeObject: THREE.Object3D) => {
        const grid = new Array(GRID_SIZE).fill(0).map(() => new Array(GRID_SIZE).fill(1));
        
        // Анализируем геометрию лабиринта
        mazeObject.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const geometry = child.geometry;
                const positionAttribute = geometry.getAttribute('position');
                
                // Простая проверка - если есть геометрия в этой клетке, считаем стеной
                for (let i = 0; i < positionAttribute.count; i++) {
                    const x = positionAttribute.getX(i);
                    const z = positionAttribute.getZ(i);
                    
                    const gridX = Math.floor((x + 10) * GRID_SIZE / 20);
                    const gridZ = Math.floor((z + 10) * GRID_SIZE / 20);
                    
                    if (gridX >= 0 && gridX < GRID_SIZE && gridZ >= 0 && gridZ < GRID_SIZE) {
                        grid[gridX][gridZ] = 0; // Помечаем как стену
                    }
                }
            }
        });
        
        mazeGridRef.current = grid;
    };

    // Поиск пути с A*
    const findPath = (start: {x: number, z: number}, end: {x: number, z: number}) => {
        const grid = mazeGridRef.current;
        if (!grid.length) return [];
        
        const toGridIndex = (val: number) => {
            return Math.min(GRID_SIZE - 1, Math.max(0, 
                Math.floor((val + 10) * GRID_SIZE / 20)));
        };
        
        const startX = toGridIndex(start.x);
        const startZ = toGridIndex(start.z);
        const endX = toGridIndex(end.x);
        const endZ = toGridIndex(end.z);
        
        if (grid[startX][startZ] === 0 || grid[endX][endZ] === 0) {
            console.warn("Start or end point is inside a wall!");
            return [];
        }
        
        const finder = new AStarFinder({
            grid: { matrix: grid },
            diagonalAllowed: false,
            heuristic: 'Manhattan'
        });
        
        const path = finder.findPath(
            { x: startX, y: startZ }, 
            { x: endX, y: endZ }
        );
        
        // Исправленное преобразование координат
        return path.map((point: number[]) => ({
            x: (point[0] * 20 / GRID_SIZE) - 10,  // point[0] вместо point.x
            z: (point[1] * 20 / GRID_SIZE) - 10,  // point[1] вместо point.y
            y: CONSTANT_Y
        }));
    };

    // Обновление маркеров и путей
    useEffect(() => {
        if (!sceneRef.current) return;

        // Удаляем старые элементы
        sceneRef.current.children.forEach(child => {
            if (child.userData.isMarker || child.userData.isPath) {
                sceneRef.current?.remove(child);
            }
        });

        // Добавляем маркеры
        markers.forEach((marker, index) => {
            const geometry = new THREE.SphereGeometry(0.1, 16, 16);
            const material = new THREE.MeshStandardMaterial({ 
                color: index === 0 ? 0x00ff00 : (index === markers.length - 1 ? 0xff0000 : 0xffff00),
                metalness: 0.1,
                roughness: 0.5
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.position.set(marker.x, marker.y, marker.z);
            sphere.userData.isMarker = true;
            sceneRef.current?.add(sphere);
        });

        // Строим пути
        if (markers.length >= 2) {
            let allPathPoints: THREE.Vector3[] = [];
            
            for (let i = 0; i < markers.length - 1; i++) {
                const pathSegment = findPath(markers[i], markers[i+1]);
                const segmentPoints = pathSegment.map(p => new THREE.Vector3(p.x, p.y, p.z));
                
                if (segmentPoints.length > 0) {
                    // Соединяем с предыдущим сегментом
                    if (allPathPoints.length > 0) {
                        allPathPoints.pop(); // Удаляем последнюю точку чтобы избежать дублирования
                    }
                    allPathPoints = [...allPathPoints, ...segmentPoints];
                }
            }
            
            if (allPathPoints.length > 1) {
                const geometry = new THREE.BufferGeometry().setFromPoints(allPathPoints);
                const material = new THREE.LineBasicMaterial({ 
                    color: 0x002200,
                    linewidth: 10
                });
                const line = new THREE.Line(geometry, material);
                line.userData.isPath = true;
                sceneRef.current.add(line);
                pathRef.current = line;
            }
        }
    }, [markers]);

    // Обработчики UI
    const handleAddMarker = () => {
        const x = parseFloat(coordinates.x);
        const z = parseFloat(coordinates.z);

        if (!isNaN(x) && !isNaN(z)) {
            setMarkers(prev => [...prev, {x, y: CONSTANT_Y, z}]);
            setCoordinates({x: '', z: ''});
        }
    };

    const handleClearMarkers = () => {
        setMarkers([]);
        setCoordinates({x: '', z: ''});
    };

    return (
        <div className="three-scene-container">
            <div className="three-scene--content" ref={mountRef} />
            
            <div className="marker-controls">
                <h3>Управление маршрутом</h3>
                <div className="input-group">
                    <label>X: </label>
                    <input 
                        type="number" 
                        value={coordinates.x}
                        onChange={(e) => setCoordinates({...coordinates, x: e.target.value})}
                    />
                </div>
                <div className="input-group">
                    <label>Z: </label>
                    <input 
                        type="number" 
                        value={coordinates.z}
                        onChange={(e) => setCoordinates({...coordinates, z: e.target.value})}
                    />
                </div>
                <div className="button-group">
                    <button onClick={handleAddMarker}>Добавить точку</button>
                    <button onClick={handleClearMarkers}>Очистить маршрут</button>
                </div>
                
                <div className="coordinates-display">
                    <h4>Статус:</h4>
                    <p>Точек: {markers.length}</p>
                    {markers.length > 0 && (
                        <>
                            <p>Последняя точка:</p>
                            <p>X: {markers[markers.length - 1].x.toFixed(2)}</p>
                            <p>Z: {markers[markers.length - 1].z.toFixed(2)}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThreeScene;