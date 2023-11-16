import React, { useEffect } from 'react';
import * as THREE from 'three';

const MyThreeJSComponent = () => {
  useEffect(() => {
    // FORMATION OF THE MESH
    const R = [];
    const numGrados = 20;

    for (let r = 0.1; r <= 1; r += 0.1) {
      const intervalo = new Array(numGrados + 1).fill(0).map((_, i) => (2 * Math.PI * i) / numGrados);
      const x = intervalo.map((theta) => r * Math.cos(theta));
      const y = intervalo.map((theta) => r * Math.sin(theta));
      const z = new Array(numGrados + 1).fill(0);

      R.push(...x.map((_, i) => [x[i], y[i], z[i]]));
    }

    // Initialization
    const N = R.length;
    const p = Array.from({ length: N }, (_, k) => ({
      r: R[k],
      v: [0, 0, 0],
      f: [0, 0, 0],
      vec: [],
      deq: [],
    }));

    for (let k = 0; k < N; k++) {
      const [fil, col] = p[k].vec;
      const ele = Array.from(new Set([...fil, ...col])).filter((el) => el > k);
      p[k].vec = ele;

      for (let j = 0; j < ele.length; j++) {
        p[k].deq[j] = Math.sqrt(p[k].r.reduce((acc, _, i) => acc + (p[k].r[i] - R[ele[j]][i]) ** 2, 0)) * 0.9;
      }
    }

    for (let k = 0; k < numGrados + 1; k++) {
      p[k].r[2] = 1;
    }

    const DT = 0.001;
    const K = 100; // spring constant
    const K2 = 1; // damping constant

    // SIMULATION
    const animate = () => {
      for (let i = 0; i < 1000; i++) {
        for (let k = 0; k < N - numGrados - 1; k++) {
          const numVec = p[k].vec.length;

          for (let j = 0; j < numVec; j++) {
            const indVec = p[k].vec[j];
            const DR = p[indVec].r.map((coord, idx) => coord - p[k].r[idx]);
            const modulo = Math.sqrt(DR.reduce((acc, val) => acc + val ** 2, 0));
            const U = DR.map((coord) => coord / modulo);
            const F = U.map((coord) => K * (modulo - p[k].deq[j]) * coord);

            p[k].f = p[k].f.map((coord, idx) => coord + F[idx]);
            p[indVec].f = p[indVec].f.map((coord, idx) => coord - F[idx]);
          }

          p[k].v = p[k].v.map((coord, idx) => coord - K2 * p[k].v[idx]) * DT + p[k].v;
          p[k].r = p[k].r.map((coord, idx) => coord + p[k].v[idx] * DT);
        }

        // Update positions
        for (let k = 0; k < N; k++) {
          R[k] = p[k].r;
          p[k].f = [0, 0, 0];
        }

        // Render the scene
        // ... (use Three.js to render the scene)

        // Uncomment the following line if you want to pause between frames
        // await new Promise((resolve) => setTimeout(resolve, 1));
      }
    };

    animate();
  }, []);

  return <div id="threejs-container" style={{ width: '100%', height: '100vh' }} />;
};

export default MyThreeJSComponent;
