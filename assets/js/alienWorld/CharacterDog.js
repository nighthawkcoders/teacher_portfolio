import GameEnv from './GameEnv.js';
import Character from './Character.js';
import CharacterMonkey from './CharacterMonkey.js';

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
        
        // Perform super update actions (collision checks)
        super.update();
    }

    // override default action
    collisionAction(){
        // If the scene has started then don't run the collision event code
        // With collision data we can even determine which side the dog is colliding on
        if (this.sceneStarted === false && this.collisionData.touchPoints.this.left){
            this.sceneStarted = true;

            // Dog starts to bark at monkey for three seconds
            this.frameY = DogAnimation['barking'].row;
            this.maxFrame = DogAnimation['barking'].frames;
            setTimeout(() => {
                // After 3 seconds, transition to the "idle" state
                this.frameY = DogAnimation['idle'].row;
                this.maxFrame = DogAnimation['idle'].frames;

                // After 3 more seconds, transition to the "walking" state
                setTimeout(() => {
                    this.frameY = DogAnimation['walking'].row;
                    this.maxFrame = DogAnimation['walking'].frames;
                    this.sceneStarted = false;
                }, 3000);
            }, 3000);
        }
    }

}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initDog(canvasId, image, speedRatio, controls){
    // Create the Dog character
    var dog = new CharacterDog(canvasId, image, speedRatio);

    // Set initial Animation
    dog.setFrameY(DogAnimation.walking.row);
    dog.setMaxFrame(DogAnimation.walking.frames);

    /* Dog Control for Animation
    * changes FrameY value (selected animation is idle, bark, walk)
    * change MaxFrame according to value in selected animation
    */
    controls.addEventListener('click', function (event) {
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