const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const coffeeSteamVideo = document.getElementById('coffeeSteamVideo'); // 김 효과 비디오 요소

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// --- START: New variable and function for top offset calculation ---
let topOffset = 0;

function calculateTopOffset() {
  const topControlsElement = document.getElementById('topControls');
  if (topControlsElement) {
    topOffset = topControlsElement.offsetHeight;
  } else {
    topOffset = 0; // Default if element not found
  }
}
// Initial calculation attempt. More reliable calculation in startGame and resize.
calculateTopOffset();
// --- END: New variable and function for top offset calculation ---


window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  calculateTopOffset(); // Recalculate offset on resize
});

// --- START: 새로운 96개 영어 문장 ---
const sentences = [
  "What will we build with these big boxes?", // 1.txt
  "We will make a spaceship for our trip.", // 2.txt
  "When will they come to the backyard party?", // 3.txt
  "I will wear it because we fight monsters.", // 4.txt
  "When will they come to the backyard party?", // 5.txt
  "They will come right after their nap time.", // 6.txt
  "Where will you hide the birthday surprise gift?", // 7.txt
  "I will hide it under the big green slide.", // 8.txt
  "Who will bring the cake for the picnic today?", // 9.txt
  "My mom will bring it in her blue basket.", // 10.txt
  "How will we catch the tiny rainbow butterfly?", // 11.txt
  "We will use a net and be very gentle.", // 12.txt
  "What won’t you share from your lunchbox today?", // 13.txt
  "I won’t share my jelly because it’s special.", // 14.txt
  "Why won’t your sister play tag with us?", // 15.txt
  "She won’t play because she feels too sleepy.", // 16.txt
  "When won’t we have to clean our playroom?", // 17.txt
  "We won’t clean it if it's already tidy.", // 18.txt
  "Where won’t we be allowed to bring snacks?", // 19.txt
  "We won’t bring them into the library room.", // 20.txt
  "Who won’t join us at the zoo tomorrow?", // 21.txt
  "Grandpa won’t join us because of his knee.", // 22.txt
  "How won’t the toy car break again soon?", // 23.txt
  "It won’t break if we don’t crash it hard.", // 24.txt
  "What would you do with a flying carpet?", // 25.txt
  "I would fly to grandma’s house for cookies.", // 26.txt
  "Why would he cry after watching that movie?", // 27.txt
  "He would cry because the puppy got lost.", // 28.txt
  "When would we visit the underwater castle?", // 29.txt
  "We would visit it during our summer dream.", // 30.txt
  "Where would you go if you had fairy wings?", // 31.txt
  "I would fly to the rainbow island in sky.", // 32.txt
  "How would we talk to a tiny forest elf?", // 33.txt
  "We would whisper and use our magic ring.", // 34.txt
  "Who would help if our kite got stuck again?", // 35.txt
  "Dad would help us with his long stick.", // 36.txt
  "What wouldn’t you eat even if you were hungry?", // 37.txt
  "I wouldn’t eat broccoli ice cream, it’s yucky!", // 38.txt
  "Why wouldn’t your teddy bear come to tea time?", // 39.txt
  "He wouldn’t come because he was too sleepy.", // 40.txt
  "When wouldn’t we go outside to play together?", // 41.txt
  "We wouldn’t go if it started thunderstorming.", // 42.txt
  "Where wouldn’t you hide your secret treasure box?", // 43.txt
  "I wouldn’t hide it in the bathroom, too wet.", // 44.txt
  "How wouldn’t the snowman melt so quickly today?", // 45.txt
  "He wouldn’t melt if we built him in shade.", // 46.txt
  "Who wouldn’t laugh at your funny dance moves?", // 47.txt
  "Even the teacher wouldn’t stop laughing today.", // 48.txt
  "What can you do with this shiny rock?", // 49.txt
  "I can make it my secret magic stone.", // 50.txt
  "Why can we not play outside right now?", // 51.txt
  "It is raining and Mommy said it’s muddy.", // 52.txt
  "When can I see your new puppy again?", // 53.txt
  "You can come over after lunch tomorrow.", // 54.txt
  "Where can we hide from the space aliens?", // 55.txt
  "We can hide behind the big backyard tree.", // 56.txt
  "Who can help me fix my toy robot?", // 57.txt
  "My dad can fix it after his dinner.", // 58.txt
  "How can you jump so high like that?", // 59.txt
  "I practiced every day on my trampoline.", // 60.txt
  "What can’t you eat before dinner time?", // 61.txt
  "I can’t eat cookies before dinner time.", // 62.txt
  "Why can’t you open the cookie jar?", // 63.txt
  "I can’t open it because it’s locked tight.", // 64.txt
  "When can’t we go into the kitchen?", // 65.txt
  "We can’t go there when Mom is cooking.", // 66.txt
  "Where can’t he hide the cookie crumbs?", // 67.txt
  "He can’t hide them under the couch again.", // 68.txt
  "Who can’t keep the cookie secret long?", // 69.txt
  "She can’t keep secrets longer than two hours.", // 70.txt
  "How can’t they hear the cookie crunch?", // 71.txt
  "They can’t hear it with cartoons playing loudly.", // 72.txt
  "What could you find under the big bed?", // 73.txt
  "I could find my teddy bear under there.", // 74.txt
  "Why could he be hiding from us now?", // 75.txt
  "He could be scared of the vacuum cleaner noise.", // 76.txt
  "When could we start looking for him?", // 77.txt
  "We could start right after our afternoon snack.", // 78.txt
  "Where could it have gone last night?", // 79.txt
  "It could have rolled behind the toy chest.", // 80.txt
  "Who could have taken it to the garden?", // 81.txt
  "You could have taken it while playing outside.", // 82.txt
  "How could we bring him back safely?", // 83.txt
  "We could carry him in your superhero backpack.", // 84.txt
  "What couldn’t we play with in the rain?", // 85.txt
  "We couldn’t play with the paper kite outside.", // 86.txt
  "Why couldn’t you come to my puppet show?", // 87.txt
  "I couldn’t come because my boots were missing.", // 88.txt
  "When couldn’t they start the backyard race?", // 89.txt
  "They couldn’t start when the thunder was loud.", // 90.txt
  "Where couldn’t she set up her lemonade stand?", // 91.txt
  "She couldn’t set it up under the dripping tree.", // 92.txt
  "Who couldn’t join us for the snack picnic?", // 93.txt
  "He couldn’t join us because he caught a cold.", // 94.txt
  "How couldn’t we keep our socks from getting wet?", // 95.txt
  "We couldn’t keep them dry without rain boots on." // 96.txt
];
// --- END: 새로운 96개 영어 문장 ---

// --- START: 새로운 96개 한국어 번역 (자리 표시자) ---
const translations = [
  "이 큰 상자들로 무엇을 만들 건가요?", // 1.txt 번역 예시
  "우리는 여행을 위한 우주선을 만들 거예요.", // 2.txt 번역 예시
  "그들은 언제 뒷마당 파티에 올 건가요?", // 3.txt 번역 예시
  "우리가 괴물과 싸우니까 그걸 입을 거예요.", // 4.txt 번역 예시
  "그들은 언제 뒷마당 파티에 올 건가요?", // 5.txt 번역 예시
  "낮잠 시간 바로 후에 올 거예요.", // 6.txt 번역 예시
  "생일 깜짝 선물은 어디에 숨길 건가요?", // 7.txt 번역 예시
  "큰 초록색 미끄럼틀 아래에 숨길 거예요.", // 8.txt 번역 예시
  "오늘 소풍에 누가 케이크를 가져올 건가요?", // 9.txt 번역 예시
  "엄마가 파란 바구니에 담아 가져오실 거예요.", // 10.txt 번역 예시
  "작은 무지개 나비는 어떻게 잡을 건가요?", // 11.txt 번역 예시
  "그물을 사용하고 아주 부드럽게 다룰 거예요.", // 12.txt 번역 예시
  "오늘 점심 도시락에서 무엇을 나눠주지 않을 건가요?", // 13.txt 번역 예시
  "내 젤리는 특별해서 나눠주지 않을 거예요.", // 14.txt 번역 예시
  "언니는 왜 우리랑 술래잡기를 안 하나요?", // 15.txt 번역 예시
  "너무 졸려서 안 할 거예요.", // 16.txt 번역 예시
  "언제 놀이방 청소를 안 해도 되나요?", // 17.txt 번역 예시
  "이미 깨끗하면 청소 안 할 거예요.", // 18.txt 번역 예시
  "어디에 간식을 가져가면 안 되나요?", // 19.txt 번역 예시
  "도서관에는 가져가지 않을 거예요.", // 20.txt 번역 예시
  "내일 동물원에 누가 같이 안 가나요?", // 21.txt 번역 예시
  "할아버지는 무릎 때문에 같이 안 가실 거예요.", // 22.txt 번역 예시
  "장난감 자동차가 어떻게 하면 곧 다시 고장 나지 않을까요?", // 23.txt 번역 예시
  "세게 부딪치지 않으면 고장 나지 않을 거예요.", // 24.txt 번역 예시
  "하늘을 나는 양탄자가 있다면 무엇을 할 건가요?", // 25.txt 번역 예시
  "할머니 댁에 쿠키 먹으러 날아갈 거예요.", // 26.txt 번역 예시
  "그는 왜 그 영화를 보고 울었을까요?", // 27.txt 번역 예시
  "강아지를 잃어버려서 울었을 거예요.", // 28.txt 번역 예시
  "언제 수중 성을 방문할 건가요?", // 29.txt 번역 예시
  "여름 꿈속에서 방문할 거예요.", // 30.txt 번역 예시
  "요정 날개가 있다면 어디로 갈 건가요?", // 31.txt 번역 예시
  "하늘에 있는 무지개 섬으로 날아갈 거예요.", // 32.txt 번역 예시
  "작은 숲 속 요정과 어떻게 이야기할 건가요?", // 33.txt 번역 예시
  "속삭이고 마법 반지를 사용할 거예요.", // 34.txt 번역 예시
  "연이 다시 걸리면 누가 도와줄까요?", // 35.txt 번역 예시
  "아빠가 긴 막대기로 도와주실 거예요.", // 36.txt 번역 예시
  "배가 고파도 절대 먹지 않을 것은 무엇인가요?", // 37.txt 번역 예시
  "브로콜리 아이스크림은 안 먹을 거예요, 맛없어요!", // 38.txt 번역 예시
  "곰 인형은 왜 티타임에 오지 않았나요?", // 39.txt 번역 예시
  "너무 졸려서 오지 않았을 거예요.", // 40.txt 번역 예시
  "언제 밖에 나가서 같이 놀지 않을 건가요?", // 41.txt 번역 예시
  "천둥 번개가 치기 시작하면 안 나갈 거예요.", // 42.txt 번역 예시
  "비밀 보물 상자를 어디에 숨기지 않을 건가요?", // 43.txt 번역 예시
  "화장실에는 숨기지 않을 거예요, 너무 축축해요.", // 44.txt 번역 예시
  "눈사람이 오늘 어떻게 하면 빨리 녹지 않을까요?", // 45.txt 번역 예시
  "그늘에 만들면 녹지 않을 거예요.", // 46.txt 번역 예시
  "누가 당신의 웃긴 춤 동작을 보고 웃지 않을까요?", // 47.txt 번역 예시
  "선생님조차도 오늘 웃음을 멈추지 못했을 거예요.", // 48.txt 번역 예시
  "이 반짝이는 돌로 무엇을 할 수 있나요?", // 49.txt 번역 예시
  "나의 비밀 마법 돌로 만들 수 있어요.", // 50.txt 번역 예시
  "왜 지금 밖에 나가서 놀 수 없나요?", // 51.txt 번역 예시
  "비가 오고 엄마가 진흙탕이라고 하셨어요.", // 52.txt 번역 예시
  "언제 새 강아지를 다시 볼 수 있나요?", // 53.txt 번역 예시
  "내일 점심 먹고 놀러 와도 돼요.", // 54.txt 번역 예시
  "우주 외계인으로부터 어디에 숨을 수 있나요?", // 55.txt 번역 예시
  "뒷마당 큰 나무 뒤에 숨을 수 있어요.", // 56.txt 번역 예시
  "누가 내 장난감 로봇 고치는 것을 도와줄 수 있나요?", // 57.txt 번역 예시
  "아빠가 저녁 식사 후에 고쳐주실 수 있어요.", // 58.txt 번역 예시
  "어떻게 그렇게 높이 뛸 수 있나요?", // 59.txt 번역 예시
  "매일 트램펄린에서 연습했어요.", // 60.txt 번역 예시
  "저녁 식사 전에 무엇을 먹으면 안 되나요?", // 61.txt 번역 예시
  "저녁 식사 전에는 쿠키를 먹을 수 없어요.", // 62.txt 번역 예시
  "왜 쿠키 단지를 열 수 없나요?", // 63.txt 번역 예시
  "단단히 잠겨 있어서 열 수 없어요.", // 64.txt 번역 예시
  "언제 부엌에 들어가면 안 되나요?", // 65.txt 번역 예시
  "엄마가 요리하실 때는 거기에 가면 안 돼요.", // 66.txt 번역 예시
  "그는 쿠키 부스러기를 어디에 숨길 수 없나요?", // 67.txt 번역 예시
  "소파 밑에는 다시 숨길 수 없을 거예요.", // 68.txt 번역 예시
  "누가 쿠키 비밀을 오래 지키지 못하나요?", // 69.txt 번역 예시
  "그녀는 두 시간 이상 비밀을 지키지 못해요.", // 70.txt 번역 예시
  "그들은 어떻게 쿠키 바삭거리는 소리를 듣지 못할까요?", // 71.txt 번역 예시
  "만화가 시끄럽게 틀어져 있어서 듣지 못해요.", // 72.txt 번역 예시
  "큰 침대 밑에서 무엇을 찾을 수 있었나요?", // 73.txt 번역 예시
  "거기서 내 곰 인형을 찾을 수 있었어요.", // 74.txt 번역 예시
  "그는 왜 지금 우리에게서 숨어 있을까요?", // 75.txt 번역 예시
  "진공청소기 소리를 무서워할 수도 있어요.", // 76.txt 번역 예시
  "언제 그를 찾기 시작할 수 있을까요?", // 77.txt 번역 예시
  "오후 간식 먹고 바로 시작할 수 있어요.", // 78.txt 번역 예시
  "어젯밤에 그것은 어디로 갔을까요?", // 79.txt 번역 예시
  "장난감 상자 뒤로 굴러갔을 수도 있어요.", // 80.txt 번역 예시
  "누가 그것을 정원으로 가져갔을까요?", // 81.txt 번역 예시
  "밖에서 놀다가 네가 가져갔을 수도 있어.", // 82.txt 번역 예시
  "어떻게 그를 안전하게 데려올 수 있을까요?", // 83.txt 번역 예시
  "너의 슈퍼히어로 배낭에 넣어 데려올 수 있어.", // 84.txt 번역 예시
  "비 오는 날에는 무엇을 가지고 놀 수 없었나요?", // 85.txt 번역 예시
  "종이 연은 밖에서 가지고 놀 수 없었어요.", // 86.txt 번역 예시
  "왜 내 인형극에 오지 못했나요?", // 87.txt 번역 예시
  "장화가 없어져서 오지 못했어요.", // 88.txt 번역 예시
  "언제 그들은 뒷마당 경주를 시작할 수 없었나요?", // 89.txt 번역 예시
  "천둥소리가 클 때는 시작할 수 없었어요.", // 90.txt 번역 예시
  "그녀는 레모네이드 가판대를 어디에 설치할 수 없었나요?", // 91.txt 번역 예시
  "물이 뚝뚝 떨어지는 나무 아래에는 설치할 수 없었어요.", // 92.txt 번역 예시
  "누가 간식 소풍에 우리와 함께하지 못했나요?", // 93.txt 번역 예시
  "그는 감기에 걸려서 우리와 함께하지 못했어요.", // 94.txt 번역 예시
  "양말이 젖지 않게 하려면 어떻게 해야 했을까요?", // 95.txt 번역 예시
  "장화를 신지 않고는 마른 상태로 유지할 수 없었어요." // 96.txt
];
// --- END: 새로운 96개 한국어 번역 ---


let sentenceIndex = Number(localStorage.getItem('sentenceIndex') || 0);
sentenceIndex = sentenceIndex % sentences.length; // Ensure it's within bounds

const playerImg = new Image();
playerImg.src = 'images/player.png';

const enemyImgs = [
  'images/enemy1.png',
  'images/enemy2.png',
  'images/enemy3.png',
  'images/enemy4.png',
  'images/enemy5.png'
].map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

const bgmFiles = [
  'sounds/background.mp3',
  'sounds/background1.mp3',
  'sounds/background2.mp3',
  'sounds/background3.mp3'
];
let bgmIndex = 0;
let bgmAudio = new Audio(bgmFiles[bgmIndex]);
bgmAudio.volume = 0.05;
bgmAudio.loop = false;

const volumeBtn = document.getElementById('volumeBtn');
let isMuted = false;
function updateVolumeIcon() {
  volumeBtn.textContent = isMuted ? "🔇" : "🔊";
}

// --- START: 문장 오디오 재생을 위한 변수 및 함수 ---
let currentSentenceAudio = null;

async function playSentenceAudio(index) {
  return new Promise((resolve, reject) => {
    if (currentSentenceAudio) {
      currentSentenceAudio.pause();
      currentSentenceAudio.currentTime = 0;
      currentSentenceAudio.onended = null;
      currentSentenceAudio.onerror = null;
    }

    const audioFilePath = `sounds/96_audio/${index + 1}.mp3`;
    currentSentenceAudio = new Audio(audioFilePath);
    currentSentenceAudio.volume = isMuted ? 0 : 0.8;

    currentSentenceAudio.onended = () => {
      currentSentenceAudio = null;
      resolve();
    };
    currentSentenceAudio.onerror = (e) => {
      console.error(`Error playing sentence audio: ${audioFilePath}`, e);
      currentSentenceAudio = null;
      reject(e);
    };

    currentSentenceAudio.play().catch(e => {
      console.error(`Failed to play ${audioFilePath}`, e);
      currentSentenceAudio = null;
      reject(e);
    });
  });
}
// --- END: 문장 오디오 재생을 위한 변수 및 함수 ---


volumeBtn.onclick = function () {
  isMuted = !isMuted;
  bgmAudio.volume = isMuted ? 0 : 0.05;
  if (currentSentenceAudio) {
      currentSentenceAudio.volume = isMuted ? 0 : 0.8;
  }
  updateVolumeIcon();
};
updateVolumeIcon();

function playNextBgm() {
  bgmAudio.removeEventListener('ended', playNextBgm);
  bgmIndex = (bgmIndex + 1) % bgmFiles.length;
  bgmAudio = new Audio(bgmFiles[bgmIndex]);
  bgmAudio.volume = isMuted ? 0 : 0.05;
  bgmAudio.loop = false;
  bgmAudio.addEventListener('ended', playNextBgm);
  bgmAudio.play();
}
bgmAudio.addEventListener('ended', playNextBgm);

const sounds = {
  shoot: new Audio('sounds/shoot.mp3'),
  explosion: new Audio('sounds/explosion.mp3')
};
sounds.shoot.volume = 0.05;
sounds.explosion.volume = 0.05;

setInterval(() => {
  if (bgmAudio && bgmAudio.volume !== (isMuted ? 0 : 0.05)) {
    bgmAudio.volume = isMuted ? 0 : 0.05;
  }
  if (currentSentenceAudio && currentSentenceAudio.volume !== (isMuted ? 0 : 0.8)) {
    currentSentenceAudio.volume = isMuted ? 0 : 0.8;
  }
}, 1000);


// Asset 로딩 관리
let allAssetsReady = false;
let assetsToLoad = 1 + enemyImgs.length;
let loadedAssetCount = 0;
let coffeeVideoAssetReady = false;

function assetLoaded() {
  loadedAssetCount++;
  checkAllAssetsReady();
}

function coffeeVideoReady() {
  if (!coffeeVideoAssetReady) {
    coffeeVideoAssetReady = true;
    checkAllAssetsReady();
  }
}

function coffeeVideoError() {
  if (!coffeeVideoAssetReady) {
    console.error("Coffee steam video could not be loaded. Steam effect will be disabled.");
    coffeeVideoAssetReady = true;
    checkAllAssetsReady();
  }
}

function checkAllAssetsReady() {
  if (loadedAssetCount >= assetsToLoad && coffeeVideoAssetReady) {
    allAssetsReady = true;
    console.log("All game assets (images and video) are ready.");
  }
}

playerImg.onload = assetLoaded;
playerImg.onerror = () => { console.error("Failed to load player image."); assetLoaded(); };

enemyImgs.forEach(img => {
  img.onload = assetLoaded;
  img.onerror = () => { console.error(`Failed to load enemy image: ${img.src}`); assetLoaded(); };
});

if (coffeeSteamVideo) {
  coffeeSteamVideo.oncanplaythrough = coffeeVideoReady;
  coffeeSteamVideo.onerror = coffeeVideoError;
  if (coffeeSteamVideo.readyState >= HTMLVideoElement.HAVE_ENOUGH_DATA) coffeeVideoReady();
  else if (coffeeSteamVideo.error) coffeeVideoError();
} else {
  console.warn("coffeeSteamVideo element not found in HTML. Assuming ready without steam effect.");
  coffeeVideoAssetReady = true;
  checkAllAssetsReady();
}


const PLAYER_SIZE = 50;
const ENEMY_SIZE = 40;
const SENTENCE_VERTICAL_ADJUSTMENT = -60; // px, 질문 문장의 Y축 조정
const ANSWER_OFFSET_Y = 50; // 질문 문장 하단과 답변 문장 상단 사이의 간격
const LINE_HEIGHT = 30; // 문장 한 줄의 높이

let player = { x: 0, y: 0, w: PLAYER_SIZE, h: PLAYER_SIZE };
let bullets = [];
let enemies = [];
let enemyBullets = [];
let isGameRunning = false;
let isGamePaused = false;
let lastTime = 0;

const burstColors = [
  '#FF5252', '#FF9800', '#FFD600', '#4CAF50', '#2196F3',
  '#9C27B0', '#E040FB', '#00BCD4', '#FFEB3B', '#FF69B4'
];

let fireworks = null;
let fireworksState = null;

// --- START: Modified sentence variables ---
let currentQuestionSentence = null; // { line1, line2 }
let currentAnswerSentence = null;   // { line1, line2 }
let currentQuestionSentenceIndex = null; // 원본 sentences 배열에서의 인덱스
let currentAnswerSentenceIndex = null;   // 원본 sentences 배열에서의 인덱스
// --- END: Modified sentence variables ---

let centerAlpha = 1.0; // 문장 표시 알파 (공통으로 사용)
let sentenceActive = false; // 불꽃놀이 중인지 여부

let showPlayButton = false; // 답변 문장용 플레이 버튼
let playButtonRect = null;  // 답변 문장용 플레이 버튼 좌표
let showPlayButtonQuestion = false; // 질문 문장용 플레이 버튼
let playButtonRectQuestion = null; // 질문 문장용 플레이 버튼 좌표

let showTranslationForQuestion = false; 
let showTranslationForAnswer = false;   
let isActionLocked = false;

let centerSentenceWordRects = [];
let activeWordTranslation = null;
let wordTranslationTimeoutId = null;
const WORD_TRANSLATION_DURATION = 3000; // ms

const MODAL_AUX = [
  "can", "cant", "cannot", "could", "couldnt", "will", "would", "shall", "should",
  "may", "might", "must", "wont", "wouldnt", "shant", "shouldnt", "maynt", "mightnt", "mustnt"
];
const DO_AUX = [
  "do", "does", "did", "dont", "doesnt", "didnt"
];
const notVerbIng = [
  "morning", "evening", "everything", "anything", "nothing", "something",
  "building", "ceiling", "meeting", "feeling", "wedding", "clothing"
];

function isAux(word) {
  return MODAL_AUX.includes(word.toLowerCase()) || DO_AUX.includes(word.toLowerCase());
}
function isWh(word) {
  const whs = ["what","when","where","who","whom","whose","which","why","how"];
  return whs.includes(word.toLowerCase());
}
function isVerb(word) {
  const verbs = [
    "build", "make", "come", "wear", "fight", "hide", "bring", "catch", "use", "share", "play", "feel", "clean",
    "allowed", "join", "break", "crash", "do", "fly", "cry", "got", "lost", "visit", "talk", "help", "stuck", "eat",
    "go", "melt", "laugh", "can", "see", "fix", "jump", "practiced", "open", "hear", "find", "hiding", "start",
    "taken", "rolled", "bring", "carry", /* removed "couldn't" */ "set", "keep" // Base verbs only
  ];
  const lowerWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (lowerWord === "bringback") return true; // Special case for "bring back"
  if (lowerWord === "setup") return true; // Special case for "set up"
  return verbs.some(v => lowerWord === v || lowerWord.startsWith(v));
}
function isVing(word) {
  let lw = word.toLowerCase().replace(/[^a-z0-9]/g, ''); // Cleaned word for -ing check
  if (notVerbIng.includes(lw)) return false;
  if (lw.endsWith('ing') && lw.length > 3) { // Ensure there's a base before "ing"
    let base = lw.slice(0, -3);
    // Simplified stemming for common cases
    if (base.endsWith('e') && !base.endsWith('ee') && base !== 'be' && base.length > 1) { // making -> make
        if(isVerb(base)) return true; // Check if 'mak' is a verb (it's not), then check 'make'
        if(isVerb(base + 'e')) return true; // Check 'make'
        if (base.endsWith('i')) { // tying -> tie
             base = base.slice(0, -1) + 'e';
        }
    } else if (base.length > 1 && base.charAt(base.length -1) === base.charAt(base.length-2) && !['ss','ll','ff','zz'].includes(base.slice(-2))) {
        base = base.slice(0,-1); // running -> run
    }
    return isVerb(base) || (base.endsWith('y') && isVerb(base.slice(0, -1) + 'ie')); // crying -> cry
  }
  return false;
}
function isBeen(word) {
  return word.toLowerCase().replace(/[^a-z0-9]/g, '') === 'been';
}
function isQuestion(sentenceText) {
  return sentenceText.trim().endsWith('?');
}

async function getWordTranslation(word, targetLang = 'ko') {
  const cleanedWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().trim(); 
  if (!cleanedWord) return "Error: Invalid word";
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
  const mockTranslations = {
      "what": "무엇", "will": "~할 것이다", "we": "우리는", "build": "짓다", "with": "~으로", "these": "이것들", "big": "큰", "boxes": "상자들",
      "make": "만들다", "a": "하나의", "spaceship": "우주선", "for": "~를 위해", "our": "우리의", "trip": "여행",
      "when": "언제", "they": "그들은", "come": "오다", "to": "~로", "the": "그", "backyard": "뒷마당", "party": "파티",
      "i": "나는", "wear": "입다", "it": "그것", "because": "왜냐하면", "fight": "싸우다", "monsters": "괴물들",
      "right": "바로", "after": "~후에", "their": "그들의", "nap": "낮잠", "time": "시간",
      "where": "어디에", "you": "너는", "hide": "숨기다", "birthday": "생일", "surprise": "깜짝", "gift": "선물",
      "under": "~아래에", "green": "초록색", "slide": "미끄럼틀",
      "who": "누가", "bring": "가져오다", "cake": "케이크", "picnic": "소풍", "today": "오늘",
      "my": "나의", "mom": "엄마", "her": "그녀의", "blue": "파란색", "basket": "바구니",
      "how": "어떻게", "catch": "잡다", "tiny": "작은", "rainbow": "무지개", "butterfly": "나비",
      "use": "사용하다", "net": "그물", "and": "그리고", "be": "~이다", "very": "매우", "gentle": "부드러운",
      "wont": "~하지 않을 것이다", "share": "나누다", "from": "~로부터", "your": "너의", "lunchbox": "점심 도시락",
      "jelly": "젤리", "special": "특별한",
      "why": "왜", "sister": "자매", "play": "놀다", "tag": "술래잡기", "us": "우리",
      "she": "그녀는", "feels": "느끼다", "too": "너무", "sleepy": "졸린",
      "have": "가지다", "clean": "청소하다", "playroom": "놀이방",
      "if": "만약", "already": "이미", "tidy": "깨끗한",
      "allowed": "허락된", "snacks": "간식",
      "library": "도서관", "room": "방",
      "zoo": "동물원", "tomorrow": "내일",
      "grandpa": "할아버지", "knee": "무릎",
      "toy": "장난감", "car": "자동차", "break": "부수다", "again": "다시", "soon": "곧",
      "crash": "충돌하다", "hard": "세게",
      "would": "~일 것이다", "do": "하다", "flying": "나는", "carpet": "양탄자",
      "fly": "날다", "grandmas": "할머니의", "house": "집", "cookies": "쿠키",
      "he": "그는", "cry": "울다", "watching": "보는 중", "movie": "영화",
      "puppy": "강아지", "got": "되었다", "lost": "잃어버린",
      "visit": "방문하다", "underwater": "물속의", "castle": "성",
      "during": "~동안", "summer": "여름", "dream": "꿈",
      "go": "가다", "fairy": "요정", "wings": "날개",
      "island": "섬", "sky": "하늘",
      "talk": "이야기하다", "forest": "숲", "elf": "요정",
      "whisper": "속삭이다", "magic": "마법", "ring": "반지",
      "kite": "연", "stuck": "걸린",
      "dad": "아빠", "long": "긴", "stick": "막대기",
      "even": "심지어", "hungry": "배고픈",
      "broccoli": "브로콜리", "ice": "아이스", "cream": "크림", "yucky": "맛없는", 
      "teddy": "테디", "bear": "곰", "tea": "차",
      "outside": "밖에", "together": "함께",
      "started": "시작했다", "thunderstorming": "천둥번개 치는",
      "secret": "비밀", "treasure": "보물", "box": "상자",
      "bathroom": "화장실", "wet": "젖은",
      "snowman": "눈사람", "melt": "녹다", "quickly": "빨리",
      "built": "지었다", "shade": "그늘",
      "laugh": "웃다", "funny": "웃긴", "dance": "춤", "moves": "동작들",
      "teacher": "선생님", "stop": "멈추다", "laughing": "웃는 것",
      "can": "~할 수 있다", "shiny": "반짝이는", "rock": "돌",
      "stone": "돌",
      "not": "아니다", "rightnow": "지금 당장", 
      "raining": "비가 오는", "mommy": "엄마", "said": "말했다", "muddy": "진흙탕의",
      "see": "보다", "new": "새로운",
      "over": "넘어서", "lunch": "점심",
      "aliens": "외계인",
      "behind": "~뒤에", "tree": "나무",
      "help": "돕다", "fix": "고치다", "robot": "로봇",
      "dinner": "저녁",
      "jump": "뛰다", "so": "그렇게", "high": "높이", "like": "~처럼", "that": "저것",
      "practiced": "연습했다", "every": "매일", "day": "날", "trampoline": "트램펄린",
      "cant": "~할 수 없다", "before": "~전에", 
      "jar": "단지", "locked": "잠긴", "tight": "단단히",
      "kitchen": "부엌", "cooking": "요리하는 중",
      "crumbs": "부스러기", "couch": "소파",
      "keep": "유지하다", "longer": "더 오래", "than": "~보다", "two": "둘", "hours": "시간",
      "hear": "듣다", "crunch": "바삭거리는 소리",
      "cartoons": "만화", "playing": "재생 중인", "loudly": "시끄럽게",
      "could": "~할 수 있었다", "find": "찾다", "bed": "침대",
      "there": "거기에",
      "hiding": "숨는 중", "now": "지금",
      "scared": "무서워하는", "vacuum": "진공", "cleaner": "청소기", "noise": "소리",
      "looking": "찾는 중", "him": "그를",
      "snack": "간식",
      "gone": "사라진", "last": "지난", "night": "밤",
      "rolled": "굴러갔다", "chest": "상자",
      "taken": "가져간", "garden": "정원",
      "back": "뒤로", "safely": "안전하게",
      "carry": "나르다", "superhero": "슈퍼히어로", "backpack": "배낭",
      "couldnt": "할 수 없었다", "paper": "종이", 
      "show": "보여주다", "puppet": "인형",
      "boots": "장화", "missing": "사라진",
      "race": "경주",
      "thunder": "천둥", "loud": "시끄러운",
      "setup": "설치하다", "lemonade": "레모네이드", "stand": "가판대", 
      "dripping": "물이 떨어지는",
      "join": "참여하다",
      "caught": "걸렸다", "cold": "감기",
      "socks": "양말", "getting": "되는 것",
      "dry": "마른", "without": "~없이", "on": "위에",
      "cannot": "할 수 없다",
      "wouldnt": "하지 않았을 것이다", 
      "shouldnt": "하지 말아야 한다",
      "mustnt": "~해서는 안 된다",
      "dont": "하지 않는다", 
      "doesnt": "하지 않는다",
      "didnt": "하지 않았다",
      "its": "그것은"
  };
  if (mockTranslations[cleanedWord]) return mockTranslations[cleanedWord];
  return `[${cleanedWord} 뜻]`;
}

async function speakWord(word) {
  const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").trim(); 
  if (!cleanWord) return;
  let voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    await new Promise(resolve => {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve();
      };
      window.speechSynthesis.getVoices();
    });
  }
  return new Promise(async resolve => {
    const utter = new window.SpeechSynthesisUtterance(cleanWord);
    utter.lang = 'en-US';
    utter.rate = 0.95;
    utter.pitch = 1.0;
    const voice = await getVoice('en-US', 'female');
    if (voice) utter.voice = voice;
    utter.onend = resolve;
    utter.onerror = (event) => { console.error('SpeechSynthesisUtterance.onerror for word:', event); resolve(); };
    window.speechSynthesis.speak(utter);
  });
}

const englishFont = "23.52px Arial";
const translationFont = "18.9px Arial";

function drawSingleSentenceBlock(sentenceObject, baseY, isQuestionBlock, blockContext) {
    if (!sentenceObject) return { lastY: baseY, wordRects: [] };
    let localWordRects = [];
    ctx.font = englishFont;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    let lines = [sentenceObject.line1, sentenceObject.line2].filter(l => l && l.trim());
    if (lines.length === 0) return { lastY: baseY, wordRects: [] };
    let blockHeight = lines.length * LINE_HEIGHT;
    let yFirstLineTextCenter;
    if (isQuestionBlock) {
        yFirstLineTextCenter = baseY - blockHeight / 2 + LINE_HEIGHT / 2;
    } else {
        yFirstLineTextCenter = baseY + LINE_HEIGHT / 2;
    }
    let lastDrawnTextBottomY = baseY;
    const sentenceFullText = (sentenceObject.line1 + " " + sentenceObject.line2).trim();
    const isCurrentBlockContentQuestionType = isQuestion(sentenceFullText);

    for (let i = 0; i < lines.length; i++) {
        const lineText = lines[i];
        let currentLineCenterY = yFirstLineTextCenter + i * LINE_HEIGHT;
        const words = lineText.split(" ");
        let wordMetrics = words.map(w => ctx.measureText(w));
        let spaceWidth = ctx.measureText(" ").width;
        let totalLineWidth = wordMetrics.reduce((sum, m) => sum + m.width, 0) + spaceWidth * (words.length - 1);
        
        let currentX = (canvas.width - totalLineWidth) / 2;

        const wordHeight = parseFloat(englishFont.match(/(\d*\.?\d*)px/)[1]);
        for (let j = 0; j < words.length; j++) {
            let rawWord = words[j];
            let cleanedWordForColor = rawWord.replace(/[^a-zA-Z0-9]/g, ""); 
            let lowerCleanedWordForColor = cleanedWordForColor.toLowerCase();
            
            let color = "#fff";
            if (isCurrentBlockContentQuestionType && i === 0 && j === 0 && (isAux(lowerCleanedWordForColor) || isWh(lowerCleanedWordForColor))) {
                color = "#40b8ff";
            } else if (isVerb(lowerCleanedWordForColor) && !blockContext.verbColored) {
                color = "#FFD600";
                blockContext.verbColored = true;
            } else if (isAux(lowerCleanedWordForColor) || isBeen(lowerCleanedWordForColor)) {
                color = "#40b8ff";
            } else if (isVing(lowerCleanedWordForColor)) { 
                color = "#40b8ff";
            }
            ctx.fillStyle = color;
            ctx.fillText(rawWord, currentX, currentLineCenterY); 
            const measuredWidth = wordMetrics[j].width;
            localWordRects.push({
                word: rawWord, 
                x: currentX, y: currentLineCenterY, w: measuredWidth, h: wordHeight,
                lineIndex: i,
                isQuestionWord: isQuestionBlock
            });
            currentX += measuredWidth + spaceWidth;
        }
        lastDrawnTextBottomY = currentLineCenterY + LINE_HEIGHT / 2;
    }
    return { lastY: lastDrawnTextBottomY, wordRects: localWordRects };
}

function drawPlayButton(buttonRect, visualScale) {
    if (!buttonRect) return;
    ctx.save();
    // Background
    ctx.globalAlpha = Math.min(1.0, centerAlpha + 0.2) * 0.82;
    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.roundRect(buttonRect.x, buttonRect.y, buttonRect.w, buttonRect.h, 20 * visualScale);
    ctx.fill();
    
    // Border
    ctx.globalAlpha = centerAlpha;
    ctx.strokeStyle = "#4CAF50";
    ctx.lineWidth = 3 * visualScale;
    ctx.stroke();
    
    // Triangle
    ctx.fillStyle = "#4CAF50";
    ctx.beginPath();
    const playSize = 36 * visualScale; 
    const btnPad = 18 * visualScale;   
    const triangleSymbolVerticalLineXOffset = 6 * visualScale;
    ctx.moveTo(buttonRect.x + btnPad + triangleSymbolVerticalLineXOffset, buttonRect.y + btnPad);
    ctx.lineTo(buttonRect.x + btnPad + triangleSymbolVerticalLineXOffset, buttonRect.y + buttonRect.h - btnPad);
    ctx.lineTo(buttonRect.x + btnPad + playSize, buttonRect.y + buttonRect.h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function drawCenterSentence() {
    if (!currentQuestionSentence && !currentAnswerSentence && !fireworks) {
        centerSentenceWordRects = [];
        return;
    }
    centerSentenceWordRects = [];
    ctx.save();
    ctx.globalAlpha = centerAlpha;
    const mainRenderAreaYCenter = topOffset + (canvas.height - topOffset) / 2;
    const questionBlockCenterY = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT; 

    let questionBlockContext = { verbColored: false };
    let questionDrawOutput = { lastY: questionBlockCenterY - LINE_HEIGHT, wordRects: [] }; 

    const baseOverallScale = 0.49;
    const visualReductionFactor = 0.8; 
    const currentVisualScale = baseOverallScale * visualReductionFactor;
    const playSizeForCalc = 36 * currentVisualScale; 
    const btnPadForCalc = 18 * currentVisualScale;   
    
    const btnH = playSizeForCalc + btnPadForCalc * 2; 
    const btnW = playSizeForCalc + btnPadForCalc * 2; 
    const btnX = 10;

    if (currentQuestionSentence) {
        questionDrawOutput = drawSingleSentenceBlock(currentQuestionSentence, questionBlockCenterY, true, questionBlockContext);
        centerSentenceWordRects.push(...questionDrawOutput.wordRects);

        const questionLines = [currentQuestionSentence.line1, currentQuestionSentence.line2].filter(l => l && l.trim());
        const questionBlockHeight = questionLines.length * LINE_HEIGHT;
        const questionButtonActualCenterY = questionBlockCenterY; 
        
        playButtonRectQuestion = { x: btnX, y: questionButtonActualCenterY - btnH / 2, w: btnW, h: btnH };
        if (showPlayButtonQuestion) {
            drawPlayButton(playButtonRectQuestion, currentVisualScale);
        }

        if (showTranslationForQuestion && currentQuestionSentenceIndex !== null && translations[currentQuestionSentenceIndex]) {
            ctx.save();
            ctx.globalAlpha = centerAlpha;
            ctx.font = translationFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFD600"; 
            ctx.shadowColor = "#111";
            ctx.shadowBlur = 4;
            const translationTextHeight = parseFloat(translationFont.match(/(\d*\.?\d*)px/)[1]);
            const translationBelowY = questionDrawOutput.lastY + 10 + translationTextHeight / 2;
            ctx.fillText(translations[currentQuestionSentenceIndex], canvas.width / 2, translationBelowY);
            ctx.restore();
        }
    }

    if (currentAnswerSentence) {
        const answerLines = [currentAnswerSentence.line1, currentAnswerSentence.line2].filter(l => l && l.trim());
        const answerBlockHeight = answerLines.length * LINE_HEIGHT;
        
        let topYForAnswerBlock;
        if (currentQuestionSentence) {
            let questionLastY = questionDrawOutput.lastY;
            if (showTranslationForQuestion && currentQuestionSentenceIndex !== null && translations[currentQuestionSentenceIndex]) {
                const translationTextHeight = parseFloat(translationFont.match(/(\d*\.?\d*)px/)[1]);
                questionLastY += (10 + translationTextHeight); 
            }
            topYForAnswerBlock = questionLastY + ANSWER_OFFSET_Y;
        } else {
            topYForAnswerBlock = questionBlockCenterY - (answerBlockHeight / 2);
        }
        
        const answerButtonActualCenterY = topYForAnswerBlock + answerBlockHeight / 2;
        playButtonRect = { x: btnX, y: answerButtonActualCenterY - btnH / 2, w: btnW, h: btnH };

        if (showPlayButton) {
            drawPlayButton(playButtonRect, currentVisualScale);
        }
        
        let answerBlockContext = { verbColored: false };
        const answerDrawOutput = drawSingleSentenceBlock(currentAnswerSentence, topYForAnswerBlock, false, answerBlockContext);
        centerSentenceWordRects.push(...answerDrawOutput.wordRects);

        if (showTranslationForAnswer && currentAnswerSentenceIndex !== null && translations[currentAnswerSentenceIndex]) {
            ctx.save();
            ctx.globalAlpha = centerAlpha;
            ctx.font = translationFont;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#FFD600";
            ctx.shadowColor = "#111";
            ctx.shadowBlur = 4;
            const translationTextHeight = parseFloat(translationFont.match(/(\d*\.?\d*)px/)[1]);
            const translationBelowY = answerDrawOutput.lastY + 10 + translationTextHeight / 2;
            ctx.fillText(translations[currentAnswerSentenceIndex], canvas.width / 2, translationBelowY);
            ctx.restore();
        }
    }

    if (activeWordTranslation && activeWordTranslation.show) {
        ctx.save();
        ctx.globalAlpha = centerAlpha;
        const wordTransFontFamily = "'Malgun Gothic', 'Nanum Gothic', Arial, sans-serif";
        const wordTransFontSize = 16;
        ctx.font = `${wordTransFontSize}px ${wordTransFontFamily}`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#98FB98";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 2; ctx.shadowOffsetX = 1; ctx.shadowOffsetY = 1;
        
        const englishWordMiddleY = activeWordTranslation.y;
        const englishWordHalfHeight = activeWordTranslation.h / 2;
        const padding = 6;
        let tx = activeWordTranslation.x + activeWordTranslation.w / 2;
        let ty;

        if (activeWordTranslation.lineIndex === 0) { 
            ctx.textBaseline = "bottom";
            ty = englishWordMiddleY - englishWordHalfHeight - padding;
        } else { 
            ctx.textBaseline = "top";
            ty = englishWordMiddleY + englishWordHalfHeight + padding;
        }
        
        ctx.fillText(activeWordTranslation.translation, tx, ty);
        ctx.restore();
    }
    ctx.restore();
}


function drawFireworks() {
  if (!fireworks) return;
  ctx.save();
  ctx.font = "23.52px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  fireworks.forEach(fw => {
    ctx.globalAlpha = 1;
    ctx.fillStyle = fw.color;
    ctx.fillText(fw.text, fw.x, fw.y);
  });
  ctx.restore();
}

function splitSentence(sentenceText) {
  if (!sentenceText) return ["", ""];
  const words = sentenceText.split(" ");
  if (words.length <= 4 && sentenceText.length < 35) {
      return [sentenceText, ""];
  }
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(" ");
  const line2 = words.slice(half).join(" ");
  return [line1, line2];
}

function getClockwiseAngle(index, total) {
  return -Math.PI / 2 + (index * 2 * Math.PI) / total;
}

function startFireworks(sentenceTextForFireworks, globalSentenceIndex, explosionX, explosionY) {
    let roleOfNewSentence;
    let questionTextForLayout = "";

    if (globalSentenceIndex % 2 === 0) { 
        roleOfNewSentence = 'question';
    } else { 
        roleOfNewSentence = 'answer';
    }

    if (roleOfNewSentence === 'question') {
        currentQuestionSentence = null;
        currentAnswerSentence = null;
        currentQuestionSentenceIndex = null;
        currentAnswerSentenceIndex = null;
        showPlayButton = false;
        showPlayButtonQuestion = false; 
        showTranslationForQuestion = false; 
        showTranslationForAnswer = false;   
    } else { 
        if (currentQuestionSentence && currentQuestionSentenceIndex === globalSentenceIndex - 1) {
            questionTextForLayout = (currentQuestionSentence.line1 + " " + currentQuestionSentence.line2).trim();
        } else if (globalSentenceIndex > 0 && sentences[globalSentenceIndex - 1]) {
            questionTextForLayout = sentences[globalSentenceIndex - 1];
        } else {
            questionTextForLayout = " "; 
            console.warn("Answer sentence firework initiated without a clear preceding question for layout.");
        }
        currentAnswerSentence = null;
        currentAnswerSentenceIndex = null;
        showPlayButton = false; 
        showTranslationForQuestion = false; 
        showTranslationForAnswer = false;   
    }

    if (activeWordTranslation) activeWordTranslation.show = false;
    activeWordTranslation = null;
    if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
    centerSentenceWordRects = []; 

    const [fireworkLine1, fireworkLine2] = splitSentence(sentenceTextForFireworks);
    const wordsForFireworks = [];
    if (fireworkLine1.trim()) wordsForFireworks.push(...fireworkLine1.split(" ").map(word => ({ word, row: 0 })));
    if (fireworkLine2.trim()) wordsForFireworks.push(...fireworkLine2.split(" ").map(word => ({ word, row: 1 })));

    if(wordsForFireworks.length === 0) {
        sentenceActive = false;
        return;
    }

    const baseRadius = 51.2 * 0.88;
    const maxRadius = 120.96 * 0.88;
    let centerX = explosionX;
    const margin = 8;
    if (centerX - maxRadius < margin) centerX = margin + maxRadius;
    if (centerX + maxRadius > canvas.width - margin) centerX = canvas.width - margin - maxRadius;

    fireworks = [];
    fireworksState = {
        t: 0,
        phase: "explode",
        holdDuration: 60,
        explodeDuration: 180,
        gatherDuration: 45,
        originX: centerX,
        originY: explosionY,
        sentenceTextToDisplayAfter: sentenceTextForFireworks,
        finalSentenceIndex: globalSentenceIndex, 
        roleOfNewSentence: roleOfNewSentence,
    };

    const mainRenderAreaYCenter = topOffset + (canvas.height - topOffset) / 2;
    const [sL1_fw, sL2_fw] = splitSentence(sentenceTextForFireworks);
    const sLines_fw = [sL1_fw, sL2_fw].filter(l => l && l.trim());
    const sentenceBlockFinalHeight_fw = sLines_fw.length * LINE_HEIGHT;

    for (let j = 0; j < wordsForFireworks.length; j++) {
        const angle = getClockwiseAngle(j, wordsForFireworks.length);
        const color = burstColors[j % burstColors.length];
        let wordTargetY;

        if (roleOfNewSentence === 'question') {
            const qBlockFinalCenterY = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;
            wordTargetY = qBlockFinalCenterY - sentenceBlockFinalHeight_fw / 2 + (wordsForFireworks[j].row * LINE_HEIGHT) + (LINE_HEIGHT / 2);
        } else { 
            const [qTextL1_layout, qTextL2_layout] = splitSentence(questionTextForLayout);
            const qTextLines_layout = [qTextL1_layout, qTextL2_layout].filter(l => l && l.trim());
            const questionBlockActualHeight_layout = qTextLines_layout.length * LINE_HEIGHT;
            const questionBlockActualCenterY_layout = mainRenderAreaYCenter + SENTENCE_VERTICAL_ADJUSTMENT;
            const questionBlockActualBottomY_layout = questionBlockActualCenterY_layout + questionBlockActualHeight_layout / 2;
            
            let answerBlockFinalTopY_fw;
            if (qTextLines_layout.length > 0) { 
                answerBlockFinalTopY_fw = questionBlockActualBottomY_layout + ANSWER_OFFSET_Y;
            } else { 
                answerBlockFinalTopY_fw = questionBlockActualCenterY_layout - sentenceBlockFinalHeight_fw / 2;
            }
            wordTargetY = answerBlockFinalTopY_fw + (wordsForFireworks[j].row * LINE_HEIGHT) + (LINE_HEIGHT / 2);
        }

        fireworks.push({
            text: wordsForFireworks[j].word,
            angle: angle,
            rowInSentence: wordsForFireworks[j].row,
            x: centerX,
            y: explosionY,
            radius: baseRadius,
            maxRadius: maxRadius,
            color: color,
            targetX: 0, 
            targetY: wordTargetY,
        });
    }
    sentenceActive = true;
    centerAlpha = 1.0;
}


function updateFireworks() {
  if (!fireworks || !fireworksState) return false;
  fireworksState.t++;

  if (fireworksState.phase === "explode") {
    const progress = Math.min(fireworksState.t / fireworksState.explodeDuration, 1);
    const ease = 1 - Math.pow(1 - progress, 2);
    const currentRadius = 51.2 * 0.88 + (120.96 * 0.88 - 51.2 * 0.88) * ease;

    fireworks.forEach((fw) => {
      fw.radius = currentRadius; 
      fw.x = fireworksState.originX + Math.cos(fw.angle) * fw.radius;
      fw.y = fireworksState.originY + Math.sin(fw.angle) * fw.radius;
    });
    if (progress >= 1) {
      fireworksState.phase = "hold";
      fireworksState.t = 0;
    }
  } else if (fireworksState.phase === "hold") {
    if (fireworksState.t >= fireworksState.holdDuration) {
      fireworksState.phase = "gather";
      fireworksState.t = 0;
      centerAlpha = 0; 
    }
  } else if (fireworksState.phase === "gather") {
    const progress = Math.min(fireworksState.t / fireworksState.gatherDuration, 1);
    const ease = Math.pow(progress, 2);
    const tempCtx = canvas.getContext('2d');
    tempCtx.font = englishFont;
    const [sentenceLine1Gather, sentenceLine2Gather] = splitSentence(fireworksState.sentenceTextToDisplayAfter);
    let sentenceLineWordArrays = [];
    if(sentenceLine1Gather.trim()) sentenceLineWordArrays.push(sentenceLine1Gather.split(" "));
    if(sentenceLine2Gather.trim()) sentenceLineWordArrays.push(sentenceLine2Gather.split(" "));
    let wordIndexInFireworks = 0;
    for (let i = 0; i < sentenceLineWordArrays.length; i++) {
        const wordsInLine = sentenceLineWordArrays[i];
        let wordMetrics = wordsInLine.map(w => tempCtx.measureText(w));
        let spaceWidth = tempCtx.measureText(" ").width;
        let totalLineWidth = wordMetrics.reduce((sum, m) => sum + m.width, 0) + spaceWidth * (wordsInLine.length - 1);
        
        let currentXTargetForLine = (canvas.width - totalLineWidth) / 2;
        
        for (let j = 0; j < wordsInLine.length; j++) {
            if (fireworks[wordIndexInFireworks]) {
                fireworks[wordIndexInFireworks].targetX = currentXTargetForLine + wordMetrics.slice(0, j).reduce((sum, m) => sum + m.width, 0) + spaceWidth * j;
            }
            wordIndexInFireworks++;
        }
    }
    fireworks.forEach((fw) => {
      fw.x += (fw.targetX - fw.x) * ease * 0.2;
      fw.y += (fw.targetY - fw.y) * ease * 0.2;
    });

    if (progress >= 1) {
        fireworksState.phase = "done";
        const newSentenceText = fireworksState.sentenceTextToDisplayAfter;
        const newSentenceIndex = fireworksState.finalSentenceIndex; 
        const roleOfNewSentence = fireworksState.roleOfNewSentence; 
        const [newLine1, newLine2] = splitSentence(newSentenceText);
        const newSentenceObject = { line1: newLine1, line2: newLine2 };
        let playAudioForThisSentence = false; 

        if (roleOfNewSentence === 'question') {
            currentQuestionSentence = newSentenceObject;
            currentQuestionSentenceIndex = newSentenceIndex;
            currentAnswerSentence = null; 
            currentAnswerSentenceIndex = null;
            showPlayButton = false; 
            showPlayButtonQuestion = true; 
            playAudioForThisSentence = true; 
        } else { 
            const questionIndexOfThisAnswer = newSentenceIndex - 1;
            if (questionIndexOfThisAnswer >= 0 && sentences[questionIndexOfThisAnswer]) {
                if (!currentQuestionSentence || currentQuestionSentenceIndex !== questionIndexOfThisAnswer) {
                    const [qL1, qL2] = splitSentence(sentences[questionIndexOfThisAnswer]);
                    currentQuestionSentence = {line1: qL1, line2: qL2};
                    currentQuestionSentenceIndex = questionIndexOfThisAnswer;
                    showPlayButtonQuestion = true; 
                }
            } else {
                currentQuestionSentence = null;
                currentQuestionSentenceIndex = null;
                showPlayButtonQuestion = false; 
            }
            currentAnswerSentence = newSentenceObject;
            currentAnswerSentenceIndex = newSentenceIndex;
            showPlayButton = true; 
            playAudioForThisSentence = true; 
        }

        centerAlpha = 1.0; 
        fireworks = null;
        fireworksState = null;
        sentenceActive = false;
        if (activeWordTranslation) activeWordTranslation.show = false;
        activeWordTranslation = null;
        if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);

        if (playAudioForThisSentence) {
            let audioIndexToPlay = null;
            if (roleOfNewSentence === 'question' && currentQuestionSentenceIndex !== null) {
                audioIndexToPlay = currentQuestionSentenceIndex;
            } else if (roleOfNewSentence === 'answer' && currentAnswerSentenceIndex !== null) {
                audioIndexToPlay = currentAnswerSentenceIndex;
            }

            if (audioIndexToPlay !== null) {
                setTimeout(() => {
                    window.speechSynthesis.cancel(); 
                    playSentenceAudio(audioIndexToPlay)
                        .catch(err => console.error(`Error playing sentence audio for index ${audioIndexToPlay} from fireworks:`, err));
                }, 300); 
            }
        }
    }
  }
}


async function getVoice(lang = 'en-US', gender = 'female') {
  let voices = window.speechSynthesis.getVoices();
  if (!voices.length) {
    await new Promise(resolve => {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve();
      };
      window.speechSynthesis.getVoices();
    });
  }
  const filtered = voices.filter(v =>
    v.lang === lang &&
    (gender === 'female'
      ? v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('susan') || v.name.toLowerCase().includes('google us english')
      : v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('daniel') || v.name.toLowerCase().includes('tom') || v.name.toLowerCase().includes('google us english'))
  );
  if (filtered.length) return filtered[0];
  const fallback = voices.filter(v => v.lang === lang);
  if (fallback.length) return fallback[0];
  return voices.find(v => v.default && v.lang.startsWith(lang.split('-')[0])) || voices.find(v => v.default) || voices[0];
}


function spawnEnemy() {
  const idx = Math.floor(Math.random() * enemyImgs.length);
  const img = enemyImgs[idx];
  const x = Math.random() * (canvas.width - ENEMY_SIZE);
  const spawnYMax = canvas.height * 0.2;
  const y = topOffset + Math.random() * spawnYMax + 20;
  enemies.push({ x, y, w: ENEMY_SIZE, h: ENEMY_SIZE, img, shot: false, imgIndex: idx });
}

function update(delta) {
  enemies = enemies.filter(e => e.y <= canvas.height);
  while (enemies.length < 2) spawnEnemy();
  enemies.forEach(e => e.y += 1);

  bullets = bullets.filter(b => b.y + b.h > 0).map(b => { b.y -= b.speed; return b; });
  enemyBullets = enemyBullets.filter(b => b.y < canvas.height).map(b => { b.y += b.speed; return b; });

  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (b.x < e.x + e.w && b.x + b.w > e.x && b.y < e.y + e.h && b.y + b.h > e.y) {
        if (!sentenceActive) {
            const sentenceToFirework = sentences[sentenceIndex];
            const globalIndexOfSentence = sentenceIndex; 
            startFireworks(sentenceToFirework, globalIndexOfSentence, e.x + e.w / 2, e.y + e.h / 2);
            sentenceIndex = (sentenceIndex + 1) % sentences.length;
            localStorage.setItem('sentenceIndex', sentenceIndex.toString());
            sounds.explosion.play();
        }
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
      }
    });
  });

  if (sentenceActive) updateFireworks();

  if (!currentQuestionSentence && !currentAnswerSentence && !sentenceActive) {
    showPlayButton = false; 
    showPlayButtonQuestion = false;
    showTranslationForQuestion = false; 
    showTranslationForAnswer = false;   
    if (activeWordTranslation) activeWordTranslation.show = false;
    isActionLocked = false;
  } else if (!sentenceActive) { 
      showPlayButtonQuestion = !!currentQuestionSentence;
      showPlayButton = !!currentAnswerSentence;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(playerImg, player.x, player.y, player.w, player.h);

  enemies.forEach(e => {
    if (e.imgIndex === 1) {
      const scaleFactor = 1.3;
      const enlargedWidth = ENEMY_SIZE * scaleFactor;
      const enlargedHeight = ENEMY_SIZE * scaleFactor;
      const enlargedX = e.x - (enlargedWidth - ENEMY_SIZE) / 2;
      const enlargedY = e.y - (enlargedHeight - ENEMY_SIZE) / 2;
      ctx.drawImage(e.img, enlargedX, enlargedY, enlargedWidth, enlargedHeight);
      if (coffeeSteamVideo && coffeeVideoAssetReady && coffeeSteamVideo.readyState >= HTMLVideoElement.HAVE_CURRENT_DATA) {
        const videoAspectRatio = (coffeeSteamVideo.videoWidth > 0 && coffeeSteamVideo.videoHeight > 0) ? coffeeSteamVideo.videoWidth / coffeeSteamVideo.videoHeight : 1;
        let steamWidth = enlargedWidth * 0.7;
        let steamHeight = steamWidth / videoAspectRatio;
        const baseX = enlargedX + (enlargedWidth - steamWidth) / 2;
        const baseYOffset = steamHeight * 0.65;
        const additionalYOffset = 30;
        const baseY = enlargedY - baseYOffset - additionalYOffset;
        const steamInstances = [
          { offsetXRatio: 0,    offsetYRatio: 0,     scale: 1.0, alpha: 0.6 },
          { offsetXRatio: -0.15, offsetYRatio: -0.1,  scale: 0.9, alpha: 0.45 },
          { offsetXRatio: 0.15,  offsetYRatio: -0.05, scale: 1.1, alpha: 0.45 }
        ];
        steamInstances.forEach(instance => {
          ctx.save();
          const currentSteamWidth = steamWidth * instance.scale;
          const currentSteamHeight = steamHeight * instance.scale;
          const offsetX = steamWidth * instance.offsetXRatio;
          const offsetY = steamHeight * instance.offsetYRatio;
          const steamX = baseX + offsetX - (currentSteamWidth - steamWidth) / 2;
          const steamY = baseY + offsetY - (currentSteamHeight - steamHeight) / 2;
          ctx.globalAlpha = instance.alpha;
          ctx.drawImage(coffeeSteamVideo, steamX, steamY, currentSteamWidth, currentSteamHeight);
          ctx.restore();
        });
      }
    } else {
      ctx.drawImage(e.img, e.x, e.y, ENEMY_SIZE, ENEMY_SIZE);
    }
  });

  ctx.fillStyle = 'red';
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

  const previousGlobalCenterAlpha = centerAlpha;

  if (sentenceActive && fireworks && fireworksState) {
    if (fireworksState.roleOfNewSentence === 'answer' && currentQuestionSentence) {
      centerAlpha = 1.0;
      const tempAnswerSentence = currentAnswerSentence; 
      const tempAnswerIndex = currentAnswerSentenceIndex;
      currentAnswerSentence = null; 
      currentAnswerSentenceIndex = null;
      drawCenterSentence(); 
      currentAnswerSentence = tempAnswerSentence; 
      currentAnswerSentenceIndex = tempAnswerIndex;
    }
    centerAlpha = previousGlobalCenterAlpha; 
    drawFireworks();
  } else {
    if (currentQuestionSentence || currentAnswerSentence) {
      centerAlpha = 1.0; 
      drawCenterSentence();
    }
  }
  
  if (!sentenceActive) {
    centerAlpha = 1.0;
  } else if (fireworksState && fireworksState.phase === "gather") {
    // centerAlpha is already 0 from updateFireworks
  } else {
    centerAlpha = previousGlobalCenterAlpha; 
  }
}

function gameLoop(time) {
  if (!isGameRunning || isGamePaused) {
      return;
  }
  const delta = time - lastTime;
  lastTime = time;
  update(delta);
  draw();
  requestAnimationFrame(gameLoop);
}

document.getElementById('startBtn').onclick = startGame;
document.getElementById('pauseBtn').onclick = togglePause;
document.getElementById('stopBtn').onclick = stopGame;

function resetGameStateForStartStop() {
    bullets = []; enemies = []; enemyBullets = [];
    fireworks = null; fireworksState = null;
    currentQuestionSentence = null; currentAnswerSentence = null;
    currentQuestionSentenceIndex = null; currentAnswerSentenceIndex = null;
    sentenceActive = false; centerAlpha = 1.0;
    showPlayButton = false; playButtonRect = null;
    showPlayButtonQuestion = false; playButtonRectQuestion = null; 
    showTranslationForQuestion = false; 
    showTranslationForAnswer = false;   
    if (activeWordTranslation) activeWordTranslation.show = false;
    activeWordTranslation = null;
    if (wordTranslationTimeoutId) {
        clearTimeout(wordTranslationTimeoutId);
        wordTranslationTimeoutId = null;
    }
    centerSentenceWordRects = [];
    isActionLocked = false;
}

function startGame() {
  calculateTopOffset();
  if (!allAssetsReady) {
    alert("이미지 및 비디오 로딩 중입니다. 잠시 후 다시 시도하세요.");
    return;
  }
  isGameRunning = true;
  isGamePaused = false;
  try { bgmAudio.pause(); bgmAudio.currentTime = 0; } catch (e) {}
  bgmIndex = 0;
  bgmAudio = new Audio(bgmFiles[bgmIndex]);
  bgmAudio.volume = isMuted ? 0 : 0.05;
  bgmAudio.loop = false;
  bgmAudio.addEventListener('ended', playNextBgm);
  bgmAudio.play().catch(e => console.error("BGM play error on start:", e));

  if (coffeeSteamVideo && coffeeVideoAssetReady) {
    coffeeSteamVideo.currentTime = 0;
    const playPromise = coffeeSteamVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {}).catch(error => {
        console.error("Error attempting to play coffee steam video on start:", error);
      });
    }
  }
  resetGameStateForStartStop();
  let storedIndex = Number(localStorage.getItem('sentenceIndex') || 0);
  sentenceIndex = storedIndex % sentences.length;
  localStorage.setItem('sentenceIndex', sentenceIndex.toString());
  spawnEnemy(); spawnEnemy();
  player.x = canvas.width / 2 - PLAYER_SIZE / 2;
  player.y = topOffset + (canvas.height - topOffset) - PLAYER_SIZE - 10;
  player.y = Math.max(topOffset, player.y);
  lastTime = performance.now();
  requestAnimationFrame(gameLoop);
}

function togglePause() {
  if (!isGameRunning) return;
  isGamePaused = !isGamePaused;
  if (isGamePaused) {
    bgmAudio.pause();
    if (coffeeSteamVideo && !coffeeSteamVideo.paused) coffeeSteamVideo.pause();
    window.speechSynthesis.cancel();
    if (currentSentenceAudio) currentSentenceAudio.pause();
  } else {
    bgmAudio.play().catch(e => console.error("BGM resume error:", e));
    if (coffeeSteamVideo && coffeeSteamVideo.paused && coffeeVideoAssetReady) {
        const playPromise = coffeeSteamVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {}).catch(error => console.error("Error resuming coffee steam video:", error));
        }
    }
    if (currentSentenceAudio && currentSentenceAudio.paused) {
        currentSentenceAudio.play().catch(e => console.error("Sentence audio resume error:", e));
    }
    lastTime = performance.now();
    requestAnimationFrame(gameLoop);
  }
}

function stopGame() {
  isGameRunning = false; isGamePaused = false;
  bgmAudio.pause();
  if (coffeeSteamVideo && !coffeeSteamVideo.paused) coffeeSteamVideo.pause();
  window.speechSynthesis.cancel();
  if (currentSentenceAudio) {
      currentSentenceAudio.pause();
      currentSentenceAudio.currentTime = 0;
      currentSentenceAudio = null;
  }
  resetGameStateForStartStop();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const expandedMargin = 10;

function handleCanvasInteraction(clientX, clientY, event) {
  if (!isGameRunning || isGamePaused || isActionLocked) return;

  const isPlayBtnQuestionTouched = showPlayButtonQuestion && playButtonRectQuestion &&
    clientX >= (playButtonRectQuestion.x - expandedMargin) &&
    clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
    clientY >= (playButtonRectQuestion.y - expandedMargin) &&
    clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);

  const isPlayBtnAnswerTouched = showPlayButton && playButtonRect &&
    clientX >= (playButtonRect.x - expandedMargin) &&
    clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
    clientY >= (playButtonRect.y - expandedMargin) &&
    clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);

  if (isPlayBtnQuestionTouched) {
    showTranslationForQuestion = true; 
    showTranslationForAnswer = false; 
    if (activeWordTranslation) activeWordTranslation.show = false;
    if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
    activeWordTranslation = null;
    isActionLocked = true;
    if (currentQuestionSentenceIndex !== null) {
        window.speechSynthesis.cancel();
        playSentenceAudio(currentQuestionSentenceIndex)
            .catch(err => console.error("Error playing question sentence audio from play button:", err));
    } else {
        console.warn("Question play button touched, but currentQuestionSentenceIndex is null.");
    }
    event.preventDefault();
    setTimeout(() => { isActionLocked = false; }, 200);
    return;
  }
  
  if (isPlayBtnAnswerTouched) {
    showTranslationForAnswer = true;
    showTranslationForQuestion = false; 
    if (activeWordTranslation) activeWordTranslation.show = false;
    if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
    activeWordTranslation = null;
    isActionLocked = true;
    if (currentAnswerSentenceIndex !== null) {
        window.speechSynthesis.cancel();
        playSentenceAudio(currentAnswerSentenceIndex)
            .catch(err => console.error("Error playing answer sentence audio from play button:", err));
    } else {
        console.warn("Answer play button touched, but currentAnswerSentenceIndex is null.");
    }
    event.preventDefault();
    setTimeout(() => { isActionLocked = false; }, 200);
    return;
  }

  if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
      for (const wordRect of centerSentenceWordRects) {
        if (
          clientX >= wordRect.x && clientX <= wordRect.x + wordRect.w &&
          clientY >= wordRect.y - wordRect.h / 2 && clientY <= wordRect.y + wordRect.h / 2
        ) {
          window.speechSynthesis.cancel();
          speakWord(wordRect.word);
          if (wordTranslationTimeoutId) clearTimeout(wordTranslationTimeoutId);
          if (activeWordTranslation) activeWordTranslation.show = false;
          activeWordTranslation = null;
          getWordTranslation(wordRect.word).then(translation => {
              activeWordTranslation = {
                  word: wordRect.word, translation: translation,
                  x: wordRect.x, y: wordRect.y, w: wordRect.w, h: wordRect.h,
                  lineIndex: wordRect.lineIndex, isQuestionWord: wordRect.isQuestionWord, show: true
              };
              wordTranslationTimeoutId = setTimeout(() => {
                  if (activeWordTranslation && activeWordTranslation.word === wordRect.word) {
                      activeWordTranslation.show = false;
                  }
              }, WORD_TRANSLATION_DURATION);
          }).catch(err => console.error("Error getting word translation:", err));
          showTranslationForQuestion = false; 
          showTranslationForAnswer = false;
          isActionLocked = true;
          event.preventDefault();
          setTimeout(() => { isActionLocked = false; }, 200);
          return;
        }
      }
  }

  if (!sentenceActive) {
      if (activeWordTranslation && activeWordTranslation.show) {
        activeWordTranslation.show = false;
        if (wordTranslationTimeoutId) {
            clearTimeout(wordTranslationTimeoutId);
            wordTranslationTimeoutId = null;
        }
      }
      showTranslationForQuestion = false; 
      showTranslationForAnswer = false;
      player.x = clientX - player.w / 2;
      player.y = clientY - player.h / 2;
      player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
      player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
      bullets.push({ x: player.x + player.w / 2 - 2.5, y: player.y, w: 5, h: 10, speed: 2.1 });
      sounds.shoot.play();
  }
  event.preventDefault();
}

canvas.addEventListener('touchstart', e => {
  const touch = e.touches[0];
  handleCanvasInteraction(touch.clientX, touch.clientY, e);
}, { passive: false });

canvas.addEventListener('mousedown', e => {
  handleCanvasInteraction(e.clientX, e.clientY, e);
});

canvas.addEventListener('touchmove', e => {
  if (!isGameRunning || isGamePaused || isActionLocked || sentenceActive) return;
  const touch = e.touches[0];
  const isOverPlayBtnQ = showPlayButtonQuestion && playButtonRectQuestion &&
    touch.clientX >= (playButtonRectQuestion.x - expandedMargin) &&
    touch.clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
    touch.clientY >= (playButtonRectQuestion.y - expandedMargin) &&
    touch.clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);
  
  const isOverPlayBtnA = showPlayButton && playButtonRect &&
    touch.clientX >= (playButtonRect.x - expandedMargin) &&
    touch.clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
    touch.clientY >= (playButtonRect.y - expandedMargin) &&
    touch.clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);

  if (isOverPlayBtnQ || isOverPlayBtnA) return;

  if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
    for (const wordRect of centerSentenceWordRects) {
      if (
        touch.clientX >= wordRect.x && touch.clientX <= wordRect.x + wordRect.w &&
        touch.clientY >= wordRect.y - wordRect.h/2 && touch.clientY <= wordRect.y + wordRect.h/2
      ) { return; }
    }
  }
  player.x = touch.clientX - player.w / 2;
  player.y = touch.clientY - player.h / 2;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
  e.preventDefault();
}, { passive: false });

canvas.addEventListener('mousemove', e => {
  if (!isGameRunning || isGamePaused) return;
  if (isActionLocked && (e.buttons !== 1) ) return;
  if (sentenceActive && (e.buttons !==1)) return;

  if (e.buttons !== 1) { 
    const isOverPlayBtnQ = showPlayButtonQuestion && playButtonRectQuestion &&
        e.clientX >= (playButtonRectQuestion.x - expandedMargin) &&
        e.clientX <= (playButtonRectQuestion.x + playButtonRectQuestion.w + expandedMargin) &&
        e.clientY >= (playButtonRectQuestion.y - expandedMargin) &&
        e.clientY <= (playButtonRectQuestion.y + playButtonRectQuestion.h + expandedMargin);
    
    const isOverPlayBtnA = showPlayButton && playButtonRect &&
        e.clientX >= (playButtonRect.x - expandedMargin) &&
        e.clientX <= (playButtonRect.x + playButtonRect.w + expandedMargin) &&
        e.clientY >= (playButtonRect.y - expandedMargin) &&
        e.clientY <= (playButtonRect.y + playButtonRect.h + expandedMargin);

    if (isOverPlayBtnQ || isOverPlayBtnA) return; 
     
    if ((currentQuestionSentence || currentAnswerSentence) && centerSentenceWordRects.length > 0) {
      for (const wordRect of centerSentenceWordRects) {
        if (
          e.clientX >= wordRect.x && e.clientX <= wordRect.x + wordRect.w &&
          e.clientY >= wordRect.y - wordRect.h/2 && e.clientY <= wordRect.y + wordRect.h/2
        ) { return; } 
      }
    }
  } 

  player.x = e.clientX - player.w / 2;
  player.y = e.clientY - player.h / 2;
  player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
  player.y = Math.max(topOffset, Math.min(canvas.height - player.h, player.y));
});

window.addEventListener('load', () => {
    calculateTopOffset();
    let storedIndex = Number(localStorage.getItem('sentenceIndex') || 0);
    sentenceIndex = storedIndex % sentences.length;
    localStorage.setItem('sentenceIndex', sentenceIndex.toString());
});