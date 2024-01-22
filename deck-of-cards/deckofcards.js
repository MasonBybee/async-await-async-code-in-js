const body = document.querySelector("body");
let cardDiv = document.querySelector(".card-div");
const gimmeBtn = document.querySelector(".gimme-btn");
const shuffleBtn = document.querySelector(".shuffle-btn");
let deck_id;
let remaining;

// async function part1() {
//   try {
//     const { data: deckdata } = await axios.get(
//       `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
//     );
//     const { data } = await axios.get(
//       `https://deckofcardsapi.com/api/deck/${deckdata.deck_id}/draw/?count=1`
//     );
//     card = data.cards[0];
//     console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
//   } catch {
//     (e) => console.log("Error!", e);
//   }
// }

// part1();

// 2.

// async function drawCard(count = 1) {
//   try {
//     const { data } = await axios.get(
//       `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`
//     );
//     return data;
//   } catch {
//     (e) => console.log("Error!", e);
//   }
// }

// async function part2() {
//   try {
//     const { data } = await axios.get(
//       `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
//     );
//     deck_id = data.deck_id;
//     const card1 = await drawCard();
//     const card2 = await drawCard();
//     console.log(
//       `${card1.cards[0].value.toLowerCase()} of ${card1.cards[0].suit.toLowerCase()}`
//     );
//     console.log(
//       `${card2.cards[0].value.toLowerCase()} of ${card2.cards[0].suit.toLowerCase()}`
//     );
//   } catch {
//     (e) => console.log("Error!", e);
//   }
// }

// part2();

async function initGame(count = 1) {
  const { data } = await axios.get(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${count}`
  );
  gimmeBtn.style.visibility = "visible";
  deck_id = data.deck_id;
  remaining = data.remaining;
}

initGame();

function randNum(numRange) {
  return Math.floor(Math.random() * (numRange * 2) + 2) - (numRange + 2);
}

async function drawCard() {
  try {
    if (remaining > 0) {
      const { data } = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
      );
      remaining = data.remaining;
      img = document.createElement("img");
      img.src = data.cards[0].image;
      img.style.rotate = `${randNum(45)}deg`;
      img.style.top = `${randNum(30)}px`;
      img.style.left = `${randNum(30)}px`;
      cardDiv.append(img);
    } else {
      gimmeBtn.style.visibility = "hidden";
      shuffleBtn.style.visibility = "visible";
    }
  } catch {
    (e) => console.log("Error!", e);
  }
}

gimmeBtn.addEventListener("click", drawCard);

async function shuffle() {
  const { data } = await axios.get(
    `https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`
  );
  remaining = data.remaining;
  cardDiv.innerHTML = "";
  gimmeBtn.style.visibility = "visible";
  shuffleBtn.style.visibility = "hidden";
}

shuffleBtn.addEventListener("click", shuffle);
