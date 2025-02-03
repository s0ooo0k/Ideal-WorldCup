const foods = [
  { id: "cur", title: "고기 없는 야채 카레", ext: ".jpg" },
  { id: "dan", title: "고기 없는 된장찌개", ext: ".jpg" },
  { id: "gan", title: "간장계란밥", ext: ".jpg" },
  { id: "ham", title: "소고기 패티 햄버거", ext: ".jpg" },
  { id: "jjajang", title: "짜장면(밥 추가 안됨)", ext: ".jpg" },
  { id: "kim", title: "고기 없는 김치찌개", ext: ".jpg" },
  { id: "mara", title: "원하는 재료 5가지만 들어간 마라탕", ext: ".jpg" },
  { id: "pasta", title: "매일 같은 종류의 파스타", ext: ".jpg" },
  { id: "pizza", title: "핫소스, 갈릭소스 없는 피자", ext: ".png" },
  { id: "ramen", title: "매일 똑같은 종류의 라면(계란 없음)", ext: ".jpg" },
  { id: "salad", title: "다양한 채소 샐러드(포케 아님)", ext: ".jpg" },
  { id: "sam", title: "쌈채소, 밥, 냉면 없는 삼겹살", ext: ".jpg" },
  {
    id: "shushi",
    title: "2종류로만 구성된 스시(매일 종류 똑같음)",
    ext: ".jpg",
  },
  { id: "ssal", title: "고수 잔뜩 올라간 쌀국수", ext: ".jpg" },
  { id: "steak", title: "가니쉬, 사이드 없는 스테이크", ext: ".jpg" },
  { id: "ttbk", title: "떡볶이", ext: ".jpg" },
];

// DOM 요소 가져오기
// - 왼쪽 옵션을 표시할 요소
const leftOptionDiv = document.getElementById("left-option");
// - 오른쪽 옵션을 표시할 요소
const rightOptionDiv = document.getElementById("right-option");
// - 현재 라운드 정보를 표시할 요소 (예: 16강, 8강 등)
const roundInfoDiv = document.getElementById("round-info");

// 토너먼트 진행을 위한 변수들
// 초기 라운드 후보들을 무작위로 섞어서 currentRoundItems에 저장 (16강)
let currentRoundItems = shuffle([...foods]);
// 다음 라운드로 진출한 후보들을 저장할 배열
let nextRoundItems = [];
// 현재 대결할 페어의 인덱스 (배열 내에서 몇 번째 페어를 진행 중인지)
let pairIndex = 0;

/**
 * 현재 라운드 정보를 업데이트합니다.
 * 예를 들어, 현재 남은 후보의 개수(16강, 8강, 4강 등)를 표시합니다.
 */
function updateRoundInfo() {
  roundInfoDiv.textContent = `현재 라운드: ${currentRoundItems.length}강`;
}

/**
 * 왼쪽과 오른쪽에 보여줄 두 음식 후보의 정보를 화면에 표시합니다.
 * @param {Object} leftFood - 왼쪽 후보 ({ id, title, ext })
 * @param {Object} rightFood - 오른쪽 후보 ({ id, title, ext })
 */
function displayOptions(leftFood, rightFood) {
  // 왼쪽 옵션에 이미지와 오버레이 텍스트 추가
  leftOptionDiv.innerHTML = `
      <img src="asset/${leftFood.id}${leftFood.ext}" alt="${leftFood.title}">
      <div class="overlay">${leftFood.title}</div>
    `;
  // 오른쪽 옵션에 이미지와 오버레이 텍스트 추가
  rightOptionDiv.innerHTML = `
      <img src="asset/${rightFood.id}${rightFood.ext}" alt="${rightFood.title}">
      <div class="overlay">${rightFood.title}</div>
    `;
}

/**
 * 남은 페어를 순차적으로 진행하거나, 라운드가 끝난 경우 다음 라운드 또는 우승자를 결정합니다.
 */
function showNextPair() {
  // 현재 라운드의 모든 페어(대결)가 진행되었는지 확인
  if (pairIndex * 2 >= currentRoundItems.length) {
    // 만약 다음 라운드에 단 한 개의 후보만 있다면 우승자를 결정합니다.
    if (nextRoundItems.length === 1) {
      displayWinner(nextRoundItems[0]);
      return;
    }
    // 다음 라운드를 시작하기 위해 후보 배열을 갱신하고, 인덱스 초기화
    currentRoundItems = nextRoundItems;
    nextRoundItems = [];
    pairIndex = 0;
    updateRoundInfo();
  }

  // 현재 대결할 페어의 두 후보를 배열에서 가져옵니다.
  const leftFood = currentRoundItems[pairIndex * 2];
  const rightFood = currentRoundItems[pairIndex * 2 + 1];

  // 화면에 두 후보를 표시
  displayOptions(leftFood, rightFood);
}

/**
 * 후보를 선택했을 때 처리하는 함수입니다.
 * 선택된 후보를 다음 라운드 후보 배열에 추가하고, 다음 페어를 진행합니다.
 * @param {Object} selectedFood - 선택된 음식 후보 ({ id, title, ext })
 */
function handleSelection(selectedFood) {
  nextRoundItems.push(selectedFood);
  pairIndex++;
  showNextPair();
}

/**
 * 우승자를 화면에 표시하는 함수입니다.
 * @param {Object} winnerFood - 최종 우승한 음식 후보 ({ id, title, ext })
 */
function displayWinner(winnerFood) {
  // 게임 컨테이너 영역에 우승자 정보를 표시 (이미지와 오버레이 포함)
  document.getElementById("game-container").innerHTML = `
      <div class="text-center">
        <h2>우승 음식!</h2>
        <div class="winner">
          <img src="asset/${winnerFood.id}${winnerFood.ext}" alt="${winnerFood.title}">
          <div class="overlay">${winnerFood.title}</div>
        </div>
      </div>
    `;
  // 라운드 정보 영역의 텍스트 삭제
  roundInfoDiv.textContent = "";
}

// 이벤트 리스너를 통해 사용자가 옵션(음식 후보)을 클릭했을 때 처리
// 왼쪽 옵션 클릭 시: 현재 페어의 왼쪽 후보를 선택
leftOptionDiv.addEventListener("click", function () {
  if (currentRoundItems[pairIndex * 2]) {
    // 후보가 존재하는지 확인
    handleSelection(currentRoundItems[pairIndex * 2]);
  }
});

// 오른쪽 옵션 클릭 시: 현재 페어의 오른쪽 후보를 선택
rightOptionDiv.addEventListener("click", function () {
  if (currentRoundItems[pairIndex * 2 + 1]) {
    // 후보가 존재하는지 확인
    handleSelection(currentRoundItems[pairIndex * 2 + 1]);
  }
});

/**
 * 배열을 무작위로 섞는 함수 (Fisher-Yates Shuffle 알고리즘)
 * @param {Array} array - 섞을 배열
 * @returns {Array} 무작위로 섞인 배열
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 0부터 i까지의 무작위 정수 생성
    const j = Math.floor(Math.random() * (i + 1));
    // 배열 요소 교환 (swap)
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 초기 화면 설정
updateRoundInfo(); // 첫 라운드 정보(16강)를 표시
showNextPair(); // 첫 페어의 후보를 화면에 표시
