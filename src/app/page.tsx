"use client";

import React, { useState, useCallback } from "react";
import CommentStream from "@/components/CommentStream";
import CynicalButton from "@/components/CynicalButton";
import BackgroundEffects from "@/components/BackgroundEffects";
import { MoodType } from "@/types/comment";

export default function Home() {
  const [currentMood, setCurrentMood] = useState<MoodType>("cynical");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMoodChange = useCallback(
    (newMood: MoodType) => {
      if (isTransitioning || newMood === currentMood) return;

      setIsTransitioning(true);

      // トランジション効果
      setTimeout(() => {
        setCurrentMood(newMood);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }, 300);
    },
    [currentMood, isTransitioning],
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景エフェクト */}
      <BackgroundEffects mood={currentMood} />

      {/* トランジション時のオーバーレイ */}
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300" />
      )}

      {/* コメントストリーム */}
      <CommentStream mood={currentMood} isActive={!isTransitioning} />

      {/* 冷笑ボタン */}
      <CynicalButton
        currentMood={currentMood}
        onMoodChange={handleMoodChange}
        disabled={isTransitioning}
      />

      {/* アプリタイトル（画面上部） */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-30">
        <h1
          className={`
            text-3xl font-bold transition-all duration-1000 text-center
            ${
              currentMood === "excited"
                ? "text-white drop-shadow-lg"
                : "text-gray-400 drop-shadow-sm"
            }
          `}
        >
          {currentMood === "excited" ? "熱血中！" : "冷笑モード"}
        </h1>
      </div>

      {/* 使い方の説明（画面下部） */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-center">
        <p
          className={`
            text-sm transition-all duration-1000
            ${currentMood === "excited" ? "text-white/80" : "text-gray-500"}
          `}
        >
          画面中央のボタンをクリックして雰囲気を変更
        </p>
      </div>

      {/* 構造化データ用の非表示コンテンツ */}
      <div className="sr-only">
        <h1>冷笑アプリ - ニコニコ風コメント流し体験</h1>
        <p>
          冷笑モードと熱血パリピモードを切り替えられるインタラクティブなコメント流しアプリです。
          ニコニコ動画のようにコメントが画面を流れ、ボタン一つで雰囲気が激変します。
          リアルタイムアニメーション、カラフルなエフェクト、レスポンシブデザインに対応。
        </p>
        <ul>
          <li>冷笑モード: 暗い背景に冷たいコメントが流れるモード</li>
          <li>
            熱血パリピモード: レインボー背景に激しいエフェクトとパリピなコメント
          </li>
          <li>ニコニコ動画風のコメント流しアニメーション</li>
          <li>リアルタイムエフェクト（紙吹雪、パーティクル、ネオングロウ）</li>
          <li>レスポンシブ対応でモバイルでも快適</li>
        </ul>
      </div>
    </div>
  );
}
