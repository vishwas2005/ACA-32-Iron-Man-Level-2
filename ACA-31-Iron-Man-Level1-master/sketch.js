var bg, backgroundImg;
var score = 0

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  Iron = loadImage("images/iron.png")
  Stone = loadImage("images/stone.png")
  D = loadImage("images/diamond.png")
  
}

function genD(){
  di = createSprite(500,10,10,10)
  di.x = random(100,900)
  di.addImage(D)
  di.scale = 0.4
  di.velocityY = 4
  di.lifetime = 180
  diG.add(di)
}

function genS(){
  St = createSprite(500,10,10,60)
  St.x = random(100,900)
  St.addImage(Stone)
  St.scale = 0.6
  St.velocityY = 4
  St.lifetime = 180
  StG.add(St)
}

function setup() {
  createCanvas(1000,550);
  bg = createSprite(580,300,1000,600);
  bg.addImage(backgroundImg)
  bg.velocityY = 4
  bg.scale = 2 
  Man = createSprite(500,200,40,40)
  Man.addImage(Iron)
  Man.scale = 0.25
  StG = new Group()
  diG = new Group()
}

function draw() {
  if (bg.y > 600){
     bg.y = 300
  }
 
  if(keyDown("up")){
    Man.velocityY = -6
  } 
  if(keyDown("left")){
    Man.x -= 6
  }
  if(keyDown("right")){
    Man.x += 6
  }
  Man.velocityY += 0.2 

  if(frameCount%40 == 0){
    genS()
  }
  if(frameCount%100 == 0){
    genD()
  }   
 for(g = 0; g < StG.length; g+=1 ){
   h = StG.get(g)
   if(Man.isTouching(h)){
     Man.collide(h)
   }
 }
 for(f = 0;f < diG.length;f += 1 ){
  o = diG.get(f)
   if(Man.isTouching(o)){
     o.destroy()
     score += 1
     o = null
   }
 }

  drawSprites();
   
}
