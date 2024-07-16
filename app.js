// let choices = [
//     "Rock", "Rock", "Rock", "Rock" , "Rock", 
//     "Paper", "Paper", "Paper", "Paper","Paper", 
//     "Scissor", "Scissor", "Scissor", "Scissor", "Scissor",
//     "Spock", "Spock", "Spock", "Spock", "Spock",
//     "Lizard", "Lizard", "Lizard", "Lizard", "Lizard"];

let choices = ["Rock", "Paper", "Scissor", "Spock", "Lizard" ]
let effect = ["Heal 5 HP", "Deal 5 HP"];
let deck = [];

for (i =0; i < 5 ; i ++) {
    for (choiceCounter=0; choiceCounter < choices.length; choiceCounter ++) {
        for (effectCounter=0; effectCounter < effect.length; effectCounter++) {
            deck.push(choices[choiceCounter] + ": " + effect[effectCounter])
        }
    }
}

console.log(deck)



//this method is called the Fisher Yates shuffle

function shuffle (deck) {
    
    for (let i = 0 ; i < deck.length; i ++){
        // this is a loop that goes through the whole array 
        let temp = deck[i];
        //this save the current item to a temp variable 
        let r = Math.floor(Math.random() * deck.length);
        //generate a random number in the range of the array 
        deck[i] = deck[r];
        //replace the current item with the random item 
        deck[r] = temp;
        //replace the random item with the current item as temp 
    }
    
}
// console.log(deck) //this works because the function shuffled hasn't been called
// //so everything is in order

// shuffle(deck) //this call the functions to shuffle the deck 

// console.log(deck) //this produces a shuffled deck 
//after shuffled then each player will pick a card until hand = 5


function compare () {
    if (playerChoice === computerChoice) {
        msg = `you tied!`
    } else if (playerChoice === choices[0] && computerChoice === choices[2]) {
        msg = `you win`
    } else if (playerChoice === choices[1] && computerChoice === choices[0]) {
        msg = `you win`
    } else if (playerChoice === choices[2] && computerChoice === choices[1]) {
        msg =`you win`
    } else {
        msg =`you lose! Try again?`
    }    
}






