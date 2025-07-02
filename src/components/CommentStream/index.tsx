"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Comment from "./Comment";
import { Comment as CommentType, MoodType } from "@/types/comment";
import {
  generateComment,
  generateInitialComments,
  COMMENT_CONFIG,
} from "@/data/comments";

interface CommentStreamProps {
  mood: MoodType;
  isActive: boolean;
}

const CommentStream: React.FC<CommentStreamProps> = ({ mood, isActive }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentCounter, setCommentCounter] = useState(0);

  // 現在のムードの設定を取得
  const config = useMemo(() => {
    return mood === "excited" ? COMMENT_CONFIG.EXCITED : COMMENT_CONFIG.CYNICAL;
  }, [mood]);

  // コメント削除の処理
  const handleCommentEnd = useCallback((commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  }, []);

  // 新しいコメントを生成
  const generateNewComment = useCallback(() => {
    if (!isActive) return;

    const newComment = generateComment(
      mood,
      `${mood}-${Date.now()}-${commentCounter}`,
    );

    setComments((prev) => {
      // 最大表示数を超える場合は古いものを削除
      const updatedComments =
        prev.length >= config.maxVisibleComments ? prev.slice(1) : prev;

      return [...updatedComments, newComment];
    });

    setCommentCounter((prev) => prev + 1);
  }, [mood, commentCounter, config.maxVisibleComments, isActive]);

  // ムード変更時の初期化
  useEffect(() => {
    if (!isActive) {
      setComments([]);
      return;
    }

    // 既存のコメントをクリアして新しいムードのコメントを生成
    const initialComments = generateInitialComments(mood);
    setComments(initialComments);
    setCommentCounter(initialComments.length);
  }, [mood, isActive]);

  // コメント生成のインターバル設定
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(generateNewComment, config.commentInterval);

    return () => clearInterval(interval);
  }, [generateNewComment, config.commentInterval, isActive]);

  // パフォーマンス最適化：過度に多くのコメントを防ぐ
  useEffect(() => {
    const cleanup = setInterval(() => {
      setComments((prev) => {
        if (prev.length > config.maxVisibleComments * 1.2) {
          return prev.slice(-config.maxVisibleComments);
        }
        return prev;
      });
    }, 3000); // より頻繁にチェック

    return () => clearInterval(cleanup);
  }, [config.maxVisibleComments]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-30">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onAnimationEnd={handleCommentEnd}
        />
      ))}
      {/* デバッグ用：コメント数表示 */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded pointer-events-auto z-50">
          コメント数: {comments.length}
        </div>
      )}
    </div>
  );
};

export default CommentStream;
