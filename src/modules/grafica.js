import React, { useEffect, useRef } from 'react';

const Grafica = () => {
  const canvasRef = useRef(null);
  let th = 0;
  let X, Y, xr, yr, zr;

  const rotX = (x, y, z, th) => {
    yr = y * Math.cos(th) - z * Math.sin(th);
    zr = y * Math.sin(th) + z * Math.cos(th);
    return [yr, zr];
  };

  const rotY = (x, y, z, th) => {
    xr = x * Math.cos(th) - z * Math.sin(th);
    zr = x * Math.sin(th) + z * Math.cos(th);
    return [xr, zr];
  };

  const rotZ = (x, y, z, th) => {
    xr = x * Math.cos(th) - y * Math.sin(th);
    yr = x * Math.sin(th) + y * Math.cos(th);
    return [xr, yr];
  };

  const xyz2XY = (x, y, z, DX, DY, th) => {
    const d = 20000;
    [y, z] = rotX(x, y, z, th);
    [x, z] = rotY(x, y, z, th);
    [x, y] = rotZ(x, y, z, th);
    X = (d * xr) / (-zr + d) + DX;
    Y = -((d * yr) / (-zr + d)) + DY;
  };

  const drawLines = (contexto, color, x1, y1, x2, y2) => {
    contexto.beginPath();
    contexto.strokeStyle = color;
    contexto.moveTo(x1, y1);
    contexto.lineTo(x2, y2);
    contexto.stroke();
  };

  const drawGraph = (contexto, color, th) => {
    drawLines(contexto, color, X, Y, X + 500, Y);
    drawLines(contexto, color, X, Y, X, Y + 500);
    drawLines(contexto, color, X, Y, X, Y + 500);
  };

  const nextTh = () => {
    const canvas = canvasRef.current;
    const contexto = canvas.getContext('2d');
    canvas.width = canvas.width;

    drawGraph(contexto, '#FFF0CE', 0, 0, 500, 0);
    drawGraph(contexto, '#FFC436', 0, 0, 0, 500);
    drawGraph(contexto, '#0174BE', 0, 0, 0, 0);

    for (let x = -200; x <= 200; x += 15) {
      let y = -200;
      let z = (100 * Math.sin(x * x + y * y)) / (x * x + y * y);
      xyz2XY(x, y, z, 550, 550, th);
      drawLines(contexto, '#FFC436', X, Y, X, Y);

      for (let y = -200; y <= 200; y += 15) {
        z = (100 * Math.sin(0.001 * (x * x + y * y))) / (0.001 * (x * x + y * y));
        xyz2XY(x, y, z, 550, 550, th);
        drawLines(contexto, '#FFC436', X, Y, X, Y);
      }
    }

    th = th + 0.01;
    if (th <= 2 * Math.PI) setTimeout(() => nextTh(), 10);
  };

  useEffect(() => {
    if (th === 0) nextTh();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Grafica;
