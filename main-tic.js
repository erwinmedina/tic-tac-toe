// CONSTANTS //
let colors = {
    '1': '#51e2f5',
    '-1': '#FFFFFF',
}

let options = {
    '0': null,
    '1': 'X',
    '-1': 'O',
}

let points = {
    '1': 0,
    '-1': 0,
}

let board, turn, winner, winBoard;

let winningCombos = [
    [0,1,2], // row 1
    [3,4,5], // row 2
    [6,7,8], // row 3
    [0,3,6], // col 1
    [1,4,7], // col 2
    [2,5,8], // col 3
    [0,4,8], // diag 1
    [2,4,6]  // diag 2
];

// CACHED ELEMENT REFERENCES //
const boxes = [...document.querySelectorAll('.rows > div')];
const pointX = document.getElementById('pointX');
const pointO = document.getElementById('pointO');
const message = document.getElementById('message');
const playAgain = document.getElementById("again");
const resetButton = document.getElementById("reset");
initialize();

// EVENT LISTENERS //
for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', handleClick);
}
playAgain.addEventListener("click", function(){
    boxes.forEach(function(box) {
        box.style.background = null;
    });
    initialize();
});
resetButton.addEventListener("click", reset);

// HANDLES THE CLICK EVENTS //
function handleClick(event) {
    const boxesIndex = boxes.indexOf(event.target);

    // If box is non-empty or there is a winner, stop //
    if ((winner || board[boxesIndex] !== 0)) {
        return;
    }
    // Add turn to board array //
    board[boxesIndex] = turn;
    winner = getWinner();
    turn *= -1; 
    render();
}

// FUNCTIONS //
function initialize() {
    winBoard = [];
    board = [0,0,0,0,0,0,0,0,0];
    turn = 1; // Player1 = 1, Player2 = -1
    winner = null; // represents win, tie, or in progress
    render();
}

function render() {
    // Renders board. Iterates over board array //
    board.forEach(function(cellValue, index) {
        const cell = document.getElementById(index);
        cell.style.color = colors[cellValue];
        cell.innerHTML = options[cellValue];
        pointX.innerHTML = points[1];
        pointO.innerHTML = points[-1];
    })

    playAgain.style.visibility = winner ? 'visible' : 'hidden';
    resetButton.style.visibility = winner ? 'visible' : 'hidden';


    // Renders messages regarding win/tie/loss //
    if (winner === "Tie") {
        message.textContent = "It's a Tie!";
    }
    else if (winner) {
        message.innerHTML = `${options[winner].toUpperCase()} WINS!`;
    }
    else {
        message.innerHTML = `${options[turn].toUpperCase()}'S TURN`
    }
}

function getWinner() {
    for (var i = 0; i < winningCombos.length; i++)
    {
        if (Math.abs((
            board[winningCombos[i][0]] 
            + board[winningCombos[i][1]] 
            + board[winningCombos[i][2]])) === 3)
        {
            winBoard.push(
                winningCombos[i][0],
                winningCombos[i][1],
                winningCombos[i][2]);
            winner = turn;
            colorWinner();
        }
    }
    if (!board.includes(0) && !winner) {
        winner = "Tie";
    }
    if (winner && (winner !== "Tie")) {
        points[turn] += 1;
    }
    return winner;
}

function reset() {
    for (value in points) {
        points[value] = 0;
    }
    boxes.forEach(function(box) {
        console.log(box);
        box.style.background = null;
    });

    initialize();
}

function colorWinner() {
    for (i in winBoard) {
        if (winner) {
            boxes[winBoard[i]].style.background = '#008000';
        }
    }
}
