import GameEnv from './GameEnv.js';
import Character from './Character.js';

const VaderAnimation = {
    // Sprite properties
    scale: 2,
    width: 16,
    height: 24,
	idle: { row: 1, frames: 7 }
}

export class CharacterVader extends Character{
    // constructors sets up Character object 
    constructor(vaderCanvas, image, speedRatio){
        super(vaderCanvas, 
            image, 
            speedRatio,
            VaderAnimation.width, 
            VaderAnimation.height, 
            VaderAnimation.scale
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
export function initVader(canvasId, image, speedRatio){
    // Create the Vader character
    var vader = new CharacterVader(canvasId, image, speedRatio);

    // Set initial Animation
    vader.setFrameY(VaderAnimation.idle.row);
    vader.setMaxFrame(VaderAnimation.idle.frames);
    vader.invert = false;

    // Vader Object
    return vader;
}

export default CharacterVader;