// import React, { useEffect } from 'react';
// import * as THREE from 'three';

// const Cuerda = () => {
//   useEffect(() => {
//     // Escena
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.getElementById('rope-simulation').appendChild(renderer.domElement);

//     // Cuerda
//     const numPoints = 30;
//     const ropeGeometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(numPoints * 3);

//     for (let i = 0; i < numPoints * 3; i += 3) {
//       const theta = (i / (numPoints * 3 - 1)) * Math.PI;
//       positions[i] = Math.sin(theta) * 5;
//       positions[i + 1] = Math.cos(theta) * 5;
//       positions[i + 2] = theta * 2; // Agregar profundidad a la cuerda

//     ropeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     const ropeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
//     const rope = new THREE.Line(ropeGeometry, ropeMaterial);
//     scene.add(rope);

//     // Camara
//     camera.position.z = 15;

//     // Animacion
//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Simulate rope movement (modify positions over time)
//       const positions = rope.geometry.attributes.position.array;
//       const time = Date.now() * 0.001;

//       for (let i = 0; i < numPoints * 3; i += 3) {
//         positions[i + 2] = Math.sin(time + i * 0.1) * 2; // Simulate movement in the z-axis
//       }

//       rope.geometry.attributes.position.needsUpdate = true;

//       // Renderizar la escena
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Tamano de la ventana
//     const handleResize = () => {
//       camera.aspect = 100 / 100;
//       camera.updateProjectionMatrix();
//       renderer.setSize(100, 100);
//     };

//     window.addEventListener('resize', handleResize);

//     // Limpieza de la ventana
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }}, []);

//   return <div id="rope-simulation" style={{ width: 100, height: 100 }} />;
// };

// export default Cuerda;


import React, { useEffect } from 'react';
import * as THREE from 'three';

const Cuerda = () => {
  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('rope-simulation').appendChild(renderer.domElement);

    // Rope
    const numPoints = 30;
    const ropeGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints * 3; i += 3) {
      const theta = (i / (numPoints * 3 - 1)) * Math.PI;
      positions[i] = Math.sin(theta) * 5;
      positions[i + 1] = Math.cos(theta) * 5;
      positions[i + 2] = theta * 2; // To give some depth to the rope
    }

    ropeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ropeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const rope = new THREE.Line(ropeGeometry, ropeMaterial);
    scene.add(rope);

    // Camera
    camera.position.z = 15;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Simulate rope movement (modify positions over time)
      const positions = rope.geometry.attributes.position.array;
      const time = Date.now() * 0.001;

      for (let i = 0; i < numPoints * 3; i += 3) {
        positions[i + 2] = Math.sin(time + i * 0.1) * 2; // Simulate movement in the z-axis
      }

      rope.geometry.attributes.position.needsUpdate = true;

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div id="rope-simulation" style={{ width: '100%', height: '100vh' }} />;
};

export default Cuerda;

