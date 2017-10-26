var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');



var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 4;
var dy = -4;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 135;
var paddleX = canvas.width / 2;
var rightPressed = false;
var leftPressed = false;
var flag=0;
var brickRowCount = 5;
var brickColumnCount = 4;
var brickWidth = 100;
var brickHeight = 20;
var brickPadding = 7;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var level_score = 0;
var level = 0;
var bricks = [];
var acc = 0;

for(c=0; c< brickColumnCount ; c++){
    bricks[c]=[];
    for(r=0; r< brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status: 1};
        var brickX = ( c * ( brickWidth + brickPadding )) + brickOffsetLeft;
        var brickY = ( r * ( brickHeight + brickPadding )) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
        else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    
    if(e.keyCode == 39) {
        rightPressed = false;
    }
        else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
    
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
var img = new Image();
img.src = 'spinv01.jpg';
var pat;

function draw_bricks() {
    pat = ctx.createPattern(img, 'repeat');
    for(c=0; c < brickColumnCount ; c++) {
            for(r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    ctx.beginPath();
                    ctx.rect(bricks[c][r].x,  bricks[c][r].y, brickWidth, brickHeight);
                    ctx.fillStyle = pat;
                    ctx.fill();
                    ctx.closePath();    
                }
            }
            
        }
    
}

function draw_ball() {
    
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

function draw_paddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection(){
    
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1) {
                if((x+ballRadius-1) > b.x && (x-ballRadius-1) < b.x+brickWidth && (y-ballRadius) < (b.y+brickHeight) && (y+ballRadius) > b.y) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    level_score++;
                }
            }
        }
    }
}
function draw_score(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0af70a";
    ctx.fillText("Level: "+level+" Score: "+score+ " Level score: "+level_score,8,20);
}
function draw() {
    if(flag==1)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_bricks();
    draw_ball();
    draw_paddle();
    collisionDetection();
    draw_score();
    if(level_score>=(brickRowCount*brickColumnCount)){
        level_score=0;
        level++;
        x = canvas.width / 2;
        y = canvas.height - 30;
        if(dy>0){
            dy=-dy;
        }
        dy--;
        dx = 4;
        if(ballRadius>4){
            ballRadius--;
        }
        if(paddleWidth>90){
            paddleWidth-=5;
        }
        for(c=0; c< brickColumnCount ; c++){
            for(r=0; r< brickRowCount; r++){
                bricks[c][r].status = 1;
            }
        }
    }
    if(y < ballRadius) {
        dy= -dy;
    } else if (y + ballRadius  > canvas.height) {
        if(x > (paddleX - 2) && x < ((paddleX + paddleWidth)+2) ) {
            
            dy = -dy;
            dx+=acc;
            
        } else {
            alert("GAME OVER!");
            document.location.reload();
            flag=1;
        }
    }
    if(x < ballRadius ||  x+ballRadius > canvas.width) {
        dx= -dx;
    }
    
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX+=7;
        acc=3;
    }
        else if(leftPressed && paddleX >0) {
              paddleX -=7;
              acc=-3;
    }
    if(acc>0){
        acc--;
    } else{
        acc++;
    }
    
    x +=dx;
    y +=dy;
 
    requestAnimationFrame(draw);
}

draw();
