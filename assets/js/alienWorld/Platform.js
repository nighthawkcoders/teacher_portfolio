import GameEnv from "./GameEnv.js";
import GameObject from "./GameObject.js";

// The platform object can be checked directionally by characters to 
// see if the character should collide with it
export class Platform extends GameObject{
    constructor(canvas, image, speedRatio){
        super(canvas, image, speedRatio)
    }

    /* Draw platform object
     * Canvas and Context
    */
    draw() {
        // Set fixed dimensions and position for the platorm
        this.canvas.width = this.width;
        this.canvas.height = this.spriteHeight;
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${this.x}px`; // Set platform horizontal position based on its x-coordinate
        this.canvas.style.top = `${this.y}px`; // Set platform up and down position based on its y-coordinate

        this.ctx.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    update(){

    }

    /* Method should be called on resize events 
    * intent is to place the platform in proportion to new size
    */
    size() {
        // Calculate proportional x and y positions based on the new screen dimensions
        if (GameEnv.prevInnerWidth) {
            const proportionalX = (this.x / GameEnv.prevInnerWidth) * GameEnv.innerWidth;
            const proportionalY = (this.y / GameEnv.prevBottom) * GameEnv.bottom;

            // Update the x and y positions based on the proportions
            this.setX(proportionalX);
            this.setY(proportionalY);
        } else {
            // First Screen Position
            this.setX(GameEnv.innerWidth / (Math.random() * (4) + 1));
            this.setY(GameEnv.top);
        }
    }
}

export function initPlatform(canvas, image, speedRatio){
    var platform = new Platform(canvas, image, speedRatio);
    platform.y = GameEnv.bottom - 50;
    return platform;
}

export default Platform;