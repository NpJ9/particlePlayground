import { Particle } from "./particle.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coloursArray = ["#FF204E" ,"#A0153E" ,"#5D0E41" ,"#00224D"];
let numParticles = 5;
let particles =[];

window.addEventListener("load", () =>{
    resize()
    generateParticles()
    gameLoop();
});

function generateParticles(){
    for(let i = 0; i < numParticles; i++){
        let randomX = canvas.width / 2;
        let randomY = canvas.height / 2;
        let randomSize = Math.random() * 20 + 5;
        let randomColour = coloursArray[Math.floor(Math.random() * coloursArray.length)]
        particles.push(new Particle(randomX, randomY, randomSize, 5, randomColour));
    };
};

function drawParticles(){  
    particles.forEach(particle => {
        particle.draw(ctx);
        particle.move();

        if(particle.x - particle.radius <= 0 || particle.x + particle.radius >= canvas.width){ // Check collisions for x axis
            // Do something fun
            generateParticles(); // Create the void 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
        }
        
        if(particle.y - particle.radius <= 0 || particle.y + particle.radius >= canvas.height){ // Check collisions for y axis
            // Do something fun
            ctx.clearRect(0, 0, canvas.width, canvas.height)   
        }
  });
};

function gameLoop(){    
    ctx.clearRect(0, 0, canvas.width, canvas.height)   
    drawParticles();
    requestAnimationFrame(gameLoop);
};


function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
