// listen to all clicks on divs in rows.
// how do i get only the divs WITHIN rows?
// once that div in row is clicked, make event happen.
let options = ['X', 'O'];
let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]
let count = 0;

// ************************************ //
// THIS LISTENS FOR ALL CLICKS ON BOARD //
// ************************************ //
const boxes = document.querySelectorAll('.rows > div');
const button = document.querySelector('button');

function handleClick(event)
{
    console.log(event.target);
    if (count === 0)
    {
        if (event.target.innerHTML === "")
        {
            event.target.innerHTML = options[count];
            count = 1;
    }
    }
    else 
    {
        if (event.target.innerHTML === "")
        {
            event.target.innerHTML = options[count];
            count = 0;
        }
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

