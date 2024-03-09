import GameEnv from './GameEnv.js';
import Socket from './Multiplayer.js';

class GameObject {
    // container for all game objects in game
    constructor(canvas, image, data, widthPercentage = 0.0, heightPercentage = 0.0) {
        this.x = 0;
        this.y = 0;
        this.frame = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = image;
        this.width = image.width;  // from Image() width
        this.height = image.height; // from Image() height
        this.collisionWidth = 0;
        this.collisionHeight = 0;
        this.aspect_ratio = this.width / this.height;
        this.speedRatio = data?.speedRatio || 0;
        this.speed = GameEnv.gameSpeed * this.speedRatio;
        this.invert = true;
        this.collisionData = {};
        this.jsonifiedElement = '';
        this.shouldBeSynced = false; //if the object should be synced with the server
        this.widthPercentage = widthPercentage;
        this.heightPercentage = heightPercentage;
        // Add this object to the game object array so collision can be detected
        // among other things
        GameEnv.gameObjects.push(this); 
    }

    // extract change from Game Objects into JSON
    serialize() {
        this.logElement();
    }

    // log Character element change
    logElement() {
        var jsonifiedElement = this.stringifyElement();
        if (jsonifiedElement !== this.jsonifiedElement) {
            //console.log(jsonifiedElement);
            this.jsonifiedElement = jsonifiedElement;
            if (this.shouldBeSynced && !GameEnv.inTransition) {
                Socket.sendData("update",this.jsonifiedElement);
            }
        }
    }

    // strigify Character key data
    stringifyElement() {
        var element = this.canvas;
        if (element && element.id) {
            // Convert the relevant properties of the element to a string for comparison
            return {
                id: element.id,
                width: element.width,
                height: element.height,
                style: element.style.cssText,
                position: {
                    left: element.style.left,
                    top: element.style.top
                },
                filter: element.style.filter,
                tag: GameEnv.currentLevel.tag,
                x: this.x / GameEnv.innerWidth,
                y: (this.y - GameEnv.top) / (GameEnv.bottom - GameEnv.top),
                frameY: this.frameY
            };
        }
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

    updateInfo(json) {
        var element = this.canvas;
        if (json.id === element.id) {
            console.log("runs", json.width, json.height)
            this.canvas.width = json.width;
            this.canvas.height = json.height;
            this.canvas.style.filter = json.filter;
            var element = this.canvas;
            //this.x = json.x * GameEnv.innerWidth;
            //this.y = (json.y * (GameEnv.bottom - GameEnv.top)) + GameEnv.top;
            this.frameY = json.frameY
        }
        return json.id === element.id
    }

    /* Destroy Game Object
    * remove canvas element of object
    * remove object from GameObject array
    */
    destroy() {
        const index = GameEnv.gameObjects.indexOf(this);
        if (index !== -1) {
            // Remove the canvas from the DOM
            this.canvas.parentNode.removeChild(this.canvas);
            GameEnv.gameObjects.splice(index, 1);
        }
    }

    
    /* Default collision action is no action
     * override when you extend for custom action
    */
    collisionAction(){
        // no action
    }

    /* Default floor action is no action
     * override when you extend for custom action
    */
    floorAction(){
        // no action
    }

    /* Collision checks
     * uses GameObject isCollision to detect hit
     * calls collisionAction on hit
    */
    collisionChecks() {
        for (var gameObj of GameEnv.gameObjects){
            if (this != gameObj ) {
                this.isCollision(gameObj);
                if (this.collisionData.hit){
                    this.collisionAction();
                }
                if (this.collisionData.atFloor) {
                    this.floorAction();
                }
            }
        }
    }

    /* Collision detection method
     * usage: if (player.isCollision(platform)) { // action }
    */
    isCollision(other) {
        // Bounding rectangles from Canvas
        const thisRect = this.canvas.getBoundingClientRect();
        const otherRect = other.canvas.getBoundingClientRect();
    
        // Calculate center points of rectangles
        const thisCenterX = (thisRect.left + thisRect.right) / 2;
        //const thisCenterY = (thisRect.top + thisRect.bottom) / 2;
        const otherCenterX = (otherRect.left + otherRect.right) / 2;
        //const otherCenterY = (otherRect.top + otherRect.bottom) / 2;
    
        // Calculate hitbox constants
        var widthPercentage = this.widthPercentage;
        var heightPercentage = this.heightPercentage; 
                /* if (this.canvas.id === "player" && other.canvas.id === "blockPlatform") {
                    // heightPercentage = 0;
                    // widthPercentage = 0;
                } */
        if(this.canvas.id === "jumpPlatform" && other.canvas.id === "player") { 
            heightPercentage = -0.2;
            //hitbox for activation is slightly larger than the block to ensure
            //that there is enough room for mario to collide without getting stopped by the platform
        }
                /* if (this.canvas.id === "goomba" && other.canvas.id === "player") {
                    heightPercentage = 0.2;
                } */
        const widthReduction = thisRect.width * widthPercentage;
        const heightReduction = thisRect.height * heightPercentage;
    
        // Build hitbox by subtracting reductions from the left, right, top, and bottom
        const thisLeft = thisRect.left + widthReduction;
        const thisTop = thisRect.top + heightReduction;
        const thisRight = thisRect.right - widthReduction;
        const thisBottom = thisRect.bottom;
    
        // Determine hit and touch points of hit
        this.collisionData = {
            hit: (
                thisLeft < otherRect.right &&
                thisRight > otherRect.left &&
                thisTop < otherRect.bottom &&
                thisBottom > otherRect.top
            ),
            atFloor: (GameEnv.bottom <= this.y),
            touchPoints: {
                this: {
                    id: this.canvas.id,
                    top: thisRect.bottom > otherRect.top,
                    bottom: (thisRect.bottom <= otherRect.top) && !(Math.abs(thisRect.bottom - otherRect.bottom) <= GameEnv.gravity),
                    left: thisCenterX > otherCenterX,
                    right: thisCenterX < otherCenterX,
                },
                other: {
                    id: other.canvas.id,
                    top: thisRect.bottom < otherRect.top,
                    bottom: (thisRect.bottom >= otherRect.top) && !(Math.abs(thisRect.bottom - otherRect.bottom) <= GameEnv.gravity),
                    left: thisCenterX < otherCenterX, 
                    right: thisCenterX > otherCenterX,
                    x: otherRect.left,
                },
            },
        };

    }
    
}

export default GameObject;
