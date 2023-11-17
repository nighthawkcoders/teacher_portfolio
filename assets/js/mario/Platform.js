import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Platform extends GameObject {
    constructor(canvas, image, speedRatio) {
        super(canvas, image, speedRatio);
    }

    /* Update uses modulo math to cycle to start at width extent
    *  x is position in cycle 
    *  speed can be used to scroll faster
    *  width is extent of background image
    */
    update() {
        this.x = (this.x - this.speed) % this.width;
    }

    /* To draws are used to capture primary frame and wrap around ot next frame
     * x to y is primary draw
     * x + width to y is wrap around draw
    */
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.width, this.y);
    }

    /* Background camvas is set to screen
     * the ADJUST contant elements portions of image that don't wrap well
     * the GameEnv.top is a getter used to set canvas under Menu
     * the GameEnv.bottom is setter used to establish game bottom at offsetHeight of canvas 
    */ 
    size() {
        // Update canvas size
        const ADJUST = 0.2

        const canvasWidth = GameEnv.innerWidth;
        const canvasHeight = canvasWidth / this.aspect_ratio;
        const canvasLeft = 0;
        GameEnv.platformHeight = canvasHeight * ADJUST;
    

        this.canvas.width = this.width;
        this.canvas.height = this.height / ADJUST;
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${canvasHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = `${GameEnv.bottom}px`; 
        this.canvas.style.left = `${canvasLeft}px`;

        // set bottom of game to new background height
        GameEnv.setFloor();
    }
}

export default Platform;