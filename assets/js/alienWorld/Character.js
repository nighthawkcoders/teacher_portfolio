import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

class Character extends GameObject {
    constructor(canvas, image, speedRatio,
        spriteWidth, spriteHeight, spriteScale) {
                var characterArray = [];
        super(canvas, image, speedRatio);
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteScale = spriteScale;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.frameX = 0;  // Default X frame of the animation
        this.frameY = 0;  // Default Y frame of the animation
        this.collisionWidth = spriteWidth * spriteScale;
        this.collisionHeight = spriteHeight * spriteScale;
        this.gravityEnabled = true;
    }

    getMinFrame(){
        return this.manFrame;
    }

    setMinFrame(minFrame){
        this.minFrame = minFrame;
    }

    getMaxFrame(){
        return this.maxFrame;
    }

    setMaxFrame(maxFrame){
        this.maxFrame = maxFrame;
    }

    getFrameX() {
        return this.frameX;
    }

    setFrameX(frameX){
        this.frameX = frameX;
    }

    getFrameY() {
        return this.frameY;
    }

    setFrameY(frameY){
        this.frameY = frameY;
    }

    /* Draw character object
     * Canvas and Context
    */
    draw() {
        // Set fixed dimensions and position for the Character
        this.canvas.width = this.spriteWidth * this.spriteScale;
        this.canvas.height = this.spriteHeight * this.spriteScale;
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${this.x}px`; // Set character horizontal position based on its x-coordinate
        this.canvas.style.top = `${this.y}px`; // Set character up and down position based on its y-coordinate

        this.ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    /* Method should be called on resize events 
     * intent is to place character in proportion to new size
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
            this.setX(Math.random() * GameEnv.innerWidth);
            this.setY(GameEnv.bottom);
        }
    }

    /* Update cycle check collisions
     * override draw for custom update
     * be sure to have updated draw call super.update()
    */
    update() {
        if (GameEnv.bottom > this.y && this.gravityEnabled)
            this.y += GameEnv.gravity;

        // Update animation frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }

        this.collisionChecks();
    }
}

export default Character;