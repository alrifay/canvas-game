const canvasGame: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas-game');
const body: HTMLBodyElement = <HTMLBodyElement>document.body;
const canvasContext: CanvasRenderingContext2D = canvasGame.getContext('2d');
const framesBerSecond: number = 1000;
const ballR: number = 20;
let moveTimer: number = 0;
let ballX: number = ballR;
let ballXPos: number = 4;
let ballY: number = ballR;
let ballYPos: number = 2;
let i: number = 2 * 14;

function hex6(num: number, s: number): string {
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
        update();
    };
    moveTimer = window.setInterval(update, 1000 / framesBerSecond);
}

function update(): void {
    draw();
    move();
}

function move(): void {
    ballX += ballXPos;
    ballY += ballYPos;

    if (ballX + ballR >= canvasGame.width || ballX <= ballR) {
        ballXPos *= -1; i--;
    }
    if (ballY + ballR >= canvasGame.height || ballY <= ballR) {
        ballYPos *= -1;
    }
    if (i === 0) {
        window.clearInterval(moveTimer);
    }
}

function draw(): void {
    colorRect(0, 0, canvasGame.width, canvasGame.height, 'black');
    let CircleColor: string = `#${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}`;
    colorCircle(ballX, ballY, ballR, CircleColor);
}

function colorRect(topLeftX: number, topLeftY: number, width: number, height: number, fillColor: string): void {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, width, height);
}

function colorCircle(centerX: number, centerY: number, radius: number, fillColor: string): void {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
    canvasContext.closePath();
}

window.onload = main;