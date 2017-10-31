var canvas = document.getElementById('pong-canvas');
var context = canvas.getContext('2d');

var x = canvas.width / 5;
var y = canvas.height -30;

var ballSpeedX = 5;
var ballSpeedY = 5;
var ballRadius = 10;

function drawBall() {
    context.beginPath();
    context.fillStyle='red';    
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fill();
    context.closePath();
}

function resetCanvas () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function move () {
    x += ballSpeedX;
    y += ballSpeedY;

    if (x >= canvas.width || x <= 0) {
        ballSpeedX = -ballSpeedX;
    }

    if (y >= canvas.height || y <= 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function draw() {
    resetCanvas();
    move();
    drawBall()

    requestAnimationFrame(draw);
}

window.onload = draw;
