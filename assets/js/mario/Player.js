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
        // Player Data is required for Animations
        this.playerData = playerData;

        // Player control data
        this.pressedKeys = {};
        this.movement = {left: true, right: true, down: true};
        this.isIdle = true;
        this.stashKey = "d"; // initial key

        // Store a reference to the event listener function
        this.keydownListener = this.handleKeyDown.bind(this);
        this.keyupListener = this.handleKeyUp.bind(this);

        // Add event listeners
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);

        GameEnv.player = this;
    }

    setAnimation(key) {
        // animation comes from playerData
        var animation = this.playerData[key]
        // direction setup
        if (key === "a") {
            this.stashKey = key;
            this.playerData.w = this.playerData.wa;
        } else if (key === "d") {
            this.stashKey = key;
            this.playerData.w = this.playerData.wd;
        }
        // set frame and idle frame
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
        if (key in this.pressedKeys) {
            result = !this.isIdle;
        }
        
        return result;
    }

    // check for gravity based animation
    isGravityAnimation(key) {
        var result = false;
    
        // verify key is in active animations
        if (key in this.pressedKeys) {
            result = (!this.isIdle && this.bottom <= this.y);
        }

        // scene for on top of tube animation
        if (!this.movement.down) {
            this.gravityEnabled = false;
            // Pause for two seconds
            setTimeout(() => {   // animation in tube
                // This code will be executed after the two-second delay
                this.movement.down = true;
                this.gravityEnabled = true;
                setTimeout(() => { // move to end of game detection
                    this.x = GameEnv.innerWidth + 1;
                }, 1000);
            }, 2000);
        }
    
        // make sure jump has ssome velocity
        if (result) {
            // Adjust horizontal position during the jump
            const horizontalJumpFactor = 0.1; // Adjust this factor as needed
            this.x += this.speed * horizontalJumpFactor;  
        }
    
        // return to directional animation (direction?)
        if (this.bottom <= this.y) {
            this.setAnimation(this.stashKey);
        }
    
        return result;
    }
    

    // Player updates
    update() {
        if (this.isAnimation("a")) {
            if (this.movement.left) this.x -= this.speed;  // Move to left
        }
        if (this.isAnimation("d")) {
            if (this.movement.right) this.x += this.speed;  // Move to right
        }
        if (this.isGravityAnimation("w")) {
            if (this.movement.down) this.y -= (this.bottom * .33);  // jump 33% higher than bottom
        } 

        // Perform super update actions
        super.update();
    }

    // Player action on collisions
    collisionAction() {
        if (this.collisionData.touchPoints.other.id === "tube") {
            // Collision with the left side of the Tube
            if (this.collisionData.touchPoints.other.left) {
                this.movement.right = false;
            }
            // Collision with the right side of the Tube
            if (this.collisionData.touchPoints.other.right) {
                this.movement.left = false;
            }
            // Collision with the top of the player
            if (this.collisionData.touchPoints.other.ontop) {
                this.movement.down = false;
                this.x = this.collisionData.touchPoints.other.x;
            }
        } else {
            // Reset movement flags if not colliding with a tube
            this.movement.left = true;
            this.movement.right = true;
            this.movement.down = true;
        }
    }
    
    // Event listener key down
    handleKeyDown(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (!(event.key in this.pressedKeys)) {
                this.pressedKeys[event.key] = this.playerData[key];
                this.setAnimation(key);
                // player active
                this.isIdle = false;
            }
        }
    }

    // Event listener key up
    handleKeyUp(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (event.key in this.pressedKeys) {
                delete this.pressedKeys[event.key];
            }
            this.setAnimation(key);  
            // player idle
            this.isIdle = true;     
        }
    }

    // Override destroy() method from GameObject to remove event listeners
    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.keydownListener);
        document.removeEventListener('keyup', this.keyupListener);

        // Call the parent class's destroy method
        super.destroy();
    }
}


export default Player;