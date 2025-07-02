export type MoodType = "excited" | "cynical";

export type FontSize = "small" | "medium" | "large";

export interface Comment {
  id: string;
  text: string;
  type: MoodType;
  delay: number; // 表示遅延時間（ms）
  speed: number; // 流れる速度（秒）
  fontSize: FontSize;
  color: string;
  yPosition: number; // Y軸位置（%）
  initialProgress?: number; // 初期進行度（0-1）
}

export interface CommentStreamConfig {
  commentInterval: number; // コメント生成間隔（ms）
  maxVisibleComments: number; // 同時表示最大数
  animationDuration: number; // アニメーション基本時間（ms）
}

export interface AppState {
  currentMood: MoodType;
  isTransitioning: boolean;
  comments: Comment[];
}

export interface BackgroundTheme {
  excited: {
    background: string;
    particles: boolean;
    gradientAnimation: boolean;
  };
  cynical: {
    background: string;
    particles: boolean;
    gradientAnimation: boolean;
  };
}
