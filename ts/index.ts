const CanvasGame: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas-game');
const Body: HTMLBodyElement = <HTMLBodyElement>document.body;
const CanvasContext: CanvasRenderingContext2D = CanvasGame.getContext('2d');
const FramesBerSecond: number = 60;
//Mouse position
let MouseX = 0;
let MouseY = 0;
//Ball
const BallRadius: number = 20;
let ballX: number = BallRadius;
let ballXPos: number = 6;
let ballY: number = BallRadius;
let ballYPos: number = 6;
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

    CanvasGame.onclick = (evt: MouseEvent): void => {
        ballX = evt.clientX - CanvasGame.offsetLeft;
        ballY = evt.clientY - CanvasGame.offsetTop;
        update();
    };

    CanvasGame.onmousemove = (evt: MouseEvent): void => {
        MouseX = evt.clientX - CanvasGame.offsetLeft;
        MouseY = evt.clientY - CanvasGame.offsetTop;
        paddleX = MouseX - PaddleWidth / 2;
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
    ballXPos = ballYPos = 4;
}

function move(): void {
    ballX += ballXPos;
    ballY += ballYPos;
    //Ball hit the wall
    if (ballX + BallRadius >= CanvasGame.width || ballX <= BallRadius) {
        ballXPos *= -1;
    }
    //Ball hit the roof
    if (ballY <= BallRadius) {
        ballYPos *= -1;
    }
    //Ball fall
    if (ballY >= CanvasGame.height) {
        resetBall();
    }
    //Ball hit the Paddle
    if (ballY + BallRadius >= CanvasGame.height - PaddleHeight - PaddleGap && ballX >= paddleX && ballX <= paddleX + PaddleWidth) {
        let paddleCenter = paddleX + PaddleWidth / 2;
        ballYPos *= -1;
        ballXPos = (ballX - paddleCenter) * 0.2;
    }
}

function draw(): void {
    //Clear view
    colorRect(0, 0, CanvasGame.width, CanvasGame.height, 'black');
    //Paddle
    colorRect(paddleX, CanvasGame.height - PaddleGap - PaddleHeight, PaddleWidth, PaddleHeight, 'green');
    //center line in paddle
    colorLine(paddleX + PaddleWidth / 2, CanvasGame.height - PaddleGap - PaddleHeight,
        paddleX + PaddleWidth / 2, CanvasGame.height - PaddleGap, 'blue');
    //circle
    let CircleColor: string = 'white';//`#${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}${hex6(Math.floor(Math.random() * 255), 2)}`;
    colorCircle(ballX, ballY, BallRadius, CircleColor);
    //Mouse position
    colorText(`(${MouseX}, ${MouseY})`, MouseX, MouseY);
}

function colorText(text: string, x: number, y: number): void {
    CanvasContext.fillText(text, x, y);
}

function colorRect(topLeftX: number, topLeftY: number, width: number, height: number, fillColor: string): void {
    CanvasContext.fillStyle = fillColor;
    CanvasContext.fillRect(topLeftX, topLeftY, width, height);
}

function colorLine(startX: number, startY: number, endX: number, endY: number, color: string): void {
    CanvasContext.beginPath();
    CanvasContext.moveTo(startX, startY);
    CanvasContext.lineTo(endX, endY);
    CanvasContext.closePath();
    CanvasContext.strokeStyle = color;
    CanvasContext.stroke();
}

function colorCircle(centerX: number, centerY: number, radius: number, fillColor: string): void {
    CanvasContext.fillStyle = fillColor;
    CanvasContext.beginPath();
    CanvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    CanvasContext.fill();
    CanvasContext.closePath();
}

window.onload = main;