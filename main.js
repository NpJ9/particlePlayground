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

window.addEventListener("click", (e) => { // Onclick generate particles
    for(let i = 0; i < numParticles; i++){
        let mouseX = e.offsetX;
        let mouseY = e.offsetY;
        let randomSize = Math.random() * 20 + 5;
        let randomColour = coloursArray[Math.floor(Math.random() * coloursArray.length)]
        particles.push(new Particle(mouseX, mouseY, randomSize, 5, randomColour));
    };
})

function generateParticles(){
        for(let i = 0; i < numParticles; i++){
        let randomX = canvas.width / 2;
        let randomY = canvas.height / 2;
        let randomSize = Math.random() * 20 + 5;
        let randomColour = coloursArray[Math.floor(Math.random() * coloursArray.length)]
        particles.push(new Particle(randomX, randomY, randomSize, 5, randomColour));

    }
}

function drawParticles(){  
    particles.forEach(particle => {
        particle.draw(ctx);
        particle.move();

        if(particle.x - particle.radius <= 0 || particle.x + particle.radius >= canvas.width){ // Check collisions for x axis
            // Do something fun
            generateParticles(); // Create the void 
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            playSound()
        }
        
        if(particle.y - particle.radius <= 0 || particle.y + particle.radius >= canvas.height){ // Check collisions for y axis
            // Do something fun
            ctx.clearRect(0, 0, canvas.width, canvas.height); 
            playSound()
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

// Sets up Audio Enviroment 

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let soundBuffer = null;

fetch("sound.wav")
.then(response => response.arrayBuffer())
.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
.then(decodedBuffer => {
    soundBuffer = decodedBuffer
})
.catch(e => console.error(e));

// Check Current Time vs Last Time Sound Was Played: Wait atleast 200ms
let lastSoundTime = 0;

function playSound(){
    const now = Date.now();
    if(now - lastSoundTime < 100) return;
    lastSoundTime = now;

    if (!soundBuffer) return; // Ensurer the sound is loaded

    const source = audioContext.createBufferSource();
    source.buffer = soundBuffer;

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.10, audioContext.currentTime); // STart at 0.05 for slight more attack
    gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.05);// Increase Volumne to 0.2 in 50ms

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start();
}