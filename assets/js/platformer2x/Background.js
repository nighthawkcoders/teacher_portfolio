import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';
import GameControl from './GameControl.js';

export class Background extends GameObject {
    constructor(canvas, image, data) {
        super(canvas, image, data);
    }

    /* Update uses modulo math to cycle to start at width extent
    *  x is position in cycle 
    *  speed can be used to scroll faster
    *  width is extent of background image
    */
    update() {
        this.x = (this.x - this.speed) % this.width;
        if (GameControl.randomEventId === 1 && GameControl.randomEventState === 1) {
            this.canvas.style.filter = "invert(100)";
            GameControl.endRandomEvent();
        }
    }

    /* To draws are used to capture primary frame and wrap around ot next frame
     * x to y is primary draw
     * x + width to y is wrap around draw
    */
    draw() {
        // Draw the primary segment
        this.ctx.drawImage(this.image, this.x, this.y);
        
        // Draw the wrap-around segment for the left side
        this.ctx.drawImage(this.image, this.x - this.width, this.y);
    
        // Draw the wrap-around segment for the right side
        this.ctx.drawImage(this.image, this.x + this.width, this.y);
    }

    /* Background camvas is set to screen
     * the ADJUST contant elements portions of image that don't wrap well
     * the GameEnv.top is a getter used to set canvas under Menu
     * the GameEnv.bottom is setter used to establish game bottom at offsetHeight of canvas 
    */ 
    size() {
        // Update canvas size
        const ADJUST = 1 // visual layer adjust; alien_planet.jpg: 1.42, try 1 for others

        const canvasWidth = GameEnv.innerWidth;
        const canvasHeight = canvasWidth / this.aspect_ratio;
        GameEnv.backgroundHeight = canvasHeight;
        const canvasLeft = 0;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = `${canvasWidth}px`;
        this.canvas.style.height = `${GameEnv.backgroundHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${canvasLeft}px`;
        this.canvas.style.top = `${GameEnv.top}px`;

        // set bottom of game to new background height
        GameEnv.setBottom(); 
    }
}

export default Background;