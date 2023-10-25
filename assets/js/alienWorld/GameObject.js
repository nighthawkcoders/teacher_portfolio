import GameEnv from './GameEnv.js';

class GameObject {
    // container for all game objects in game
    static gameObjectArray = [];
    constructor(canvas, image, speedRatio) {
        this.x = 0;
        this.y = 0;
        this.frame = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = image;
        this.width = image.width;  // Image() width (meta data)
        this.height = image.height; // Image() height
        this.collisionWidth = 0;
        this.collisionHeight = 0;
        this.aspect_ratio = this.width / this.height;
        this.speedRatio = speedRatio;
        this.speed = GameEnv.gameSpeed * this.speedRatio;
        this.invert = true;
        this.collisionData = {};
        // Add this object to the game object array so collision can be detected
        // among other things
        GameObject.gameObjectArray.push(this); 
    }

    // X position getter and setter
    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    // Y position getter and setter
    getY() {
        return this.y;
    }

    setY(y) {
        this.y = y;
    }

    /* Default action is no action
     * override when you extend for custom action
    */
    collisionAction(){
        // no action
    }

    /* Collision checks
     * uses GameObject isCollision to detect hit
     * calls collisionAction on hit
    */
    collisionChecks() {
        for (var gameObj of GameObject.gameObjectArray){
            if (this != gameObj ) {
                this.isCollision(gameObj);
                if (this.collisionData.hit){
                    this.collisionAction();
                }
            }
        }
    }

    /* Collision detection method
     * usage: if (player.isCollision(platform)) { // action }
    */
    isCollision(otherGameObject) {

        this.collisionData = {
            hit: (this.x + this.collisionWidth > otherGameObject.x &&
            this.x < otherGameObject.x + otherGameObject.collisionWidth &&
            this.y + this.collisionHeight > otherGameObject.y &&
            this.y < otherGameObject.y + otherGameObject.collisionHeight),
            touchPoints: {
                this: {
                    object: this,
                    top: (this.y > otherGameObject.y), 
                    bottom: (this.y < otherGameObject.setY), 
                    left: (this.x > otherGameObject.x), 
                    right: (this.x < otherGameObject.x) 
                },
                other: {
                    object: otherGameObject,
                    top: (this.y < otherGameObject.y), 
                    bottom: (this.y > otherGameObject.y), 
                    left: (this.x < otherGameObject.x), 
                    right: (this.x > otherGameObject.x) 
                }
            } 
            
        };
    }
}

export default GameObject;
