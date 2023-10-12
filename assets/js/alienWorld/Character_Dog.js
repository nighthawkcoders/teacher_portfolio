import Character from './Character.js';

export class Character_Dog extends Character{
    constructor(dogCanvas, image, gameSpeed, speedRatio,
        spriteWidth, spriteHeight, spriteScale){
        super(dogCanvas, image, gameSpeed, speedRatio,
            spriteWidth, spriteHeight, spriteScale);
    }

    update() {
        if (this.frameY == 2) {
            this.charX -= this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.charX < -this.characterCanvas.width) {
                this.charX = window.innerWidth; // Reset the dog's x position to the right edge
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
    spriteWidth, spriteHeight, spriteScale, controls){
    var dog = new Character_Dog(canvasId, image, gameSpeed, speedRatio,
        spriteWidth, spriteHeight, spriteScale);

    /* Control "dog action" 
    * changes y value, the row in sprite
    */
    // update frameY of dog object, action from idle, bark, walk radio control
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            switch (selectedAnimation) {
                case 'idle':
                    dog.frameY = 0;
                    break;
                case 'barking':
                    dog.frameY = 1;
                    break;
                case 'walking':
                    dog.frameY = 2;
                    break;
                default:
                    break;
            }
        }
    });

    return dog;
}

export default Character_Dog;