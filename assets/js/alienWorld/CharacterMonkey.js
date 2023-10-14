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

        // Update animation frameX of the object
        if (this.frameX < this.maxFrame) {
            this.frameX++;
        } else {
            this.frameX = 0;
        }
    }
}

// Can add specific initialization parameters for the monkey here
// In this case the monkey is following the default character initialization
export function initMonkey(canvasId, image, gameSpeed, speedRatio){
    // Create the Monkey character
    var monkey = new CharacterMonkey(canvasId, image, gameSpeed, speedRatio);

    // Monkey Frame position and Frame extents
    monkey.setFrameY(MonkeyAnimation['a'].row);
    monkey.setFrameX(MonkeyAnimation['a'].idleFrame.column)
    monkey.setMaxFrame(MonkeyAnimation['a'].idleFrame.frames);

    // Monkey Screen Position
    monkey.setX(GameEnv.innerWidth);
    monkey.setY(GameEnv.innerHeight / 1.5);

    /* Monkey Control 
    * changes y value, the row in sprite
    * which changes animation to either idle, bark, walk
    * change number of frames in row
    */
    document.addEventListener('keydown', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
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