import React, { useEffect, useRef } from 'react';
import './pendulo.css';

function Pendulo() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Parámetros del pendulo
    const r = 100; // longitud
    const t = 0.1; // delta tiempo
    const g = 9.8; // gravedad
    let w = 0; // velocidad angular inicial
    let th = Math.PI / 3; // angulo inicial en radianes, cero hacia abajo

    const animatePendulum = () => {
        w += (-g * Math.sin(th) / r - 0.45 * w) * t; // actualización de la velocidad angular
        th += w * t; // actualización del ángulo

        // Dibuja el pendulo
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        const x = canvas.width / 2 + r * Math.sin(th);
        const y = canvas.height / 2 - r * Math.cos(th);
        context.lineTo(x, y);
        context.stroke();

        requestAnimationFrame(animatePendulum);
    };

    animatePendulum();
  }, []);

  return <canvas ref={canvasRef} id="pendulo" />;
}

export default Pendulo;
