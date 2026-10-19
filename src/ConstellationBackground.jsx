
import { useEffect, useRef } from "react";

export default function ConstellationBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let animationId;
    let lastFrame = 0;
    let particles = [];

    const pointer = { x: -1000, y: -1000, active: false };
    const spacing = 115;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(
        110,
        Math.max(35, Math.floor((width * height) / 14000))
      );

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
      }));
    }

    function handlePointerMove(event) {
      if (event.pointerType === "touch") return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }

    function handlePointerLeave() {
      pointer.active = false;
    }

    function draw(timestamp = 0) {
      animationId = requestAnimationFrame(draw);

      if (timestamp - lastFrame < 16) return;
      lastFrame = timestamp;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.hypot(dx, dy);

          // Particles gently move away from the cursor.
          if (distance < 130 && distance > 0) {
            const force = (1 - distance / 130) * 0.12;
            p.vx += (dx / distance) * force;
            p.vy += (dy / distance) * force;
          }
        }

        // Keep the movement smooth and restrained.
        p.vx += (Math.random() - 0.5) * 0.003;
        p.vy += (Math.random() - 0.5) * 0.003;
        p.vx *= 0.995;
        p.vy *= 0.995;

        const maxSpeed = 0.65;
        p.vx = Math.max(-maxSpeed, Math.min(maxSpeed, p.vx));
        p.vy = Math.max(-maxSpeed, Math.min(maxSpeed, p.vy));

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the screen edges.
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });

      // Draw connecting lines between nearby particles.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < spacing) {
            const opacity = (1 - distance / spacing) * 0.28;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw glowing purple stars.
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 181, 253, 0.8)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#8b5cf6";
        ctx.fill();
      });

      ctx.shadowBlur = 0;
    }

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    if (reduceMotion) {
      // Keep a static constellation for reduced-motion preferences.
      drawStatic();
    } else {
      animationId = requestAnimationFrame(draw);
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          if (Math.hypot(p.x - b.x, p.y - b.y) < spacing) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(167, 139, 250, 0.18)";
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(196, 181, 253, 0.75)";
        ctx.fill();
      });
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="constellation-background"
      aria-hidden="true"
    />
  );
}
