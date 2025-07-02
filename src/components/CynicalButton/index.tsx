"use client";

import React, { useState } from "react";
import { MoodType } from "@/types/comment";

interface CynicalButtonProps {
  currentMood: MoodType;
  onMoodChange: (mood: MoodType) => void;
  disabled?: boolean;
}

const CynicalButton: React.FC<CynicalButtonProps> = ({
  currentMood,
  onMoodChange,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);

    const newMood: MoodType = currentMood === "excited" ? "cynical" : "excited";
    onMoodChange(newMood);
  };

  const isCynical = currentMood === "cynical";

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <button
        onClick={handleClick}
        disabled={disabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative group transition-all duration-500 ease-in-out
          ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
          ${isClicked ? "scale-95" : isHovered ? "scale-110" : "scale-100"}
        `}
      >
        {/* メインボタン */}
        <div
          className={`
            relative px-8 py-4 rounded-2xl font-bold text-lg
            border-2 transition-all duration-500
            shadow-lg backdrop-blur-sm
            ${
              isCynical
                ? `
                bg-gradient-to-br from-gray-800 to-gray-900 
                border-gray-600 text-gray-300
                shadow-gray-900/50
                hover:from-gray-700 hover:to-gray-800
                hover:border-gray-500 hover:text-white
                hover:shadow-gray-800/70
              `
                : `
                bg-gradient-to-br from-purple-600 to-indigo-700
                border-purple-400 text-white
                shadow-purple-900/50
                hover:from-purple-500 hover:to-indigo-600
                hover:border-purple-300
                hover:shadow-purple-800/70
              `
            }
          `}
        >
          {/* 背景エフェクト */}
          <div
            className={`
              absolute inset-0 rounded-2xl transition-opacity duration-500
              ${
                isHovered
                  ? isCynical
                    ? "bg-gradient-to-r from-gray-700/20 to-slate-600/20 opacity-100"
                    : "bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-100"
                  : "opacity-0"
              }
            `}
          />

          {/* テキスト */}
          <span className="relative z-10 flex items-center gap-3">
            {isCynical ? <span>熱血</span> : <span>冷笑</span>}
          </span>

          {/* ホバー時のきらめきエフェクト */}
          {isHovered && !isCynical && (
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-ping" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-300/40 rounded-full animate-pulse delay-300" />
              <div className="absolute top-1/2 left-4 w-2 h-2 bg-pink-300/50 rounded-full animate-bounce delay-150" />
            </div>
          )}
        </div>

        {/* 冷笑モード時の暗いオーラエフェクト */}
        {isCynical && isHovered && (
          <div className="absolute inset-0 -m-2">
            <div className="w-full h-full rounded-3xl bg-gradient-to-r from-gray-800/20 to-slate-700/20 animate-pulse" />
          </div>
        )}

        {/* 盛り上がりモード時のカラフルオーラエフェクト */}
        {!isCynical && isHovered && (
          <div className="absolute inset-0 -m-3">
            <div className="w-full h-full rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-indigo-500/20 blur-sm animate-pulse" />
          </div>
        )}
      </button>

      {/* 状態表示テキスト */}
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
        <p
          className={`
            text-sm font-medium transition-all duration-500
            ${isCynical ? "text-gray-400" : "text-purple-300"}
          `}
        >
          {isCynical ? "冷笑モード中..." : "熱血中！"}
        </p>
      </div>
    </div>
  );
};

export default CynicalButton;
