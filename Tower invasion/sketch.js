const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world,ground;
var backgroundImg;
var tower, towerImg;
var angle, cannon;

var balls = [];
var boats = [];

var boatSpriteData, boatSpriteSheet;
var boatAnimation = [];

var brokeBoatAnimation = [];
var brokeData, brokeSheet;

var  waterSplashAnimation = [];
var   waterSplashData,  waterSplasSheet;

function preload() {
  backgroundImg = loadImage("/assets/background.gif");
  towerImg = loadImage("/assets/tower.png");

  waterSplashData = loadJSON("assets/waterSplash/waterSplash.json");
  waterSplashSheet = loadImage("assets/waterSplash/waterSplash.png");
  brokeData = loadJSON("assets/boat/brokenBoat.json");
  brokeSheet = loadImage("assets/boat/brokenBoat.png");

  boatSpriteData = loadJSON("assets/boat/boat.json");
  boatSpriteSheet = loadImage("assets/boat/boat.png");
}


function setup() {

  createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 20; 

 options={
 isStatic:true
 }
 
 ground = Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 

 tower = Bodies.rectangle(160,350,160,310,options);
 World.add(world,tower);

 cannon = new Cannon(180, 110, 130, 100, angle)

 var boatFrames = boatSpriteData.frames;
 for(var i=0; i <boatFrames.length; i++){
   var pos = boatFrames[i].position;
   var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
  boatAnimation.push(img);
 }

 var brokeFrames = brokeData.frames;
 for(var i=0; i <brokeFrames.length; i++){
  var pos = brokeFrames[i].position;
  var img = brokeSheet.get(pos.x, pos.y, pos.w, pos.h);
 brokeBoatAnimation.push(img);

}

var waterSplashFrames = waterSplashData.frames;
for(var i=0; i <waterSplashFrames.length; i++){
 var pos = waterSplashFrames[i].position;
 var img = waterSplashSheet.get(pos.x, pos.y, pos.w, pos.h);
 waterSplashAnimation.push(img);

}

}



function draw() {
  background(189);
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);
  
  rect(ground.position.x, ground.position.y,width*2,1);
  
  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160,310 );
  pop();


  cannon.display();

  for(var i=0; i < balls.length; i++){
    showCannonBalls(balls[i], i)
    collisionWithBoat(i);
    }

  showBoats();

}


function keyPressed(){
  if (keyCode === 32){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function keyReleased(){
  if(keyCode === 32){
  //cannonBall.shoot();
  balls[balls.length-1].shoot();
  }
}


function showCannonBalls(ball, index){
  if(ball){
    ball.display();
    
    if(ball.body.position.y >= height -50){
      ball.remove(index)
    }else if(ball.body.position.x >= width){

      World.remove(world, balls[index].body);
        delete balls[index]; }

    

  }

}

function showBoats(){
  if(boats.length > 0){
  
    if(boats[boats.length -1]=== undefined ||
      boats[boats.length -1].body.position.x < width-300){

      var positions = [-40, -60, -20, -50, -70]
      var position = random(positions);
      var boat = new Boat(width+30, height-60, 170, 170, position, boatAnimation);
      //largura da tela = width+30, altura da tela = height-60
boats.push(boat);



}
    for(var i=0; i < boats.length; i++){

      if(boats[i]){ // boats[i] == true
        Matter.Body.setVelocity(boats[i].body, {x:-1, y:0});
        boats[i].display();
        boats[i].animate();
      }

    }

  }else {

   var boat = new Boat(width+30, height-60, 170, 170, -80, boatAnimation);
                      //largura da tela = width+30, altura da tela = height-60
   boats.push(boat);
  }



}

//index índice da bola
//i índice do barco
function collisionWithBoat(index){

  for (var i=0; i<boats.length; i++){

    if(balls[index] !== undefined && boats[i] !== undefined){

      var collision = Matter.SAT.collides(balls[index].body,boats[i].body);

      if(collision.collided){

        boats[i].remove(i);
        //remove a bolinha instateneamente
        World.remove(world, balls[index].body);
        delete balls[index];


      }
    }


}


}




