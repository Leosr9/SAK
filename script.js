let currentPage = 1;

const pageTexts = {
  page1: `But let's go, Saaak.\n♡`,
  page2: `I don’t say this enough but\n\nIt’s not just your pretty eyes.\nIt’s the way they change when you’re excited.\n\nNot just your hair.\nIt’s the way you fix it when you’re pretending not to care.\n\nIt’s your random mood swings.\nYour unnecessary attitude.\nYour laugh when you forget you’re “high standard.”\n\nAnd those hugs…\nThey don’t feel normal.\nThey feel like a blessing I shouldn’t be lucky enough to get… somehow still get.`,
  page3: `I know there are a lot of Boys running after you.\n\nAnd yeah, I see it.\n\nBut I’m not in competition with those guys.\nI’m not here to win anything.\n\nI’m just here to make you feel special\nin the way only I can.`,
  page4: `Areyyy Padosi, aap batao…\nShould I write a book about us?\nOr drop a whole song? 😂\n\nBecause what haven’t I been to you?\n\nFirst day brother (still hurts btw)\nNext day friend\nThen bestie\nThen boyfriend\nEx\nThen idk\n\nAnd somehow we’re still here…\n\nLooks like we don’t really have a proper ending, do we?`,
  page5: `We missed a few years.\n\nNot just days or weeks… actual years.\nSo many random stories we never told each other.\nSo many versions of us we didn’t get to see.\n\nBut we’re still here.\n\nAnd I plan on making new memories with you.\nIt’s never too late to have fun.`,
  page6: `Yeah yeah I know baddie 😌\nHigh standard woman.\nVery expensive gurly.\n\nAnd I know a lot of boys asked you to be their Valentine.\n\nBut nobody just wished you properly.`,
  page7: `So here let me do the honours\n\n\n\n your fav dumb boi ❤️`,
  page8: `Thank You For Everything `
};

function typeWriter(id, text, speed = 50) {
  const el = document.getElementById(id);
  el.innerHTML = "";
  let i = 0;
  function type() {
    if (i < text.length) {
      el.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function nextPage(num) {
  document.querySelector(".page.active").classList.remove("active");
  const newPage = document.getElementById("page" + num);
  newPage.classList.add("active");
  typeWriter(`page${num}-text`, pageTexts[`page${num}`]);
  currentPage = num;
}

function prevPage(num) {
  document.querySelector(".page.active").classList.remove("active");
  const newPage = document.getElementById("page" + num);
  newPage.classList.add("active");
  typeWriter(`page${num}-text`, pageTexts[`page${num}`]);
  currentPage = num;
}

/* HEART NETWORK BACKGROUND WITH WINE/PINK/PURPLE */
window.onload = () => {
  typeWriter("page1-text", pageTexts.page1);

  const canvas = document.getElementById("phone-bg");
  const ctx = canvas.getContext("2d");

  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;

  window.addEventListener("resize", () => {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  });

  const colorPalette = ["#ff4e91", "#ff78b3", "#a65ffb", "#8b008b", "#b22222"]; // pink, magenta, purple, wine red, red

  const particles = [];
  const count = 60;

  // Initialize hearts
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 6 + 6,
      colorIndex: Math.floor(Math.random() * colorPalette.length)
    });
  }

  function drawHeart(x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size/2, y - size/2,
                      x - size, y + size/3,
                      x, y + size);
    ctx.bezierCurveTo(x + size, y + size/3,
                      x + size/2, y - size/2,
                      x, y);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Cycle color slowly
      const color = colorPalette[Math.floor((Date.now()/500 + p.colorIndex) % colorPalette.length)];
      drawHeart(p.x, p.y, p.size, color);
    });

    // Connect hearts with lines
    for (let i = 0; i < count; i++) {
      for (let j = i+1; j < count; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          const color = colorPalette[Math.floor((Date.now()/500 + i) % colorPalette.length)];
          ctx.strokeStyle = `${color}80`; // semi-transparent
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
};
window.addEventListener('click', () => {
  const audio = document.getElementById('bg-music');
  if (audio.paused) audio.play();
});
