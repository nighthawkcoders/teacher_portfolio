import GameEnv from './GameEnv.js';
import Character from './Character.js';

const PlayerAnimation = {
    // Sprite properties
    scale: 0.33,
    width: 256,
    height: 256,
    w: { row: 12, frames: 15 }, // jump key
	a: { row: 3, frames: 7, idleFrame: { column: 7, frames: 0 } }, // Walk left key
    s: { }, // no action
	d: { row: 2, frames: 7, idleFrame: { column: 7, frames: 0 } }, // Walk right key
}

export class Player extends Character{
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio){
        super(canvas, 
            image, 
            speedRatio,
            PlayerAnimation.width, 
            PlayerAnimation.height, 
            PlayerAnimation.scale
        );
        this.sceneStarted = false;
        this.isIdle = true;
        this.yVelocity = 0;
        this.stashFrame = PlayerAnimation.d;
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

    // Player perform a unique update
    update() {
        if (this.isAnimation(PlayerAnimation.a)) {
            this.x -= this.speed;  // Move to left
        }
        if (this.isAnimation(PlayerAnimation.d)) {
            this.x += this.speed;  // Move to right
        }
        if (this.isGravityAnimation(PlayerAnimation.w)) {
            this.y -= (GameEnv.bottom * .33);  // jump 33% higher than floor
        } 

        // Perform super update actions
        super.update();
    }

}

// Can add specific initialization parameters for the player here
// In this case the player is following the default character initialization
export function initPlayer(canvas, image, gameSpeed, speedRatio){
    // Create the Player
    var player = new Player(canvas, image, gameSpeed, speedRatio);

    /* Player Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */
    document.addEventListener('keydown', function (event) {
        if (PlayerAnimation.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const key = event.key;
            if (!(event.key in player.pressedDirections)){
                player.pressedDirections[event.key] = PlayerAnimation[key].row;
            }
            player.isIdle = false;
            player.setAnimation(PlayerAnimation[key]);
        }
    });

    document.addEventListener('keyup', function (event) {
        if (PlayerAnimation.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const key = event.key;
            if (event.key in player.pressedDirections){
                delete player.pressedDirections[event.key];
            }
            player.isIdle = true;
            player.setAnimation(PlayerAnimation[key]);
        }
    });

    // Player Object
    return player;
}

export default Player;