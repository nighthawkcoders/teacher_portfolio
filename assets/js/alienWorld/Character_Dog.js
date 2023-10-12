import Character from './Character.js';

const Dog_Animation = {
	idle: 0,
	barking: 1,
	walking: 2
}

export class Character_Dog extends Character{
    constructor(dogCanvas, image, gameSpeed, speedRatio,
        spriteWidth, spriteHeight, spriteScale){
        super(dogCanvas, image, gameSpeed, speedRatio,
            spriteWidth, spriteHeight, spriteScale);
    }

    update() {
        if (this.frameY === Dog_Animation.walking) {
            this.x -= this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.x < -this.characterCanvas.width) {
                this.x = window.innerWidth; // Reset the dog's x position to the right edge
            }
        }
        // Update animation frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initDog(canvasId, image, gameSpeed, speedRatio, controls){
    // Sprite frame properties
    const width = 160;
    const height = 144;

    // Scale of Sprite on Screen
    const scale = 1;

    // Create the Dog character
    var dog = new Character_Dog(canvasId, image, gameSpeed, speedRatio,
        width, height, scale);

    // Dog Frame position and Frame extents
    dog.setFrameY(2);
    dog.setMaxFrame(47);

    // Dog Screen Position
    dog.setX(window.innerWidth);
    dog.setY(window.innerHeight / 1.5);

    /* Dog Control 
    * changes y value, the row in sprite
    * change number of frames in row
    */
    // change animation to either idle, bark, walk
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            dog.setFrameY(Dog_Animation[selectedAnimation]);
            dog.setMaxFrame(47);
        }
    });

    return dog;
}

export default Character_Dog;