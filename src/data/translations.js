export const SUPPORTED_LANGUAGES = [
  { id: "en", label: "English" },
  { id: "ja", label: "日本語" },
  { id: "ko", label: "한국어" },
];

export const detectLanguage = () => {
  const saved = localStorage.getItem("kisekame-language");
  if (SUPPORTED_LANGUAGES.some((item) => item.id === saved)) return saved;
  const browserLanguage = (navigator.languages?.[0] ?? navigator.language ?? "en").toLowerCase();
  if (browserLanguage.startsWith("ja")) return "ja";
  if (browserLanguage.startsWith("ko")) return "ko";
  return "en";
};

const en = {
  about: "About", guide: "How to use", printGuide: "Print guide", tagline: "Dress up your digicam ✦",
  light: "Light", dark: "Dark", camera: "Camera", paperSize: "Paper Size", skins: "Skins", columns: "columns", rows: "rows", rotated: "rotated 90°",
  selectedSkin: "Selected Skin", skin: "Skin", blankSkin: "Blank skin", randomize: "Randomize", color: "Color", pattern: "Pattern", upload: "Upload",
  patternColor: "Pattern", background: "Background", scale: "Scale", repeat: "Repeat artwork", printExport: "Print / Export PDF",
  previews: "Skin previews", selected: "Selected", addSkin: "Add Skin", close: "Close", customColor: "Custom color",
  modalGuide: "KISEKAME GUIDE", aboutTitle: "About KISEKAME", guideTitle: "How to use", printTitle: "Print guide",
  aboutBody: "KISEKAME is a browser-based skin designer for the PENTAX Optio RS1500. Mix colors, playful patterns, and your own artwork to make a printable camera skin.",
  aboutStrong: "No design software needed.", aboutCallout: "Everything from arranging artwork to print layout happens on this screen.",
  creator: "Created by", repository: "Source repository", github: "GitHub", twitter: "X / Twitter",
  step1Title: "Pick a skin", step1Body: "Select any preview you want to edit.", step2Title: "Choose a look", step2Body: "Use a color, customize a pattern, upload artwork, or press Randomize.",
  step3Title: "Adjust it", step3Body: "Drag the artwork and use Scale until the crop feels right.", step4Title: "Print it", step4Body: "Open Print / Export PDF when your sheet is ready.",
  printBody: "Print at 100% or “Actual size.” Turn off “Fit to page” so the cutting size stays accurate.",
  printTip1: "① Use {paper} paper", printTip2: "② Print at actual size", printTip3: "③ Cut along the outline", printTip4: "④ Check the fit before attaching",
  uploadLabel: "Upload image", dropHere: "Drop images here", dragDrop: "Drag & drop JPEG, PNG, WebP, or HEIC",
};

const ja = {
  about: "KISEKAMEについて", guide: "使い方", printGuide: "印刷ガイド", tagline: "デジカメを着せ替えよう ✦",
  light: "ライト", dark: "ダーク", camera: "カメラ", paperSize: "用紙サイズ", skins: "スキン", columns: "列", rows: "行", rotated: "90°回転",
  selectedSkin: "選択中のスキン", skin: "スキン", blankSkin: "無地のスキン", randomize: "ランダム", color: "カラー", pattern: "パターン", upload: "アップロード",
  patternColor: "パターン", background: "背景", scale: "拡大率", repeat: "画像を繰り返す", printExport: "印刷 / PDF出力",
  previews: "スキンプレビュー", selected: "選択中", addSkin: "スキンを追加", close: "閉じる", customColor: "カスタムカラー",
  modalGuide: "KISEKAME ガイド", aboutTitle: "KISEKAMEについて", guideTitle: "使い方", printTitle: "印刷ガイド",
  aboutBody: "KISEKAMEは、PENTAX Optio RS1500用のスキンをブラウザでデザインできるサービスです。カラー、パターン、自分の画像を組み合わせて印刷用スキンを作れます。",
  aboutStrong: "デザインソフトは不要です。", aboutCallout: "画像の配置から印刷レイアウトまで、この画面だけで完成します。",
  creator: "作成者", repository: "ソースリポジトリ", github: "GitHub", twitter: "X / Twitter",
  step1Title: "スキンを選ぶ", step1Body: "編集したいプレビューを選択します。", step2Title: "デザインを選ぶ", step2Body: "カラー、パターン、画像アップロード、ランダムから選べます。",
  step3Title: "調整する", step3Body: "画像をドラッグし、拡大率で見え方を整えます。", step4Title: "印刷する", step4Body: "完成したら印刷 / PDF出力を開きます。",
  printBody: "印刷倍率は100%または「実際のサイズ」を指定してください。「用紙に合わせる」はオフにするとカットサイズを正確に保てます。",
  printTip1: "① {paper}用紙を使用", printTip2: "② 実際のサイズで印刷", printTip3: "③ 外周線に沿ってカット", printTip4: "④ 貼る前にサイズを確認",
  uploadLabel: "画像をアップロード", dropHere: "ここに画像をドロップ", dragDrop: "JPEG、PNG、WebP、HEICをドラッグ＆ドロップ",
};

const ko = {
  about: "KISEKAME 소개", guide: "사용 방법", printGuide: "인쇄 가이드", tagline: "디지털카메라를 꾸며보세요 ✦",
  light: "라이트", dark: "다크", camera: "카메라", paperSize: "용지 크기", skins: "스킨", columns: "열", rows: "행", rotated: "90° 회전",
  selectedSkin: "선택한 스킨", skin: "스킨", blankSkin: "빈 스킨", randomize: "랜덤", color: "컬러", pattern: "패턴", upload: "업로드",
  patternColor: "패턴", background: "배경", scale: "크기", repeat: "이미지 반복", printExport: "인쇄 / PDF 내보내기",
  previews: "스킨 미리보기", selected: "선택됨", addSkin: "스킨 추가", close: "닫기", customColor: "사용자 컬러",
  modalGuide: "KISEKAME 가이드", aboutTitle: "KISEKAME 소개", guideTitle: "사용 방법", printTitle: "인쇄 가이드",
  aboutBody: "KISEKAME는 PENTAX Optio RS1500용 스킨을 브라우저에서 디자인하는 서비스입니다. 컬러, 패턴, 직접 올린 이미지를 조합해 인쇄 가능한 카메라 스킨을 만들 수 있습니다.",
  aboutStrong: "디자인 프로그램이 필요 없습니다.", aboutCallout: "이미지 배치부터 인쇄 레이아웃까지 이 화면에서 모두 완성할 수 있습니다.",
  creator: "만든 사람", repository: "소스 저장소", github: "GitHub", twitter: "X / Twitter",
  step1Title: "스킨 선택", step1Body: "편집할 미리보기를 선택하세요.", step2Title: "디자인 선택", step2Body: "컬러, 패턴, 이미지 업로드 또는 랜덤 기능을 사용하세요.",
  step3Title: "조정", step3Body: "이미지를 드래그하고 크기를 조절해 원하는 구도를 만드세요.", step4Title: "인쇄", step4Body: "완성되면 인쇄 / PDF 내보내기를 여세요.",
  printBody: "인쇄 배율을 100% 또는 ‘실제 크기’로 설정하세요. 정확한 재단 크기를 위해 ‘페이지에 맞춤’을 끄세요.",
  printTip1: "① {paper} 용지 사용", printTip2: "② 실제 크기로 인쇄", printTip3: "③ 외곽선을 따라 자르기", printTip4: "④ 부착 전에 크기 확인",
  uploadLabel: "이미지 업로드", dropHere: "여기에 이미지를 놓으세요", dragDrop: "JPEG, PNG, WebP 또는 HEIC 드래그 앤 드롭",
};

export const TRANSLATIONS = { en, ja, ko };
