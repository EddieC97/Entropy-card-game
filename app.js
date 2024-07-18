// let choices = [
//     "Rock", "Rock", "Rock", "Rock" , "Rock",
//     "Paper", "Paper", "Paper", "Paper","Paper",
//     "Scissor", "Scissor", "Scissor", "Scissor", "Scissor",
//     "Spock", "Spock", "Spock", "Spock", "Spock",
//     "Lizard", "Lizard", "Lizard", "Lizard", "Lizard"];
let outcome; // `user`, `computer`, `draw`
// let playerHp = 30
// let computerHp = 20

// --------------- Constants --------------- //

const CHOICES = [
  {
    id: 0,
    name: "Rock",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 1, 
    name: "Rock", 
    type: "Heal", 
    effect: 5, 
    description: "Heal 5 HP" },
  {
    id: 2,
    name: "Paper",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 3, 
    name: "Paper", 
    type: "Heal", 
    effect: 5, 
    description: "Heal 5 HP" },
  {
    id: 4,
    name: "Scissor",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 5, 
    name: "Scissor", 
    type: "Heal", 
    effect: 5, 
    description: "Heal 5 HP" },
  {
    id: 6,
    name: "Spock",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 7, 
    name: "Spock", 
    type: "Heal", 
    effect: 5, 
    description: "Heal 5 HP" },
  {
    id: 8,
    name: "Lizard",
    type: "Damage",
    effect: 5,
    description: "Deal 5 damage to your opponent",
  },
  { id: 9, 
    name: "Lizard", 
    type: "Heal", 
    effect: 5, 
    description: "Heal 5 HP" },
];

const WINNING_COMBOS = {
  Rock: ["Scissor", "Lizard"],
  Paper: ["Rock", "Spock"],
  Scissor: ["Paper", "Lizard"],
  Spock: ["Scissor", "Rock"],
  Lizard: ["Spock", "Paper"],
};

// function compare () {
//     if (game.playerChoice === game.computerChoice) {
//         return outcome = `draw` // meaning nobody won
//     } else if (
//         game.playerChoice === CHOICES[0] && game.computerChoice === CHOICES[2] ||
//         game.playerChoice === CHOICES[0] && game.computerChoice === CHOICES[4] ||
//         game.playerChoice === CHOICES[1] && game.computerChoice === CHOICES[0] ||
//         game.playerChoice === CHOICES[1] && game.computerChoice === CHOICES[3] ||
//         game.playerChoice === CHOICES[2] && game.computerChoice === CHOICES[1] ||
//         game.playerChoice === CHOICES[2] && game.computerChoice === CHOICES[4] ||
//         game.playerChoice === CHOICES[3] && game.computerChoice === CHOICES[0] ||
//         game.playerChoice === CHOICES[3] && game.computerChoice === CHOICES[2] ||
//         game.playerChoice === CHOICES[4] && game.computerChoice === CHOICES[1] ||
//         game.playerChoice === CHOICES[4] && game.computerChoice === CHOICES[3]
//     ) {
//         return outcome = `user` // meaning player won
//     } else  {
//         return outcome = `computer` // meaning computer won
//     }
// }

// if (board[combo[0]] === turn && board[combo[1]] === turn && board[combo[2]] === turn){
//         winner = true

//  using Array.every()
// if(combo.every(index => board[index] === turn)) {
//     winner = true
// }
// })

// --------------- Cached DOM Elements ---------- //

const computerCardDisplay = document.querySelector(`#computer-cards`);
const userCardDisplay = document.querySelector(`#user-cards`);
const compareZoneDisplay = document.querySelector(`#compare-zone`);
const messageDisplay = document.querySelector(`#message`);
const computerHpDisplay = document.querySelector(`#computerHp`)
const userHpDisplay = document.querySelector(`#userHp`)

// let choices = ["Rock", "Paper", "Scissor", "Spock", "Lizard" ]
// let effect = ["Heal 5 HP", "Deal 5 HP"];
// let deck = [];

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

//this method is called the Fisher Yates shuffle

function shuffleDeck(deckArray) {
  for (let i = 0; i < deckArray.length; i++) {
    // this is a loop that goes through the whole array
    let temp = deckArray[i];
    //this save the current item to a temp variable
    let r = Math.floor(Math.random() * deckArray.length);
    //generate a random number in the range of the array
    deckArray[i] = deckArray[r];
    //replace the current item with the random item
    deckArray[r] = temp;
    //replace the random item with the current item as temp
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
    triggerCardType(roundWinner)
  }

function triggerCardType (winner) {
    if (winner === player){
        if (player.choice.type === "Damage") {
            computer.hp -= player.choice.effect
        } else if (player.choice.type === "Heal")
            player.hp += player.choice.effect
    } else if (winner === computer) {
        if (computer.choice.type === "Damage") {
            player.hp -= computer.choice.effect
        } else if (computer.choice.type === "Heal") {
            computer.hp += computer.choice.effect
    }
  }
}

// function checkForRoundWinner () {
//     if (player.choice === computer.choice){
//         msg = `you tied`
//         messageDisplay.textContent = msg
//     } else if (player.choice.name === "Rock" && 
//         player.choice.type === "Damage" &&
//         computer.choice.name === "Scissor" &&
//         computer.choice.type === "Damage") {
//             msg = `You won, deal 5HP damage to your opponent`
//             messageDisplay.textContent = msg
//     }else if (player.choice.name === "Rock" && 
//         player.choice.type === "Damage" &&
//         computer.choice.name === "Scissor" &&
//         computer.choice.type === "Heal") {
//             msg =`You won, deal 5HP damage to your opponent`
//             messageDisplay.textContent = msg
//     }else if (player.choice.name === "Rock" && 
//         player.choice.type === "Damage" &&
//         computer.choice.name === "Lizard" &&
//         computer.choice.type === "Damage") {
//             msg = `You won, deal 5HP damage to your opponent`
//             messageDisplay.textContent = msg
//     }else if (player.choice.name === "Rock" && 
//         player.choice.type === "Damage" &&
//         computer.choice.name === "Lizard" &&
//         computer.choice.type === "Heal") {
//             msg = `You won, deal 5HP damage to your opponent`
//             messageDisplay.textContent = msg
//     } else if (player.choice.name === "Rock" && 
//         player.choice.type === "Heal" &&
//         computer.choice.name === "Scissor" &&
//         computer.choice.type === "Damage") {
//             msg = `You won, heal 5HP`
//             messageDisplay.textContent = msg
//     }else if (player.choice.name === "Rock" && 
//         player.choice.type === "Heal" &&
//         computer.choice.name === "Scissor" &&
//         computer.choice.type === "Heal") {
//             msg = `You won, heal 5HP`
//             messageDisplay.textContent = msg
//     }else if (player.choice.name === "Rock" && 
//         player.choice.type === "Heal" &&
//         computer.choice.name === "Lizard" &&
//         computer.choice.type === "Heal") {
//             msg = `You won, heal 5HP`
//             messageDisplay.textContent = msg
//     }else if (player.choice.name === "Rock" && 
//         player.choice.type === "Heal" &&
//         computer.choice.name === "Lizard" &&
//         computer.choice.type === "Heal") {
//             msg = `You won, heal 5HP`
//             messageDisplay.textContent = msg
//     }
    
// }

// checkForRoundWinner()

// checkForRoundWinnerAndType()

function render() {
  renderHands();
  renderCompareZone();
  renderHp();
  renderMessage();
  // render hp
  // render message
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

computerHpDisplay.textContent = computer.hp
userHpDisplay.textContent = player.hp


  
}

function renderMessage() {
  messageDisplay.innerHTML = "";

  if (roundWinner === null) return;

  messageDisplay.textContent = `${roundWinner.name} wins!`;
}

function handleClick(card) {
  // update player card state
  player.choice = card;
  // playerHand = playerHand.filter(card => card.id !== card.id)
  player.hand = player.hand.filter((playCard) => playCard.id !== card.id);
  // pick random card for computer
  const i = Math.floor(Math.random() * computer.hand.length);
  const computerCard = computer.hand[i];
  computer.choice = computerCard;
  computer.hand = computer.hand.filter(
    (compCard) => compCard.id !== computerCard.id

    
  );
checkForRoundWinner()
render();
}

//after shuffled then each player will pick a card until hand = 5

// function getName(card) {
//   // this gets the name of the card in the compare zone
//   let name = card[0].name; /// this gets the name of the card in the compare zone
// }

// function getType(card) {
//   let type = card[0].type;
// }

// function checkDamageCard() {
//   if (compareResult === `user` || compareResult === `computer`) {
//     if (card.ID === `Damage`) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

// function triggerCardEffect(compareResult, checkDamageCard) {
//   if (compareResult === `user`) {
//     if (checkDamageCard === true) {
//       computerHP -= 5;
//       return computerHp;
//     } else {
//       playerHP += 5;
//       return playerHp;
//     }
//   } else if (compareResult === `computer`) {
//     if (checkDamageCard === true) {
//       playerHp -= 5;
//     } else {
//       computerHp += 5;
//       return computerHp;
//     }
//   }
// }

// function dealingDamage(compareResult) {
//   if (compareResult === `user`) {
//     computerHp -= 5;
//     return computerHp;
//   } else if (compareResult === `computer`) {
//     playerHp -= 5;
//     return playerHp;
//   } else {
//     return;
//   }
// }

// function healDamage(compareResult) {
//   if (compareResult === `user`) {
//     playerHp += 5;
//     return playerHp;
//   } else if (compareResult === `computer`) {
//     computerHp += 5;
//     return computerHp;
//   } else {
//     return;
//   }
// }

// function effectTrigger() {}

// function effectHalt() {
//   return;
// }

// function play() {}
