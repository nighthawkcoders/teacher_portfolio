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
        this.sceneStarted = false;
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
    size() {
        // Dog Frame position and Frame extents
        this.setFrameY(DogAnimation.walking.row);
        this.setMaxFrame(DogAnimation.walking.frames);
        super.size();
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initDog(canvasId, image, speedRatio, controls){
    // Create the Dog character
    var dog = new CharacterDog(canvasId, image, speedRatio);

    dog.size();

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

    // An event listener to check if the dog has collided with another object
    document.addEventListener('collision_' + dog.constructor.name, function (event){
        // If the scene has started then don't run the collision event code
        if (dog.sceneStarted === false){
            dog.sceneStarted = true;

            // Dog starts to bark at monkey for three seconds
            dog.setFrameY(DogAnimation['barking'].row);
            dog.setMaxFrame(DogAnimation['barking'].frames);
            setTimeout(function() {
                // After 3 seconds, transition to the "idle" state
                dog.setFrameY(DogAnimation['idle'].row);
                dog.setMaxFrame(DogAnimation['idle'].frames);

                // After 3 more seconds, transition to the "walking" state
                setTimeout(function() {
                    dog.setFrameY(DogAnimation['walking'].row);
                    dog.setMaxFrame(DogAnimation['walking'].frames);
                    dog.sceneStarted = false;
                }, 3000);
            }, 3000);
        }
    });

    // Dog Object
    return dog;
}

export default CharacterDog;