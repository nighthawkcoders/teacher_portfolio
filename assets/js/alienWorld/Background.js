import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Background extends GameObject {
    constructor(canvas, image, speedRatio) {
        super(canvas, image, speedRatio);
    }
    update() {
        this.x = (this.x - this.speed) % this.width;
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.width, this.y);
    }
    size() {
        // Update canvas size
        const ADJUST = 1.42 // visual layer adjust, use "1"" for a perfect image 

        const canvasWidth = GameEnv.innerWidth;
        const canvasHeight = canvasWidth / this.aspect_ratio;
        const canvasLeft = 0;
        const canvasScale = 1500;

        this.canvas.width = this.width / ADJUST;
        this.canvas.height = this.height / ADJUST;
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${canvasLeft}px`;
        this.canvas.style.top = `${GameEnv.top}px`;

        // set bottom of game as background height
        const background = document.querySelector('#background');
        if (background) {
            GameEnv.setBottom(background.offsetHeight);
        }
    }
}

export default Background;