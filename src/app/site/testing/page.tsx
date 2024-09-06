'use client';

import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  opacity: number;
  color: string;
}

interface Shape {
  centerDot: Dot;
  radius: number;
  duration: number;
  startTime: number;
  isAppearing: boolean;
  startColor: string;
  endColor: string;
}

const flatUIColors = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#16a085',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ecf0f1',
  '#95a5a6',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#bdc3c7',
  '#7f8c8d',
];

function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default function Screensaver() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const minSpacing = 10;
    const margin = minSpacing;
    const dotSize = 1.5;

    let dots: Dot[] = [];
    let shapes: Shape[] = [];
    let availableRadii: number[] = [];

    const initializeDots = () => {
      dots = [];
      const availableWidth = canvas.width - 2 * margin;
      const availableHeight = canvas.height - 2 * margin;

      const cols = Math.floor(availableWidth / minSpacing);
      const rows = Math.floor(availableHeight / minSpacing);

      const spacingX = availableWidth / (cols - 1);
      const spacingY = availableHeight / (rows - 1);

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const x = margin + col * spacingX;
          const y = margin + row * spacingY;
          dots.push({ x, y, opacity: 0, color: '#FFFFFF' });
        }
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        if (dot.opacity > 0) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = dot.color;
          ctx.globalAlpha = dot.opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
    };

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const animateShapes = (currentTime: number) => {
      shapes.forEach((shape, index) => {
        const elapsed = currentTime - shape.startTime;
        const progress = Math.min(elapsed / shape.duration, 1);
        const easedProgress = easeInOutQuad(progress);

        dots.forEach((dot) => {
          const distance = Math.sqrt(
            Math.pow(dot.x - shape.centerDot.x, 2) +
              Math.pow(dot.y - shape.centerDot.y, 2)
          );
          if (distance <= shape.radius) {
            const normalizedDistance = distance / shape.radius;
            const targetOpacity = Math.max(0, 1 - normalizedDistance);
            dot.opacity = shape.isAppearing
              ? easedProgress * targetOpacity
              : (1 - easedProgress) * targetOpacity;
            dot.color = interpolateColor(
              shape.startColor,
              shape.endColor,
              easedProgress
            );
          }
        });

        if (progress >= 1) {
          if (shape.isAppearing) {
            shapes[index] = {
              ...shape,
              isAppearing: false,
              startTime: currentTime,
              startColor: shape.endColor,
              endColor:
                flatUIColors[Math.floor(Math.random() * flatUIColors.length)],
            };
          } else {
            shapes.splice(index, 1);
            availableRadii.push(shape.radius);
          }
        }
      });

      drawDots();

      if (shapes.length < 5 && Math.random() < 0.005) {
        addNewShape();
      }

      requestAnimationFrame(animateShapes);
    };

    const addNewShape = () => {
      if (availableRadii.length === 0) return;

      const centerDot = dots[Math.floor(Math.random() * dots.length)];
      const radiusIndex = Math.floor(Math.random() * availableRadii.length);
      const radius = availableRadii[radiusIndex];
      const duration = 2000 + Math.random() * 2000;

      if (!isOverlapping(centerDot, radius)) {
        shapes.push({
          centerDot,
          radius,
          duration,
          startTime: performance.now(),
          isAppearing: true,
          startColor:
            flatUIColors[Math.floor(Math.random() * flatUIColors.length)],
          endColor:
            flatUIColors[Math.floor(Math.random() * flatUIColors.length)],
        });
        availableRadii.splice(radiusIndex, 1);
      }
    };

    const isOverlapping = (centerDot: Dot, radius: number) => {
      return shapes.some((shape) => {
        const distance = Math.sqrt(
          Math.pow(centerDot.x - shape.centerDot.x, 2) +
            Math.pow(centerDot.y - shape.centerDot.y, 2)
        );
        return distance < radius + shape.radius;
      });
    };

    const handleResize = () => {
      updateCanvasSize();
      initializeDots();
      shapes = [];
      initializeAvailableRadii();
    };

    const initializeAvailableRadii = () => {
      const viewportSize = Math.min(canvas.width, canvas.height);
      const minRadius = viewportSize * 0.1;
      const maxRadius = viewportSize * 0.35;
      const step = (maxRadius - minRadius) / 4;
      availableRadii = [
        minRadius,
        minRadius + step,
        minRadius + 2 * step,
        minRadius + 3 * step,
        maxRadius,
      ];
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    requestAnimationFrame(animateShapes);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="screensaver">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
