// Criando elementos
const contentCanvas = document.getElementById("content-canvas");
const canvas = document.createElement("CANVAS");
contentCanvas.appendChild(canvas)
const ctx = canvas.getContext('2d');
const buttonElm = document.getElementById("init-button")
const scoreElm = document.getElementById("score")
const fogueteImgElm = document.getElementById("image-foguete")

const INTERVAL_DURATION = 2
const ARROW_UP = "ArrowUp"
const ARROW_DOWN = "ArrowDown"
const AIRPLANE_MOVE_SIZE = 20
const AIRPLANE_HEIGHT = 40
const AIRPLANE_WIDTH = 40
const COMET_HEIGHT = 70
const COMET_WIDTH = 70
const COMET_MOVE_SIZE = 10
const GAME_OVER_X = contentCanvas.offsetWidth / 2
const GAME_OVER_Y = contentCanvas.offsetHeight / 2

// const AIRPLANE_IMAGE_PATH = "assets/images/foguete.png"

let cometaX, cometaY, airplaneX, airplaneY, frame = 0, interval, score = 0


window.onload = function() {
    init()
}

//Função do inicio
function init() {
    score = 0
    buttonElm.disabled = true;

    //Definir o ínicio do desenho
    [cometaX, cometaY] = iniciandoCometa();
    [airplaneX, airplaneY] = iniciandoAirplane();

    resizeCanvas();

    interval = setInterval(() => {
        requestAnimationFrame(runInterval);
    }, INTERVAL_DURATION);
}

buttonElm.addEventListener("click", init)

window.addEventListener('resize', resizeCanvas, false);

window.addEventListener("keydown", function (event) {
    const rest = contentCanvas.offsetHeight % AIRPLANE_HEIGHT

    switch (event.code) {
        case ARROW_UP:
            if (airplaneY >= AIRPLANE_MOVE_SIZE) airplaneY -= AIRPLANE_MOVE_SIZE
            else if (airplaneY >= rest) airplaneY -= rest
            break;
        case ARROW_DOWN:
            if (airplaneY < (contentCanvas.offsetHeight - (AIRPLANE_HEIGHT + rest))) airplaneY += AIRPLANE_MOVE_SIZE
            else if (airplaneY < (contentCanvas.offsetHeight - AIRPLANE_HEIGHT)) airplaneY += rest
            break;
    }
}, true);


function runInterval() {
    ctx.clearRect(0, 0, contentCanvas.offsetWidth, contentCanvas.offsetHeight);
    gameloopCometa()
    gameloopAirplane()
    gameloopColision()
    updateScore()
}

//Colisão
function gameloopColision() {
    const cometaX2 = cometaX + COMET_WIDTH
    const cometaY2 = cometaY + COMET_HEIGHT
    const airplaneY2 = airplaneY + AIRPLANE_HEIGHT
    const airplaneX2 = airplaneX + AIRPLANE_WIDTH

    
    if ((cometaX2 > airplaneX && cometaX < airplaneX2) && (cometaY2 > airplaneY && cometaY < airplaneY2)) {
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", GAME_OVER_X - 90, GAME_OVER_Y);

        clearInterval(interval)
        interval = null
        buttonElm.disabled = false
    }
}
//Score
function updateScore() {
    scoreElm.textContent = `${score}`;
}

function gameloopAirplane() {
    desenharAirplane(airplaneX, airplaneY)
}

function gameloopCometa() {
    if (frame >= 5) {
        frame = 0

        if (cometaX >= (canvas.offsetWidth - (COMET_WIDTH / 2))) {
            [cometaX, cometaY] = iniciandoCometa();
            score++
        } else cometaX += COMET_MOVE_SIZE;
    } else frame++
    desenharCometa(cometaX, cometaY);
}

function iniciandoCometa() {
    return [-COMET_WIDTH / 2, Math.floor(Math.random() * (contentCanvas.offsetHeight - COMET_HEIGHT))]
}

function iniciandoAirplane() {
    const position = contentCanvas.offsetHeight / 2
    return [contentCanvas.offsetWidth - AIRPLANE_WIDTH, (position - (position % AIRPLANE_MOVE_SIZE))]
}

function desenharCometa(pX, pY) {
    ctx.fillStyle = '#00F';
    ctx.fillRect(pX, pY, COMET_WIDTH, COMET_HEIGHT);

    // Codigo com imagem nao estava funcionando
    // const image = new Image()
    // image.onload = function() {
    //     ctx.drawImage(image, pX, pY, COMET_WIDTH, COMET_HEIGHT);
    // }
    // image.src = "assets/images/Cometa.png"
}

function desenharAirplane(pX, pY) {
    ctx.fillStyle = '#ff003b';
    ctx.fillRect(pX, pY, AIRPLANE_WIDTH, AIRPLANE_HEIGHT);

    // Codigo com imagem nao estava funcionando
    // const image = new Image()
    // image.onload = function() {
    //     ctx.drawImage(image, pX, pY, AIRPLANE_WIDTH, AIRPLANE_HEIGHT);
    // }
    // image.src = "assets/images/foguete.png"
}

function resizeCanvas() {
    canvas.setAttribute("width", `${contentCanvas.offsetWidth}`);
    canvas.setAttribute("height", `${contentCanvas.offsetHeight}`);
    canvas.style.height = `${contentCanvas.offsetHeight}px`
    canvas.style.width = `${contentCanvas.offsetWidth}px`
    desenharCometa(cometaX, cometaY);

    airplaneX = contentCanvas.offsetWidth - AIRPLANE_WIDTH;
    desenharAirplane(airplaneX, airplaneY)
}