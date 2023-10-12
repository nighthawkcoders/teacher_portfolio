import Layer from './Layer.js';

class Character extends Layer {
    constructor(characterCanvas, image, gameSpeed, speedRatio,
        spriteWidth, spriteHeight, spriteScale) {
        super(image, gameSpeed, speedRatio);
        this.characterCanvas = characterCanvas;
        this.characterCtx = characterCanvas.getContext('2d');
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.spriteScale = spriteScale;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.frameX = 0;  // Starting frame of the animation
        this.frameY = 0;  // Default animation for the character
    }

    setMinFrame(minFrame){
        this.minFrame = minFrame;
    }

    setMaxFrame(maxFrame){
        this.maxFrame = maxFrame;
    }

    setFrameX(frameX){
        this.frameX = frameX;
    }

    setFrameY(frameY){
        this.frameY = frameY;
    }

    // Draw dog object
    draw() {
        // Set fixed dimensions and position for the dogCanvas
        this.characterCanvas.width = this.spriteWidth * this.spriteScale;
        this.characterCanvas.height = this.spriteHeight * this.spriteScale;
        this.characterCanvas.style.width = `${this.characterCanvas.width}px`;
        this.characterCanvas.style.height = `${this.characterCanvas.height}px`;
        this.characterCanvas.style.position = 'absolute';
        this.characterCanvas.style.left = `${this.x}px`; // Set the dog's left position based on its x-coordinate
        this.characterCanvas.style.top = `${this.y}px`; // Set the dog's up and down position based on its y-coordinate

        this.characterCtx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            0,
            0,
            this.characterCanvas.width,
            this.characterCanvas.height
        );
    }
}

export default Character;