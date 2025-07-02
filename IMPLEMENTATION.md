# 冷笑アプリ実装設計書

## 概要

ニコニコ動画風のコメント流しアプリ。盛り上がり状態と冷笑状態を切り替え可能。

## 技術スタック

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4
- CSS Animations & Keyframes

## アーキテクチャ設計

### ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx (メインページ)
│   └── globals.css (グローバルスタイル + アニメーション)
├── components/
│   ├── CommentStream/
│   │   ├── index.tsx (メインコンポーネント)
│   │   └── Comment.tsx (個別コメント)
│   ├── CynicalButton/
│   │   └── index.tsx (冷笑ボタン)
│   └── BackgroundEffects/
│       └── index.tsx (背景エフェクト)
├── data/
│   └── comments.ts (コメントデータ)
└── types/
    └── comment.ts (型定義)
```

### 状態管理

- React useState による簡潔な状態管理
- モード: 'excited' | 'cynical'

### データ構造

```typescript
interface Comment {
  id: string;
  text: string;
  type: "excited" | "cynical";
  delay: number; // 表示遅延時間（ms）
  speed: number; // 流れる速度
  fontSize: "small" | "medium" | "large";
  color: string;
}
```

## 機能仕様

### 1. 盛り上がりモード

- **コメント内容**: 「すげー！」「最高！」「やばい！」「神回」「感動した」
- **視覚効果**:
  - 明るい背景グラデーション（虹色・キラキラ）
  - コメント色: 鮮やかな色（赤、青、黄、緑、ピンク）
  - サイズ: ランダム（小・中・大）
  - パーティクルエフェクト
  - アニメーション速度: 活発

### 2. 冷笑モード

- **コメント内容**: 「おもんない」「つまらん」「何これ」「だから何？」「しょーもな」
- **視覚効果**:
  - 暗い背景（グレー・黒基調）
  - コメント色: 冷たい色（グレー、青灰色、紫）
  - サイズ: 小さめ統一
  - 静的で陰鬱な雰囲気
  - アニメーション速度: 緩慢

### 3. 冷笑ボタン

- **デザイン**: ダークで洗練された外観
- **アニメーション**: ホバー時に冷笑的なエフェクト
- **配置**: 画面中央固定

## アニメーション仕様

### コメント流し

```css
@keyframes slideComment {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100px);
  }
}
```

### エフェクト

- **キラキラ**: CSS keyframes + random positioning
- **背景グラデーション**: 動的なCSS変数切り替え
- **コメント出現**: ランダムなY軸位置、時間差表示

## パフォーマンス最適化

- コメント要素の仮想化（大量表示時）
- アニメーション完了後のDOM削除
- CSS transform使用（GPU加速）
- メモ化によるリレンダリング抑制

## レスポンシブ対応

- モバイル: コメントサイズ調整、ボタン配置最適化
- タブレット: 中間サイズ対応
- デスクトップ: フル機能

## アクセシビリティ

- キーボード操作対応
- ハイコントラストモード考慮
- motion-reduce対応
