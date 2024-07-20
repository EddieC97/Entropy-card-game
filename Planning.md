# Project name: Entropy (meaning the more you play the more chaotic it will be)

## General idea:

The logic of the game will be rock, paper, scissor, Lizard, Spock: I am adding 2 new element so it won't be too similar to the typical rock,paper,scissor game which will be coded into cards
I will be adding the cards into the mix so in the beginning of the game: each player will be starting out with a health pool of 20. Each player will draw 5 cards. (thinking of adding a discard option at this beginning step but I will see how I go with my base game first)

Each card will also have specific actions that will be performed if they win the duel. For example, if they win the round, the card action can be -5HP from the opposing player or heal +5HP to the player. (If I have time, I can add more cards with other actions that are activated when the player wins, such as drawing 2 additional cards; seeing the other player's hand;  discarding 2 cards from the opponent hand or swapping hands with the other player).


Each turn, players will select a card and the rock, paper, scissor, Lizard, Spock logic will apply. At the end of the turn, each player will draw a card and the winning condition is when one of the player's HP drops to zero.
(if I have more time, I am thinking of putting something like a timer: for example, after 15 rounds, then each card drawn will inflict -1 then -2 then -3 etc to make sure the game doesn't go on forever)

## HTML:
Nav bar to display what is the game and how to play the game\
Player Hand : displays the user's cards\
Computer Hand: displays the computer's card( this case will just be the card back)\
Compare Zone: to display the selected card\
Message: to display what is the outcome 

## JS:
## const:
choices so I can loop through to create copies of cards to generate a deck

Winning combos to loop through to find the winner 

## let:
Player\
playerHp\
Computer\
computerHp\
Compare Zone\
Deck

## Event listener:
reset button\
click 

## functions:
renderCard function\
shuffleDeck function\
renderPlayerHand function\
renderComputerHand function\
renderResults function

















