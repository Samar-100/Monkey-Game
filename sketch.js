// Global Variables
var bananaImage,
  obstacleImage,
  backgroundImage,
  obstaclesGroup,
  player,
  player_collided;
var gameOverImage, groundImage, restartImage, foodGroup, obstaclesTouched;

var Banana, stone, jungle, Monkey, restart, gameOver, ground, score;
var PLAY, END, gameState;

//all animation or images are loaded in preload
function preload() {
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImage = loadImage("gameOver.png");
  backgroundImage = loadImage("jungle.jpg");
  player = loadAnimation(
    "Monkey_01.png",
    "Monkey_02.png",
    "Monkey_03.png",
    "Monkey_04.png",
    "Monkey_05.png",
    "Monkey_06.png",
    "Monkey_07.png",
    "Monkey_08.png",
    "Monkey_09.png",
    "Monkey_10.png"
  );
  restartImage = loadImage("restart.png");
  groundImage = loadImage("ground.jpg");
  player_collided = loadImage("Monkey_01.png");
}

//sets all the requirements which need to be added once
function setup() {
  createCanvas(600, 300);
  Monkey = createSprite(50, 180, 20, 20);
  Monkey.addAnimation("Monkey", player);
  Monkey.addAnimation("collided", player_collided);
  Monkey.scale = 0.15;

  ground = createSprite(300, 360, 20, 20);
  ground.addImage("ground", groundImage);
  ground.scale = 0.17;
  ground.visible = false;

  gameOver = createSprite(300, 75, 20, 20);
  gameOver.addImage("gameOverImage", gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(300, 125, 20, 20);
  restart.addImage("restartImage", restartImage);
  restart.scale = 0.5;
  restart.visible = false;

  jungle = createSprite(300, 88, 20, 20);
  jungle.addImage(backgroundImage);
  jungle.scale = 1;
  obstaclesGroup = new Group();
  foodGroup = new Group();
  score = 0;
  textSize(23);
  obstaclesTouched = 0;
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background(0);
  //helps the monkey to collide
  Monkey.collide(ground);
  if (gameState === PLAY) {
    //if size changes this statement helps the monkey to still jump
    switch (Monkey.scale) {
      case 0.15:
        if (keyDown("space") && Math.round(Monkey.y) == 220) {
          Monkey.velocityY = -14;
        }
        break;
      case 0.16:
        if (keyDown("space") && Math.round(Monkey.y) == 218) {
          Monkey.velocityY = -14;
        }
        break;
      case 0.17:
        if (keyDown("space") && Math.round(Monkey.y) == 216) {
          Monkey.velocityY = -14;
        }
        break;
      case 0.19:
        if (keyDown("space") && Math.round(Monkey.y) == 210) {
          Monkey.velocityY = -14;
        }
        break;
      case 0.2:
        if (keyDown("space") && Math.round(Monkey.y) == 206) {
          Monkey.velocityY = -14;
        }
        break;
      default:
        break;
    }

    //increases the score and destroys the banana when touched
    if (foodGroup.isTouching(Monkey)) {
      foodGroup.destroyEach();
      score += 2;
    }

    //monkey and jungle velocity
    Monkey.velocityY += 0.6;
    jungle.velocityX = -3;

    //setting an infinite ground
    if (jungle.x < 0) {
      jungle.x = jungle.width / 2;
    }
    //calling functions
    makeFood();
    makeObstacle();

    //adjusts the depth for monkey
    Monkey.depth = jungle.depth;
    Monkey.depth += 1;
    gameOver.depth = jungle.depth;
    gameOver.depth += 1;
    restart.depth = jungle.depth;
    restart.depth += 1;

    //switch case for score which increases monkey size after reaching certain landmark
    switch (score) {
      case 10:
        Monkey.scale = 0.16;
        break;
      case 20:
        Monkey.scale = 0.17;
        break;
      case 30:
        Monkey.scale = 0.19;
        break;
      case 40:
        Monkey.scale = 0.2;
        break;
      default:
        break;
    }
  } else if (gameState === END) {
    jungle.velocityX = 0;
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    Monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    Monkey.changeAnimation("collided", player_collided);
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  if (obstaclesGroup.isTouching(Monkey) && obstaclesTouched === 0) {
    Monkey.scale = 0.15;
    obstaclesGroup.destroyEach();
    obstaclesTouched += 1;
  } else if (obstaclesTouched === 1 && obstaclesGroup.isTouching(Monkey)) {
    gameState = END;
  }
  drawSprites();
  text("Score: " + score, 450, 50);
}
function makeFood() {
  // function which makes infinite food
  var rand = random(170, 80);
  if (World.frameCount % 150 === 0) {
    Banana = createSprite(620, rand, 20, 20);
    Banana.addImage(bananaImage);
    Banana.scale = 0.05;
    Banana.velocityX = -4;
    Banana.lifetime = 155;
    foodGroup.add(Banana);
  }
}
function makeObstacle() {
  // function which makes infinite obstacles
  if (World.frameCount % 300 === 0) {
    stone = createSprite(620, 240, 20, 20);
    stone.addImage(obstacleImage);
    stone.scale = 0.17;
    stone.velocityX = -4;
    stone.lifetime = 155;
    obstaclesGroup.add(stone);
  }
}
function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  Monkey.changeAnimation("Monkey", player);
  obstaclesTouched = 0;
}
