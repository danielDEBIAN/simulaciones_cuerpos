import React, { useEffect } from 'react';
import './membrana.css';
import * as THREE from 'three';

const Membrana = () => {

  useEffect(() => {
    // Creacion de la escena
    const parent = document.getElementById('membrana');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, parent.clientWidth / parent.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    renderer.setClearColor(0x181926, 1);
    document.getElementById('membrana').appendChild(renderer.domElement);

    // Formacion de la malla
    const R = [];
    const numGrados = 20;

    for (let r = 0.1; r <= 1; r += 0.1) {
        const intervalo = new Array(numGrados).fill(0).map((_, i) => i * (2 * Math.PI) / numGrados);
        const x = intervalo.map(angle => r * Math.cos(angle));
        const y = intervalo.map(angle => r * Math.sin(angle));
        const z = new Array(numGrados).fill(0);
        R.push(...x.map((_, i) => [x[i], y[i], z[i]]));
    }

    // Generacion de la geometria
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(R.flat());
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.MeshBasicMaterial({ color: 0xcad3f5, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Inicializacion
    const N = R.length;
    const p = Array.from({ length: N }, (_, k) => {
        const [x, y, z] = R[k];
        return {
            r: new THREE.Vector3(x, y, z),
            v: new THREE.Vector3(0, 0, 0),
            f: new THREE.Vector3(0, 0, 0),
            vec: [],
            deq: [],
        };
    });

    for (let k = 0; k < N; k++) {
        const [fil, col] = p[k].vec.reduce(([fil, col], vecj) => {
            const ele = Array.from(new Set([...p[k].vec, k].map(v => p[v].vec).flat()));
            const vec = ele.filter(j => j > k);
            return [fil.concat(Array(ele.length).fill(k)), col.concat(Array(vec.length).fill(vec))];
        }, [[], []]);

        console.debug(fil,col);

        const indices = [];
        for (let i = 0; i < R.length; i++) {
            if (i !== k) {
                indices.push(i);
            }
        }

        p[k].vec = indices;
        p[k].deq = indices.map(j => p[k].r.distanceTo(p[j].r) * 0.9);
    }

    for (let k = 0; k < numGrados + 1; k++) {
        p[k].r.z = 1;
    }

    // Definicion de constantes
    const DT = 0.0001;
    const K = 100;
    const K2 = 1;

    // Simulacion
    function animate() {
        requestAnimationFrame(animate);

        for (let k = 0; k < N - numGrados - 1; k++) {
            for (let j = 0; j < p[k].vec.length; j++) {
                const indVec = p[k].vec[j];
                const DR = new THREE.Vector3().subVectors(p[indVec].r, p[k].r);
                const modulo = DR.length();
                const U = DR.clone().normalize();
                const F = U.multiplyScalar(K * (modulo - p[k].deq[j]));
                p[k].f.add(F);
                p[indVec].f.sub(F);
            }

            p[k].v.add(p[k].f.clone().sub(p[k].v.clone().multiplyScalar(K2)).multiplyScalar(DT));
            p[k].r.add(p[k].v.clone().multiplyScalar(DT));
        }

        for (let k = 0; k < N; k++) {
            R[k] = [p[k].r.x, p[k].r.y, p[k].r.z];
            p[k].f.set(0, 0, 0);
        }

        mesh.geometry.attributes.position.array = new Float32Array(R.flat());
        mesh.geometry.attributes.position.needsUpdate = true;
        mesh.rotation.x = 90;

        // Renderizacion de la escena
        renderer.render(scene, camera);
    }

    camera.position.z = 10;
    // Inicializacion de la animacion
    animate();

    // Modificar cuando se cambie el tamaño de la ventana
    window.addEventListener('resize', () => {
      camera.aspect = parent.clientWidth / parent.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(parent.clientWidth, parent.clientHeight);
    });

    // Limpieza de la ventana para recargar
    return () => {
        window.removeEventListener('resize', () => {
            camera.aspect = parent.clientWidth / parent.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(parent.clientWidth, parent.clientHeight);
        });
        document.getElementById('membrana').appendChild(renderer.domElement);
    };
  }, []);

  return <div id="membrana"/>;
};

export default Membrana;
