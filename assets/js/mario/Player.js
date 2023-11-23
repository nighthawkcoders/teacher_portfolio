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
        this.isIdle = true;
        this.movement = {left: true, right: true};
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
    
        if (result) {
            // Adjust the vertical jump based on the horizontal speed
            const horizontalSpeedFactor = 0.33; // Adjust this factor as needed
            this.y -= this.bottom * horizontalSpeedFactor;
    
            // Adjust horizontal position during the jump
            const horizontalJumpFactor = 0.1; // Adjust this factor as needed
            this.x += this.speed * horizontalJumpFactor;
        }
    
        if (this.bottom <= this.y) {
            this.setAnimation(this.stashFrame);
        }
    
        return result;
    }
    

    // Player updates
    update() {
        if (this.isAnimation(this.playerData.a)) {
            if (this.movement.left) this.x -= this.speed;  // Move to left
        }
        if (this.isAnimation(this.playerData.d)) {
            if (this.movement.right) this.x += this.speed;  // Move to right
        }
        if (this.isGravityAnimation(this.playerData.w)) {
            this.y -= (this.bottom * .33);  // jump 33% higher than bottom
        } 

        // Perform super update actions
        super.update();
    }

    // Player action on collisions
    collisionAction() {
        if (this.collisionData.touchPoints.other.id === "tube") {
            // Collision with the left side of the Tube
            if (this.collisionData.touchPoints.other.left) {
                console.log("Player and Tube collision on Player right, stop Player from x increase");
                this.movement.right = false;
            }
            // Collision with the right side of the Tube
            if (this.collisionData.touchPoints.other.right) {
                console.log("Player and Tube collision on Player left, stop Player from x decrease");
                this.movement.left = false;
            }
            // Collision with the top of the player
            if (this.collisionData.touchPoints.this.bottom ) {
                console.log("Player on top of Tube, gravity stop. If aligned to center, player sinks in tube");
                // You might want to stop gravity or perform other actions here
            }
        } else {
            // Reset movement flags if not colliding with a tube
            this.movement.left = true;
            this.movement.right = true;
        }
    }
    
    // Event listener key down
    handleKeyDown(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (!(event.key in this.pressedDirections)) {
                this.pressedDirections[event.key] = this.playerData[key].row;
                this.setAnimation(this.playerData[key]);
                // set jump animation to match player direction
                this.playerData.w = 
                    key === "a" ? this.playerData.wa : 
                    key === "d" ? this.playerData.wd : 
                    this.playerData.w;
                // player active
                this.isIdle = false;
            }
        }
    }

    // Event listener key up
    handleKeyUp(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (event.key in this.pressedDirections) {
                delete this.pressedDirections[event.key];
            }
            this.setAnimation(this.playerData[key]);  
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