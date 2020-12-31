var player;
var ground, ground2;
var gameState = "SERVE";
var score = 0;

function setup() {
  createCanvas(displayWidth-20, displayHeight-125);
  //player.collide(ground2);
  //Grounds
  ground = createSprite(400, displayHeight/2+100, displayWidth*2, 30);
    ground.x = ground.width/2;
    ground.shapeColor = "#e7e7de";
  ground2 = createSprite(0, displayHeight/2, 200, 190);
    ground2.shapeColor = "#e7e7de";
  player = createSprite(20, ground2.y-95, 50, 50);
    player.shapeColor = "#e7e7de";
  //ground2.x = ground2.width/2;
  //Groups
  platformGroup = new Group();
}

function draw() {
  background(0);

  //Score display
  text("Score: "+ score, displayWidth-100, 40);

 //SERVE 
  if(gameState === "SERVE"){
    serve();
  }

  //PLAY
  if(gameState === "PLAY"){
    play();
  }

  //END
  if(gameState === "END") {
    end();
  }
  player.collide(ground2);
  drawSprites();
}

function platform() {
  var rand = Math.round(random(30, 40));
  if(frameCount%rand === 0) {
    var platform = createSprite(displayWidth+20,100,50,30);
    var rand1 = Math.round(random(ground.y-100, ground.y-20));
      platform.y = rand1;
      platform.height = 2*(ground.y - platform.y);
      platform.collide(ground);
      platform.velocityX = -5;
    var rand2 = Math.round(random(50, 80));
      platform.width = rand2;
    var rand3 = Math.round(random(1,3));
      switch(rand3){
        case 1: platform.shapeColor = "#008891";
        break;
        case 2: platform.shapeColor = "#00587a";
        break;
        case 3: platform.shapeColor = "#0f3057";
        break;
        default : break;
      }
      platform.lifetime = 400;
      platformGroup.add(platform);
  }
}

function serve(){
  text("PRESS 'SPACE' TO JUMP", displayWidth/2-90, 40);
  //gravity
  player.velocityY = player.velocityY+0.8;
  if(keyDown("RIGHT_ARROW")) {
    player.x = player.x+5;
  }
  //ground2
  player.collide(ground2);
  //start game

  platform();

  if(keyDown("space")){
    gameState = "PLAY";
    ground2.destroy();
  }
}

function end(){
  player.velocityX = 0;
  player.velocityY = 0;
  ground.velocityX = 0;
  platformGroup.setVelocityXEach(0); 
  platformGroup.setLifetimeEach(-1);
  text("GAME OVER", displayWidth/2, 200);
}

function play(){
  //jump
  if(keyDown("space")) {
    player.velocityY = -10;
  }
  if(keyDown("LEFT_ARROW")) {
    player.x = player.x - 7;
  }
  //score
  score = Math.round(World.frameCount/5);
  //gravity
  player.velocityY = player.velocityY+0.8;
  if(keyDown("RIGHT_ARROW")) {
    player.x = player.x+7;
  }
  //grounds
  ground.velocityX = -2;
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  //collision
  //player.collide(ground);
  //player.collide(ground2);
  player.collide(platformGroup);

  platform();

  if(isTouching(ground, player)){
  gameState = "END";
  }
}