/**
 * GameEnv.js key purpose is to manage shared game environment data and methods.
 * 
 * @class
 * @classdesc GameEnv is defined as a static class, this ensures that there is only one instance of the class.
 * Static classes do not have a constructor, cannot be instantiated, do not have instance variables, only singleton/static variables,
 * do not have instance methods, only singleton/static methods, is similar in namespace to an object literal, but is a class.
 * The benefit is it is similar to other coding languages (e.g. Java, C#), thus is more readable to other developers.
 * 
 * Purpose of GameEnv:
 * - stores game objects (e.g. gameObjects, player, levels, etc.)
 * - stores game attributes (e.g. gravity, speed, width, height, top, bottom, etc.)
 * - defines methods to update, draw, and destroy game objects
 * - defines methods to initialize and resize game objects
 * 
 * Usage Notes:
 * GameEnv is used by other classes to manage the game environment.  
 * It is dangerous to use GameEnv directly, it is not protected from misuse. Comments below show locations of usage.
 * Here are some methods supported by GameEnv:
 * - call GameEnv.initialize() to initialize window dimensions
 * - call GameEnv.resize() to resize game objects
 * - call GameEnv.update() to update, serialize, and draw game objects
 * - call GameEnv.destroy() to destroy game objects
 */
export class GameEnv {

    /**
     * @static
     * @property {string} userID - localstorage key, used by GameControl
     * @property {Object} player - used by GameControl
     * @property {Array} levels - used by GameControl
     * @property {Object} currentLevel - used by GameControl
     * @property {Array} gameObjects - used by GameControl
     * @property {boolean} isInverted - localstorage key, canvas filter property, used by GameControl
     * @property {number} gameSpeed - localstorage key, used by platformer objects
     * @property {number} backgroundHillsSpeed - used by background objects
     * @property {number} backgroundMountainsSpeed - used by background objects
     * @property {number} gravity - localstorage key, used by platformer objects
     * @property {number} innerWidth - used by platformer objects
     * @property {number} prevInnerWidth - used by platformer objects
     * @property {number} innerHeight - used by platformer objects
     * @property {number} top - used by platformer objects
     * @property {number} bottom - used by platformer objects
     * @property {number} prevBottom - used by platformer objects
     * @property {number} time - Initialize time variable, used by timer objects
     * @property {number} timerInterval - Variable to hold the interval reference, used by timer objects
     */
    static userID = "Guest";
    static player = null;
    static levels = [];
    static currentLevel = null;
    static gameObjects = [];
    static isInverted = false;
    static gameSpeed = 2;
    static backgroundHillsSpeed = 0;
    static backgroundMountainsSpeed = 0;
    static gravity = 3;
    static innerWidth;
    static prevInnerWidth;
    static innerHeight;
    static top;
    static bottom;
    static prevBottom;
    
    // Make the constructor throws an error, or effectively make it a private constructor.
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

     /**
     * Setter for Top position, called by initialize in GameEnv
     * @static
     */
    static setTop() {
        // set top of game as header height
        const header = document.querySelector('header');
        if (header) {
            this.top = header.offsetHeight;
        }
    }

    /**
     * Setter for Bottom position, called by resize in GameEnv
     * @static
     */
    static setBottom() {
        // sets the bottom or gravity 0
        this.bottom =
        this.top + this.backgroundHeight;
    }

    /**
     * Setup for Game Environment, called by transitionToLevel in GameControl
     * @static
     */
    static initialize() {
        // store previous for ratio calculations on resize
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
    
        // game uses available width and height
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.setTop();
        //this.setBottom(); // must be called in platformer objects
    }

    /**
     * Resize game objects, called by resize in GameControl
     * @static
     */    
    static resize() {
        GameEnv.initialize();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObject of GameEnv.gameObjects){
            gameObject.size();
        }
    }

    /**
     * Update, serialize, and draw game objects, called by update in GameControl
     * @static
     */
    static update() {
        // Update game state, including all game objects
        for (const gameObject of GameEnv.gameObjects) {
            gameObject.update();
            gameObject.serialize();
            gameObject.draw();
        }
    }

    /**
     * Destroy game objects, called by destroy in GameControl
     * @static
     */
    static destroy() {
        // Destroy objects in reverse order
        for (var i = GameEnv.gameObjects.length - 1; i >= 0; i--) {
            const gameObject = GameEnv.gameObjects[i];
            gameObject.destroy();
        }
        GameEnv.gameObjects = [];
    }

    /**
     * Set "canvas filter property" between inverted and normal, called by setInvert in GameControl
     * @static
     */
    static setInvert() {
        for (var gameObject of GameEnv.gameObjects){
            if (gameObject.invert && !this.isInverted) {  // toggle off
                gameObject.canvas.style.filter = "none";  // remove filter
            } else if (gameObject.invert && this.isInverted) { // toggle on
                gameObject.canvas.style.filter = "invert(100%)";  // remove filter
            } else {
                gameObject.canvas.style.filter = "none";  // remove filter
            }
        }
    }
}

export default GameEnv;
