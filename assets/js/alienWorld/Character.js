class Character extends Layer {
    constructor(image, speedRatio) {
        super(image, speedRatio);
        this.minFrame = 0;
        this.maxFrame = SPRITE_FRAMES;
        this.frameX = 0;
        this.frameY = 2;  // walking as default
        this.dogX = canvasWidth; // Initialize the dog's x position to the right edge of the canvas
    }

    update() {
        if (this.frameY == 2) {
            this.dogX -= this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.dogX < -dogCanvas.width) {
                this.dogX = canvasWidth; // Reset the dog's x position to the right edge
            }
        }
        // Update frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }

    // Draw dog object
    draw() {
        // Set fixed dimensions and position for the dogCanvas
        dogCanvas.width = SPRITE_WIDTH * SPRITE_SCALE;
        dogCanvas.height = SPRITE_HEIGHT * SPRITE_SCALE;
        dogCanvas.style.width = `${dogCanvas.width}px`;
        dogCanvas.style.height = `${dogCanvas.height}px`;
        dogCanvas.style.position = 'absolute';
        dogCanvas.style.left = `${this.dogX}px`; // Set the dog's left position based on its x-coordinate
        dogCanvas.style.top = `${canvasHeight}px`;

        dogCtx.drawImage(
            this.image,
            this.frameX * SPRITE_WIDTH,
            this.frameY * SPRITE_HEIGHT,
            SPRITE_WIDTH,
            SPRITE_HEIGHT,
            0,
            0,
            dogCanvas.width,
            dogCanvas.height
        );
    }
}

export function initDog(imageUrl, canvasId, canvasWidth, canvasHeight, characterType) {
    // Setup Dog sprite constraints
    const SPRITE_WIDTH = 160;  // matches sprite pixel width
    const SPRITE_HEIGHT = 144; // matches sprite pixel height
    const SPRITE_FRAMES = 48;  // matches number of frames per sprite row; this code assumes each row is the same
    const SPRITE_SCALE = 1;  // controls the size of the sprite on the canvas

}
