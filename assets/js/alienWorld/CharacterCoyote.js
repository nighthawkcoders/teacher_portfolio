import Character from './Character.js';

const CoyoteAnimation = {
    // Sprite properties
    scale: 0.30,
    width: 85,
    height: 165,
	scene1: { row: 0, frames: 4 },
	scene2: { row: 1, frames: 4 }
}

export class CharacterCoyote extends Character{
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio){
        super(canvas, 
            image, 
            speedRatio,
            CoyoteAnimation.width, 
            CoyoteAnimation.height, 
            CoyoteAnimation.scale
        );
        this.delay = 0;
    }

    // Perform a unique update
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

}

// Can add specific initialization parameters for the dog here
// In this case the dog is following the default character initialization
export function initCoyote(canvasId, image, speedRatio){
    // Create the Dog character
    var coyote = new CharacterCoyote(canvasId, image, speedRatio);

    // Set initial Animation
    coyote.setFrameY(CoyoteAnimation.scene1.row);
    coyote.setMaxFrame(CoyoteAnimation.scene1.frames);

    // Dog Object
    return coyote;
}

export default CharacterCoyote;