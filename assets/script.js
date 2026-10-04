// THEME TOGGLE
const toggleBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') document.body.classList.add('light');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  toggleBtn.textContent = isLight ? '☀️' : '🌙';
});
toggleBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';

// 3D WALL ANIMATION
const canvas = document.getElementById('wall3d');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];
const SPACING = 60;

for (let x = 0; x < canvas.width + SPACING; x += SPACING) {
  for (let y = 0; y < canvas.height + SPACING; y += SPACING) {
    dots.push({
      x: x, y: y,
      offset: Math.random() * Math.PI * 2
    });
  }
}

let time = 0;

function animateWall() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const accent = document.body.classList.contains('light') ? '#0088cc' : '#00e5ff';

  time += 0.02;

  dots.forEach(dot => {
    const z = Math.sin(time + dot.offset) * 20;
    const scale = 1 + z / 100;

    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.15 + (z + 20) / 100;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 2 * scale, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 0.5;

  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < SPACING * 1.2) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animateWall);
}
animateWall();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
