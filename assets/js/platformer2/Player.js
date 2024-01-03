import GameEnv from './GameEnv.js';
import Character from './Character.js';

export class Player extends Character{
    // instantiation: constructor sets up player object 
    constructor(canvas, image, data){
        super(canvas, image, data);
        // Player Data is required for Animations
        this.playerData = data;

        // Player control data
        this.pressedKeys = {};
        this.movement = {up: true, down: true, left: true, right: true};
        this.isIdle = true;
        this.directionKey = "d"; // initially facing right

        // Store a reference to the event listener function
        this.keydownListener = this.handleKeyDown.bind(this);
        this.keyupListener = this.handleKeyUp.bind(this);

        // Add event listeners
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);

        GameEnv.player = this;
    }

    // helper: player facing left
    isFaceLeft() { return this.directionKey === "a"; }
    // helper: left action key is pressed
    isKeyActionLeft(key) { return key === "a"; }
    // helper: player facing right  
    isFaceRight() { return this.directionKey === "d"; }
    // helper: right action key is pressed
    isKeyActionRight(key) { return key === "d"; }
    // helper: dash key is pressed
    isKeyActionDash(key) { return key === "s"; }

    // helper: action key is in queue 
    isActiveAnimation(key) { return (key in this.pressedKeys) && !this.isIdle; }
    // helper: gravity action key is in queue
    isActiveGravityAnimation(key) {
        var result = this.isActiveAnimation(key) && (this.bottom <= this.y || this.movement.down === false);
    
        // return to directional animation (direction?)
        if (this.bottom <= this.y || this.movement.down === false) {
            this.setAnimation(this.directionKey);
        }
    
        return result;
    }

    // helper: animation manager
    setAnimation(key) {
        // animation comes from playerData
        var animation = this.playerData[key]
        // direction setup
        if (this.isKeyActionLeft(key)) {
            this.directionKey = key;
            this.playerData.w = this.playerData.wa;
        } else if (this.isKeyActionRight(key)) {
            this.directionKey = key;
            this.playerData.w = this.playerData.wd;
        }
        // set frame and idle frame
        this.setFrameY(animation.row);
        this.setMaxFrame(animation.frames);
        if (this.isIdle && animation.idleFrame) {
            this.setFrameX(animation.idleFrame.column)
            this.setMinFrame(animation.idleFrame.frames);
        }
    }
    
    // gameLoop: player performs all possible updates in refresh cycle 
    update() {
        // Player moving right 
        if (this.isActiveAnimation("a")) {
            if (this.movement.left) this.x -= this.speed;  // Move to left
        }
        // Player moving left
        if (this.isActiveAnimation("d")) {
            if (this.movement.right) this.x += this.speed;  // Move to right
        }
        // Player moving at dash speed left or right 
        if (this.isActiveAnimation("s")) {
            const moveSpeed = this.speed * 2;
            this.x += this.isFaceLeft() ? -moveSpeed : moveSpeed;
        }
        // Player jumping
        if (this.isActiveGravityAnimation("w")) {
            if (this.gravityEnabled) {
                this.y -= (this.bottom * .50);  // bottom jump height
            } else if (this.movement.down===false) {
                this.y -= (this.bottom * .30);  // platform jump height
            }
        }

        // Perform super update actions
        super.update();
    }

    // gameloop: override destroy() method from GameObject to remove event listeners
    destroy() {
        // Remove event listeners
        document.removeEventListener('keydown', this.keydownListener);
        document.removeEventListener('keyup', this.keyupListener);

        // Call the parent class's destroy method
        super.destroy();
    }

    // gameloop: player performs action on collisions
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
            if (this.collisionData.touchPoints.other.bottom) {
                this.x = this.collisionData.touchPoints.other.x;
                this.gravityEnabled = false; // stop gravity
                // Pause for two seconds
                setTimeout(() => {   // animation in tube for 2 seconds
                    this.gravityEnabled = true;
                    setTimeout(() => { // move to end of screen for end of game detection
                        this.x = GameEnv.innerWidth + 1;
                    }, 1000);
                }, 2000);
            }
        } else {
            // Reset movement flags if not colliding with a tube
            this.movement.left = true;
            this.movement.right = true;
        }
        // Gomba left/right collision
        if (this.collisionData.touchPoints.other.id === "goomba") {
            // Collision with the left side of the Enemy
            if (this.collisionData.touchPoints.other.left) {
                // Game over
                this.x = GameEnv.innerWidth + 1;
            }
            // Collision with the right side of the Enemy
            if (this.collisionData.touchPoints.other.right) {
                // Game over
                this.x = GameEnv.innerWidth + 1;
            }
        }
        // Jump platform collision
        if (this.collisionData.touchPoints.other.id === "jumpPlatform") {
            // Player is on top of the Jump platform
            if (this.collisionData.touchPoints.this.top) {
                this.movement.down = false; // enable movement down without gravity
                this.gravityEnabled = false;
                this.setAnimation(this.directionKey); // set animation to direction
            }
        }
        // Fall Off edge of Jump platform
        else if (this.movement.down === false) {
            this.movement.down = true;          
            this.gravityEnabled = true;
        }
    }
    
    // event: listener key down
    handleKeyDown(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (!(event.key in this.pressedKeys)) {
                this.pressedKeys[event.key] = this.playerData[key];
                this.setAnimation(key);
                // player active
                this.isIdle = false;
            }
            // dash action on
            if (this.isKeyActionDash(key)) {
                this.canvas.style.filter = 'invert(1)';
            }
            // parallax background speed starts on player movement
            if (this.isKeyActionLeft(key)) {
                GameEnv.backgroundHillsSpeed = -0.4;
                GameEnv.backgroundMountainsSpeed = -0.1;
            } else if (this.isKeyActionRight(key)) {
                GameEnv.backgroundHillsSpeed = 0.4;
                GameEnv.backgroundMountainsSpeed = 0.1;
            }
        }
    }

    // event: listener key up
    handleKeyUp(event) {
        if (this.playerData.hasOwnProperty(event.key)) {
            const key = event.key;
            if (event.key in this.pressedKeys) {
                delete this.pressedKeys[event.key];
            }
            this.setAnimation(key);  
            // player idle
            this.isIdle = true;
            // dash action off
            if (this.isKeyActionDash(key)) {
                this.canvas.style.filter = 'invert(0)';
            } 
            // parallax background speed halts on key up
            if (this.isKeyActionLeft(key) || this.isKeyActionRight(key)) {
                GameEnv.backgroundHillsSpeed = 0;
                GameEnv.backgroundMountainsSpeed = 0;
            }
        }
    }

    
}


export default Player;