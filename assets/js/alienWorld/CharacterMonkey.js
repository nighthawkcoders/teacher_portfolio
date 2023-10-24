import GameEnv from './GameEnv.js';
import Character from './Character.js';

const MonkeyAnimation = {
    // Sprite properties
    scale: 2,
    width: 40,
    height: 40,
	d: { row: 0, frames: 15, idleFrame: { column: 7, frames: 0 } }, // Walk right with 'd' key
	a: { row: 1, frames: 15, idleFrame: { column: 7, frames: 0 } }, // Walk left with 'a' key
}

export class CharacterMonkey extends Character{
    // constructors sets up Character object 
    constructor(monkeyCanvas, image, speedRatio){
        super(monkeyCanvas, 
            image, 
            speedRatio,
            MonkeyAnimation.width, 
            MonkeyAnimation.height, 
            MonkeyAnimation.scale
        );
        this.isIdle = true;
    }

    // Monkey perform a unique update
    update() {
        if (this.frameY === MonkeyAnimation.a.row && !this.isIdle) {
            this.x -= this.speed;  // Move the monkey to the left
        }
        else if (this.frameY === MonkeyAnimation.d.row && !this.isIdle){
            this.x += this.speed;
        }

        // Perform super update actions
        super.update();
    }

}

// Can add specific initialization parameters for the monkey here
// In this case the monkey is following the default character initialization
export function initMonkey(canvasId, image, gameSpeed, speedRatio){
    // Create the Monkey character
    var monkey = new CharacterMonkey(canvasId, image, gameSpeed, speedRatio);

    // Set initial Animation
    monkey.setFrameY(MonkeyAnimation['a'].row);
    monkey.setFrameX(MonkeyAnimation['a'].idleFrame.column)
    monkey.setMaxFrame(MonkeyAnimation['a'].idleFrame.frames);

    /* Monkey Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */
    document.addEventListener('keydown', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const selectedAnimation = event.key;
            monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
            monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].frames);
            monkey.isIdle = false;
        }
    });

    document.addEventListener('keyup', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const selectedAnimation = event.key;
            monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
            monkey.setFrameX(MonkeyAnimation[selectedAnimation].idleFrame.column)
            monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].idleFrame.frames);
            monkey.isIdle = true;
        }
    });

    // Monkey Object
    return monkey;
}

export default CharacterMonkey;