
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
    // e.target.style.opacity = "1"
    if (!e.target.classList.contains("light")) {
        e.target.style.opacity = 1;
    }
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
            square.style.opacity = "1"
            square.addEventListener('mouseenter',changeColor)

            document.querySelector(".canvas").appendChild(square);

        }
    }

}

const clearGrid = () => {
    while (document.querySelector('.canvas').firstChild) {
        document.querySelector('.canvas').removeChild(document.querySelector('.canvas').firstChild)
    }
    createGrid(CANVAS.size);

}

const watchColorPicker = (event) => {
    console.log(event.target.value)
    CANVAS.color = event.target.value;
}

const white = (e) => {
    e.target.style.backgroundColor = "white"
    e.target.classList.add('erased')
    
    // e.target.style.opacity = "1"
}

const watchEraser = (event) => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(
        (element) => {
            element.addEventListener('mouseenter', white)
        }
    )
    
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

const setRandomColor = (e) => {
    e.target.style.opacity = "1"
    e.target.style.backgroundColor = getRandomColor();
    CANVAS.color = getRandomColor()
}


const watchRainbow = () => {
    removeEvent();
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

    squares.forEach(
        (element) => {
            element.removeEventListener('mouseenter', gradualBlack)
        }
    )

    squares.forEach(
        (element) => {
            element.removeEventListener('mouseenter', white)
        }
    )
}


const watchColor = () => {
    CANVAS.color = document.querySelector(".color-wheel").value;
    removeEvent();

    const squares = document.querySelectorAll('.square')
    squares.forEach(
        
        (element) => {
            element.classList.remove("light")
            element.classList.remove("erased")
            element.addEventListener('mouseenter', changeColor)
        }
    )
}

const gradualBlack = (e) => {
    // console.log(e.target.classList.contains("light"));
    if (e.target.classList.contains('erased')) {
        e.target.style.opacity = "0.1"
        e.target.classList.add('light')
        e.target.classList.remove("erased")
    } else if (e.target.classList.contains("light")) {
        // e.target.classList.remove("light")
        e.target.style.opacity = `${parseFloat(e.target.style.opacity) + 0.1}`
    } else {
        e.target.classList.add('light')
        e.target.style.opacity = "0.1"
    }
}

const gradual = () => {
    removeEvent();
    CANVAS.color = "black";
    const squares = document.querySelectorAll('.square');
    squares.forEach(
        (element) => {
            element.addEventListener('mouseenter',gradualBlack)
        }
    )
}



document.addEventListener('load', defaultGrid())

document.querySelector('.color-wheel').addEventListener("change", watchColorPicker)
document.querySelector('#eraser-mode').addEventListener("click", watchEraser)
document.querySelector('#size-slider').addEventListener("change", watchSlider)
document.querySelector("#clear").addEventListener("click",clearGrid)
document.querySelector("#rainbow-mode").addEventListener("click", watchRainbow)
document.querySelector("#gradual-mode").addEventListener("click", gradual)
document.querySelector('#color-mode').addEventListener("click",watchColor)