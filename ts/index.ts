const CanvasGame: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas-game');
const Body: HTMLBodyElement = <HTMLBodyElement>document.body;
const CanvasContext: CanvasRenderingContext2D = CanvasGame.getContext('2d');
const FramesBerSecond: number = 30;
//Ball
const BallRadius: number = 20;
let ballX: number = BallRadius;
let ballXPos: number = 4;
let ballY: number = BallRadius;
let ballYPos: number = 4;
//Paddle
const PaddleWidth: number = 150;
const PaddleHeight: number = 20;
const PaddleGap: number = 20;
let paddleX: number = 0;
let paddleY: number = 0;

function hex6(num: number, s: number): string {
    let n = num.toString(16);
    return '0'.repeat(s - n.length) + n;
}

function main(): void {
    CanvasGame.width = CanvasGame.clientWidth;
    CanvasGame.height = CanvasGame.clientHeight;

    paddleX = (CanvasGame.width - PaddleWidth) / 2;
    //paddleY = CanvasGame.height - PaddleGap;

    CanvasGame.onclick = (evt: MouseEvent): void => {
        ballX = evt.clientX - CanvasGame.offsetLeft;
        ballY = evt.clientY - CanvasGame.offsetTop;
        update();
    };

    CanvasGame.onmousemove = (evt: MouseEvent): void => {
        paddleX = evt.clientX - CanvasGame.offsetLeft - PaddleWidth / 2;
        //paddleY = evt.clientY - CanvasGame.offsetTop;
        //update();
    };

    window.setInterval(update, 1000 / FramesBerSecond);
}

function update(): void {
    draw();
    move();
}

function resetBall(): void {
    ballX = CanvasGame.width / 2;
    ballY = CanvasGame.height / 2;
}

function move(): void {
    ballX += ballXPos;
    ballY += ballYPos;

    if (ballX + BallRadius >= CanvasGame.width || ballX <= BallRadius) {
        ballXPos *= -1;
    }
    if (/*ballY + BallRadius >= CanvasGame.height ||*/ ballY <= BallRadius) {
        ballYPos *= -1;
    }
    if (ballY >= CanvasGame.height) {
        resetBall();
    }
    if (ballY + BallRadius >= CanvasGame.height - PaddleHeight - PaddleGap && ballX >= paddleX && ballX <= paddleX + PaddleWidth) {
        ballYPos *= -1;
    }
}

function draw(): void {
    //Clear view
    colorRect(0, 0, CanvasGame.width, CanvasGame.height, 'black');
    //Draw Paddle
    colorRect(paddleX, CanvasGame.height - PaddleGap - PaddleHeight, PaddleWidth, PaddleHeight, 'green');
    //Draw circle
    let CircleColor: string = 'white';//`#${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}`;
    colorCircle(ballX, ballY, BallRadius, CircleColor);
}

function colorRect(topLeftX: number, topLeftY: number, width: number, height: number, fillColor: string): void {
    CanvasContext.fillStyle = fillColor;
    CanvasContext.fillRect(topLeftX, topLeftY, width, height);
}

function colorCircle(centerX: number, centerY: number, radius: number, fillColor: string): void {
    CanvasContext.fillStyle = fillColor;
    CanvasContext.beginPath();
    CanvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    CanvasContext.fill();
    CanvasContext.closePath();
}

window.onload = main;