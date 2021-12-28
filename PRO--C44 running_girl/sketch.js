var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

var background,backgroundImg;
var girl, girlImg;
var dog,dogImg,dog_collided;
var coin,coinImg1,coinImg2,coinImg3;
var invisibleGround;
var dogGroup,coinsGroup;

function preload(){
  backgroundImg = loadImage("./Images/bgImg.jpg");
  girlImg = loadAnimation("Images/run1.png","Images/run2.png","Images/run3.png");
  dogImg = loadAnimation("Images/dog (1).png","Images/dog (2).png");
  dog_collided = loadImage("Images/dog (2).png");
  coinImg1 = loadImage("Images/coin (1).png");
  coinImg2 = loadImage("Images/coin (2).png");
  coinImg3 = loadImage("Images/coin (3).png");
}
function setup() {
  createCanvas(800,400);

  // sprite for background
  background = createSprite(320,200);
  background.addImage("track",backgroundImg);
  background.x = background.width/2;
  background.scale = 2.5;
  background.velocityX=-4;

  // sprite for girl 
  girl = createSprite(70,360,10,10);
  girl.addAnimation("standing",girlImg);
  girl.scale= 2;

  //Creating invisible ground
  invisibleGround = createSprite(50,380,900,20);
  invisibleGround.visible =false;

  //Creating Cloud Group
  coinsGroup = createGroup();
  dogsGroup=createGroup();

}

function draw() {

// displaying score 
text("Score: "+score,500,50);

// gameState for game 
if (gameState === PLAY) {
  
//scoring
score = score + Math.round(getFrameRate()/60);

//jump when the space key is pressed
  if(keyDown("space") && girl.y>=200) {
    girl.velocityY = -10;
}

//add gravity
girl.velocityY = girl.velocityY + 0.8;

// moving background
if (background.x < 0){
  background.x = background.width/2;
}

coinObstacles();
dogsObstacle();

if(dogsGroup.isTouching(girl)){
  gameState = END;
}

} 
else if (gameState === END){

// changing background velocityX
  background.velocityX = 0;

// changing dog image and velocityX
   dog.velocityX = 0;

//set lifetime of the game objects so that they are never destroyed
   dogsObstacle.setLifetimeEach(-1);
   coinsGroup.setLifetimeEach(-1);
    
  dogsObstacle.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0)

}
//stop girl from falling down
girl.collide(invisibleGround);  


drawSprites();
 
}

function dogsObstacle(){
  if (frameCount % 60 === 0){
    
    var dog = createSprite(730,300,10,10);
        dog.addAnimation("running",dogImg);
        dog.y = Math.round(random(350,300));
        dog.scale = 0.5;
        dog.velocityX = -3;

//assign lifetime to the variable
        dog.lifetime = 300;
    
  //add each obstacle to the group
      dogsGroup.add(dog);
  }
 
  }


  function coinObstacles(){
  if (frameCount % 100=== 0){
   var coin = createSprite(570,300,10,40);
   coin.y = Math.round(random(300,100));
   coin.addImage(coinImg1);
       
//assign scale and lifetime to the obstacle           
       coin.scale = 0.5;
       coin.velocityX=-3;

 
      coin.lifetime = 134; 

//adding coin to the group
coinsGroup.add(coin);
      }
   }