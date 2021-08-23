var bg, backgroundImg;

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  Iron = loadImage("images/iron.png")
  Stone = loadImage("images/stone.png")
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
  createCanvas(1000, 600);
  bg = createSprite(580,300,1000,600);
  bg.addImage(backgroundImg)
  bg.velocityY = 4
  bg.scale = 2 
  Man = createSprite(500,200,40,40)
  Man.addImage(Iron)
  Man.scale = 0.25
  Man.debug = true
  Man.setCollider("rectangle",100,0,200,400)
  StG = new Group()
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
 for(g = 0; g < StG.length; g+=1 ){
   h = StG.get(g)
   if(Man.isTouching(h)){
     Man.collide(h)
   }
 }

  drawSprites();
   
}