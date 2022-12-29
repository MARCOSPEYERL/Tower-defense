class Boat{

    constructor(x, y, width, height, boatPos, boatAnimation){

        this.body = Bodies.rectangle(x, y, width, height);
        this.width = width;
        this.height = height;
        this.boatPosition = boatPos;
        
        this.animation = boatAnimation;
        this.speed = 0.05;

        this.image = loadImage("/assets/boat.png");

        World.add(world, this.body);

    }

    animate(){
        this.speed += 0.05;
    }

display(){

var index = floor(this.speed % this.animation.length);

    push();
    translate(this.body.position.x, this.body.position.y);
    imageMode(CENTER);
    image(this.animation[index], 0, this.boatPosition, this.width, this.height);
    pop();
}

remove(index){
    this.animation = brokeBoatAnimation;
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    this.isBroken = true
    setTimeout(() => {
        World.remove(world, boats[index].body);
        boats.splice(index, 1);
    },2000) 
    

}

}