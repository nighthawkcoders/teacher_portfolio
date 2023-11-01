import GameEnv from './GameEnv.js';
import Character from './Character.js';
import CharacterDog from './CharacterDog.js'

const MonkeyAnimation = {
    // Sprite properties
    scale: 2,
    width: 40,
    height: 40,
    w: { row: 9, frames: 15 }, // jump key
	a: { row: 1, frames: 15, idleFrame: { column: 7, frames: 0 } }, // Walk left key
    s: { }, // no action
	d: { row: 0, frames: 15, idleFrame: { column: 7, frames: 0 } }, // Walk right key
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
        this.sceneStarted = false;
        this.isIdle = true;
        this.yVelocity = 0;
        this.stashFrame = MonkeyAnimation.d;
        this.pressedDirections = {};
    }

    setAnimation(animation) {
        this.setFrameY(animation.row);
        this.setMaxFrame(animation.frames);
        if (this.isIdle && animation.idleFrame) {
            this.setFrameX(animation.idleFrame.column)
            this.setMinFrame(animation.idleFrame.frames);
        }
    }i
    
    // check for matching animation
    isAnimation(key) {
        var result = false;
        for (let direction in this.pressedDirections) {
            if (this.pressedDirections[direction] === key.row) {
                result = !this.isIdle;
                break; // Exit the loop if there's a match
            }
        }
        //result = (result && !this.isIdle);
        if (result) {
                this.stashFrame = key;
        }
        return result;
    }

    // check for gravity based animation
    isGravityAnimation(key) {
        var result = false;
        for (let direction in this.pressedDirections) {
            if (this.pressedDirections[direction] === key.row) {
                result = (!this.isIdle && GameEnv.bottom <= this.y);
                break; // Exit the loop if there's a match
            }
        }
        //result = (result && !this.isIdle && GameEnv.bottom <= this.y);
        //var result = (this.frameY === key.row && !this.isIdle && GameEnv.bottom <= this.y);
        if (result) {
            return true;
        }
        if (GameEnv.bottom <= this.y) {
            this.setAnimation(this.stashFrame);
        }
        return false;
    }

    // Monkey perform a unique update
    update() {
        if (this.isAnimation(MonkeyAnimation.a)) {
            this.x -= this.speed;  // Move to left
        }
        if (this.isAnimation(MonkeyAnimation.d)) {
            this.x += this.speed;  // Move to right
        }
        if (this.isGravityAnimation(MonkeyAnimation.w)) {
            this.y -= (GameEnv.bottom * .33);  // jump 33% higher than floor
        } 

        // Perform super update actions
        super.update();
    }

    // override default action
    collisionAction(){
        

        // If the scene has started then don't run the collision event code
        // With collision data we can even determine which side the dog is colliding on
        if (this.sceneStarted === false && this.collisionData.touchPoints.this.right){
            this.sceneStarted = true;

            // Dog starts to bark at monkey for three seconds
            this.frameY = MonkeyAnimation.w.row;
            this.maxFrame = MonkeyAnimation.w.frames;
            this.y -= (GameEnv.bottom * .33);  // jump 33% higher than floor

            setTimeout(() => {
                // After 3 seconds, transition to the "previous" state
                this.frameY = MonkeyAnimation.d.row;
                this.maxFrame = MonkeyAnimation.d.frames;
                this.sceneStarted = false;
            }, 3000);
        }
    }
}

// Can add specific initialization parameters for the monkey here
// In this case the monkey is following the default character initialization
export function initMonkey(canvasId, image, gameSpeed, speedRatio){
    // Create the Monkey character
    var monkey = new CharacterMonkey(canvasId, image, gameSpeed, speedRatio);

    /* Monkey Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */
    document.addEventListener('keydown', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const key = event.key;
            if (!(event.key in monkey.pressedDirections)){
                monkey.pressedDirections[event.key] = MonkeyAnimation[key].row;
            }
            monkey.isIdle = false;
            monkey.setAnimation(MonkeyAnimation[key]);
        }
    });

    document.addEventListener('keyup', function (event) {
        if (MonkeyAnimation.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const key = event.key;
            if (event.key in monkey.pressedDirections){
                delete monkey.pressedDirections[event.key];
            }
            monkey.isIdle = true;
            monkey.setAnimation(MonkeyAnimation[key]);
        }
    });

    // Monkey Object
    return monkey;
}

export default CharacterMonkey;