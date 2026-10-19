
import { useEffect, useRef } from "react";

export default function CursorParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId;
    let lastFrame = 0;

    const particles = [];
    const maxParticles = 55;

    const pointer = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const isTouchDevice = window.matchMedia(
      "(hover: none)"
    ).matches;

    // Resize canvas for the current screen.
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Create particles around the cursor.
    function handlePointerMove(event) {
      if (event.pointerType === "touch") return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;

      for (let i = 0; i < 3; i++) {
        if (particles.length >= maxParticles) {
          particles.shift();
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2;

        particles.push({
          x: pointer.x + (Math.random() - 0.5) * 24,
          y: pointer.y + (Math.random() - 0.5) * 24,

          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,

          radius: Math.random() * 2 + 1,
          life: 1,
          decay: 0.012 + Math.random() * 0.015,
        });
      }
    }

    function handlePointerLeave() {
      pointer.active = false;
      pointer.x = -1000;
      pointer.y = -1000;
    }

    // Animate particles and repel them from the cursor.
    function animate(timestamp = 0) {
      frameId = requestAnimationFrame(animate);

      // Limit animation work on high-refresh-rate screens.
      if (timestamp - lastFrame < 16) return;

      lastFrame = timestamp;

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distance = Math.hypot(dx, dy);

        // Push particles away from the cursor.
        if (
          pointer.active &&
          distance < 110 &&
          distance > 0
        ) {
          const force = (1 - distance / 110) * 0.8;

          p.vx += (dx / distance) * force;
          p.vy += (dy / distance) * force;
        }

        // Slow particles down gradually.
        p.vx *= 0.97;
        p.vy *= 0.97;

        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        // Remove faded particles.
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw glowing purple particles.
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(180, 140, 255, ${
          p.life * 0.85
        })`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#8b5cf6";
        ctx.fill();
      }

      // Draw connecting lines between nearby particles.
      ctx.shadowBlur = 0;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 75) {
            const opacity =
              (1 - distance / 75) *
              Math.min(a.life, b.life) *
              0.25;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = `rgba(167, 139, 250, ${opacity})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }

    resize();

    if (!isTouchDevice) {
      window.addEventListener(
        "pointermove",
        handlePointerMove,
        { passive: true }
      );

      window.addEventListener(
        "pointerleave",
        handlePointerLeave
      );
    }

    window.addEventListener("resize", resize);

    frameId = requestAnimationFrame(animate);

    // Clean up listeners and animation on unmount.
    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-particles"
      aria-hidden="true"
    />
  );
}
