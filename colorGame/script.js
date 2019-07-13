//selectors
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.getElementById("message");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let h1 = document.querySelector("h1");

let gameMode = 6; // Easy = 3 - Hard = 6

//assigns random colors to all available squares depending on game mode
let colors = randomColorPicker(gameMode);

//randomly selects a color out of all available squares
//the selected color is now the win condition for the round
let pickedColor = pickColor();

rgbGame();

function rgbGame() {
    setupModeButtons();
    setupSquares();
    reset();
}

// determines game mode
// if Easy is clicked game will have 3 squares making it easier to win
// if Hard is clicked game will have 6 squares making it more of a challenge
function setupModeButtons() {
    for(let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "Easy" ? gameMode = 3: gameMode = 6;
            reset();
        });
    }
}

// adds initial colors to squares
// squares will adopt the random backgroundColor picked from colors
// will check if clickedColor equals win condition
// if true all squares will get the same color to indicate the winner
function setupSquares() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];

        squares[i].addEventListener("click", function() {
            let clickedColor = this.style.backgroundColor;

            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "CORRECT!";
                resetButton.textContent = "Play Again?";
                changeColors();
            }
            else {
                messageDisplay.textContent = "TRY AGAIN";
                this.style.backgroundColor = "#232323"; // creates "fading" effect for clicked square
            }
        });
    }
}

// pick a random color from already available squares to assign to pickedColor
// that color becomes the win condition
function pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// makes all squares same color if answer is correct
function changeColors() {
    for(let elm of squares) {
        elm.style.backgroundColor = pickedColor;
        h1.style.backgroundColor = pickedColor;
    }
}

// gets a random valid rgb color
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

// runs randomColor() and assigns random colors to all available squares
// depending on game mode (3 on EASY and 6 on HARD)
function randomColorPicker(num) {
    let listOfColors = [];

    for(let i = 0; i < num; i++) {
        listOfColors.push(randomColor());
    }
    return listOfColors;
}

// after verifying the game mode
// resets color for all squares to new values
// resets text background to default value 
// picks new win condition out of the new colors
// updates colorDisplay to indicate new win condition
function reset() {
    colors = randomColorPicker(gameMode);
    pickedColor = pickColor();
    h1.style.backgroundColor = "steelblue";
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    for(let i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
}

// reset button for a new game with new colors
resetButton.addEventListener("click", () => reset());