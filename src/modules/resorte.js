import React, { useEffect, useRef } from 'react';

const Resorte = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Parámetros del resorte
    const m = 1; // masa
    const t = 0.01; // delta tiempo
    const K = 100;
    const amortiguamiento = 0.45;
    let xi = 1;
    let vi = 0;

    const simulateSpring = () => {
      const vf = vi + (-K * xi - amortiguamiento * vi) * t; // actualización de la velocidad
      const xf = xi + vf * t; // actualización de la posición

      // Dibuja el resorte
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      const x = canvas.width / 2 + xf * 50; // Escala arbitraria para visualización
      const y = canvas.height / 2;
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fillStyle = 'blue';
      context.fill();

      requestAnimationFrame(simulateSpring);

      // Actualiza las variables para la siguiente iteración
      xi = xf;
      vi = vf;
    };

    simulateSpring();
  }, []);

  return <canvas ref={canvasRef} id='resorte' />;
};

export default Resorte;
