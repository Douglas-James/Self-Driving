import Controllers from "./controller";
import Sensors from "./sensor";
import { polysIntersect } from "./utilit";
import {NeuralNetwork} from "./network"
// const youtouch = document.querySelector(".touch")
class Car{
  constructor(x,y,width,height, controlType, maxSpeed = 3){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 1;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged=false;
    // this.passedcar = false;
  
     this.useBrain = controlType=="AI"
  
    if(controlType!= "DUMMY"){
      this.sensors = new Sensors(this)
      this.brain = new NeuralNetwork(
        [this.sensors.rayCount, 6,4]
      );
    }

    this.Controllers = new Controllers(controlType)
    
    


  }
  
  update(roadBorders,traffic){
    if(!this.damaged){
      this.#move();
      this.polygon = this.#createPolygon();
      this.damaged = this.#assessDange(roadBorders,traffic)
    }
    // if(this.damaged){
    //    this.passedcar = true;
    // }
    if(this.sensors){
      this.sensors.update(roadBorders,traffic)
      const offsets = this.sensors.readings.map(
        s=>s==null?0:1-s.offsets, 
      );
      const outputs = NeuralNetwork.feedForward(offsets,this.brain)

       if(this.useBrain){
        this.Controllers.forward=outputs[0];
        this.Controllers.left = outputs[1];
        this.Controllers.right = outputs[2];
        this.Controllers.reverse = outputs[3];
       }
    }
    
    }
  // damge
  #assessDange(roadBorders, traffic){
    for(let i = 0; i < roadBorders.length;i++){
        if(polysIntersect(this.polygon,roadBorders[i])){
          return true
        }
    }
    for(let i = 0; i < traffic.length;i++){
        if(polysIntersect(this.polygon,traffic[i].polygon)){
          return true
        }
    }
    return false;

  }
   
  // create the car
   #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }
  
  // private method
  #move(){
    if(this.Controllers.forward){
      this.speed+= this.acceleration;
    }

    if(this.Controllers.reverse){
     this.speed -= this.acceleration;
    }

    if(this.speed>this.maxSpeed){
      this.speed = this.maxSpeed;
    }

    if(this.speed<- this.maxSpeed/2){
      this.speed=-this.maxSpeed/2;
    }
    

    if(this.speed>0){
      this.speed -= this.friction;
    }

     if(this.speed<0){
      this.speed += this.friction;
    }

    if(Math.abs(this.speed)<this.friction) this.speed = 0;

    if(this.speed!=0){
      const flip = this.speed>0?1:-1;
      if(this.Controllers.left){
        this.angle += 0.03*flip;
      }
      if(this.Controllers.right){
       this.angle -= 0.03*flip;
     }
    }
  
    this.x -= Math.sin(this.angle)*this.speed;
    this.y -= Math.cos(this.angle)*this.speed;
    // this.y -= this.speed;
  }

  draw(ctx, color, drawSensor = false){
    if(this.damaged){
        ctx.fillStyle = "rgba(21, 20, 20, 0)"
        // youtouch.innerHTML = "I have made a mistake click 🗑️ : ("
    }else{
      ctx.fillStyle = color
      // youtouch.innerHTML = "I'm AI teach me drive safe by click 💻: )"
    }
    
    // ctx.save()
    // ctx.translate(this.x,this.y)
    // ctx.rotate(-this.angle)

    // ctx.beginPath();
    // ctx.rect(
    //   -this.width/2,
    //   -this.height/2,
    //   this.width,
    //   this.height
    // );
    // ctx.fill();

    // ctx.restore();
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
    for(let i = 0;i<this.polygon.length;i++){
      ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
    }
    ctx.fill()
    if(!this.damaged){
      if(this.sensors && drawSensor){
        this.sensors.draw(ctx);
      }
    }
  }
}

export default Car;