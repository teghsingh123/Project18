var PLAY = 0;
var END = 1;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, rock, rockImage
var bananGroup, obstacleGroup
var score= 100;
var ground;
var forestImage;
var forest;
var gameover,gameoverImage;
var keepgoing;
var keepgoingImage;
function preload(){
    
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  rockImage = loadImage("obstacle.png");
  forestImage = loadImage("forest.webp");
  keepgoingImage = loadImage("keep going.jpg");
  gameoverImage = loadImage("gameover2.jpg");
}



function setup() {
  createCanvas(400,350)
  monkey = createSprite(80,300,20,20); 
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1;

  forest = createSprite(0,200,900,50);
  forest.addImage(forestImage);
  forest.scale = 2;
  
  forest.velocityX = -2
  
  monkey.depth = forest.depth+1;
  
  ground = createSprite(400,340,900,10);
  ground.visible = false;
  ground.x = ground.width /2;
 
  bananaGroup = new Group();
  rockGroup = new Group();

}


function draw() {
   background(300)
  
  score.depth = forest.depth+1;
  
   monkey.velocityY = monkey.velocityY + 0.8;
   monkey.collide(ground);
  
  
 if(keyDown("space")&& monkey.y>250){
    monkey.velocityY = -15; 
   
 }
    
  //text("You have 100% survival rate now but as //you move ahead your tiredness ",20,85)
 
 // text("will decrese your survival rate.",10,105);
  //text("           So increse your energy by eating your favourite bananas.",10 ,130)
  
   ground.velocityX = -6;
   score = score - Math.round(getFrameRate()/60);
  
  
  
  if(monkey.isTouching(bananaGroup)){
    score = score +30;
    bananaGroup.destroyEach()
    monkey.scale = 0.15 ;
    forest.velocityX = -4;
  }
if(monkey.isTouching(bananaGroup)){
    monkey.scale = 0.15 ;
    forest.velocityX = -4;
  }

   
    
  if(monkey.isTouching(rockGroup)) {
    monkey.scale =  0.1;
    rockGroup.destroyEach()
    forest.velocityX = -2;
  }
  if (score === 0){
    gameState =END;
  }
    
  
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
   if(forest.x <0){
    forest.x = forest.width /2;  
   }
  
 if ( gameState === END){
  rockGroup.destroyEach()
  bananaGroup.destroyEach()
  bananaGroup.velocityX = 0
  score = 0;
  forest.velocityX = 0;
  ground.velocityX = 0;
  gameover = createSprite(200,200,50,50);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.9;
   
 }
    bananas() 
    obstacles()
  
    drawSprites() 
  
   stroke("white");
   textSize(20)
   fill("white") 
   text("Life: "+ score,150,40);
   textSize(17)
   text("Space = Jump",5,67)
   
}

function bananas(){
  if (frameCount %  50 === 0) {
     var banana = createSprite(600,165,10,40);
     banana.addImage(bananaImage);
     banana.y = Math.round(random(150,200));
     banana.velocityX = -7;
     //generate random obstacles`
    
     banana.scale = 0.1;
     banana.lifetime =125;
    
     bananaGroup.add(banana);
 } 
  
}

function obstacles(){
  if (frameCount %  150 === 0) {
      rock = createSprite(600,165,10,40);
      rock.addImage(rockImage);
   
      rock.y = Math.round(random(310,311));
      rock.velocityX = -6;
    
     rockGroup.add(rock);
     rock.scale = 0.15;
     rock.lifetime =220;
      
 } 
  
}


