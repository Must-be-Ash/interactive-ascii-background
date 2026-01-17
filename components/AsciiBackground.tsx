'use client';

import { useEffect, useRef } from 'react';

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-+=x402#".split("");
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  // HyperText animation state
  const currentText = useRef(['COINBASE', 'DEVELOPER', 'PLATFORM']);
  const displayText = useRef<string[][]>([[], [], []]);
  const iterations = useRef(0);
  const animating = useRef(false);
  const texts = [
    ['COINBASE', 'DEVELOPER', 'PLATFORM']
  ];
  const textChangeCounter = useRef(0);

  // Professional character set with varying densities
  const baseChars = ['.', '·', ':', ';', '-', '_', '|', '/', '\\', '+', '×', '·'];
  const densityChars = [' ', '.', '·', ':', ';', '-', '_'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Font settings
    const fontSize = 18;
    const charSpacing = 20;
    const lineHeight = 20;

    const cols = Math.ceil(canvas.width / charSpacing) + 1;
    const rows = Math.ceil(canvas.height / lineHeight) + 1;

    // Initialize display text
    displayText.current = currentText.current.map(line => line.split(''));

    // HyperText animation
    let animationInterval: NodeJS.Timeout | null = null;

    const startTextAnimation = () => {
      // Clear any existing animation to restart
      if (animationInterval) clearInterval(animationInterval);

      animating.current = true;
      iterations.current = 0;
      displayText.current = currentText.current.map(line => line.split(''));

      const maxLength = Math.max(...currentText.current.map(line => line.length));

      animationInterval = setInterval(() => {
        if (iterations.current < maxLength) {
          displayText.current = currentText.current.map(line =>
            line.split('').map((letter, i) =>
              letter === ' ' ? ' ' : i <= iterations.current ? line[i] : alphabets[getRandomInt(alphabets.length)]
            )
          );
          iterations.current += 0.1;
        } else {
          animating.current = false;
          if (animationInterval) clearInterval(animationInterval);
        }
      }, 30);
    };

    // Cache time and center calculations per frame
    let frameTime = 0;
    let centerX = 0;
    let centerY = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background pattern
      ctx.font = `${fontSize}px monospace`;

      // Cache time once per frame (not per cell)
      frameTime = Date.now() * 0.0001;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      centerX = canvasWidth / 2;
      centerY = canvasHeight / 2;

      // Calculate base row for text (above cursor)
      const baseTextRow = Math.floor((mousePos.current.y - 45) / lineHeight);

      // Pre-calculate text positions to avoid repeated calculations
      const textPositions: Array<{ startCol: number; row: number; length: number }> = [];
      for (let lineIndex = 0; lineIndex < displayText.current.length; lineIndex++) {
        const line = displayText.current[lineIndex];
        const textLength = line.length;
        const textPixelWidth = textLength * charSpacing;
        const textStartCol = Math.floor((mousePos.current.x - textPixelWidth / 2) / charSpacing);
        const textRow = baseTextRow + lineIndex;
        textPositions.push({ startCol: textStartCol, row: textRow, length: textLength });
      }

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * charSpacing;
          const y = row * lineHeight;

          let char = null;
          let isTextChar = false;

          // Check each line of text (optimized)
          for (let lineIndex = 0; lineIndex < textPositions.length; lineIndex++) {
            const pos = textPositions[lineIndex];
            const textCharIndex = col - pos.startCol;
            if (row === pos.row && textCharIndex >= 0 && textCharIndex < pos.length) {
              char = displayText.current[lineIndex][textCharIndex];
              isTextChar = true;
              break;
            }
          }

          // If no text character, use professional pattern
          if (char === null) {
            // Optimized pattern calculation with cached values
            const rowNorm = row * 0.08;
            const colNorm = col * 0.05;
            const time = frameTime;
            
            // Reduced wave calculations (combine similar ones)
            const wave1 = Math.sin(rowNorm + colNorm + time);
            const wave2 = Math.cos(row * 0.12 - col * 0.07 + time * 0.7);
            const wave3 = Math.sin((row + col) * 0.06 + time * 0.5);
            
            // Combine waves
            const combined = (wave1 + wave2 * 0.7 + wave3 * 0.5) / 2.2;
            
            // Optimized distance calculation (avoid sqrt when possible)
            const distX = (x - centerX) / canvasWidth;
            const distY = (y - centerY) / canvasHeight;
            const distSq = distX * distX + distY * distY;
            const radialWave = Math.sin(Math.sqrt(distSq) * 15 + time * 0.4) * 0.3;
            
            // Final pattern value
            const patternValue = (combined + radialWave + 1) / 2;
            
            // Deterministic character selection (no Math.random)
            const hash = (row * 73856093) ^ (col * 19349663);
            const randomValue = ((hash >>> 0) % 100) / 100;
            
            // Use density-based character selection
            if (patternValue < 0.3) {
              char = randomValue < 0.15 ? densityChars[1] : densityChars[0];
            } else if (patternValue < 0.5) {
              const lightChars = densityChars.slice(0, 4);
              char = lightChars[Math.floor(patternValue * lightChars.length * 2) % lightChars.length];
            } else if (patternValue < 0.75) {
              const mediumChars = baseChars.slice(4, 8);
              char = mediumChars[Math.floor((patternValue - 0.5) * mediumChars.length * 4) % mediumChars.length];
            } else {
              const heavyChars = baseChars.slice(8);
              char = heavyChars[Math.floor((patternValue - 0.75) * heavyChars.length * 4) % heavyChars.length];
            }
          }

          // Set color based on whether it's text or background
          if (isTextChar) {
            ctx.fillStyle = '#FFFFFF';
          } else {
            ctx.fillStyle = '#333333';
          }

          ctx.fillText(char, x, y);
        }
      }

      requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      // Trigger animation on any significant mouse movement
      if (Math.abs(newX - mousePos.current.x) > 5 || Math.abs(newY - mousePos.current.y) > 5) {
        textChangeCounter.current++;

        // Change text occasionally (every 20 movements)
        if (textChangeCounter.current % 20 === 0) {
          currentText.current = texts[Math.floor(Math.random() * texts.length)];
        }

        // Restart animation on every mouse move
        startTextAnimation();
      }

      mousePos.current = { x: newX, y: newY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (animationInterval) clearInterval(animationInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none"
      style={{
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  );
}
