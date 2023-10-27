import GameEnv from './GameEnv.js';
import Character from './Character.js';

const MonkeyAnimation = {
    // Sprite properties
    scale: 2,
    width: 40,
    height: 40,
	d: { row: 0, frames: 15, idleFrame: { column: 7, frames: 0 } }, // Walk right with 'd' key
	a: { row: 1, frames: 15, idleFrame: { column: 7, frames: 0 } }, // Walk left with 'a' key
    w: { row: 9, frames: 15 },
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
        this.gravityEnabled = false;
        this.yVelocity = 0;
        this.stashFrame = { };
    }

    setAnimation(animation) {
        this.stashFrame = animation;
        this.setFrameY(animation.row);
        this.setFrameX(animation.idleFrame.column)
        this.setMinFrame(animation.idleFrame.frames);
        this.setMaxFrame(animation.frames);
    }

    // Monkey perform a unique update
    update() {
        if (this.frameY === MonkeyAnimation.a.row && !this.isIdle) {
            this.x -= this.speed;  // Move the monkey to the left
            this.stashFrame = MonkeyAnimation.a;
        }
        else if (this.frameY === MonkeyAnimation.d.row && !this.isIdle){
            this.x += this.speed;
            this.stashFrame = MonkeyAnimation.d;
        }
        else if (this.frameY === MonkeyAnimation.w.row && !this.isIdle && GameEnv.bottom <= this.y) {
            // jump by changing velocity (only can jump if on ground)
            this.yVelocity = -10;
        } 
        else if (GameEnv.bottom <= this.y) {
            // do idle frame
            this.setAnimation(this.stashFrame);
            this.idle = true;
        }

        if (GameEnv.bottom > this.y) {
            // gravity (using acceleration instead of velocity, needed for jump implementation)
            this.yVelocity += 0.5;
        } else {
            // normal force (basically disabels gravity if on the ground)
            this.yVelocity = Math.min(0, this.yVelocity);
        }

        this.y += this.yVelocity;

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
    monkey.setAnimation(MonkeyAnimation.a);

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
            if (MonkeyAnimation[selectedAnimation].idleFrame) {
                monkey.setFrameY(MonkeyAnimation[selectedAnimation].row);
                monkey.setFrameX(MonkeyAnimation[selectedAnimation].idleFrame.column)
                monkey.setMaxFrame(MonkeyAnimation[selectedAnimation].idleFrame.frames);
            }

            monkey.isIdle = true;
        }
    });

    // Monkey Object
    return monkey;
}

export default CharacterMonkey;