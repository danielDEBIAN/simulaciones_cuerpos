import React, { useEffect, useRef } from 'react';

const MyCanvas = () => {
  const canvasRef = useRef(null);
  let th = 0;
  let X, Y;

  useEffect(() => {
    const canvas = canvasRef.current;
    const contexto = canvas.getContext('2d');

    const rotX = (x, y, z, th) => {
      const yr = y * Math.cos(th) - z * Math.sin(th);
      const zr = y * Math.sin(th) + z * Math.cos(th);
      return [yr, zr];
    };

    const rotY = (x, y, z, th) => {
      const xr = x * Math.cos(th) - z * Math.sin(th);
      const zr = x * Math.sin(th) + z * Math.cos(th);
      return [xr, zr];
    };

    const rotZ = (x, y, z, th) => {
      const xr = x * Math.cos(th) - y * Math.sin(th);
      const yr = x * Math.sin(th) + y * Math.cos(th);
      return [xr, yr];
    };

    const xyz2XY = (x, y, z, DX, DY, th) => {
      const d = 20000;
      [y, z] = rotX(x, y, z, th);
      [x, z] = rotY(x, y, z, th);
      [X, Y] = rotZ(x, y, z, th);
      X = d * X / (-Y + d) + DX;
      Y = -(d * Y / (-Y + d)) + DY;
    };

    const drawLines = () => {
      canvas.width = canvas.width;
      contexto.beginPath();
      contexto.strokeStyle = "#FFF0CE";
      xyz2XY(0, 0, 0, 550, 550, th);
      contexto.moveTo(X, Y);
      xyz2XY(500, 0, 0, 550, 550, th);
      contexto.lineTo(X, Y);
      contexto.stroke();

      // Add other lines...

      th += 0.01;
      if (th <= 2 * Math.PI) {
        requestAnimationFrame(drawLines);
      }
    };

    drawLines();
  }, []);

  return <canvas ref={canvasRef} width={800} height={800} />;
};

export default MyCanvas;
