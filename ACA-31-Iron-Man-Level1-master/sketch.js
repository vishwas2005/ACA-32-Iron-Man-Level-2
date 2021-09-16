var bg, backgroundImg, platformImage, platformGroup;
var diamondImage, diamondsGroup;
var spikeImage, spikesGroup;
var score = 0;
var gameState = "PLAY";

function preload() {
  //Background Image
  backgroundImg = loadImage("images/bg.jpg");
  //Ironman Image
  ironImage = loadImage("images/iron.png");
  //Platform Image
  platformImage = loadImage("images/stone.png");
  //Diamond Image
  diamondImage = loadImage("images/diamond.png");
  //Spike Image
  spikeImage = loadImage("images/spikes.png");
  //restart Image
  restartImage = loadImage("images/restart.png");
}

function setup() {
  //Create canvas
  createCanvas(1000, 600);
  //Background Image
  bg = createSprite(580, 300);
  bg.addImage(backgroundImg);
  bg.scale = 2;
  //Creating Ironman  sprite
  ironMan = createSprite(200, 505, 20, 50);
  ironMan.addImage("running", ironImage);
  ironMan.scale = 0.3;
  ironMan.setCollider("rectangle", 100, 0, 200, 400);
  ground=createSprite(10,600,2000,5)
  //Platform Group
  platformGroup = new Group();
  //Diamonds Group
  diamondsGroup = new Group();
  //Spikes Group
  spikesGroup = new Group();
  //Creating restart button sprite
  restart = createSprite(500, 300);
  //Adding Image of restart button
  restart.addImage(restartImage);
  //Making restart button invisible
  restart.visible = false;
}

function draw() {
  //Play State (What the progam will do when its on play mode)
  if (gameState === "PLAY") {
    //To move the ironman up , down , right and left
    if (keyDown("up")) {
      ironMan.velocityY = -10;
    }
    if (keyDown("left")) {
      ironMan.x = ironMan.x - 5;
    }
    if (keyDown("right")) {
      ironMan.x = ironMan.x + 5;
    }
    ironMan.velocityY = ironMan.velocityY + 0.5;

    // Using Platforms Command
    generatePlatforms();
    for (var i = 0; i < platformGroup.length; i++) {
      var temp = platformGroup.get(i);

      if (temp.isTouching(ironMan)) {
        ironMan.collide(temp);
      }
    }
    // Using Diamonds Command
    generateDiamonds();

    for (var i = 0; i < diamondsGroup.length; i++) {
      var temp = diamondsGroup.get(i);
      // Diamonds displaying on screen
      if (temp.isTouching(ironMan)) {
        score++;
        temp.destroy();
        temp = null;
      }
    }
	ironMan.collide(ground)
    // Using Spikes Command
    generateSpikes();
    for (var i = 0; i < spikesGroup.length; i++) {
      var temp = spikesGroup.get(i);

      if (temp.isTouching(ironMan)) {
        score = score - 5;
        temp.destroy();
        temp = null;
      }
    }
    if (score <= -10 || ironMan.y > 610) {
      gameState = "END";
    }
  }
  //End State (What the progam will do when its on end mode)
  if (gameState === "END") {
    //Making all the things in the background of the mario freeze(stop)
    bg.velocityY = 0;
    ironMan.velocityY = 0;
    diamondsGroup.setVelocityYEach(0);
    spikesGroup.setVelocityYEach(0);
    platformGroup.setVelocityYEach(0);
    diamondsGroup.setLifetimeEach(-1);
    spikesGroup.setLifetimeEach(-1);
    platformGroup.setLifetimeEach(-1);
    //Making the restart button visible
    restart.visible = true;
    //Making the system restart the game when the button is pressed
    if (mousePressedOver(restart)) {
      restartGame();
    }
  }

  drawSprites();
  textSize(20);
  fill("white");
  text("Diamonds Collected: " + score, 500, 50);
}
// Generating Platforms Command
function generatePlatforms() {
  if (frameCount % 60 === 0) {
    var brick = createSprite(1200, 10, 40, 10);
    brick.x = random(50, 850);
    brick.addImage(platformImage);
    brick.velocityY = 5;
    brick.lifetime = 250;
    platformGroup.add(brick);
  }
}

// Generating Diamonds Command
function generateDiamonds() {
  if (frameCount % 80 === 0) {
    var diamond = createSprite(1200, 0, 40, 10);

    diamond.addAnimation("diamond", diamondImage);
    diamond.x = random(50, 850);
    diamond.scale = 0.5;
    diamond.velocityY = 3;
    diamond.lifetime = 1200;
    diamondsGroup.add(diamond);
  }
}

// Generating Spikes Command
function generateSpikes() {
  if (frameCount % 150 === 0) {
    var spikes = createSprite(1200, 90, 10, 40);
    spikes.addAnimation("spike", spikeImage);
    spikes.x = random(50, 850);
    spikes.scale = 0.5;
    spikes.velocityY = 3;
    spikes.lifetime = 600;
    spikesGroup.add(spikes);
  }
}

// Generating restart game Command
function restartGame() {
  //Making the gamestate return back to play
  gameState = "PLAY";
  //Destroying the command in end state to stop all the platform , daimonds and spikes
  //Making all the commands run again
  platformGroup.destroyEach();
  diamondsGroup.destroyEach();
  spikesGroup.destroyEach();
  //Making the score re-set to 0
  score = 0;
  ironMan.y = 50;
  //Making restart button invisible again
  restart.visible = false;
}
