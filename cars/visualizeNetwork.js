import { lerp ,getRGBA} from "./utilit";
class visualizeNetwork{
   
  static drawNetwork(ctx, network){
    const margin = 50;
    const left = margin;
    const top = margin;
    const width = ctx.canvas.width-margin*2;
    const height = ctx.canvas.height-margin*2;

    const levelHeight = height/network.levels.length;
    
  // '⇑','⇐','⇒','⇓'

    for(let i = network.levels.length-1; i >=0;i--){  
         const levelTop =top+
         lerp(
          height-levelHeight,
          0,
          network.levels.length==1?
          0.5:i/(network.levels.length-1)
         );
        ctx.setLineDash([7,2]);
        visualizeNetwork.drawLevel(ctx,network.levels[i],
          left,levelTop, 
          width, levelHeight,
          i === network.levels.length-1
          ?['⇑','⇐','⇒','⇓']:[]
          );

    }
   };

  
   static drawLevel(ctx,level, left, top, width, height, outputLabels){
    const right = left+width;
    const bottom = top+height;
   
   const {inputs,outputs,weights,biases}=level;

    // console.table(level)


     for(let i = 0; i < inputs.length;i++){
      for(let j = 0; j < outputs.length;j++){
        ctx.beginPath();
        ctx.moveTo(
          visualizeNetwork.#getNodeX(inputs, i, left, right),
          bottom
        );
        ctx.lineTo(
          visualizeNetwork.#getNodeX(outputs, j, left, right),
          top
        );
        ctx.lineWidth = 2;
        ctx.strokeStyle = getRGBA(weights[i][j]);
        ctx.stroke();
      }
    }


    const nodeRadius = 18;
    for(let i = 0; i < inputs.length;i++){
      const x = visualizeNetwork.#getNodeX(inputs,i, left, right)
       ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius*0.6,0,Math.PI*2);
            ctx.fillStyle="red";
             ctx.fill();
            
      ctx.beginPath();
            ctx.arc(x,bottom,nodeRadius*0.9,0,Math.PI*2);
            ctx.fillStyle="yellow";
            ctx.fillStyle=getRGBA(inputs[i]);
            ctx.fill();

      // ctx.beginPath();
      //       ctx.lineWidth=2;
      //        ctx.strokeStyle= 'darkgray'
      //       ctx.arc(x,bottom,nodeRadius*0.8,0,Math.PI*2);
      //       ctx.strokeStyle=getRGBA(biases[i]);
      //       ctx.setLineDash([7,7]);
      //       ctx.stroke();
      //       ctx.setLineDash([]);

      
    }
      
    

    for(let i = 0; i < outputs.length;i++){
     const x = visualizeNetwork.#getNodeX(outputs,i, left, right)
       ctx.beginPath();
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.fillStyle="green";
            ctx.fill();
      
      ctx.beginPath();
            ctx.arc(x,top,nodeRadius*0.9,0,Math.PI*2);
            ctx.fillStyle=getRGBA(outputs[i]);
            ctx.fill();

      ctx.beginPath();
            ctx.lineWidth=0.5;
            ctx.arc(x,top,nodeRadius,0,Math.PI*2);
            ctx.strokeStyle=getRGBA(biases[i]);
            ctx.setLineDash([3,3]);
            ctx.stroke();
            ctx.setLineDash([]);

      if(outputLabels[i]){
        ctx.beginPath()
            ctx.textAlign="center";
            ctx.textBaseline="center";
            if(outputLabels[i] === '⇑'){
                ctx.fillStyle="black";
                ctx.strokeStyle="black";
            }else{
              ctx.fillStyle="black";
              ctx.strokeStyle="black";
            }
            if(outputLabels[i] == '⇐' || outputLabels[i] == '⇒'){
                 ctx.fillStyle="orange";
                 ctx.strokeStyle="orange";
            }
            ctx.font=(nodeRadius*1.5)+'px Arial';
            ctx.fillText(outputLabels[i],x,top+nodeRadius*0.5);
            ctx.lineWidth = 1;
            ctx.strokeText(outputLabels[i], x, top+nodeRadius*0.5)
      }

    }
        

  
  };

  static #getNodeX(nodes,index,left,right){
        return lerp(
            left,
            right,
            nodes.length==1
                ?0.5
                :index/(nodes.length-1)
        );
    }
    
}

export default visualizeNetwork