class MatrixEffect {
  constructor() {
    this.canvas = document.getElementById("matrix");
    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.message = document.getElementById("message");
    this.fontSize = 16;
    this.drops = [];
    this.chars = "01";
    this.speed = 0.2;
    this.resize();
    this.init();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    this.ctx.font = `bold ${this.fontSize}px monospace`;
    this.ctx.textAlign = "center";

    if (this.drops.length === 0) {
      this.drops = Array(this.columns).fill(0);
    }
  }

  init() {
    window.addEventListener("resize", () => this.resize());
    document.addEventListener("click", () => this.message.classList.add("visible"));
    this.animate();
  }

  draw() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drops.forEach((drop, i) => {
      const char = this.chars[Math.floor(Math.random() * this.chars.length)];
      const x = (i + 0.5) * this.fontSize;
      const y = drop * this.fontSize;
      const brightness = Math.random();

      if (brightness < 0.1) this.ctx.fillStyle = "#fff";
      else if (brightness < 0.3) this.ctx.fillStyle = "#0f0";
      else this.ctx.fillStyle = "#050";

      this.ctx.fillText(char, x, y);

      if (y > this.canvas.height && Math.random() > 0.99) this.drops[i] = 0;
      else this.drops[i] += this.speed;
    });
  }

  animate() {
    if (document.visibilityState === "visible") this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

window.addEventListener("load", () => new MatrixEffect());
