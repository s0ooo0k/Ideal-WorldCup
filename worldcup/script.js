// 음식 이미지 배열(확장자 다름)
const foods = [
  { id: "cur", title: "고기 없는 야채 카레", ext: ".jpg" },
  { id: "dan", title: "고기 없는 된장찌개", ext: ".jpg" },
  { id: "gan", title: "간장계란밥", ext: ".jpg" },
  { id: "ham", title: "탄산 없는 햄버거거", ext: ".jpg" },
  { id: "jjajang", title: "단무지 없는 짜장면", ext: ".jpg" },
  { id: "kim", title: "기본 야채김밥", ext: ".jpg" },
  { id: "mara", title: "원하는 재료 5가지만 들어간 마라탕", ext: ".jpg" },
  { id: "pasta", title: "매일 같은 종류의 파스타", ext: ".jpg" },
  { id: "pizza", title: "핫소스, 갈릭소스 없는 피자", ext: ".png" },
  { id: "ramen", title: "매일 똑같은 종류의 라면(계란 없음)", ext: ".jpg" },
  { id: "salad", title: "다양한 채소 샐러드", ext: ".jpg" },
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

// 토너먼트 진행을 위한 변수들
// random을 이용하여 배열을 섞는다.
// current : 현재 라운드에 남은 후보
let current = foods.slice().sort(() => Math.random() - 0.5);
// winner : 현재 라운드에서 승리한 후보
let winner = [];

const container = document.getElementById("container");
const roundInfo = document.getElementById("round-info");
const result = document.getElementById("result");

// 16강 8강 4강 등 강수 표시
function round() {
  roundInfo.textContent = `${current.length}강`;
}

/* 매치를 표시함, 이 함수를 반복 호출하여 다음 후보 보이기
 * current 배열에서 후보 2개 pop / 선택을 winner에 추가 */

function displayMatch() {
  container.innerHTML = ""; // 기존 이미지 삭제

  // 현재 라운드에 후보가 없으면(1개의 라운드가 끝남) nextRound에 넣었던 후보를 current로 옮겨줌
  if (current.length === 0) {
    current = winner;
    winner = [];

    // 만약 후보가 1명만 남았다면 우승!
    if (current.length === 1) {
      roundInfo.textContent = "";
      result.textContent = `🎉 ${current[0].title} 🎉`;
      const winnerDiv = document.createElement("div");
      winnerDiv.className = "winner";
      winnerDiv.innerHTML = `
          <img src="asset/${current[0].id}${current[0].ext}" alt="${current[0].title}">
          <div class="overlay">${current[0].title}</div>
        `;
      container.appendChild(winnerDiv);
      return;
    }
    round();
  }

  // 만약 current에 후보가 2명 이상 있다면
  if (current.length >= 2) {
    // 배열의 뒤쪽에서 두 후보를 꺼낸다
    const candidate1 = current.pop();
    const candidate2 = current.pop();

    // 첫 번째 후보 카드 생성
    const div1 = document.createElement("div");
    div1.className = "match-item";
    div1.innerHTML = `
        <img src="asset/${candidate1.id}${candidate1.ext}" alt="${candidate1.title}">
        <div class="overlay">${candidate1.title}</div>
      `;
    // 첫 번째 후보 클릭 시: 선택된 후보를 winner에 추가
    div1.addEventListener("click", () => {
      winner.unshift(candidate1);
      // 다음 대결로 넘어갑니다.
      displayMatch();
    });

    // 두 번째 후보 요소 생성
    const div2 = document.createElement("div");
    div2.className = "match-item";
    div2.innerHTML = `
        <img src="asset/${candidate2.id}${candidate2.ext}" alt="${candidate2.title}">
        <div class="overlay">${candidate2.title}</div>
      `;
    // 두 번째 후보 클릭 시 처리
    div2.addEventListener("click", () => {
      winner.unshift(candidate2);
      displayMatch();
    });

    // 두 후보를 화면에 표시
    container.appendChild(div1);
    container.appendChild(div2);
  }
}

// 초기 라운드 정보 업데이트 후 첫 대결 표시
round();
displayMatch();
