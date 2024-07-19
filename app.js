// --------------- Constants --------------- //

const uid = new ShortUniqueId({ length: 10 });

const CHOICES = [
  {
    name: "Rock",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { name: "Rock", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    name: "Paper",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { name: "Paper", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    name: "Scissor",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { name: "Scissor", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    name: "Spock",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { name: "Spock", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    name: "Lizard",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { name: "Lizard", type: "Heal", effect: 5, description: "Heal 5 HP" },
];

const WINNING_COMBOS = {
  Rock: ["Scissor", "Lizard"],
  Paper: ["Rock", "Spock"],
  Scissor: ["Paper", "Lizard"],
  Spock: ["Scissor", "Rock"],
  Lizard: ["Spock", "Paper"],
};

// --------------- Cached DOM Elements ---------- //

const computerCardDisplay = document.querySelector(`#computer-cards`);
const userCardDisplay = document.querySelector(`#user-cards`);
const compareZoneDisplay = document.querySelector(`#compare-zone`);
const messageDisplay = document.querySelector(`#message`);
const computerHpDisplay = document.querySelector(`#computerHp`);
const userHpDisplay = document.querySelector(`#userHp`);
const resetButtonEl = document.querySelector(`#Reset`);
const whatGameButtonEl = document.querySelector(`#whatGame`);

// --------------- Variables --------------- //

let computerHidden;
let compareZone;
let name;
let deck;
let roundWinner;
let player;
let computer;
let gameOver;

// --------------- Start Game --------------- //
startGame();

function startGame() {
  deck = createDeck(5);
  roundWinner = null;
  gameOver = false;

  player = {
    name: "Player",
    hp: 20,
    choice: null,
    hand: createHand(),
  };

  computer = {
    name: `Computer`,
    hp: 20,
    choice: null,
    hand: createHand(),
  };

  render();
}

// --------------- Event Listeners --------------- //

resetButtonEl.addEventListener(`click`, startGame);

// --------------- Functions --------------- //

function createHand() {
  let hand = [];

  for (let i = 0; i < 5; i++) {
    hand.push(deck.pop());
  }

  return hand;
}

function createDeck(numberCopies) {
  let deckArray = [];

  for (let choiceIndex = 0; choiceIndex < CHOICES.length; choiceIndex++) {
    for (let cardCounter = 0; cardCounter < numberCopies; cardCounter++) {
      let cardId = { id: uid.rnd() };

      let cardCopy = Object.assign(cardId, CHOICES[choiceIndex]);

      deckArray.push(cardCopy);
    }
  }
  return shuffleDeck(deckArray);
}

function shuffleDeck(deckArray) {
  for (let i = 0; i < deckArray.length; i++) {
    let temp = deckArray[i];

    let r = Math.floor(Math.random() * deckArray.length);

    deckArray[i] = deckArray[r];

    deckArray[r] = temp;
  }
  return deckArray;
}

function checkForRoundWinner() {
  const hasPlayerWon = WINNING_COMBOS[player.choice.name].includes(
    computer.choice.name
  );
  const hasComputerWon = WINNING_COMBOS[computer.choice.name].includes(
    player.choice.name
  );

  if (hasPlayerWon === true) {
    roundWinner = player;
  } else if (hasComputerWon) {
    roundWinner = computer;
  } else if (!hasComputerWon && !hasPlayerWon) {
    roundWinner = `tie`;
  }
  triggerCardType(roundWinner);
}

function triggerCardType(winner) {
  if (winner === player) {
    if (player.choice.type === "Damage") {
      computer.hp -= player.choice.effect;
    } else if (player.choice.type === "Heal") player.hp += player.choice.effect;
  } else if (winner === computer) {
    if (computer.choice.type === "Damage") {
      player.hp -= computer.choice.effect;
    } else if (computer.choice.type === "Heal") {
      computer.hp += computer.choice.effect;
    }
  }
}

function render() {
  renderHands();
  renderCompareZone();
  renderHp();
  renderMessage();
}

function renderHands() {
  computerCardDisplay.innerHTML = "";

  computer.hand.forEach((card, i) => {
    const newCardEl = document.createElement("img");
    newCardEl.src = `./card/CardBack.png`;
    newCardEl.alt = `opponent's card back`;
    computerCardDisplay.appendChild(newCardEl);
  });

  userCardDisplay.innerHTML = "";
  player.hand.forEach((card, i) => {
    const newCardEl = document.createElement("img");
    newCardEl.src = `./card/${card.name}${card.type}.png`;
    newCardEl.alt = `${card.name} ${card.description}`;
    newCardEl.addEventListener(`click`, () => handleClick(card));
    userCardDisplay.appendChild(newCardEl);
  });
}

function renderCompareZone() {
  compareZoneDisplay.innerHTML = "";

  if (player.choice === null) return;

  const playerCardEl = document.createElement("img");
  playerCardEl.src = `./card/${player.choice.name}${player.choice.type}.png`;
  playerCardEl.alt = `${player.choice.name} ${player.choice.description}`;

  const computerCardEl = document.createElement("img");
  computerCardEl.src = `./card/${computer.choice.name}${computer.choice.type}.png`;
  computerCardEl.alt = `${computer.choice.name} ${computer.choice.description}`;

  compareZoneDisplay.append(computerCardEl, playerCardEl);
}

function renderHp() {
  computerHpDisplay.textContent = computer.hp;
  userHpDisplay.textContent = player.hp;
}

function renderMessage() {
  if (roundWinner === `tie`) {
    messageDisplay.textContent = `You Tied!`;
  } else if (roundWinner === null) {
    messageDisplay.innerHTML = "";
  } else {
    messageDisplay.textContent = `${roundWinner.name} wins!`;
  }
}

function handleClick(card) {
  if (gameOver) {
    return;
  }
  player.choice = card;
  player.hand = player.hand.filter((playCard) => playCard.id !== card.id);
  const i = Math.floor(Math.random() * computer.hand.length);
  const computerCard = computer.hand[i];
  computer.choice = computerCard;
  computer.hand = computer.hand.filter(
    (compCard) => compCard.id !== computerCard.id
  );
  checkForRoundWinner();
  checkHand();
  render();
  gameWinner();
}

function checkHand() {
  if (deck.length === 0) {
    deck = createDeck(5);
  }

  if (player.hand.length < 5) {
    player.hand.push(deck.pop());
  }
  if (computer.hand.length < 5) {
    computer.hand.push(deck.pop());
  }
}

function gameWinner() {
  if (player.hp < 1) {
    messageDisplay.textContent = `Computer wins, try again by pressing the reset button`;
    gameOver = true;
  } else if (computer.hp < 1) {
    messageDisplay.textContent = `Player wins, try again by pressing the reset button `;
    gameOver = true;
  }
}

function toggleWhatGamePopup() {
  let popupGame = document.getElementById("popupGame");
  popupGame.style.visibility =
    popupGame.style.visibility === "visible" ? "hidden" : "visible";
}

function toggleHowGamePopup() {
  let popupHow = document.getElementById("popupHow");
  popupHow.style.visibility =
    popupHow.style.visibility === "visible" ? "hidden" : "visible";
}

function toggleGalaxyBackground() {
  let GalaxyBackground = document.getElementById("GalaxyBackground");
  GalaxyBackground.style.visibility =
    GalaxyBackground.style.visibility === "visible" ? "hidden" : "visible";
  let HP = document.querySelectorAll(`.HP`);
  HP.forEach((hp) => {
    hp.classList.toggle(`darkMode`);
  });
}

