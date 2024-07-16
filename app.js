let choices = [
    "Rock", "Rock", "Rock", "Rock" , "Rock", 
    "Paper", "Paper", "Paper", "Paper","Paper", 
    "Scissor", "Scissor", "Scissor", "Scissor", "Scissor",
    "Spock", "Spock", "Spock", "Spock", "Spock",
    "Lizard", "Lizard", "Lizard", "Lizard", "Lizard"];
let effect = ["Heal 5 HP", "Deal 5 HP"];
let deck = [];

for (choiceCounter=0; choiceCounter < 25; choiceCounter ++) {
    for (effectCounter=0; effectCounter < 2; effectCounter++) {
        deck.push(choices[choiceCounter] + ": " + effect[effectCounter])
    }
    
}


console.log(deck)
