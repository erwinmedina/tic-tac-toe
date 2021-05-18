let options = ['X', 'O'];
let board = [0,0,0,0,0,0,0,0];
let count = 1;
let gameState = 0;

// ************************************ //
// THIS LISTENS FOR ALL CLICKS ON BOARD //
// ************************************ //
const boxes = document.querySelectorAll('.rows > div');
const button = document.querySelector('button');

function handleClick(event)
{
    if (count === 1)
    {
        if (event.target.innerHTML === "")
        {
            board[event.target.id] = 1;
            event.target.innerHTML = options[0];
            count = 0;
            wins();
            if (gameState === 1)
            {
                boxes.style.pointerEvents = 'none';
            }
        }
    }
    else 
    {
        if (event.target.innerHTML === "")
        {
            board[event.target.id] = -1;
            event.target.innerHTML = options[1];
            count = 1;
            wins();
            if (gameState === 1)
            {
                boxes.style.pointerEvents = 'none';
            }
        }
    }
}


function wins()
{
    let w1 = (board[0] + board[1] + board[2]); // Row 1
    let w2 = (board[3] + board[4] + board[5]); // Row 2
    let w3 = (board[6] + board[7] + board[8]); // Row 3
    let w4 = (board[0] + board[3] + board[6]); // Col 1
    let w5 = (board[1] + board[4] + board[7]); // Col 2
    let w6 = (board[2] + board[5] + board[8]); // Col 3
    let w7 = (board[0] + board[4] + board[8]); // Diag 1
    let w8 = (board[6] + board[4] + board[3]); // Diag 2

    if ((w1 || w2 || w3 || w4 || w5 || w6 || w7 || w8) === 3)
    {
        gameState = 1;
    }    
    if ((w1 || w2 || w3 || w4 || w5 || w6 || w7 || w8) === -3)
    {
        gameState = 1;
    }
}

function reset(event)
{
    for (var i = 0; i < boxes.length; i++)
    {
        boxes[i].innerHTML = "";
    }
}

for (var i = 0; i < boxes.length; i++)
{
    boxes[i].addEventListener('click', handleClick);
}

button.addEventListener('click', reset);

