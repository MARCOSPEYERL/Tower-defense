class CannonBall{

    constructor(x, y){
        var options = {
            isStatic: true
        }
    this.trajectory = [];
    this.r = 30;
    this.body = Bodies.circle(x, y, this.r, {isStatic: true});
    this.image = loadImage("/assets/cannonBall.png");
    this.animation = [this.image];
    this.isSink = false;
    World.add(world, this.body);

}

display(){

    push();
    imageMode(CENTER);
    image(this.image, this.body.position.x, this.body.position.y, this.r, this.r);
    pop()

    if(this.body.velocity.x >0 && this.body.position.x >220){
        var position = [this.body.position.x, this.body.position.y];
        this.trajectory.push(position);       
    }
    for(var i=0; i < this.trajectory.length; i++){
        image(this.image,this.trajectory[i][0], this.trajectory[i][1], 5,5);
    }
}



shoot(){

    var newAngle = cannon.angle - 20;
    newAngle= newAngle*(3.14/180);
    var newVelocity = p5.Vector.fromAngle(newAngle);
    newVelocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
        x: newVelocity.x *(180/3.14), 
        y: newVelocity.y *(180/3.14)
    });
 
}

remove(index){
    this.isSink = true
    Matter.Body.setVelocity(this.body, {x:0, y:0 });

    this.animation = waterSplashAnimation;
    this.speed = 0.05;
    this.r = 150;

  

setTimeout(() => {
    World.remove(world, this.body);
    delete balls[index];
},1000) 

}

}