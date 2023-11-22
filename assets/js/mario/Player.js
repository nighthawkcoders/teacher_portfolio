import GameEnv from './GameEnv.js';
import Character from './Character.js';

export class Player extends Character{
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio, playerData){
        super(canvas, 
            image, 
            speedRatio,
            playerData.width, 
            playerData.height, 
        );
        this.playerData = playerData;
        this.sceneStarted = false;
        this.isIdle = true;
        this.yVelocity = 0;
        this.stashFrame = playerData.d;
        this.pressedDirections = {};

        // Store a reference to the event listener function
        this.keydownListener = this.handleKeyDown.bind(this);
        this.keyupListener = this.handleKeyUp.bind(this);

        // Add event listeners
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);

        GameEnv.player = this;
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

    // Event listener key down
    handleKeyDown(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (!(event.key in this.pressedDirections)) {
                this.pressedDirections[event.key] = this.playerData[key].row;
            }
            this.isIdle = false;
            this.setAnimation(this.playerData[key]);
        }
    }

    // Event listener key down
    handleKeyUp(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (event.key in this.pressedDirections) {
                delete this.pressedDirections[event.key];
            }
            this.isIdle = true;
            this.setAnimation(this.playerData[key]);
        }
    }

    // Destroy override method to remove event listeners
    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.keydownListener);
        document.removeEventListener('keyup', this.keyupListener);

        // Call the parent class's destroy method
        super.destroy();
    }

}

export default Player;