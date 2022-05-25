// criando elementos
const contentCanvas = document.getElementById("content-canvas");
const canvas = document.createElement("CANVAS");
contentCanvas.appendChild(canvas)
const ctx = canvas.getContext('2d');

const INTERVAL_DURATION = 20
const ARROW_UP = "ArrowUp"
const ARROW_DOWN = "ArrowDown"
const AIRPLANE_MOVE_SIZE = 20
const AIRPLANE_HEIGHT = 20
const AIRPLANE_WIDTH = 20
const COMET_HEIGHT = 20
const COMET_WIDTH = 20

//definir o ínicio do desenho
let [cometaX, cometaY] = iniciandoCometa();
let [airplaneX, airplaneY] = iniciandoAirplane();

resizeCanvas();

let frame = 0
const interval = setInterval(() => {
    console.log(canvas.offsetHeight)
    console.log(canvas.offsetWidth)

    requestAnimationFrame(runInterval);
}, INTERVAL_DURATION);

window.addEventListener('resize', resizeCanvas, false);

window.addEventListener("keydown", function(event) {
    const rest = contentCanvas.offsetHeight % AIRPLANE_HEIGHT

    switch (event.code) {
        case ARROW_UP:
            if (airplaneY >= AIRPLANE_MOVE_SIZE) airplaneY-=AIRPLANE_MOVE_SIZE
            else if (airplaneY >= rest) airplaneY-=rest
            break;
        case ARROW_DOWN:
            if (airplaneY < (contentCanvas.offsetHeight - (AIRPLANE_HEIGHT+rest))) airplaneY+=AIRPLANE_MOVE_SIZE
            else if (airplaneY < (contentCanvas.offsetHeight-AIRPLANE_HEIGHT)) airplaneY+=rest
            break;
    }
}, true);


function runInterval() {
    ctx.clearRect(0, 0, contentCanvas.offsetWidth, contentCanvas.offsetHeight);
    gameloopCometa()
    gameloopAirplane()
}

function gameloopAirplane() {
    desenharAirplane(airplaneX, airplaneY)
}

function gameloopCometa() {
    if (frame >= 50) {
        frame = 0

        if(cometaX >= canvas.offsetWidth) {
            [cometaX, cometaY] = iniciandoCometa();
        } else cometaX += COMET_WIDTH;
    } else frame++

    desenharCometa(cometaX, cometaY);
}

function iniciandoCometa() {
    return [-COMET_WIDTH/2, Math.floor(Math.random() * contentCanvas.offsetHeight)]
}

function iniciandoAirplane() {
    const position = contentCanvas.offsetHeight/2
    return [contentCanvas.offsetWidth - AIRPLANE_WIDTH, (position - (position%AIRPLANE_MOVE_SIZE))]
}

function desenharCometa(pX, pY) {
    ctx.fillStyle = '#00F';
    ctx.fillRect(pX, pY, COMET_WIDTH, COMET_HEIGHT);
}

function desenharAirplane(pX, pY) {
    ctx.fillStyle = '#ff003b';
    ctx.fillRect(pX, pY, AIRPLANE_WIDTH, AIRPLANE_HEIGHT);
}

function resizeCanvas() {
    console.log("resizeCanvas")
    canvas.setAttribute("width", `${contentCanvas.offsetWidth}`);
    canvas.setAttribute("height", `${contentCanvas.offsetHeight}`);
    canvas.style.height = `${contentCanvas.offsetHeight}px`
    canvas.style.width = `${contentCanvas.offsetWidth}px`
    desenharCometa(cometaX, cometaY);

    airplaneX = contentCanvas.offsetWidth - AIRPLANE_WIDTH;
    desenharAirplane(airplaneX, airplaneY)
}