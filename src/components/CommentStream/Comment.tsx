"use client";

import React, { memo, useEffect, useState } from "react";
import { Comment as CommentType } from "@/types/comment";

interface CommentProps {
  comment: CommentType;
  onAnimationEnd: (id: string) => void;
}

const Comment: React.FC<CommentProps> = memo(({ comment, onAnimationEnd }) => {
  const [isVisible, setIsVisible] = useState(false);

  // フォントサイズのマッピング
  const getFontSizeClass = (size: CommentType["fontSize"]): string => {
    switch (size) {
      case "small":
        return "text-sm md:text-base";
      case "medium":
        return "text-base md:text-lg";
      case "large":
        return "text-lg md:text-xl lg:text-2xl";
      default:
        return "text-base";
    }
  };

  // テキストシャドウの設定（可読性向上）
  const getTextShadow = (type: CommentType["type"]): React.CSSProperties => {
    return type === "excited"
      ? {
          textShadow: `
            0 0 10px currentColor,
            0 0 20px currentColor,
            0 0 30px currentColor,
            2px 2px 4px rgba(0,0,0,0.8)
          `,
          filter: "brightness(1.3) contrast(1.2)",
        }
      : { textShadow: "1px 1px 2px rgba(0,0,0,0.5)" };
  };

  // アニメーション効果のクラス
  const getAnimationClass = (type: CommentType["type"]): string => {
    return type === "excited"
      ? "animate-slide-comment-excited hover:scale-105 transition-transform duration-200"
      : "animate-slide-comment-cynical opacity-75";
  };

  useEffect(() => {
    // 初期コメントは即座に表示、新規コメントは遅延表示
    const delay = comment.initialProgress !== undefined ? 0 : comment.delay;

    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // アニメーション終了後の削除
    const totalAnimationTime =
      comment.initialProgress !== undefined
        ? comment.speed * (1 - comment.initialProgress) * 1000 // 残りの時間
        : comment.speed * 1000; // 全体の時間

    const hideTimer = setTimeout(() => {
      onAnimationEnd(comment.id);
    }, delay + totalAnimationTime);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [
    comment.id,
    comment.delay,
    comment.speed,
    comment.initialProgress,
    onAnimationEnd,
  ]);

  if (!isVisible) return null;

  // アニメーション遅延の計算（初期コメント用）
  const getAnimationDelay = () => {
    if (comment.initialProgress !== undefined) {
      // 負の遅延を使用してアニメーションを途中から開始
      return `-${comment.initialProgress * comment.speed}s`;
    }
    return "0s";
  };

  return (
    <div
      className={`
        fixed pointer-events-none z-40 whitespace-nowrap font-bold select-none
        ${getFontSizeClass(comment.fontSize)}
        ${getAnimationClass(comment.type)}
      `}
      style={{
        top: `${comment.yPosition}%`,
        right: "-300px",
        color: comment.color,
        animationDuration: `${comment.speed}s`,
        animationDelay: getAnimationDelay(),
        ...getTextShadow(comment.type),
      }}
    >
      <span
        className={`
          inline-block px-2 py-1 rounded-md
          ${
            comment.type === "excited"
              ? "bg-black bg-opacity-30 backdrop-blur-sm"
              : "bg-gray-900 bg-opacity-20"
          }
        `}
      >
        {comment.text}
      </span>
    </div>
  );
});

Comment.displayName = "Comment";

export default Comment;
