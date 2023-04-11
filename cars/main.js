import Car from "./car";
import {getRandomColor} from './utilit'
import Road from "./road";
import visualizeNetworks from "./visualizeNetwork";
import { NeuralNetwork } from "./network";

// pause car movement 
const pauseAnimation = document.querySelector('#paused__car');
const youtouch = document.querySelector(".touch")
// save date for car
const savess = document.getElementById('save')
const discards = document.getElementById('discard')
savess.addEventListener('click', 
   save
)

discards.addEventListener('click',
discard
)


// car and network canvas
const carCanvas = document.getElementById("mycar");
carCanvas.width = 600;

const networkCanvas = document.getElementById("neuralNetwork");
networkCanvas.width =600;

const road = new Road(carCanvas.width/2,carCanvas.width*0.9)

// ctx
const carctx = carCanvas.getContext("2d")
const networkctx = networkCanvas.getContext("2d")
// "KEYS" for controller for manual
const N = 1000;
const cars = generatCar(N)
let bestCar = cars[0];

if(localStorage.getItem('bestBrain')){
  for(let i = 0; i<cars.length;i++){
    cars[i].brain = JSON.parse(
     localStorage.getItem('bestBrain')
    );
    if(i!=0){
      NeuralNetwork.mutate(cars[i].brain,0.2)
    }
  }
   
}


// save localStorage
function save(){
  localStorage.setItem('bestBrain', 
      JSON.stringify(bestCar.brain)
  );
}

// // discard
function discard(){
  localStorage.removeItem("bestBrain");
  localStorage.clear("bestBrain");
}
// generat car
function generatCar(N){
  const cars = []
  for(let i = 0; i <= N;i++){
    cars.push(new Car(road.getlaneCenter(1), 100, 30, 50, "AI", 2))
  }
  return cars
}
let hue=Math.floor(290+Math.random()*260) * Math.random(2);
// Trafic
const traffic = [
   new Car(road.getlaneCenter(1), -300, 30, 100, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -500, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -500, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(1), -700, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -1000, 30, 100, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -100, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -1000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -1000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -2000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(1), -5000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -6000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -6000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -7000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -10000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(1), -10000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -10000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -11000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -11000, 30, 100, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -12000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -14000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -15000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(1), -17000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(2), -18000, 30, 50, "DUMMY", 1, getRandomColor()),
   new Car(road.getlaneCenter(0), -19000, 30, 50, "DUMMY", 1, getRandomColor()),
    new Car(road.getlaneCenter(1), -20000, 30, 200, "DUMMY", 1, getRandomColor()),
  ];



// console.table(car)
// console.log(road.borders)

function animate (time){
  for(let i = 0; i < traffic.length;i++){
    traffic[i].update(road.borders,[])
  }

  for(let i = 0; i < cars.length;i++){
    cars[i].update(road.borders, traffic);
  }
  
  // best car
  bestCar = cars.find(
    c=>c.y==Math.min(
      ...cars.map(c=>c.y)
    )
  );


  // console.log(car.update(road.borders))
  carCanvas.height = window.innerHeight;
  networkCanvas.height = window.innerHeight;
  
  carctx.save()
  carctx.translate(0, -bestCar.y+carCanvas.height*0.7);

  road.draw(carctx)
  for(let i = 0;i < traffic.length;i++){
    traffic[i].draw(carctx, "hsl("+hue+", 100%, 60%)")
  }

  carctx.globalAlpha=0;
  for(let i = 0; i < cars.length;i++){
     cars[i].draw(carctx,);
   }
   carctx.globalAlpha = 1;
   bestCar.draw(carctx,  "hsl("+hue+", 100%, 60%)", true)
  //  -33114
   if(bestCar.y <= -33114000){
      road.lanecount = 0;
      traffic.length = 0;
      bestCar.damaged = true;
      pauseAnimation.innerHTML = "The Developer has Paused the animation, look at me later"
      youtouch.innerHTML = "It isn't a bug the developer is has made this without update"
      road.borders = [
            [0,0],
            [0,0]
     ];
      
    }
  
  carctx.restore();
  networkctx.lineDashOffset = -time/2
  visualizeNetworks.drawNetwork(networkctx,bestCar.brain)
  requestAnimationFrame(animate)
}

animate();