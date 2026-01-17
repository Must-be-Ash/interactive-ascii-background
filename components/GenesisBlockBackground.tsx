'use client';

import { useEffect, useRef } from 'react';

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-+=x402#".split("");
const getRandomInt = (max: number) => Math.floor(Math.random() * max);

// Bitcoin Genesis Block hex data - organized by lines (16 bytes per line)
const genesisHexLines = [
  ['01', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
  ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
  ['00', '00', '00', '00', '3B', 'A3', 'ED', 'FD', '7A', '7B', '12', 'B2', '7A', 'C7', '2C', '3E'],
  ['88', '8A', '51', '32', '3A', '9F', 'B8', 'AA', '67', '76', '8F', '61', '7F', 'C8', '1B', 'C3'],
  ['4B', '1E', '5E', '4A', '29', 'AB', '5F', '49', 'FF', 'FF', 'FF', 'FF', 'FF', 'FF', 'FF', 'FF'],
  ['01', '01', '00', '00', '00', '01', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
  ['00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00', '00'],
  ['00', '00', '00', '00', '00', '00', 'FF', 'FF', 'FF', 'FF', '4D', '04', 'FF', 'FF', '00', '1D'],
  ['69', '6D', '65', '73', '20', '30', '33', '2F', '01', '04', '45', '54', '68', '65', '20', '54'],
  ['20', '43', '68', '61', '6E', '63', '65', '6C', '4A', '61', '6E', '2F', '32', '30', '30', '39'],
  ['6C', '6F', '72', '20', '6F', '6E', '20', '62', '72', '69', '6E', '6B', '20', '6F', '66', '20'],
  ['73', '65', '63', '6F', '6E', '64', '20', '62', '61', '69', '6C', '6F', '75', '74', '20', '66'],
  ['6F', '72', '20', '62', '61', '6E', '6B', '73', 'FF', 'FF', 'FF', 'FF', '01', '00', 'F2', '05'],
  ['67', '8A', 'FD', 'B0', 'FE', '55', '48', '27', '2A', '01', '00', '00', '00', '43', '41', '04'],
  ['D6', 'A8', '28', 'E0', '39', '09', 'A6', '19', '67', 'F1', 'A6', '71', '30', 'B7', '10'],
  ['49', 'F6', 'BC', '3F', '4C', 'EF', '38', 'C4', '79', '62', 'E0', 'EA', '1F', '61', 'DE', 'B6'],
  ['5C', '38', '4D', 'F7', 'BA', '0B', '8D', '57', 'F3', '55', '04', 'E5', '1E', 'C1', '12', 'DE'],
  ['AC', '00', '00', '00', '00', '00', '8A', '4C', '70', '2B', '6B', 'F1', '1D', '5F']
];

// Convert hex byte to ASCII character
const hexToAscii = (hex: string): string => {
  const code = parseInt(hex, 16);
  if (code >= 32 && code <= 126) {
    return String.fromCharCode(code);
  }
  return '.';
};

export function GenesisBlockBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  // HyperText animation state
  const currentText = useRef(['BITCOIN', 'GENESIS', 'BLOCK']);
  const displayText = useRef<string[][]>([[], [], []]);
  const iterations = useRef(0);
  const animating = useRef(false);
  const texts = [
    ['BITCOIN', 'GENESIS', 'BLOCK']
  ];
  const textChangeCounter = useRef(0);

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

    // Font settings - monospace for hex dump
    const fontSize = 14;
    const charSpacing = 8;
    const lineHeight = 18;

    const cols = Math.ceil(canvas.width / charSpacing) + 1;
    const rows = Math.ceil(canvas.height / lineHeight) + 1;

    // Hex dump layout constants - better spacing
    const offsetCol = 2; // Start with some padding
    const hexCol = offsetCol + 10; // Offset is 8 chars + 2 spaces
    const asciiCol = hexCol + 50; // 16 bytes * 3 chars (2 hex + 1 space) = 48, plus 2 extra for spacing
    const totalLineWidth = asciiCol + 18; // Full width of one hex dump line with padding

    // Initialize display text
    displayText.current = currentText.current.map(line => line.split(''));

    // HyperText animation
    let animationInterval: NodeJS.Timeout | null = null;

    const startTextAnimation = () => {
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

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      // Calculate base row for text (above cursor)
      const baseTextRow = Math.floor((mousePos.current.y - 45) / lineHeight);

      // Pre-calculate text positions
      const textPositions: Array<{ startCol: number; row: number; length: number }> = [];
      for (let lineIndex = 0; lineIndex < displayText.current.length; lineIndex++) {
        const line = displayText.current[lineIndex];
        const textLength = line.length;
        const textPixelWidth = textLength * charSpacing;
        const textStartCol = Math.floor((mousePos.current.x - textPixelWidth / 2) / charSpacing);
        const textRow = baseTextRow + lineIndex;
        textPositions.push({ startCol: textStartCol, row: textRow, length: textLength });
      }

      // Calculate center position for single hex dump block
      const hexDumpStartRow = Math.floor((rows - genesisHexLines.length) / 2);
      const hexDumpStartCol = Math.floor((cols - totalLineWidth) / 2);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * charSpacing;
          const y = row * lineHeight;

          let char = null;
          let isTextChar = false;

          // Check if this position is within the hex dump block bounds
          const hexDumpRow = row - hexDumpStartRow;
          const colInLine = col - hexDumpStartCol;
          const isInHexDump = hexDumpRow >= 0 && hexDumpRow < genesisHexLines.length &&
                              colInLine >= 0 && colInLine < totalLineWidth;

          // Only check for text if we're within the hex dump block
          if (isInHexDump) {
            // Check each line of text
            for (let lineIndex = 0; lineIndex < textPositions.length; lineIndex++) {
              const pos = textPositions[lineIndex];
              const textCharIndex = col - pos.startCol;
              if (row === pos.row && textCharIndex >= 0 && textCharIndex < pos.length) {
                char = displayText.current[lineIndex][textCharIndex];
                isTextChar = true;
                break;
              }
            }
          }

          // If no text character and we're in the hex dump, render hex data
          if (char === null && isInHexDump) {
            const hexLine = genesisHexLines[hexDumpRow];
            const offset = hexDumpRow * 16;
            const offsetStr = offset.toString(16).toUpperCase().padStart(8, '0');

            // Render offset
            if (colInLine >= offsetCol && colInLine < offsetCol + 8) {
              const offsetCharIndex = colInLine - offsetCol;
              if (offsetCharIndex < offsetStr.length) {
                char = offsetStr[offsetCharIndex];
              }
            }
            // Render hex bytes with proper spacing
            else if (colInLine >= hexCol && colInLine < hexCol + 48) {
              const hexIndex = Math.floor((colInLine - hexCol) / 3);
              if (hexIndex < hexLine.length) {
                const hexByte = hexLine[hexIndex];
                const charInByte = (colInLine - hexCol) % 3;
                if (charInByte < 2) {
                  char = hexByte[charInByte];
                } else {
                  char = ' '; // Space between bytes
                }
              }
            }
            // Render ASCII with spacing
            else if (colInLine >= asciiCol && colInLine < asciiCol + 18) {
              const asciiIndex = colInLine - asciiCol;
              if (asciiIndex < hexLine.length) {
                char = hexToAscii(hexLine[asciiIndex]);
              }
            }
          }

          // If still no char (outside hex dump), use space (background)
          if (char === null) {
            char = ' ';
          }

          // Set color based on whether it's text or background
          if (isTextChar) {
            ctx.fillStyle = '#FFFFFF';
          } else if (isInHexDump) {
            // Hex dump characters
            ctx.fillStyle = '#333333';
          } else {
            // Outside hex dump - darker/invisible
            ctx.fillStyle = '#1a1a1a';
          }

          ctx.fillText(char, x, y);
        }
      }

      requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      if (Math.abs(newX - mousePos.current.x) > 5 || Math.abs(newY - mousePos.current.y) > 5) {
        textChangeCounter.current++;

        if (textChangeCounter.current % 20 === 0) {
          currentText.current = texts[Math.floor(Math.random() * texts.length)];
        }

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
