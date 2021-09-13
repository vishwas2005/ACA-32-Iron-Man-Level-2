
var bg, backgroundImg;
var platformImage, platformGroup;
var ironMan, ironManImage;
var diamondImage, diamondsGroup;
var spikeImage, spikesGroup;
var score = 0;//create variables for images, groups and sprites. Create score variable
var gameState = "PLAY";

function preload() {
	backgroundImg = loadImage("images/bg.jpg");
	ironManImage = loadImage('images/iron.png');
	platformImage = loadImage('images/stone.png');
	diamondImage = loadImage('images/diamond.png');
	spikeImage = loadImage('images/spikes.png');//load necessary images for graphics
}

function setup() {
	createCanvas(1000, 600);
	bg = createSprite(580, 300);
	bg.addImage(backgroundImg);
	bg.scale = 2;
	bg.velocityY = 8;//make bg sprite and set its velocity to move it
  // ground=createSprite(200,600,1900,10)
	ironMan = createSprite(450, 300);
	ironMan.addImage(ironManImage);
	ironMan.scale = 0.3;
	ironMan.setCollider("rectangle", 100, 0, 200, 400);//create Iron Man sprite and set its collider
  
  ground=createSprite(200,600,1900,10)

	platformGroup = new Group();
	diamondsGroup = new Group();
	spikesGroup = new Group();//create all necessary groups
}

function draw() {

	if (gameState === "PLAY") {
		if (bg.y > 700) {
			bg.y = bg.height / 15;
		}//move the bg
		if (keyDown('up') || keyDown('w')) {
			ironMan.velocityY = -10;
		}
		if (keyDown('left')) {
			ironMan.x = ironMan.x - 5;
		}
		if (keyDown('right')) {
			ironMan.x = ironMan.x + 5;
		}//movement controls

		ironMan.velocityY = ironMan.velocityY + 0.5;//Gravity for main sprite

		generatePlatforms();//call func to generate platforms

		for (var i = 0; i < platformGroup.length; i++) {
			var temp = platformGroup.get(i);

			if (temp.isTouching(ironMan)) {
				ironMan.collide(temp);
			}
		}//iron Man collides with platforms

		generateDiamonds();

		for (var i = 0; i < (diamondsGroup).length; i++) {
			var temp = (diamondsGroup).get(i);

			if (temp.isTouching(ironMan)) {
				score++;
				temp.destroy();
				temp = null;//if iron man touches diamond - increase score by 1, destroy diamond so that it disappears and set its value in group as null
			}
		}
    ironMan.collide(ground)

		generateSpikes();

		for (var i = 0; i < (spikesGroup).length; i++) {
			var temp = (spikesGroup).get(i);

			if (temp.isTouching(ironMan)) {
				score = score - 5;//if iron Man touches spikes, score decreases by 5
				temp.destroy();
				temp = null;
			}

		}

		if (score <= -10 || ironMan.y > 650) {
			gameState = "END";
		}
	}

	if (gameState === "END") {
		bg.velocityY = 0;
		ironMan.velocityY = 0;
		diamondsGroup.setVelocityYEach(0);
		spikesGroup.setVelocityYEach(0);
		platformGroup.setVelocityYEach(0);
		diamondsGroup.setLifetimeEach(-1);
		spikesGroup.setLifetimeEach(-1);
		platformGroup.setLifetimeEach(-1);

	}

	drawSprites();
	textSize(20);
	fill("white")
	text("Diamonds Collected: " + score, 400, 50);
}

function generatePlatforms() {
	if (frameCount % 60 === 0) {
		var brick = createSprite(1200, -10);
		brick.setCollider('rectangle', 0, 0, 220, 40);
		brick.x = random(50, 850);
		brick.addImage(platformImage);
		brick.velocityY = 4.5;
		brick.lifetime = 200;
		platformGroup.add(brick);
	}
}

function generateDiamonds() {
	if (frameCount % 80 === 0) {
		var diamond = createSprite(1200, -10);
		diamond.addAnimation("diamond", diamondImage);
		diamond.setCollider('rectangle', 0, 10, 100, 80);
		diamond.x = random(50, 850);
		diamond.scale = 0.5;
		diamond.velocityY = 4.5;
		diamond.lifetime = 200;
		diamondsGroup.add(diamond);
	}
}

function generateSpikes() {
	if (frameCount % 140 === 0) {
		var spikes = createSprite(1200, -10);
		spikes.addAnimation("spike", spikeImage);
		spikes.x = random(50, 850);
		spikes.setCollider('rectangle', 0, 0, 70, 70);
		spikes.scale = 0.5;
		spikes.velocityY = 4;
		spikes.lifetime = 200;
		spikesGroup.add(spikes);
	}
}
