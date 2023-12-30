import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class JumpPlatform extends GameObject {
    constructor(canvas, image, data) {
        super(canvas, image, data);
    }

    // Required, but no update action
    update() {
    }

    // Draw position is always 0,0
    draw() {
        this.ctx.drawImage(this.image, 0, 0);
    }

    // Set platform position
    size() {
        // Formula for Height should be on constant ratio, using a proportion of 832
        const scaledHeight = GameEnv.innerHeight * (30/832);
        const scaledWidth = GameEnv.innerHeight * .1;  // width of jump platform is 1/10 of height
        const platformX = GameEnv.innerWidth * .2;
        const platformY = (GameEnv.bottom - scaledHeight)  * .8;

        // set variables used in Display and Collision algorithms
        this.bottom = platformY;
        this.collisionHeight = scaledHeight;
        this.collisionWidth = scaledWidth;
    
        //this.canvas.width = this.width; 
        //this.canvas.height = this.height;
        this.canvas.style.width = `${scaledWidth}px`;
        this.canvas.style.height = `${scaledHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${platformX}px`;
        this.canvas.style.top = `${platformY}px`; 

    }
}

export default JumpPlatform;
