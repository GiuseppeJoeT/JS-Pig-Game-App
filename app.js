/* The PIG GAME Web App */

// variable declaration
var scores, roundScore, activePlayer, gamePlaying;
// when the game start the gamePlaying value is TRUE

var lastDice;

// the init() reset player total score, activePlayer and roundScore. Hide the Dice image and set total score and current score box to 0
init();

// VARIABLE DEFINITION
// this variable keeps track of both players score
scores = [0,0];

roundScore = 0;
activePlayer = 0;

// Set the text content
// document.querySelector('#current-' + activePlayer).textContent = dice;

// ROLL DICE button Listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    // the gamePlaying var is alreay declared to TRUE so we do not need other conditions
    if (gamePlaying) {

        // 1. Random number
        
        // Math.floor transform a decimal to an integer
        // (Math.random() * 6) gives us numbers between 0 and 5, so we add 1 to generate a value between 1 and 6 
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        // we use the .src() method because the .dice class is an IMG html tag
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice === 6 && lastDice === 6) {
            // Player looses his total score
            scores[activePlayer] = 0;
            document.querySelector('#current-' + activePlayer).textContent = scores[activePlayer];
            window.alert('Player ' + activePlayer + 'loose its total score because rolls two six in a row. ');
            nextPlayer();
        } else if (dice !== 1) {
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // ELSE IF the rolled number was a 1, next player turn
            nextPlayer();
        }

        var lastDice = dice;

    } // closing IF (gamePlaying) {}
});

// HOLD button listener
document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        // add  CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
    
        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        var input = document.querySelector('.final-score').value;
        var winningScore;
        // test input Log
        console.log(input);
        
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            
            document.querySelector('.player-' + activePlayer +  '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer +  '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;

        } else {
            // next player turn
            nextPlayer();
        }
    }
    

});

function nextPlayer() {
    // if activePlayer === 0 makes it equal to 1 otherwise equal to 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    // update the CURRENT score box
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

// Start a new game
document.querySelector('.btn-new').addEventListener('click',function() {
    init();
});

// init() function
function init() {
    // reset player total score, activePlayer and roundScore
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    // the gamePlaying is a STATE VARIABLE, tell us the condition of a system
    gamePlaying = true;
    
    // hide the Dice image
    document.querySelector('.dice').style.display = 'none';

    // set total score and current score box to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}

