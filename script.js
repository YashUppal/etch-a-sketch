
const CANVAS = {
    color: "black",
    size: 16
}

const defaultGrid = () => {
    createGrid(16);
}

const changeColor = (e, div) => {
    // e.target.classList.add("black")
    e.target.style.backgroundColor = CANVAS.color;
}

const createGrid = (size) => {

    let canvas = document.querySelector('.canvas');
    let canvasHeight = canvas.offsetWidth;
    let canvasWidth = canvas.offsetHeight;

    let height = canvasHeight / size;
    let width = canvasWidth / size;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++){

            const square = document.createElement('div');
            square.classList.add('square')
            square.style.width = width;
            square.style.height = height;
            square.addEventListener('mouseenter',changeColor)

            document.querySelector(".canvas").appendChild(square);

        }
    }

}

const clearGrid = () => {
    while (document.querySelector('.canvas').firstChild) {
        document.querySelector('.canvas').removeChild(document.querySelector('.canvas').firstChild)
    }
    createGrid(CANVAS.size)
    removeEvent();
    CANVAS.color = document.querySelector('.color-wheel').value;
}

const watchColorPicker = (event) => {
    console.log(event.target.value)
    CANVAS.color = event.target.value;
}

const watchEraser = (event) => {
    CANVAS.color = "white";
    removeEvent();
}

const watchSlider = (event) => {
    CANVAS.size = event.target.value;
    clearGrid();
    document.querySelector("#size-label").innerText = event.target.value;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const setRandomColor = () => {
    CANVAS.color = getRandomColor()
}


const watchRainbow = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(
        (element) => {
            element.addEventListener('mouseenter',
                setRandomColor
            )
        }
    )
    console.log(squares)
}

const removeEvent = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(
        (element) => {
            element.removeEventListener('mouseenter',
                setRandomColor
            )
        }
    )
}

const watchColor = () => {
    CANVAS.color = document.querySelector(".color-wheel").value;
    removeEvent();
}




document.addEventListener('load', defaultGrid())

document.querySelector('.color-wheel').addEventListener("change", watchColorPicker)
document.querySelector('#eraser-mode').addEventListener("click", watchEraser)
document.querySelector('#size-slider').addEventListener("change", watchSlider)
document.querySelector("#clear").addEventListener("click",clearGrid)
document.querySelector("#rainbow-mode").addEventListener("click", watchRainbow)
document.querySelector('#color-mode').addEventListener("click",watchColor)