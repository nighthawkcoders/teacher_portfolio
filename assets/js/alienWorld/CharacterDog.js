import GameEnv from './GameEnv.js';
import Character from './Character.js';

const DogAnimation = {
    // Sprite properties
    scale: 0.62,
    width: 160,
    height: 144,
	idle: { row: 0, frames: 47 },
	barking: { row: 1, frames: 47 },
	walking: { row: 2, frames: 47 }
}

export class CharacterDog extends Character{
    // constructors sets up Character object 
    constructor(dogCanvas, image, speedRatio){
        super(dogCanvas, 
            image, 
            speedRatio,
            DogAnimation.width, 
            DogAnimation.height, 
            DogAnimation.scale
        );
    }

    // Dog perform a unique update
    update() {
        if (this.frameY === DogAnimation.walking.row) {
            this.x -= this.speed;  // Move the dog to the left
            // Check if the dog has moved off the left edge of the canvas
            if (this.x < -this.canvas.width) {
                this.x = GameEnv.innerWidth; // Reset the dog's x position to the right edge
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
export function initDog(canvasId, image, speedRatio, controls){
    // Create the Dog character
    var dog = new CharacterDog(canvasId, image, speedRatio);

    // Dog Frame position and Frame extents
    dog.setFrameY(DogAnimation.walking.row);
    dog.setMaxFrame(DogAnimation.walking.frames);

    // Dog Screen Position
    dog.setX(GameEnv.innerWidth);
    dog.setY(GameEnv.innerHeight / 1.5);

    /* Dog Control 
    * changes y value, the row in sprite
    * which changes animation to either idle, bark, walk
    * change number of frames in row
    */
    GameEnv.controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            dog.setFrameY(DogAnimation[selectedAnimation].row);
            dog.setMaxFrame(DogAnimation[selectedAnimation].frames);
        }
    });

    // Dog Object
    return dog;
}

export default CharacterDog;