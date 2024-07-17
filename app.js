// let choices = [
//     "Rock", "Rock", "Rock", "Rock" , "Rock", 
//     "Paper", "Paper", "Paper", "Paper","Paper", 
//     "Scissor", "Scissor", "Scissor", "Scissor", "Scissor",
//     "Spock", "Spock", "Spock", "Spock", "Spock",
//     "Lizard", "Lizard", "Lizard", "Lizard", "Lizard"];
let outcome // `user`, `computer`, `draw` 
// let playerHp = 30
// let computerHp = 20
// Cached Element //
const computerCardDisplay = document.querySelector(`#computer-cards`)
const userCardDisplay = document.querySelector(`#user-cards`)


// let choices = ["Rock", "Paper", "Scissor", "Spock", "Lizard" ]
// let effect = ["Heal 5 HP", "Deal 5 HP"];
// let deck = [];

let computerHidden
let playerDeck
let compareZone
let name

function init () {

}

const game = {
    playerHp :30,
    computerHp :20,
    choices: [
        {name: "Rock", type: "Damage", effect: -5, description: "Deal 5 damage to your opponent"},
        {name: "Rock", type: "Heal", effect: 5, description: "Heal 5 HP"},
        {name: "Paper", type: "Damage", effect: -5, description: "Deal 5 damage to your opponent"},
        {name: "Paper", type: "Heal", effect: 5, description: "Heal 5 HP"},
        {name: "Scissor", type: "Damage", effect: -5, description: "Deal 5 damage to your opponent"},
        {name: "Scissor", type: "Heal", effect: 5, description: "Heal 5 HP"},
        {name: "Spock", type: "Damage", effect: -5, description: "Deal 5 damage to your opponent"},
        {name: "Spock", type: "Heal", effect: 5, description: "Heal 5 HP"},
        {name: "Lizard", type: "Damage", effect: -5, description: "Deal 5 damage to your opponent"},
        {name: "Lizard", type: "Heal", effect: 5, description: "Heal 5 HP"},
    ],
}


let deck = createDeck(5)


function createDeck (numberCopies) {

    let deckArray = [];

    for (let choiceIndex = 0; choiceIndex < game.choices.length; choiceIndex ++ ) {
        for (let cardCounter = 0; cardCounter < numberCopies; cardCounter ++) {
            deckArray.push(game.choices[choiceIndex])
        }
    }
    return deckArray
}



//this method is called the Fisher Yates shuffle

function shuffle (deckArray) {
    
    for (let i = 0 ; i < deckArray.length; i ++){
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
    return deckArray
}

// shuffle (deck) // this has shuffled the deck for play


function startGame () {
    for (i =0; i <10; i++){
        console.log(deck[i])
    }
    let computerHidden = []
    for (i=0 ; i<5; i++ ) {
        computerHidden.push(deck[i]) 
        deck.splice(i,1)
    } 
    let playerDeck = []
    for (i =0; i<5; i++){
        playerDeck.push(deck[i])
        deck.splice(i,1)
    } 
    
    render (computerHidden,playerDeck)

    
    // let playerDeck =[]
    // for (i=0; i<5; i++) {
    //     playerDeck = deck.shift()
    //     card = deck.shift
    //     // cardImg.src = "./card/" + card + ".png"
    // }
    // console.log(deck)
    console.log(`computer deck:`, computerHidden)
    // console.log(`playerDeck:`, playerDeck )
    // console.log(deck)
}

function render (computerDeck, playerDeck) {
    console.log(computerDeck)
    for (i = 0; i <computerDeck.length; i++){
        const newCard = document.createElement("img")
        newCard.src = `./card/CardBack.png`
        computerCardDisplay.appendChild(newCard)
    }
    for (i =0; i<playerDeck.length; i++){
        const userCard = document.createElement("img")
        userCard.src = `./card/${playerDeck[i].name}${playerDeck[i].type}.png` 
        userCardDisplay.appendChild(userCard)

    }
}

shuffle (deck)
startGame()


function getName(card) { // this gets the name of the card in the compare zone
    let name = card[0].name /// this gets the name of the card in the compare zone 
    
}

function getType (card) {
    let type =card[0].type
}


//after shuffled then each player will pick a card until hand = 5


function compare () {
    if (playerChoice === computerChoice) {
        return outcome = `draw` // meaning nobody won
    } else if (
        playerChoice === choices[0] && computerChoice === choices[2] || 
        playerChoice === choices[0] && computerChoice === choices[4] ||
        playerChoice === choices[1] && computerChoice === choices[0] ||
        playerChoice === choices[1] && computerChoice === choices[3] ||
        playerChoice === choices[2] && computerChoice === choices[1] ||
        playerChoice === choices[2] && computerChoice === choices[4] ||
        playerChoice === choices[3] && computerChoice === choices[0] ||
        playerChoice === choices[3] && computerChoice === choices[2] ||
        playerChoice === choices[4] && computerChoice === choices[1] ||
        playerChoice === choices[4] && computerChoice === choices[3] 
    ) {
        return outcome = `user` // meaning player won 
    } else  {
        return outcome = `computer` // meaning computer won
    }
}

function checkDamageCard () {
    if (compareResult === `user` || compareResult === `computer`) 
        { if (card.ID === `Damage`) {
            return true
        } else {
            return false
        }
    }
}





function triggerCardEffect (compareResult, checkDamageCard) {
    if (compareResult === `user`){
        if (checkDamageCard === true) {
            computerHP -= 5
            return computerHp
        } else {
            playerHP += 5
            return playerHp
        }
    } else if (compareResult === `computer`) {
        if (checkDamageCard === true){
            playerHp -=5
        } else {
            computerHp += 5
            return computerHp
        }
    }
}

function dealingDamage(compareResult) {
    if (compareResult === `user`) {
        computerHp -= 5
        return computerHp
    } else if (compareResult === `computer`) {
        playerHp -= 5
        return playerHp
    } else {
        return
    }
}


function healDamage(compareResult) {
    if (compareResult === `user`) {
        playerHp += 5
        return playerHp
    } else if (compareResult === `computer`) {
        computerHp += 5
        return computerHp
    } else {
        return
    }
}

function effectTrigger () {

}

function effectHalt () {
    return
}

function play() {


}
