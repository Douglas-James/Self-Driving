// let reverse = document.querySelector('#reverse')
// let forward = document.querySelector('#forward')
// let right = document.querySelector('#right')
// let left  = document.querySelector('#left')

// let on = true;
// let ofs = false;
class Controllers{
  constructor(type){
    this.forward=false;
    this.left = false;
    this.right = false;
    this.reverse = false;
    switch(type){
        case "KEYS" :
        this.#keyboardlistner();
        break
        case "DUMMY":
          this.forward = true;
          break;

    }

  
  //  if(on == true){
  //    forward.addEventListener('touchstart', (e) =>{
  //        this.forward = true
  //        console.log('Forward car')
  //    })
  //  }
  //  if(ofs == false){
  //    forward.addEventListener('touchend', (e) =>{
  //      this.forward = false
  //      console.log('turn of car')
  //     })
  //   }
  //   if(on == true){
  //     reverse.addEventListener('touchstart', (e) =>{
  //         this.reverse = true
  //         console.log('reverse car')
  //     })
  //   }

  //   if(ofs == false){
  //    reverse.addEventListener('touchend', (e) =>{
  //      this.reverse = false
  //      console.log('turn of car')
  //     })
  //   }


  //   if(on == true){
  //    left.addEventListener('touchstart', (e) =>{
  //        this.left = true
  //        console.log('left  turn car')
  //    })
  //  }


  //  if(ofs == false){
  //    left.addEventListener('touchend', (e) =>{
  //      this.left = false
  //      console.log('turn of car')
  //     })
  //   }


  //   if(on == true){
  //     right.addEventListener('touchstart', (e) =>{
  //         this.right = true
  //         console.log('right turn  car')
  //     })
  //   }

  //   if(ofs == false){
  //    right.addEventListener('touchend', (e) =>{
  //      this.right = false
  //      console.log('turn of car')
  //     })
  //   }
 
   



  }
  #keyboardlistner(){
    document.onkeydown = (event) =>{
      switch(event.key){
        case "ArrowLeft": this.left = true;  break ;
        case "ArrowRight": this.right = true; break;
        case "ArrowUp": this.forward = true;  break;
        case "ArrowDown": this.reverse = true;   break;
      }
    //  console.table(this)
    }

     document.onkeyup = (event) =>{
      switch(event.key){
        case "ArrowLeft": this.left = false; break;
        case "ArrowRight": this.right = false;break;
        case "ArrowUp": this.forward = false;break;
        case "ArrowDown": this.reverse = false; break;
      }
      
      // console.table(this)
    }
  }
}

export default Controllers