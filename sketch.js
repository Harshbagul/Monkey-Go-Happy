
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var invisibleGround;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg =  loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(500,300)
  monkey = createSprite(40, 250,20,20);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200,290,600,5)
  ground.velocityX = -4;
  

  obstaclesGroup = new Group();
  bananaGroup = new Group();

   invisibleGround = createSprite(200,340,600,5)
  invisibleGround.velocityX = -4;
  invisibleGround.visible = false;
  
  score = 0; 
}


function draw() {
 background("white");
  drawSprites();
  ground.x = ground.width/2;
  
stroke("white")
textSize(20)
fill("black")
text("Score: "+ score,400,50)

stroke("white")
textSize(20)
fill("black")
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time: "+ survivalTime,100,50)
  
monkey.collide(invisibleGround);
  
if (keyDown("space") && monkey.y >= 250) {
    monkey.velocityY = -17;
  }
 
  monkey.velocityY = monkey.velocityY + 0.9;

  monkey.collide(ground);

  if (frameCount % 60=== 0) {
    var obstacle = createSprite(500, 260,20, 20);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 64;
    
  }

  if (World.frameCount % 80 === 0) {
    var banana = createSprite(500, random(110, 190), 20, 20);
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.velocityX = -8;
    banana.lifetime = 64;
    bananaGroup.add(banana);
  }

  if (obstaclesGroup.isTouching(monkey)) {
    obstaclesGroup.destroyEach();
    monkey.scale = 0.1;
    ground.velocityX = 0
  }

  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
}






