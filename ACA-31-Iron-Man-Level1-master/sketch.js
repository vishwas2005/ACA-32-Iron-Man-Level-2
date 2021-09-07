//Making Variables
var bg, backgroundImg;
var score = 0

//Preloading Images
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  Iron = loadImage("images/iron.png")
  Stone = loadImage("images/stone.png")
  D = loadImage("images/diamond.png")
  Sp = loadImage("images/spikes.png")
}

//For generating Spikes
function genP(){
  Spi = createSprite(500,10,10,10)
  Spi.x = random(100,900)
  Spi.addImage(Sp)
  Spi.scale = 0.5
  Spi.velocityY = 4
  Spi.lifetime = 180
  SpG.add(Spi)
}

//For generating diamonds
function genD(){
  di = createSprite(500,10,10,10)
  di.x = random(100,900)
  di.addImage(D)
  di.scale = 0.4
  di.velocityY = 4
  di.lifetime = 180
  diG.add(di)
}

//For generating stones
function genS(){
  St = createSprite(500,10,10,60)
  St.x = random(100,900)
  St.addImage(Stone)
  St.scale = 0.6
  St.velocityY = 4
  St.lifetime = 180
  StG.add(St)
}

//Setting all the characters on the canvas
function setup() {
  //Adding the background
  createCanvas(1000,550);
  bg = createSprite(580,300,1000,600);
  bg.addImage(backgroundImg)
  bg.velocityY = 4
  bg.scale = 2

  //Adding th player - Iron Man
  Man = createSprite(500,200,40,40)
  Man.addImage(Iron)
  Man.scale = 0.25
  ground=createSprite(200,550,1900,10)

  //All the groups 
  StG = new Group()
  diG = new Group()
  SpG = new Group()
}

//Setting up how the game will function
function draw() {
  //Repeating the background
  if (bg.y > 600){
     bg.y = 300
   }
 
  //Controlling the player - Iron Man
  if(keyDown("up")){
     Man.velocityY = -6
   }

  if(keyDown("left")){
     Man.x -= 6
   }
  if(keyDown("right")){
     Man.x += 6
   }
  //Slowly increasing gravity
  Man.velocityY += 0.2 

  //Generating the obstacles
  if(frameCount%40 == 0){
     genS()
   }
  if(frameCount%100 == 0){
     genD()
     genP()
   }
  Man.collide(ground)
  //For Iron man to collide and stand on stones 
 for(g = 0; g < StG.length; g+=1){
     h = StG.get(g)
     if(Man.isTouching(h)){
       Man.collide(h)
     }
   }

  //For Iron man to collect coins  
 for(f = 0;f < diG.length;f += 1){
     o = diG.get(f)
     if(Man.isTouching(o)){
       o.destroy()
       score += 1
       o = null
     }
   }
  

  //For reducing points if hit by Spikes 
 for(j = 0;j < SpG.length;j += 1){
     k = SpG.get(j)
     if(Man.isTouching(k)){
       k.destroy()
       k = null
       score -= 5
     }
   }

  //Drawing all the characters
  drawSprites();

  //To show the score on the screen
   fill("white")
   textSize(20)
   stroke("blue")
   text("Diamonds collected: "+score,15,30)
}
