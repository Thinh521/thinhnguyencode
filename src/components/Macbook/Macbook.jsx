import React, { useEffect, useRef, useContext, useState } from "react";
import DarkModeContext from "../../context/DarkModeContext";
import { IMAGES } from "../../../public/images/imgaes";
import styles from "./Macbook.module.css";

const Macbook = () => {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(DarkModeContext);

  // Hiệu ứng chỉ sao băng
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class ShootingStar {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 0.5;
        this.length = 80 + Math.random() * 120;
        this.speed = 8 + Math.random() * 8;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        this.opacity = 0;
        this.fadeIn = true;
        this.life = 0;
        this.maxLife = 60 + Math.random() * 60;
      }
      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;

        if (this.fadeIn && this.opacity < 1) {
          this.opacity += 0.05;
          if (this.opacity >= 1) this.fadeIn = false;
        } else if (!this.fadeIn) {
          this.opacity -= 0.02;
        }

        if (this.life > this.maxLife || this.opacity <= 0) {
          this.reset();
        }
      }
      draw() {
        ctx.save();

        const baseColor = theme === "dark" ? [255, 255, 255] : [80, 80, 80];
        const highlightColor =
          theme === "dark" ? [200, 230, 255] : [120, 120, 120];

        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );

        gradient.addColorStop(
          0,
          `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${this.opacity})`
        );
        gradient.addColorStop(
          0.3,
          `rgba(${highlightColor[0]}, ${highlightColor[1]}, ${
            highlightColor[2]
          }, ${this.opacity * 0.7})`
        );
        gradient.addColorStop(1, "rgba(100, 180, 255, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = theme === "dark" ? 2 : 3;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.stroke();

        ctx.restore();
      }
    }

    const shootingStars = Array.from({ length: 3 }, () => new ShootingStar());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Random spawn
      if (Math.random() < 0.01) {
        const inactiveStar = shootingStars.find(
          (s) => s.opacity <= 0 && s.life > s.maxLife - 10
        );
        if (inactiveStar) inactiveStar.reset();
      }

      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Loading màn hình laptop
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3900);
    return () => clearTimeout(timer);
  }, []);

  const backgroundImage =
    theme === "dark" ? IMAGES.hinhnenDark : IMAGES.hinhnenLight;

  return (
    <div className="w-full h-[400px] relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Macbook */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={styles.macbook}>
          <div className={styles.macbook__topBord}>
            <div className={styles.macbook__display}>
              {loading ? (
                <div className={styles.macbook__load} />
              ) : (
                <img
                  src={backgroundImage}
                  alt="Laptop screen"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          <div className={styles.macbook__underBord}>
            <div className={styles.macbook__keybord}>
              <div className={styles.keybord}>
                <div className={styles.keybord__touchbar}></div>
                <ul className={styles.keybord__keyBox}>
                  {Array.from({ length: 13 }).map((_, i) => (
                    <li
                      key={i}
                      className={`${styles.keybord__key} ${
                        styles[`key--${String(i + 1).padStart(2, "0")}`]
                      }`}
                    />
                  ))}
                </ul>
                <ul className={styles["keybord__keyBox--under"]}>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <li
                      key={i + 14}
                      className={`${styles.keybord__key} ${
                        styles[`key--${i + 14}`]
                      }`}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Macbook;
