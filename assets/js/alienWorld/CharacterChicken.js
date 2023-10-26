import GameEnv from './GameEnv.js';
import Character from './Character.js';

const ChickenAnimation = {
    // Sprite properties
    scale: 1,
    width: 328/7,
    height: 140/3,
	idle: { row: 0, frames: 6 }
}

export class CharacterVader extends Character{
    // constructors sets up Character object 
    constructor(vaderCanvas, image, speedRatio){
        super(vaderCanvas, 
            image, 
            speedRatio,
            ChickenAnimation.width, 
            ChickenAnimation.height, 
            ChickenAnimation.scale
        );

        this.gravityEnabled = false;
        this.delay = 0;
    }

    // Dog perform a unique update
    update() {
        // slower animation 
        if (this.delay === 20) {
            this.delay = 0;
            // Perform super update actions (collision checks)
            super.update();
        } else {
            this.delay++;
        }
    }

    /* We want constant position so we have to override size method
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
            this.setX(GameEnv.innerWidth * .01);
            this.setY(GameEnv.innerHeight * .01);
        }
    }
}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initChicken(canvasId, image, speedRatio){
    // Create the Vader character
    var chicken = new CharacterVader(canvasId, image, speedRatio);

    // Set initial Animation
    chicken.setFrameY(ChickenAnimation.idle.row);
    chicken.setMaxFrame(ChickenAnimation.idle.frames);
    chicken.invert = false;

    // Vader Object
    return chicken;
}

export default CharacterVader;