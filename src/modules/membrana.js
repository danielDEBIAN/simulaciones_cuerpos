// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { Delaunay } from 'd3-delaunay';

// const Membrana = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     // FORMATION OF THE MESH
//     const R = [[0, 0, 0]];
//     const numGrados = 20;

//     for (let r = 0.1; r <= 1.0; r += 0.1) {
//       const intervalo = Array.from({ length: numGrados }, (_, i) => (i * 2 * Math.PI) / numGrados);
//       const x = intervalo.map((angle) => r * Math.cos(angle));
//       const y = intervalo.map((angle) => r * Math.sin(angle));
//       const z = Array(numGrados).fill(0);
//       R.push(...x.map((_, i) => [x[i], y[i], z[i]]));
//     }

//     // Initialization
//     const tri = Delaunay.from(R.map((point) => point.slice(0, 2)));
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });

//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const geometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(R.flat());
//     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);

//       // Update mesh or perform physics calculations here

//       renderer.render(scene, camera);
//     };

//     animate();

//     window.addEventListener('resize', () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     });

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', () => { });
//       document.body.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <canvas ref={canvasRef} />;
// };

// export default Membrana;

import React, { useEffect, useState } from 'react';
import { Delaunay } from 'd3-delaunay';
import { Scatter } from 'react-chartjs-2';

const Membrana = () => {
  const [data, setData] = useState([]);
  const numGrados = 20;

  useEffect(() => {
    // FORMATION OF THE MESH
    let R = [[0, 0, 0]];
    for (let r = 0.1; r <= 1.0; r += 0.1) {
      const intervalo = Array.from({ length: numGrados }, (_, i) => (2 * Math.PI * i) / numGrados);
      const x = intervalo.map(theta => r * Math.cos(theta));
      const y = intervalo.map(theta => r * Math.sin(theta));
      const z = new Array(numGrados).fill(0);
      R = R.concat(x.map((_, i) => [x[i], y[i], z[i]]));
    }

    // Initialization
    const tri = Delaunay.from(R.map(p => [p[0], p[1]]));
    const initialData = R.map(p => ({ x: p[0], y: p[1], z: p[2] }));
    setData(initialData);

    const N = R.length;
    const p = Array(N).fill(null).map((_, k) => ({
      r: R[k],
      v: [0, 0, 0],
      f: [0, 0, 0],
      vec: [],
      deq: [],
    }));

    for (let k = 0; k < N; k++) {
      p[k].vec = tri.neighbors(k).filter(neighbor => neighbor > k);
      for (const j of p[k].vec) {
        p[k].deq.push(Math.sqrt(Math.pow(R[k][0] - R[j][0], 2) + Math.pow(R[k][1] - R[j][1], 2)) * 0.9);
      }
    }

    for (let k = 0; k < numGrados + 1; k++) {
      p[k].r[2] = 1;
    }

    const DT = 0.01;
    const K = 100; // spring constant
    const K2 = 1; // damping constant

    const simulateMotion = () => {
      // Simulation logic here...

      // Update data and trigger re-render
      setData(updatedData);

      // Repeat simulation
      requestAnimationFrame(simulateMotion);
    };

    // Start simulation
    simulateMotion();
  }, []);

  return (
    <Scatter
      data={{
        datasets: [
          {
            label: 'Mesh',
            showLine: false,
            fill: false,
            pointRadius: 5,
            backgroundColor: 'rgba(75,192,192,1)',
            data: data,
          },
        ],
      }}
      options={{
        scales: {
          x: { min: -1, max: 1 },
          y: { min: -1, max: 1 },
          z: { min: -2, max: 2 },
        },
      }}
    />
  );
};

export default Membrana;
