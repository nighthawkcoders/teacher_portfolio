import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

class Character extends GameObject {
    constructor(canvas, image, speedRatio, spriteWidth, spriteHeight) {
        super(canvas, image, speedRatio);

        // sprite sizes
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;

        // sprint frame management
        this.minFrame = 0;
        this.maxFrame = 0;
        this.frameX = 0;  // Default X frame of the animation
        this.frameY = 0;  // Default Y frame of the animation
        
        // gravity for character enabled by default
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
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
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

    /* Method should be called on initialization and resize events 
     * intent is to size character in proportion to the screen size
    */
    size() {
        // set Canvas scale,  80 represents size of Character height when inner Height is 832px
        var scaledCharacterHeight = GameEnv.innerHeight * (80 / 832);
        var canvasScale = scaledCharacterHeight/this.spriteHeight;
        this.canvasHeight = this.spriteHeight * canvasScale;
        this.canvasWidth = this.spriteWidth * canvasScale;

        // set variables used in Display and Collision algorithms
        this.bottom = GameEnv.bottom - this.canvasHeight;
        this.collisionHeight = this.canvasHeight;
        this.collisionWidth = this.canvasWidth;

        // calculate Proportional x and y positions based on size of screen dimensions
        if (GameEnv.prevInnerWidth) {
            const proportionalX = (this.x / GameEnv.prevInnerWidth) * GameEnv.innerWidth;

            // Update the x and y positions based on the proportions
            this.setX(proportionalX);
            this.setY(this.bottom);
        } else {
            // First Screen Position
            this.setX(0);
            this.setY(this.bottom);
        }
    }

    /* Update cycle check collisions
     * override draw for custom update
     * be sure to have updated draw call super.update()
    */
    update() {

        if (this.bottom > this.y && this.gravityEnabled)
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