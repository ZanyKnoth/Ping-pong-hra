let x;
let touchable;
let playerScore = 0;
let PCScore = 0;  
let scoreArr = []; 
let counter = 1;
let randomScrewUpPoint = Math.floor(Math.random() * 10) + 5;
       
let obj2 = document.getElementById("window");
let playerText = document.getElementById("scorePlayer");
let PCText = document.getElementById("scorePC");     
      
let wHeight = obj2.offsetHeight;
let wWidth = obj2.offsetWidth;
         
      function Obstacle(width, height, x, y, userInteraction)
      {      
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.userInteraction = userInteraction;
        this.test = 0;   

        this.obst = document.createElement("div");
        this.obst.setAttribute("class", "obj2");     

        this.obst.style.width = this.width + "px";
        this.obst.style.height = this.height + "px";
        this.obst.style.left = this.x + "px";
        this.obst.style.top = this.y + "px";
       
        obj2.appendChild(this.obst);  
        

             
        this.moveObst = function()
        {                
           if(this.userInteraction)
           {
              let movementByUser = (event, mouseOrTouch) => {
                
                this.y = mouseOrTouch - 220;
               
                if(this.y <= -60)
                {
                   this.y = -60;
                  
                }
              
                if(this.y >= wHeight - this.height - 60)
                {
                   this.y = wHeight - (this.height * 2);
                  
                }     
                
                for(let i = 0; i < scoreArr.length; i++)
                {
                  if(scoreArr[i] == 5)
                  { // prevence proti konci hry, aby se už nemohlo s døívkem hýbat
                  
                    this.y = wHeight / 2 - 120;
                 
                  }
                }
                
                this.obst.style.top = this.y + "px";           
              }     
              obj2.addEventListener("mousemove", function(){movementByUser(event, event.clientY)})
              obj2.addEventListener("touchstart", function(){movementByUser(event, event.touches[0].clientY)})            
             
           } else {
             
              if(counter > randomScrewUpPoint)
              {
                if(randomScrewUpPoint > 6)
                {
                  this.test = 30;

                } else {
               
                  this.test = -70;

                }
                   
                this.y = ping.y + this.test;             
              
              } else { 
              
                this.y = ping.y - 20;
                           
              } 
              
              if(this.y <= 0)
              {
                 this.y = 0;
                  
              }  
              
              if(this.y >= wHeight - this.height)
              {
                 this.y = wHeight - this.height;
                
              }            
             
              this.obst.style.top = this.y + "px";
           
           }                    
        }  
      }      
    
      function Ball(x, y, color)
      {     
        this.x = x;
        this.y = y;
        this.color = color;
        this.randX = Math.floor(Math.random() * 5) + 1;
        this.randY = Math.floor(Math.random() * 5) + 1;    
        this.posunPoOseX = this.randX;
        this.posunPoOseY = this.randY;
        this.increment = 0;     

        this.obj = document.createElement("div");
        this.obj.setAttribute("id", "test");     

        this.obj.style.left = this.x + "px";
        this.obj.style.top = this.y + "px";
        this.obj.style.background = this.color;
       
        obj2.appendChild(this.obj);          
        
        this.moveBall = function()
        {      
        
           for(let i = 0; i < allObstacles.length; i++)
           {
             let obj3 = allObstacles[i];
            
             if(this.y <= 0)                   
             {                                     
               this.posunPoOseY = this.randY;
               
             }
        
             if(this.y >= wHeight - this.obj.offsetHeight)
             {
               this.posunPoOseY = -this.randY;                                                                          
        
             }                                          
                                               
             if(((this.y > obj3.offsetTop - this.obj.offsetHeight) && (this.y < obj3.offsetTop + obj3.offsetHeight) && (this.x > obj3.offsetLeft) && (this.x <= obj3.offsetLeft + obj3.offsetWidth)))     
             {                                    
               this.posunPoOseX = this.randX + this.increment;
               this.increment +=0.5;                          
       
             } 
        
             if(((this.y > obj3.offsetTop - this.obj.offsetHeight) && (this.y < obj3.offsetTop + obj3.offsetHeight) && (this.x >= obj3.offsetLeft - this.obj.offsetWidth) && (this.x < obj3.offsetLeft))) 
             {                                                                                                     
               this.posunPoOseX = -this.randX - this.increment;                                                                                        
               this.increment +=0.5;
               counter++; 
              // console.log(randomScrewUpPoint)
            }  
                                                                                                                                         
            if(this.x > wWidth + 20)
            {              
               playerScore++;
               playerText.innerHTML = playerScore;
               scoreArr.push(playerScore)
               
               this.x = wWidth / 2,             
               this.y = wHeight / 2 - 35;
               
               this.randX = Math.floor(Math.random() * 5) + 1;
               this.randY = Math.floor(Math.random() * 5) + 1;                 
               this.posunPoOseX = this.randX;
               this.posunPoOseY = this.randY;
              
               this.increment = 0; 
               counter = 1;
               randomScrewUpPoint = Math.floor(Math.random() * 9) + 4;
                   
            }  
            
            if(this.x < - 20)
            {  
               PCScore++;
               PCText.innerHTML = PCScore;
               scoreArr.push(PCScore)
               
               this.x = wWidth / 2,
               this.y = wHeight / 2 - 35;
               
               this.randX = Math.floor(Math.random() * 5) + 1;
               this.randY = Math.floor(Math.random() * 5) + 1;                 
               this.posunPoOseX = this.randX;
               this.posunPoOseY = this.randY;
               
               this.increment = 0;
               counter = 1;
               randomScrewUpPoint = Math.floor(Math.random() * 10) + 5;
               
            }                                                 
          } 
                
          this.x+=this.posunPoOseX;                                                                                                                       
          this.y+=this.posunPoOseY;                       
        
          this.obj.style.left = this.x + "px";                                                               
          this.obj.style.top = this.y + "px";    
            
        }
      }

      let oponent = new Obstacle(10, 60, obj2.offsetWidth - 10, wHeight / 2 - 60, false);     
      let player = new Obstacle(10, 60, 0, wHeight / 2 - 120, true);
      
      let allObstacles = document.getElementsByClassName("obj2");   
      
      let ping = new Ball(wWidth / 2, allObstacles[0].offsetTop + 20, "white");
        
      let spust = function() {    
     
         ping.moveBall();       
         player.moveObst(); 
        
         oponent.y = ping.y;   
         oponent.moveObst();
         
         x = requestAnimationFrame(spust);
         
         for(let i = 0; i < scoreArr.length; i++)
         {
            if(scoreArr[i] == 5)
            {
               cancelAnimationFrame(x);
               
            }
         }                          
      }        
           
spust(); 

