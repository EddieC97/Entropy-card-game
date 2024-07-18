// --------------- Constants --------------- //

const CHOICES = [
  {
    id: 0,
    name: "Rock",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 1, name: "Rock", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    id: 2,
    name: "Paper",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 3, name: "Paper", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    id: 4,
    name: "Scissor",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 5, name: "Scissor", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    id: 6,
    name: "Spock",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 7, name: "Spock", type: "Heal", effect: 5, description: "Heal 5 HP" },
  {
    id: 8,
    name: "Lizard",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 9, name: "Lizard", type: "Heal", effect: 5, description: "Heal 5 HP" },
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

// --------------- Variables --------------- //

let computerHidden;
let compareZone;
let name;
let deck;
let roundWinner;
let player;
let computer;

// --------------- Start Game --------------- //
startGame();

function startGame() {
  deck = createDeck(5);
  roundWinner = null;

  player = {
    name: "Player",
    hp: 30,
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
      deckArray.push(CHOICES[choiceIndex]);
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

  if (hasPlayerWon === true) {
    roundWinner = player;
  } else {
    roundWinner = computer;
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
    computerCardDisplay.appendChild(newCardEl);
  });

  userCardDisplay.innerHTML = "";
  player.hand.forEach((card, i) => {
    const newCardEl = document.createElement("img");
    newCardEl.src = `./card/${card.name}${card.type}.png`;
    newCardEl.addEventListener(`click`, () => handleClick(card));
    userCardDisplay.appendChild(newCardEl);
  });
}

function renderCompareZone() {
  compareZoneDisplay.innerHTML = "";

  if (player.choice === null) return;

  const playerCardEl = document.createElement("img");
  playerCardEl.src = `./card/${player.choice.name}${player.choice.type}.png`;

  const computerCardEl = document.createElement("img");
  computerCardEl.src = `./card/${computer.choice.name}${computer.choice.type}.png`;

  compareZoneDisplay.append(computerCardEl, playerCardEl);
}

function renderHp() {
  computerHpDisplay.textContent = computer.hp;
  userHpDisplay.textContent = player.hp;
}

function renderMessage() {
  messageDisplay.innerHTML = "";

  if (roundWinner === null) return;

  messageDisplay.textContent = `${roundWinner.name} wins!`;
}

function handleClick(card) {
  player.choice = card;
  player.hand = player.hand.filter((playCard) => playCard.id !== card.id);
  const i = Math.floor(Math.random() * computer.hand.length);
  const computerCard = computer.hand[i];
  computer.choice = computerCard;
  computer.hand = computer.hand.filter(
    (compCard) => compCard.id !== computerCard.id
  );
  checkForRoundWinner();
  render();
}
