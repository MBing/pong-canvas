var canvas = document.getElementById('pong-canvas');
var context = canvas.getContext('2d');

var x = canvas.width / 5;
var y = canvas.height -30;

var ballSpeedX = 5;
var ballSpeedY = 5;
var ballRadius = 10;

var paddleLeftY = 250;
var paddleRightY = 250;
var paddleHeight = 100;
var paddleWidth = 10;

var playerLeftScore = 0;
var playerRightScore = 0;

function drawBall() {
    context.beginPath();
    context.fillStyle='red';    
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fill();
    context.closePath();
}

function leftPaddle() {
    context.fillStyle = 'white';
    context.fillRect(0, paddleLeftY, paddleWidth, paddleHeight);
}

function rightPaddle() {
    context.fillStyle = 'white';
    context.fillRect(canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);
}

function calcMousePosition(e) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;

    return {
        x: mouseX,
        y: mouseY
    };
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    x = canvas.width / 2;
    y = canvas.height / 2;
}

function resetCanvas () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function hasHitPaddleLeft() {
    return y > paddleLeftY && y < paddleLeftY + paddleHeight;
}

function hasHitPaddleRight() {
    return y > paddleRightY && y < paddleRightY + paddleHeight;
}

function computerMove() {
    var paddleRightCenter = paddleRightY + (paddleHeight / 2);
    if (paddleRightCenter < (y - 35)) {
        paddleRightY += 7;
    } else if (paddleRightCenter > (y + 35)) {
        paddleRightY -= 7;
    }
}

function move() {
    x += ballSpeedX;
    y += ballSpeedY;

    if (x < paddleWidth) {
        if (hasHitPaddleLeft()) {
                ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            playerRightScore++;
        }
    }

    if (x > canvas.width - paddleWidth) {
        if (hasHitPaddleRight()) {
                ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            playerLeftScore++;
        }
    }

    if (y >= canvas.height || y <= 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawScore() {
    context.fillText(playerLeftScore, 100, 100);
    context.fillText(playerRightScore, canvas.width - 100, 100);
}

function draw() {
    resetCanvas();
    move();
    computerMove();    
    drawBall()
    leftPaddle();
    rightPaddle();
    drawScore();

    requestAnimationFrame(draw);

    canvas.addEventListener('mousemove', function(e) {
        var mousePos = calcMousePosition(e);
        paddleLeftY = mousePos.y - (paddleHeight/2);
    });
}

window.onload = draw;
