import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Tube extends GameObject {
    constructor(canvas, image) {
        super(canvas, image, 0);
        // tube values
        this.tubeX = 0;
        this.tubeY = 0;
    }

    // Tube is unchanging
    update() {

    }

    // Tube draws in same position
    draw() {
        this.ctx.drawImage(this.image, this.tubeX, this.tubeY);
    }

    /* Tube camvas is set to proportional size
    */ 
    size() {
        // Formula for Height should be on constant ration, using a proprotion of 832
        var scaledHeight = GameEnv.innerHeight * (120 / 832);
        // Formula for Width is scaled: scaledWidth/scaledHeight == this.width/this.height
        var scaledWidth = scaledHeight * this.aspect_ratio;
        var bottom = GameEnv.bottom - scaledHeight;
        this.tubeX = .80 * GameEnv.innerWidth;
        this.tubeY = GameEnv.bottom;

        // set variables used in Display and Collision algorithms
        this.bottom = bottom;
        this.collisionHeight = scaledHeight;
        this.collisionWidth = scaledWidth;
    
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = `${scaledWidth}px`;
        this.canvas.style.height = `${scaledHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${this.tubeX}px`;
        this.canvas.style.top = `${bottom}px`; 
    }
}

export default Tube;