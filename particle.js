export class Particle {
    constructor(x, y, radius, speed, colour){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.colour = colour;
        let angle = Math.random() * Math.PI * 2; // Randomizes velocity direction (-1 or 1)
        this.particleVX = Math.cos(angle) * this.speed;
        this.particleVY = Math.sin(angle) * this.speed;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.closePath();
    }

    move(){
        this.x += this.particleVX;
        this.y += this.particleVY;

        if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
            this.particleVX *= -1; // Reverse direction
        }
        
        if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
            this.particleVY *= -1; // Reverse direction
        }
    }
}
