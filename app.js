const game = document.querySelector("#game");
let scoreDisplay = document.querySelector("#score");
let score = 0;
// const computer = 18;
// const history = 23;
// const music = 12;
const film = 11;
const genres = [
  {
    name: "film",
    id: 11,
  },
  {
    name: "music",
    id: 12,
  },
  {
    name: "computer",
    id: 18,
  },
  {
    name: "history",
    id: 23,
  },
];
const levels = ["easy", "medium", "hard"];
function addGenre(genre) {
  const column = document.createElement("div");
  column.classList.add("genre-column");
  column.innerHTML = genre.name;
  game.append(column);
  levels.forEach((level) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (level === "easy") {
      card.innerHTML = 100;
    }
    if (level === "medium") {
      card.innerHTML = 200;
    }
    if (level === "hard") {
      card.innerHTML = 300;
    }

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${genre.id}&difficulty=${level}&type=boolean`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results[0]);
        card.setAttribute("data-question", data.results[0].question);
        card.setAttribute("data-answer", data.results[0].correct_answer);
        card.setAttribute("data-value", card.getInnerHTML());
        // card.textContent = data.results[0].question;
      })
      .then((done) => card.addEventListener("click", flipCard));
  });
}

genres.forEach((genre) => addGenre(genre));

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "16px";
  const textDisplay = document.createElement("div");
  const btns = document.createElement("div");
  const trueButton = document.createElement("button");
  const falseButton = document.createElement("button");
  textDisplay.classList.add("text-display");
  trueButton.classList.add("true-button", "btn");
  falseButton.classList.add("false-button", "btn");
  trueButton.innerHTML = "True";
  falseButton.innerHTML = "False";
  trueButton.addEventListener("click", getResult);
  falseButton.addEventListener("click", getResult);
  textDisplay.innerHTML = this.getAttribute("data-question");
  this.append(textDisplay, btns);
  btns.append(trueButton, falseButton);
  const allCards = Array.from(document.querySelectorAll(".card"));
  // open one card, another close
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  // click vào true/ false thì hàm này run => các card lắng nghe
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));
  //
  const cardOfButton = this.closest(".card");
  score = parseInt(scoreDisplay.innerText);
  if (cardOfButton.getAttribute("data-answer") === this.innerHTML) {
    score += parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerText = "" + score;
    cardOfButton.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
  }

  cardOfButton.removeEventListener("click", flipCard);
}
