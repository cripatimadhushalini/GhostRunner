var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var iBlock,iBlockGroup;

var gameState = "PLAY";

var spookySound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  
  tower = createSprite(300,300,10,10);
  tower.addImage(towerImg);
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  
  iBlockGroup = new Group();
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw(){
  background(0);
  console.log(tower.height);
  
  if(gameState==="PLAY"){

      tower.velocityY = 2;

      if(keyDown("right_arrow")){
        ghost.x = ghost.x+3;
      }

      if(keyDown("left_arrow")){
        ghost.x = ghost.x-3;
      }

      if(keyDown("space")){
        ghost.velocityY = -5;
      }

      ghost.velocityY = ghost.velocityY+0.8;

      if(tower.y>400){
        tower.y = 300;
      }
      if(climberGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }
      spawnDoors();
      if(iBlockGroup.isTouching(ghost) || ghost.y>600){
        ghost.destroy();
        gameState = "END"
      }      
    
    drawSprites();
    
   }
  
  if(gameState==="END"){
    textSize(30);
    stroke("yellow");
    fill("pink");
    text("GAME OVER",230,250);
  }
  
}

function spawnDoors(){
  if(frameCount%200===0){
    door = createSprite(300,-50,10,10);
    door.addImage(doorImg);
    
    climber = createSprite(300,0,10,10);
    climber.addImage(climberImg);
    
    iBlock = createSprite(300,5,10,10);
    iBlock.width = climber.width;
    iBlock.height = 5;
    
    door.velocityY = 2;
    climber.velocityY = 2;
    iBlock.velocityY = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    iBlock.x = climber.x;
    
    iBlock.lifetime = 590;
    door.lifetime = 590;
    climber.lifetime = 590;
    
    climberGroup.add(climber);
    doorGroup.add(door);
    iBlockGroup.add(iBlock);
    
    iBlock.debug = true;
    iBlock.visible = false;
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
  }
}