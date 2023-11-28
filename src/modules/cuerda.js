import { useEffect } from 'react';
import './cuerda.css';
import * as THREE from 'three';

const Cuerda = () => {
  useEffect(() => {
    // Escena
    const parent = document.getElementById('cuerda');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    renderer.setClearColor(0x181926, 1);
    document.getElementById('cuerda').appendChild(renderer.domElement);

    // Cuerda
    const numPoints = 30;
    const ropeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints * 3; i += 3) {
      const theta = (i / (numPoints * 3 - 1)) * Math.PI;
      positions[i] = Math.sin(theta) * 5;
      positions[i + 1] = Math.cos(theta) * 5;
      positions[i + 2] = theta * 2; // Para darle profundidad a la cuerda
    }

    // Generacion de la geometria
    ropeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ropeMaterial = new THREE.LineBasicMaterial({ color: 0xcad3f5 });
    const rope = new THREE.Line(ropeGeometry, ropeMaterial);
    scene.add(rope);

    // Animacion
    function animate () {
      requestAnimationFrame(animate);

      // Simular el movimiento de la cuerda (modificar las posiciones con el tiempo)
      const positions = rope.geometry.attributes.position.array;
      const time = Date.now() * 0.001;

      for (let i = 0; i < numPoints * 3; i += 3) {
        positions[i + 2] = Math.sin(time + i * 0.1) * 2; // Simulate movement in the z-axis
      }

      rope.geometry.attributes.position.needsUpdate = true;

      // Renderizar la escena
      renderer.render(scene, camera);
    };

    camera.position.z = 15;
    // Inicializacion de la animacion
    animate();

    // Modificar cuando se cambie el tamaño de la ventana
    window.addEventListener('resize', () => {
      camera.aspect = parent.clientWidth / parent.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(parent.clientWidth, parent.clientHeight);
    });

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('resize', () => {
        camera.aspect = parent.clientWidth / parent.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(parent.clientWidth, parent.clientHeight);
      });
      document.getElementById('cuerda').appendChild(renderer.domElement);
    };
  }, []);

  return <div id="cuerda"/>;
};

export default Cuerda;