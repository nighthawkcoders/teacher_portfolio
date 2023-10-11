import Character from './Character.js';

export class Character_Dog extends Character{
    constructor(dogCanvas, image, gameSpeed, speedRatio,
        spriteWidth, spriteHeight, spriteScale, canvasWidth, canvasHeight){
        super(dogCanvas, image, gameSpeed, speedRatio,
            spriteWidth, spriteHeight, spriteScale, canvasWidth, canvasHeight);
    }

    update() {
        if (this.frameY == 2) {
            this.charX -= this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.charX < -this.characterCanvas.width) {
                this.charX = this.canvasWidth; // Reset the dog's x position to the right edge
            }
        }
        // Update frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initDog(canvasId, image, gameSpeed, speedRatio, 
    spriteWidth, spriteHeight, spriteScale, canvasWidth, canvasHeight){
    var dog = new Character_Dog(canvasId, image, gameSpeed, speedRatio,
        spriteWidth, spriteHeight, spriteScale, canvasWidth, canvasHeight);

    return dog;
}

export default Character_Dog;