"use client";

import React, { useEffect, useState } from "react";
import { MoodType } from "@/types/comment";

interface BackgroundEffectsProps {
  mood: MoodType;
}

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface ConfettiPiece {
  id: string;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  shape: "rectangle" | "circle" | "star";
}

interface StarBurst {
  id: string;
  x: number;
  y: number;
  delay: number;
  size: number;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ mood }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [starBursts, setStarBursts] = useState<StarBurst[]>([]);

  // エフェクト生成（熱血時のみ）
  useEffect(() => {
    if (mood !== "excited") {
      setParticles([]);
      setConfetti([]);
      setStarBursts([]);
      return;
    }

    const colors = [
      "#FFD700",
      "#FF69B4",
      "#00CED1",
      "#98FB98",
      "#F0E68C",
      "#DDA0DD",
      "#87CEEB",
      "#F4A460",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
    ];

    const generateParticles = () => {
      const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
        id: `particle-${Date.now()}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 2000,
        duration: Math.random() * 3000 + 2000,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));

      setParticles(newParticles);
    };

    const generateConfetti = () => {
      const shapes: ConfettiPiece["shape"][] = ["rectangle", "circle", "star"];
      const newConfetti: ConfettiPiece[] = Array.from(
        { length: 30 },
        (_, i) => ({
          id: `confetti-${Date.now()}-${i}`,
          x: Math.random() * 100,
          size: Math.random() * 12 + 8,
          delay: Math.random() * 3000,
          duration: Math.random() * 4000 + 3000,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        }),
      );

      setConfetti(newConfetti);
    };

    const generateStarBursts = () => {
      const newStarBursts: StarBurst[] = Array.from({ length: 8 }, (_, i) => ({
        id: `star-${Date.now()}-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2000,
        size: Math.random() * 20 + 15,
      }));

      setStarBursts(newStarBursts);
    };

    generateParticles();
    generateConfetti();
    generateStarBursts();

    const particleInterval = setInterval(generateParticles, 5000);
    const confettiInterval = setInterval(generateConfetti, 4000);
    const starInterval = setInterval(generateStarBursts, 6000);

    return () => {
      clearInterval(particleInterval);
      clearInterval(confettiInterval);
      clearInterval(starInterval);
    };
  }, [mood]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* 背景グラデーション */}
      <div
        className={`
          absolute inset-0 transition-all duration-1000 ease-in-out
          ${
            mood === "excited"
              ? `
              bg-gradient-to-br from-fuchsia-600 via-purple-600 to-pink-600
              animate-gradient-excited
            `
              : `
              bg-gradient-to-br from-gray-900 via-slate-800 to-black
              animate-gradient-cynical
            `
          }
        `}
      />

      {/* 二次グラデーションオーバーレイ */}
      <div
        className={`
          absolute inset-0 transition-opacity duration-1000
          ${
            mood === "excited"
              ? `
              bg-gradient-to-tr from-yellow-400/40 via-red-500/40 to-blue-500/40
              opacity-80 animate-pulse
            `
              : `
              bg-gradient-to-br from-gray-800/50 to-black/70
              opacity-90
            `
          }
        `}
      />

      {/* 熱血時のパーティクルエフェクト */}
      {mood === "excited" &&
        particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float-sparkle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animationDelay: `${particle.delay}ms`,
              animationDuration: `${particle.duration}ms`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}

      {/* 熱血時の紙吹雪エフェクト */}
      {mood === "excited" &&
        confetti.map((piece) => (
          <div
            key={piece.id}
            className={`absolute animate-confetti ${
              piece.shape === "rectangle"
                ? "rounded-sm"
                : piece.shape === "circle"
                  ? "rounded-full"
                  : ""
            }`}
            style={{
              left: `${piece.x}%`,
              top: "-20px",
              width: piece.shape === "star" ? "0" : `${piece.size}px`,
              height: piece.shape === "star" ? "0" : `${piece.size}px`,
              backgroundColor:
                piece.shape !== "star" ? piece.color : "transparent",
              animationDelay: `${piece.delay}ms`,
              animationDuration: `${piece.duration}ms`,
              borderLeft:
                piece.shape === "star"
                  ? `${piece.size / 2}px solid transparent`
                  : "none",
              borderRight:
                piece.shape === "star"
                  ? `${piece.size / 2}px solid transparent`
                  : "none",
              borderBottom:
                piece.shape === "star"
                  ? `${piece.size}px solid ${piece.color}`
                  : "none",
            }}
          />
        ))}

      {/* 熱血時の星の爆発エフェクト */}
      {mood === "excited" &&
        starBursts.map((star) => (
          <div
            key={star.id}
            className="absolute animate-star-burst"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}ms`,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `radial-gradient(circle, #FFD700 0%, #FF6B6B 50%, transparent 70%)`,
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
            />
          </div>
        ))}

      {/* 熱血時の追加エフェクト（光る線） */}
      {mood === "excited" && (
        <>
          <div className="absolute top-1/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-slide-line" />
          <div
            className="absolute top-2/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-slide-line"
            style={{ animationDelay: "0.3s" }}
          />
          <div
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-slide-line"
            style={{ animationDelay: "0.6s" }}
          />
          <div
            className="absolute top-1/3 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-slide-line"
            style={{ animationDelay: "0.9s" }}
          />
          <div
            className="absolute top-3/4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-slide-line"
            style={{ animationDelay: "1.2s" }}
          />
        </>
      )}

      {/* ネオングロウエフェクト */}
      {mood === "excited" && (
        <div className="absolute inset-0 animate-strobe">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-cyan-400/50 to-transparent blur-xl" />
          <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-pink-400/50 to-transparent blur-xl" />
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-yellow-400/50 to-transparent blur-xl" />
          <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-green-400/50 to-transparent blur-xl" />
        </div>
      )}

      {/* グリッチオーバーレイ */}
      {mood === "excited" && (
        <div className="absolute inset-0 animate-glitch mix-blend-screen pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10" />
        </div>
      )}

      {/* 冷笑時の暗いビネット効果 */}
      {mood === "cynical" && (
        <>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 70%)",
            }}
          />
          {/* 暗い霧のようなエフェクト */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 animate-pulse-slow" />
        </>
      )}

      {/* モード切り替え時のトランジションエフェクト */}
      <div
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-500
          ${
            mood === "excited"
              ? "bg-white/5 opacity-100"
              : "bg-gray-900/30 opacity-100"
          }
        `}
      />
    </div>
  );
};

export default BackgroundEffects;
