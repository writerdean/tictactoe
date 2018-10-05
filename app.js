var board = document.querySelector('.board')
var squares = document.querySelectorAll('.square')
var turnIndicator = 'playerOne'; // use this to highlight player section in righthand side
var turnCounter = 0;
var playerOneToken = 'X';  // if turn indicator is player one, use this in the text content
var playerTwoToken = 'O'; // if turn indicator is player two, use this in the text content
var playerOneBox = document.querySelector('.one') // for styling
var playerTwoBox = document.querySelector('.two') // for styling
var activeText = document.querySelector('.active') // for styling
var inActiveText = document.querySelector('.inactive') // for styling
var playerOneClicks = [];
var playerTwoClicks = [];
var winningLine = [];
var clickedSquareId;
var message = document.querySelector('.message');
var button = document.querySelector('.hidden')


var rowOne = ['R1C1', 'R1C2', 'R1C3']
var rowTwo = ['R2C1', 'R2C2', 'R2C3']
var rowThree = ['R3C1', 'R3C2', 'R3C3'] 
var colOne = ['R1C1', 'R2C1', 'R3C1']
var colTwo = ['R1C2', 'R2C2', 'R3C2']
var colThree = ['R1C3', 'R2C3', 'R3C3']
var diagOne = ['R1C1', 'R2C2', 'R3C3']
var diagTwo = ['R1C3', 'R2C2', 'R3C1']

// function test() {
//     for (var i = 0; i < playerOneClicks.length; i++) {
//         if (rowOne.indexOf(playerOneClicks[i]) === -1) {
//             console.log('none found in test function')
//         }
//         console.log(playerOneClicks[i] + rowOne.indexOf)
//     }
// }

function checkForMatch (playerArr, winArr) {

    for(var i = 0; i < winArr.length; i++) {

        if (playerArr.indexOf(winArr[i]) === -1){
            return false
        }  
    }
    return true    
}

function checkIfPlayerWins (person) {
    
    if (checkForMatch(person, rowOne)) {
        return true
    }
    if (checkForMatch(person, rowTwo)) {
        return true
    }
    if (checkForMatch(person, rowThree)) {
        return true
    }
    if (checkForMatch(person, colOne)) {
        return true
    }
    if (checkForMatch(person, colTwo)) {
        return true
    }
    if (checkForMatch(person, colThree)) {
        return true
    }
    if (checkForMatch(person, diagOne)) {
        return true
    }
    if (checkForMatch(person, diagTwo)) {
        return true
    }
    return false
}

function checkForWinner () {
    if(checkIfPlayerWins(playerOneClicks)) {
        console.log('Player One wins!!!!!!')
        playerWins(playerOneBox)
        // message.classList.remove('hidden')
        button.classList.remove('hidden')
        button.textContent = 'Player One Wins!  Play again?'
    } else if(checkIfPlayerWins(playerTwoClicks)) {
        console.log('Player Two wins.')
        playerWins(playerTwoBox)
        // message.classList.remove('hidden')
        button.classList.remove('hidden')
        button.textContent = 'Player Two Wins!  Play again?'
    } else {
        if(document.querySelectorAll('.clicked').length === 9) {
            // message.classList.remove('hidden')
            button.classList.remove('hidden')
            button.textContent = 'It\'s a draw!  Try again?'
        }
    }
}

function playerWins (person) {
    person.classList.add('winner')
    if (person === playerOneBox) {
        playerTwoBox.classList.add('loser')
        person.classList.add('winner')
    } else {
        playerOneBox.classList.add('loser')
    }
}


// this changes the turn to the next person
var nextTurn = function() {
    if(turnIndicator === 'playerOne') {
        turnIndicator = 'playerTwo';
        turnCounter++
    } else {
        turnIndicator = 'playerOne';
        turnCounter++
    }
    toggleActiveClass()
}

// toggles which player box is active (for style purposes)
var toggleActiveClass = function() {
    if(playerOneBox.classList.contains('player-active')) {
        // playerOneBox.textContent
        playerOneBox.classList.remove('player-active')
        playerTwoBox.classList.add('player-active')
    } else {
        playerTwoBox.classList.remove('player-active')
        playerOneBox.classList.add('player-active')
    }
}


// gets the id of the clicked square
function replyClick(clicked_id) {
    clickedSquareId = clicked_id;
    // console.log(clickedSquareId)
}


// this function will enter a token in the square, and indicate that the square has now been clicked
var chooseSquare = function(event) {
    if (event.target.classList.contains('square')) 

        if (event.target.classList.contains('clicked')) {
            alert('Please choose another square')
        } else {
            if(turnIndicator === 'playerOne') {
                event.target.textContent = playerOneToken;
                event.target.classList.add('P1C')
                playerOneClicks.push(clickedSquareId)
                
            } else {
                event.target.textContent = playerTwoToken;
                event.target.classList.add('P2C')
                playerTwoClicks.push(clickedSquareId)
            }
            event.target.classList.add('clicked')
            nextTurn();
        }
    checkForWinner()
}

function reloadPage() {
    window.location.reload();
} 

board.addEventListener('click', chooseSquare)
