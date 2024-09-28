var cv = document.getElementById("cv1");
var ct = cv.getContext("2d");
var cv2 = document.getElementById("cv2");
var ct2 = cv2.getContext("2d");
var playerX = 600;
var playerY = 400;
var playerSize = 50;
var enemy1X = 0;
var enemy1Y = 0;
var enemy1MoveX = 1.5;
var enemy1MoveY = 1;
var enemy2MoveX = -0.8;
var enemy2MoveY = -1.7;
var enemySize = 100;
var enemy2X = cv.width-enemySize-1;
var enemy2Y = 1;
var right = false;
var left = false;
var up = false;
var down = false;
var canvasMode = 0;
var score = 0;
var enemyBulletX = [-50,-50,-50];
var enemyBulletY = [-50,-50,-50];
var bulletSpeedX = new Array(3);
var bulletSpeedY = new Array(3);
var bullet = false;
var bulletsplit = false;
var cnt = -1;
var bulletcnt = 0;

// var kariX = (playerX-enemyBulletX[0])/100.0;
// var kariY = (playerY-enemyBulletY[0])/100.0;

document.addEventListener("keydown",downhandler,false);
document.addEventListener("keyup",uphandler,false);
drawCanvas();

function downhandler(e){
	if(e.key == "Enter"&& canvasMode == 0){
		canvasMode = 1;
		timer = setInterval(timertask,10);
		scoreTimer = setInterval(scoreTimerTask,100);
	}
	if(e.key == "Right" || e.key == "ArrowRight"){
        right = true;
    }else if(e.key == "Left" || e.key == "ArrowLeft") {
        left = true;
    }
	if(e.key == "Up" || e.key == "ArrowUp"){
		up = true;
	}else if(e.key == "Down" || e.key == "ArrowDown"){
		down = true;
	}
}

function uphandler(e){
	if(e.key == "Right" || e.key == "ArrowRight"){
        right = false;
    }else if(e.key == "Left" || e.key == "ArrowLeft") {
        left = false;
    }
	if(e.key == "Up" || e.key == "ArrowUp"){
		up = false;
	}else if(e.key == "Down" || e.key == "ArrowDown"){
		down = false;
	}
}

function timertask(){
	if(left&&playerX>0){
		playerX-=2;
	}
	if(right&&playerX<cv.width-playerSize){
		playerX+=2;
	}
	if(up&&playerY>0){
		playerY-=2;
	}
	if(down&&playerY<cv.height-playerSize){
		playerY+=2
	}

	enemy1X += enemy1MoveX;
	enemy1Y += enemy1MoveY;
	enemy2X += enemy2MoveX;
	enemy2Y += enemy2MoveY;
	if(enemy1X+enemySize>=cv.width||enemy1X<=0){
		enemy1MoveX = -enemy1MoveX
	}
	if(enemy1Y+enemySize>=cv.height||enemy1Y<=0){
		enemy1MoveY = -enemy1MoveY
	}
	if(enemy2X+enemySize>=cv.width||enemy2X<=0){
		enemy2MoveX = -enemy2MoveX
	}
	if(enemy2Y+enemySize>=cv.height||enemy2Y<=0){
		enemy2MoveY = -enemy2MoveY
	}
	if(bulletsplit){
		cnt++;
		enemyBulletX[cnt] = enemy1X;
		enemyBulletY[cnt] = enemy1Y;
		bulletSpeedX[cnt] = (playerX-enemyBulletX[cnt])/100.0;
		bulletSpeedY[cnt] = (playerY-enemyBulletY[cnt])/100.0;
		bulletsplit = false;
	}
	if(bullet){
		for(let i=0; i<cnt+1; i++){
			enemyBulletX[i]+=bulletSpeedX[i];
			enemyBulletY[i]+=bulletSpeedY[i];
		}
		if(cnt==2&&(enemyBulletX[2]>=cv.width+50||enemyBulletX[2]<=-50||enemyBulletY[2]>=cv.height+50||enemyBulletY[2]<=-50)){
			bullet = false;
			cnt = -1;
		}
	}
	if(judge()){
		canvasMode = 2;
		clearInterval(timer);
		clearInterval(scoreTimer);
		drawCanvas();
	}
	drawCanvas();
}

function scoreTimerTask(){
	score++;
	if(score%100==0){
		if(enemy1MoveX>0){
			enemy1MoveX+=0.5;
		}else{
			enemy1MoveX-=0.5;
		}
		if(enemy1MoveY>0){
			enemy1MoveY+=0.5;
		}else{
			enemy1MoveY-=0.5;
		}

		if(enemy2MoveX>0){
			enemy2MoveX+=0.5;
		}else{
			enemy2MoveX-=0.5;
		}
		if(enemy2MoveY>0){
			enemy2MoveY+=0.5;
		}else{
			enemy2MoveY-=0.5;
		}
		bullet = true;
	}
	if(bullet&&score%10==0&&cnt!=2){
		bulletsplit=true;
	}
}
ct2.font ="45px serif";
function drawCanvas(){
	ct.clearRect(0, 0, cv.width, cv.height);
	ct2.clearRect(0,0,cv2.width,cv2.height);
	if(canvasMode==0){
		ct.font ="150px serif";
		ct.fillText("PressEnter",300,300);
	}else if(canvasMode==1){
		ct.fillStyle = "#00FFFF";
		ct.fillRect(playerX,playerY,playerSize,playerSize);
		ct.fillStyle = "#FF0000"
		ct.fillRect(enemy1X,enemy1Y,enemySize,enemySize);
		ct.fillRect(enemy2X,enemy2Y,enemySize,enemySize);
		for(let i=0; i<3; i++){
			ct.fillRect(enemyBulletX[i],enemyBulletY[i],20,20)
		}
		ct2.fillText("SCORE:"+score,10,45);
	}else if(canvasMode==2){
		ct.fillStyle = "#000000";
		ct.fillText("score:"+score,300,300);
	}
	ct.stroke();
}

function judge(){
	for(let i=0; i<3;i++){
		if(playerX<enemyBulletX[i]+30&&playerX+playerSize>enemyBulletX[i]&&playerY<enemyBulletY[i]+30&&playerY+playerSize>enemyBulletY[i]){
			return true;
		}
	}
	if(playerX<enemy1X+enemySize&&playerX+playerSize>enemy1X&&playerY<enemy1Y+enemySize&&playerY+playerSize>enemy1Y){//enemy1の当たり判定
		return true;
	}else if(playerX<enemy2X+enemySize&&playerX+playerSize>enemy2X&&playerY<enemy2Y+enemySize&&playerY+playerSize>enemy2Y){//enemy2の当たり判定
		return true;
	}else{
		return false;
	}
}