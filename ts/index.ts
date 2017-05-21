const canvasGame = <HTMLCanvasElement>document.getElementById('canvas-game');
const body = <HTMLBodyElement>document.body;
const canvasContext = canvasGame.getContext('2d');
const framesBerSecond = 1000;
const ballR = 20;
let moveTimer = 0;
let ballX = ballR;
let ballXPos = 4;
let ballY = ballR;
let ballYPos = 2;
let i = 2 * 14;

function hex6(num: number, s: number) {
    let n = num.toString(16);
    return '0'.repeat(s - n.length) + n;
}

function main(): void {
    document.body.style.height = (window.innerHeight) + 'px';
    canvasGame.width = canvasGame.clientWidth;
    canvasGame.height = canvasGame.clientHeight;
    canvasGame.onclick = (evt: MouseEvent) => {
        ballX = evt.x;
        ballY = evt.y;
        updateAll();
    };
    moveTimer = window.setInterval(updateAll, 1000 / framesBerSecond);
};

function updateAll() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvasGame.width, canvasGame.height);

    canvasContext.fillStyle = `#${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}`;
    canvasContext.beginPath();
    canvasContext.arc(ballX, ballY, ballR, 0, Math.PI * 2, true);
    canvasContext.fill();
    canvasContext.closePath();

    ballX += ballXPos;
    ballY += ballYPos;

    if (ballX + ballR >= canvasGame.width || ballX <= ballR) {
        ballXPos *= -1; i--;
        //console.info(`i = ${i}`);
    }
    if (ballY + ballR >= canvasGame.height || ballY <= ballR) {
        ballYPos *= -1;
    }
    if (i == 0) {
        window.clearInterval(moveTimer);
    }
}

window.onload = main;