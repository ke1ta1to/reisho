import { Comment, MoodType, FontSize } from "@/types/comment";

// 熱血パリピコメントのテンプレート
const EXCITED_COMMENTS = [
  "ウェーーーイ！！！",
  "イエーーーイ！！！",
  "アゲアゲ↑↑↑",
  "パリピタイム！！",
  "フゥーーー！！",
  "ビリビリきてる！！",
  "MAX！MAX！MAX！",
  "ブチアガるうううう",
  "テンションMAXXX！！",
  "イケイケGOGO！",
  "ヤバすぎ最高潮！！",
  "ノリノリ〜〜〜",
  "ガンガンいこうぜ！",
  "フィーバー！！！",
  "エクスタシー！！",
  "ハイテンション！！",
  "ぶっ飛んでる！！",
  "ヒャッハー！！！",
  "FIRE！FIRE！",
  "バイブスやばい",
  "チャージMAX",
  "アドレナリン全開！",
  "ブーストON！！",
  "レッツパーリィ！",
  "エナジー充填！！",
  "サイコー！！！",
  "フルスロットル！",
  "ウルトラソウル！",
  "ビビッドきてる！",
  "イナズマ走る！！",
];

// 冷笑コメントのテンプレート
const CYNICAL_COMMENTS = [
  "おもんない",
  "つまらん",
  "だから何？",
  "しょーもな",
  "はぁ？",
  "くだらね",
  "これのどこが面白いの？",
  "で？",
  "うーん",
  "微妙...",
  "そうですか",
  "ふーん",
  "まあ、そうですね",
  "普通",
  "特に何も",
  "あっそ",
  "別に",
  "知らんがな",
  "どうでもいい",
  "無理",
  "見る価値ない",
  "つまんね",
  "あーはいはい",
  "で、それが？",
  "なんか微妙",
  "イマイチ",
  "ピンとこない",
  "興味ない",
  "スルーで",
  "まじどうでもいい",
];

// 色のパレット - ネオンカラー強化
const EXCITED_COLORS = [
  "#FF006E",
  "#FB5607",
  "#FFBE0B",
  "#8338EC",
  "#3A86FF",
  "#FF4365",
  "#00F5FF",
  "#00FF00",
  "#FF10F0",
  "#FFFF00",
  "#FF1744",
  "#D500F9",
  "#00E676",
  "#00BCD4",
  "#FFC400",
  "#F50057",
  "#651FFF",
  "#1DE9B6",
  "#FF6E40",
  "#C6FF00",
];

const CYNICAL_COLORS = [
  "#95A5A6",
  "#7F8C8D",
  "#BDC3C7",
  "#85929E",
  "#566573",
  "#5D6D7E",
  "#AEB6BF",
  "#D5DBDB",
  "#626567",
  "#99A3A4",
  "#CACFD2",
  "#808B96",
  "#717D7E",
  "#ABB2B9",
  "#A6ACAF",
];

// ランダムな値を生成するヘルパー関数
const getRandomItem = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
const getRandomNumber = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

// コメント生成関数
export const generateComment = (type: MoodType, id: string): Comment => {
  const isExcited = type === "excited";
  const commentTexts = isExcited ? EXCITED_COMMENTS : CYNICAL_COMMENTS;
  const colors = isExcited ? EXCITED_COLORS : CYNICAL_COLORS;

  // フォントサイズをランダムに選択（盛り上がりは大きめ、冷笑は小さめ傾向）
  const fontSizes: FontSize[] = isExcited
    ? ["small", "medium", "medium", "large"] // 大きめ重み付け
    : ["small", "small", "medium"]; // 小さめ重み付け

  return {
    id,
    text: getRandomItem(commentTexts),
    type,
    delay: getRandomNumber(0, isExcited ? 500 : 2000), // 熱血は即座に表示
    speed: getRandomNumber(isExcited ? 2 : 6, isExcited ? 4 : 10), // 熱血は超高速
    fontSize: getRandomItem(fontSizes),
    color: getRandomItem(colors),
    yPosition: getRandomNumber(5, 90), // 画面の5%～90%の位置（より広範囲）
  };
};

// 初期コメント生成
export const generateInitialComments = (
  type: MoodType,
  count?: number,
): Comment[] => {
  const defaultCount = type === "excited" ? 25 : 15; // 盛り上がり時はより多く
  const finalCount = count ?? defaultCount;

  return Array.from({ length: finalCount }, (_, index) =>
    generateComment(type, `${type}-${Date.now()}-${index}`),
  );
};

// 設定値
export const COMMENT_CONFIG = {
  EXCITED: {
    commentInterval: 80, // 80ms間隔で超激しい頻度
    maxVisibleComments: 70, // 画面を埋め尽くす
    animationDuration: 2500, // 高速化
  },
  CYNICAL: {
    commentInterval: 400, // 400ms間隔で中頻度（今の2倍）
    maxVisibleComments: 25, // 冷笑も倍増
    animationDuration: 8000,
  },
};
