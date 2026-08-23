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
  about: "About", guide: "How to use", printGuide: "Print guide", tagline: "Dress up your digicam ✦", share: "Share on X", shareText: "I made a skin for {camera} with KISEKAME!", headerDescription: "Create, preview, and print custom dress-up sheets at actual size for supported PENTAX Optio cameras—right in your browser.", supportedCameras: "Supported models",
  light: "Light", dark: "Dark", switchToDark: "Switch to dark mode", switchToLight: "Switch to light mode", camera: "Camera", paperSize: "Paper Size", skins: "Skins", pages: "pages", page: "Page", columns: "columns", rows: "rows", rotated: "rotated 90°",
  selectedSkin: "Selected Skin", skin: "Skin", blankSkin: "Blank skin", randomize: "Randomize", randomizeAll: "Shuffle", color: "Color", solid: "Solid", pattern: "Pattern", upload: "Upload",
  patternColor: "Pattern", background: "Background", scale: "Scale", repeat: "Repeat artwork", printExport: "Get Free Skin",
  previews: "Skin previews", selected: "Selected", addSkin: "Add", close: "Close", customColor: "Custom color", comingSoon: "coming soon",
  modalGuide: "KISEKAME GUIDE", aboutTitle: "About KISEKAME", cameraTitle: "Supported cameras", guideTitle: "How to use & print",
  aboutBody: "KISEKAME is a browser-based skin designer for the PENTAX Optio RS1500, RS1000, and LS465. Mix colors, playful patterns, and your own artwork to make printable camera skins for supported models.",
  aboutStrong: "Completely free and ad-free.", aboutCallout: "The creator is an engineer who owns an Optio RS1500 and originally built KISEKAME as a quick tool for personal use. It is kept free and ad-free so anyone can enjoy it just as easily.",
  nameOriginTitle: "Why “Kisekame”?", nameOriginBody: "The name comes from the Japanese phrase 着せ替えカメラ (kisekae camera), meaning a camera that can change its outfit. Kisekame combines that idea into one short name.",
  ossTitle: "Open source", ossBody: "KISEKAME is open-source software. You can view the source code, report issues, and contribute improvements on GitHub.",
  creator: "Created by", repository: "Source repository", github: "GitHub", twitter: "X / Twitter",
  cameraBody: "KISEKAME supports PENTAX Optio cameras with interchangeable dress-up sheets. Choose a model below to view its official resources.", supported: "Supported",
  rs1500Body: "The original KISEKAME camera, with a replaceable front dress-up sheet.", rs1500Specs: "Skin size: 83.65 × 53.35 mm",
  rs1000Body: "A compact camera with a transparent acrylic front panel for inserting a custom sheet.", rs1000Specs: "Skin size: 89 × 53 mm",
  ls465Body: "A slim compact camera that supports interchangeable dress-up sheets.", ls465Specs: "Skin size: 81.3 × 43.63 mm",
  productInfo: "Official product information", skinResources: "Official dress-up sheets",
  rs1500English: "RS1500 product page — English", rs1500Japanese: "RS1500 product page — Japanese",
  sheetCollection: "RS1500 sheet collection", gloomySheets: "GLOOMY collaboration sheets", galsSheets: "Gal’s♥PENTAX collaboration sheets",
  rs1000English: "RS1000 product page — English", rs1000Japanese: "RS1000 product page — Japanese", rs1000SheetCollection: "RS1000 sheet collection", rs1000CollaborationSheets: "Creator collaboration sheets",
  ls465English: "LS465 product page — English", ls465Japanese: "LS465 product page — Japanese", ls465SheetCollection: "LS465 sheet collection",
  step1Title: "Pick a skin", step1Body: "Select any preview you want to edit.", step2Title: "Choose a look", step2Body: "Use a color, customize a pattern, upload artwork, or press Randomize.",
  step3Title: "Adjust it", step3Body: "Drag the artwork and use Scale until the crop feels right.", step4Title: "Get your skin", step4Body: "Select Get Free Skin to check the finished sheet and save it as a PDF.",
  guidePrintTitle: "Printing accurately",
  printBody: "Print at 100% or “Actual size.” Turn off “Fit to page” so the cutting size stays accurate.",
  printTip1: "① Use your selected paper size", printTip2: "② Print at actual size", printTip3: "③ Cut along the outline", printTip4: "④ Check the fit before attaching",
  uploadLabel: "Upload image", dropHere: "Drop images here", dragDrop: "Drag & drop JPEG, PNG, WebP, or HEIC",
};

const ja = {
  about: "KISEKAMEについて", guide: "使い方", printGuide: "印刷ガイド", tagline: "デジカメを着せ替えよう ✦", share: "Twitterでシェア", shareText: "KISEKAMEで{camera}用のカメラスキンを作りました！", headerDescription: "PENTAX Optio対応モデルの着せ替えシートをブラウザで自由にデザインし、実寸サイズで印刷できます。", supportedCameras: "対応機種",
  light: "ライト", dark: "ダーク", switchToDark: "ダークモードに切り替え", switchToLight: "ライトモードに切り替え", camera: "カメラ", paperSize: "用紙サイズ", skins: "スキン", pages: "ページ", page: "Page", columns: "列", rows: "行", rotated: "90°回転",
  selectedSkin: "選択中のスキン", skin: "スキン", blankSkin: "無地のスキン", randomize: "ランダム", randomizeAll: "シャッフル", color: "カラー", solid: "無地", pattern: "パターン", upload: "アップロード",
  patternColor: "パターン", background: "背景", scale: "拡大率", repeat: "画像を繰り返す", printExport: "FREE スキンをGET",
  previews: "スキンプレビュー", selected: "選択中", addSkin: "追加", close: "閉じる", customColor: "カスタムカラー", comingSoon: "準備中",
  modalGuide: "KISEKAME ガイド", aboutTitle: "KISEKAMEについて", cameraTitle: "対応カメラ", guideTitle: "使い方・印刷ガイド",
  aboutBody: "KISEKAMEは、PENTAX Optio RS1500・RS1000・LS465用のスキンをブラウザでデザインできるサービスです。カラーやパターン、自分の画像を組み合わせて、対応機種の印刷用スキンを作れます。",
  aboutStrong: "完全無料・広告なしで利用できます。", aboutCallout: "作者はOptio RS1500を愛用するエンジニアで、自分用のツールとしてサクッと作ったのがKISEKAMEの始まりです。誰でも気軽に使えるよう、無料・広告なしで公開しています。",
  nameOriginTitle: "Kisekameの名前の由来", nameOriginBody: "「着せ替えカメラ（きせかえカメラ）」を一つの短い名前にしたのがKisekameです。服を選ぶように、カメラの見た目も自由に着せ替えるという意味を込めています。",
  ossTitle: "オープンソース", ossBody: "KISEKAMEはオープンソースソフトウェアです。ソースコードの閲覧、不具合の報告、改善への参加はGitHubから行えます。",
  creator: "作成者", repository: "ソースリポジトリ", github: "GitHub", twitter: "X / Twitter",
  cameraBody: "KISEKAMEは、着せ替え用シートに対応したPENTAX Optioシリーズをサポートしています。各機種の公式情報・配布素材はこちらから確認できます。", supported: "対応済み",
  rs1500Body: "KISEKAMEが最初に対応した、前面シートを交換できるモデルです。", rs1500Specs: "スキンサイズ：83.65 × 53.35 mm",
  rs1000Body: "透明アクリル製フロントパネルに好みのシートを挟めるコンパクトカメラです。", rs1000Specs: "スキンサイズ：89 × 53 mm",
  ls465Body: "着せ替え用シートに対応したスリムなコンパクトカメラです。", ls465Specs: "スキンサイズ：81.3 × 43.63 mm",
  productInfo: "公式製品情報", skinResources: "公式着せ替えシート",
  rs1500English: "RS1500製品ページ（英語）", rs1500Japanese: "RS1500製品ページ（日本語）",
  sheetCollection: "RS1500用シートコレクション", gloomySheets: "GLOOMYコラボシート", galsSheets: "Gal’s♥PENTAXコラボシート",
  rs1000English: "RS1000製品ページ（英語）", rs1000Japanese: "RS1000製品ページ（日本語）", rs1000SheetCollection: "RS1000用シートコレクション", rs1000CollaborationSheets: "クリエイターコラボシート",
  ls465English: "LS465製品ページ（英語）", ls465Japanese: "LS465製品ページ（日本語）", ls465SheetCollection: "LS465用シートコレクション",
  step1Title: "スキンを選ぶ", step1Body: "編集したいプレビューを選択します。", step2Title: "デザインを選ぶ", step2Body: "カラー、パターン、画像アップロード、ランダムから選べます。",
  step3Title: "調整する", step3Body: "画像をドラッグし、拡大率で見え方を整えます。", step4Title: "スキンを保存する", step4Body: "「FREE スキンをGET」から完成イメージを確認し、そのままPDFで保存できます。",
  guidePrintTitle: "正確に印刷するには",
  printBody: "印刷倍率は100%または「実際のサイズ」を指定してください。「用紙に合わせる」はオフにするとカットサイズを正確に保てます。",
  printTip1: "① 選択したサイズの用紙を使用", printTip2: "② 実際のサイズで印刷", printTip3: "③ 外周線に沿ってカット", printTip4: "④ 貼る前にサイズを確認",
  uploadLabel: "画像をアップロード", dropHere: "ここに画像をドロップ", dragDrop: "JPEG、PNG、WebP、HEICをドラッグ＆ドロップ",
};

const ko = {
  about: "KISEKAME 소개", guide: "사용 방법", printGuide: "인쇄 가이드", tagline: "디지털카메라를 꾸며보세요 ✦", share: "X에 공유", shareText: "KISEKAME로 {camera}용 카메라 스킨을 만들었어요!", headerDescription: "지원되는 PENTAX Optio 모델의 드레스업 시트를 브라우저에서 자유롭게 디자인하고 실제 크기로 인쇄할 수 있습니다.", supportedCameras: "지원 모델",
  light: "라이트", dark: "다크", switchToDark: "다크 모드로 전환", switchToLight: "라이트 모드로 전환", camera: "카메라", paperSize: "용지 크기", skins: "스킨", pages: "페이지", page: "Page", columns: "열", rows: "행", rotated: "90° 회전",
  selectedSkin: "선택한 스킨", skin: "스킨", blankSkin: "빈 스킨", randomize: "랜덤", randomizeAll: "셔플", color: "컬러", solid: "단색", pattern: "패턴", upload: "업로드",
  patternColor: "패턴", background: "배경", scale: "크기", repeat: "이미지 반복", printExport: "무료 스킨 받기",
  previews: "스킨 미리보기", selected: "선택됨", addSkin: "추가", close: "닫기", customColor: "사용자 컬러", comingSoon: "준비 중",
  modalGuide: "KISEKAME 가이드", aboutTitle: "KISEKAME 소개", cameraTitle: "지원 카메라", guideTitle: "사용 및 인쇄 방법",
  aboutBody: "KISEKAME는 PENTAX Optio RS1500, RS1000, LS465용 스킨을 브라우저에서 디자인하는 서비스입니다. 컬러, 패턴, 직접 올린 이미지를 조합해 지원 모델의 인쇄용 카메라 스킨을 만들 수 있습니다.",
  aboutStrong: "완전 무료이며 광고가 없습니다.", aboutCallout: "제작자는 Optio RS1500을 소유한 엔지니어로, 개인적으로 쓸 간단한 도구가 필요해 KISEKAME를 만들었습니다. 누구나 부담 없이 즐길 수 있도록 무료·무광고로 공개하고 있습니다.",
  nameOriginTitle: "왜 ‘Kisekame’인가요?", nameOriginBody: "이 이름은 옷을 갈아입듯 카메라를 꾸민다는 뜻의 일본어 着せ替えカメラ(kisekae camera)에서 왔습니다. Kisekame는 그 아이디어를 하나의 짧은 이름으로 담았습니다.",
  ossTitle: "오픈 소스", ossBody: "KISEKAME는 오픈 소스 소프트웨어입니다. GitHub에서 소스 코드를 확인하고, 문제를 제보하거나 개선에 참여할 수 있습니다.",
  creator: "만든 사람", repository: "소스 저장소", github: "GitHub", twitter: "X / Twitter",
  cameraBody: "KISEKAME는 교체형 드레스업 시트를 사용하는 PENTAX Optio 카메라를 지원합니다. 아래에서 모델별 공식 자료를 확인하세요.", supported: "지원됨",
  rs1500Body: "KISEKAME가 처음 지원한 교체형 전면 시트 카메라입니다.", rs1500Specs: "스킨 크기: 83.65 × 53.35 mm",
  rs1000Body: "투명 아크릴 전면 패널에 원하는 시트를 넣을 수 있는 콤팩트 카메라입니다.", rs1000Specs: "스킨 크기: 89 × 53 mm",
  ls465Body: "교체형 드레스업 시트를 지원하는 슬림 콤팩트 카메라입니다.", ls465Specs: "스킨 크기: 81.3 × 43.63 mm",
  productInfo: "공식 제품 정보", skinResources: "공식 꾸미기 시트",
  rs1500English: "RS1500 제품 페이지 — 영어", rs1500Japanese: "RS1500 제품 페이지 — 일본어",
  sheetCollection: "RS1500 시트 컬렉션", gloomySheets: "GLOOMY 컬래버레이션 시트", galsSheets: "Gal’s♥PENTAX 컬래버레이션 시트",
  rs1000English: "RS1000 제품 페이지 — 영어", rs1000Japanese: "RS1000 제품 페이지 — 일본어", rs1000SheetCollection: "RS1000 시트 컬렉션", rs1000CollaborationSheets: "크리에이터 컬래버레이션 시트",
  ls465English: "LS465 제품 페이지 — 영어", ls465Japanese: "LS465 제품 페이지 — 일본어", ls465SheetCollection: "LS465 시트 컬렉션",
  step1Title: "스킨 선택", step1Body: "편집할 미리보기를 선택하세요.", step2Title: "디자인 선택", step2Body: "컬러, 패턴, 이미지 업로드 또는 랜덤 기능을 사용하세요.",
  step3Title: "조정", step3Body: "이미지를 드래그하고 크기를 조절해 원하는 구도를 만드세요.", step4Title: "스킨 저장", step4Body: "‘무료 스킨 받기’를 눌러 완성된 시트를 확인하고 바로 PDF로 저장할 수 있습니다.",
  guidePrintTitle: "정확하게 인쇄하기",
  printBody: "인쇄 배율을 100% 또는 ‘실제 크기’로 설정하세요. 정확한 재단 크기를 위해 ‘페이지에 맞춤’을 끄세요.",
  printTip1: "① 선택한 크기의 용지 사용", printTip2: "② 실제 크기로 인쇄", printTip3: "③ 외곽선을 따라 자르기", printTip4: "④ 부착 전에 크기 확인",
  uploadLabel: "이미지 업로드", dropHere: "여기에 이미지를 놓으세요", dragDrop: "JPEG, PNG, WebP 또는 HEIC 드래그 앤 드롭",
};

export const TRANSLATIONS = { en, ja, ko };
