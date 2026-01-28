const matrixEl = document.getElementById('matrix-rain');
const plasmaChars = ' .:-=+*#%@';
let cols = 0;
let rows = 0;
let tick = 0;

const buildFrame = () => {
  if (!matrixEl) return;
  const width = matrixEl.clientWidth;
  const height = matrixEl.clientHeight;
  const colWidth = 10;

  rows = Math.max(12, Math.floor(height / 14));
  cols = Math.max(18, Math.floor(width / colWidth));

  const grid = Array.from({ length: rows }, () => Array(cols).fill(' '));
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const v1 = Math.sin(x * 0.25 + tick * 0.12);
      const v2 = Math.sin(y * 0.2 + tick * 0.1);
      const v3 = Math.sin((x + y) * 0.12 + tick * 0.08);
      const v4 = Math.sin(Math.hypot(x - cols / 2, y - rows / 2) * 0.3 - tick * 0.1);
      const value = (v1 + v2 + v3 + v4) * 0.5;
      const idx = Math.floor((value + 2) / 4 * (plasmaChars.length - 1));
      grid[y][x] = plasmaChars[Math.max(0, Math.min(plasmaChars.length - 1, idx))];
    }
  }

  tick += 1;
  matrixEl.textContent = grid.map(row => row.join('')).join('\n');
};

const loop = () => {
  buildFrame();
  setTimeout(loop, 120);
};

window.addEventListener('resize', () => {
  buildFrame();
});

loop();
