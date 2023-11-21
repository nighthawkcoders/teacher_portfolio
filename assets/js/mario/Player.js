import GameEnv from './GameEnv.js';
import Character from './Character.js';

var PlayerData = null;

export class Player extends Character{
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio, playerData){
        super(canvas, 
            image, 
            speedRatio,
            playerData.width, 
            playerData.height, 
        );
        PlayerData = playerData;
        this.playerData = playerData;
        this.sceneStarted = false;
        this.isIdle = true;
        this.yVelocity = 0;
        this.stashFrame = playerData.d;
        this.pressedDirections = {};
        GameEnv.playerHeight = this.collisionHeight;
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
                result = (!this.isIdle && this.bottom <= this.y);
                break; // Exit the loop if there's a match
            }
        }
        //result = (result && !this.isIdle && this.bottom <= this.y);
        //var result = (this.frameY === key.row && !this.isIdle && this.bottom <= this.y);
        if (result) {
            return true;
        }
        if (this.bottom <= this.y) {
            this.setAnimation(this.stashFrame);
        }
        return false;
    }

    // Player perform a unique update
    update() {
        if (this.isAnimation(this.playerData.a)) {
            this.x -= this.speed;  // Move to left
        }
        if (this.isAnimation(this.playerData.d)) {
            this.x += this.speed;  // Move to right
        }
        if (this.isGravityAnimation(this.playerData.w)) {
            this.y -= (this.bottom * .33);  // jump 33% higher than bottom
        } 

        // Perform super update actions
        super.update();
    }

}

// Can add specific initialization parameters for the player here
// In this case the player is following the default character initialization
export function initPlayer(canvas, image, gameSpeed, speedRatio, playerData){
    // Create the Player
    var player = new Player(canvas, image, gameSpeed, speedRatio, playerData);

    /* Player Control 
    * changes FrameY value (selected row in sprite)
    * change MaxFrame according to value in selected animation
    */
    document.addEventListener('keydown', function (event) {
        if (PlayerData.hasOwnProperty(event.key)) {
            // Set variables based on the key that is pressed
            const key = event.key;
            if (!(event.key in player.pressedDirections)){
                player.pressedDirections[event.key] = PlayerData[key].row;
            }
            player.isIdle = false;
            player.setAnimation(PlayerData[key]);
        }
    });

    document.addEventListener('keyup', function (event) {
        if (PlayerData.hasOwnProperty(event.key)) {
            // If no button is pressed then idle
            const key = event.key;
            if (event.key in player.pressedDirections){
                delete player.pressedDirections[event.key];
            }
            player.isIdle = true;
            player.setAnimation(PlayerData[key]);
        }
    });

    // Player Object
    return player;
}

export default Player;