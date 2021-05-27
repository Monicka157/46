var PLAY;
var END;
var gameState = PLAY;

var player,playeranimation;
var ground;
var obstaclesGroup,obstacle1,obstacle2,obstacl3,obstacle4;
var rewardsGroup,reward1Img,reward2Img,reward3Img;
var newGroup;


function preload(){
playeranimation =loadAnimation("IMAGES/1.png","IMAGES/2.png","IMAGES/3.png","IMAGES/4.png","IMAGES/5.png",
"IMAGES/6.png","IMAGES/7.png","IMAGES/8.png");
obstacle1 = loadImage("IMAGES/OB1.png");
obstacle2 = loadImage("IMAGES/OB2.png");
obstacle3 = loadImage("IMAGES/OB3.png");
obstacle4 = loadImage("IMAGES/OB4.png");
reward1Img = loadImage("IMAGES/REW1.png");
reward2Img = loadImage("IMAGES/REW2.png");
reward3Img = loadImage("IMAGES/REW3.png");



}

function setup() {
  createCanvas(800,400);
  player = createSprite(100, 200, 50, 50);
  player.addAnimation("running",playeranimation);
  ground = createSprite(400,250,800,20);
 
  obstaclesGroup = new Group();
  reward1Group = new Group();
  reward2Group = new Group();
  reward3Group = new Group();
}


function draw() {
  background(0); 
  player.collide(ground); 
  
//gameState 
if (gameState === PLAY){
  spawnRewards();
  spawnObstacles(); 
  if(obstaclesGroup.isTouching(player)){ 
    gameState = END;
  }
  if(reward1Group.isTouching(player)){
    gameState = END;
  }
}
 else if(gameState === END ){
   obstaclesGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1);
   reward1Group.setVelocityXEach(0);
   reward1Group.setLifetimeEach(-1);
 }

  drawSprites();
}

function reset(){ p()
  gameState = play; 
  obstaclesGroup.destroyEach();
  reward1Group.destroyEach(); 
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    
    obstaclesGroup.add(obstacle);
  }
}
function spawnRewards(){
  if(frameCount%100 === 0){
    reward1()
  }
}
function reward1() {
  var rew1 = createSprite(800,random(20, 370), 10, 10);
  rew1.addImage(reward1Img);
  rew1.scale = 0.2;
  rew1.velocityX = -3;
  rew1.lifetime = 150;
  reward1Group.add(rew1);
}