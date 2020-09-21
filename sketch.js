var ball, playerPaddle, computerPaddle, edges;

var ballImage, playerImage, robotImage;

var gameState, compScore, playerScore;

var hitSound, wall_hit;

function preload(){
  
  ballImage = loadImage("ball.png");
  playerImage = loadImage("Player.png");
  robotImage =loadImage("robot.png");
  hitSound = loadSound("hit.mp3");
  wall_hit = loadSound("wall_hit.mp3");
  
}

function setup(){
  createCanvas(400,400);
  ball = createSprite(200,200,10,10);
  ball.addImage("ball", ballImage);
  
  playerPaddle = createSprite(380,200,10,70);
  playerPaddle.addImage("player", playerImage);
  
  computerPaddle = createSprite(30,200,10,70);
  computerPaddle.addImage("robots", robotImage);
  
  //variable to store different state of game
  gameState = "serve";

  //variables to keep the score
  compScore = 0;
  playerScore = 0;
  
  edges= createEdgeSprites();
}

function draw(){
  background("black");
  
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
  
  if(ball.isTouching(playerPaddle) || ball.isTouching(computerPaddle)){
    hitSound.play();
  }

  if(ball.isTouching(edges[2]) || ball.isTouching(edges[3])){
    wall_hit.play();
  }
   
  //display scores
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    stroke("white");
    line(200,i,200,i+10);
  }
  
  
 
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();

}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}