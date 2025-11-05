import { useEffect, useRef } from 'react';
import './ParticleEffects.css';

interface ParticleEffectsProps {
  type: 'mountain' | 'water' | 'feather' | 'echo' | 'lightning' | 'aurora' | 'golden';
}

export default function ParticleEffects({ type }: ParticleEffectsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = type === 'lightning' ? 15 : type === 'aurora' ? 30 : 25;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeDirection: number;
      color: string;
      angle: number;
      angleSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        this.color = this.getColor();
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
      }

      getColor(): string {
        switch (type) {
          case 'mountain':
            return `rgba(100, 100, 120, ${this.opacity})`;
          case 'water':
            return `rgba(100, 180, 220, ${this.opacity})`;
          case 'feather':
            return `rgba(255, 255, 255, ${this.opacity})`;
          case 'echo':
            return `rgba(158, 158, 184, ${this.opacity})`;
          case 'lightning':
            return `rgba(200, 200, 255, ${this.opacity})`;
          case 'aurora':
            return Math.random() > 0.5
              ? `rgba(74, 255, 255, ${this.opacity})`
              : `rgba(0, 255, 136, ${this.opacity})`;
          case 'golden':
            return `rgba(255, 215, 0, ${this.opacity})`;
          default:
            return `rgba(255, 255, 255, ${this.opacity})`;
        }
      }

      update() {
        // Movement patterns based on type
        switch (type) {
          case 'mountain':
            // Slow drift downward like mist
            this.y += this.speedY * 0.3;
            this.x += Math.sin(this.angle) * 0.2;
            break;
          case 'water':
            // Wave-like motion
            this.y += Math.sin(this.angle) * 0.5;
            this.x += this.speedX;
            break;
          case 'feather':
            // Floating upward with drift
            this.y -= 0.5;
            this.x += Math.sin(this.angle) * 0.8;
            break;
          case 'echo':
            // Pulsing ripples
            this.size = 2 + Math.sin(this.angle) * 1;
            this.x += this.speedX * 0.3;
            this.y += this.speedY * 0.3;
            break;
          case 'lightning':
            // Sharp, quick movements
            this.x += this.speedX * 2;
            this.y += this.speedY * 2;
            break;
          case 'aurora':
            // Flowing, undulating motion
            this.y += Math.sin(this.angle) * 0.3;
            this.x += Math.cos(this.angle) * 0.3;
            break;
          case 'golden':
            // Ascending spiral
            this.y -= 0.3;
            this.x += Math.sin(this.angle) * 0.5;
            break;
        }

        this.angle += this.angleSpeed;

        // Opacity pulse
        this.opacity += this.fadeDirection * 0.003;
        if (this.opacity <= 0.1 || this.opacity >= 0.8) {
          this.fadeDirection *= -1;
        }

        // Reset particles that go off screen
        if (this.y < -10) this.y = canvas.height + 10;
        if (this.y > canvas.height + 10) this.y = -10;
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;

        this.color = this.getColor();
      }

      draw() {
        if (!ctx) return;

        ctx.beginPath();

        if (type === 'feather') {
          // Draw feather shape
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.fillStyle = this.color;
          ctx.ellipse(0, 0, this.size * 2, this.size * 4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (type === 'lightning') {
          // Draw lightning bolt
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.size * 0.5;
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.color;
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + Math.random() * 10 - 5, this.y + 10);
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else if (type === 'echo') {
          // Draw concentric circles
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size + i * 2, 0, Math.PI * 2);
            ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity / (i + 1)})`);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        } else {
          // Draw simple circle
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [type]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
