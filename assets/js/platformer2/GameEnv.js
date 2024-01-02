// GameEnv.js key purpose is to manage shared game environment data and methods.

/* Coding Style Notes
 *
 * GameEnv is defined as a static class, this ensures that there is only one instance of the class
    * * static classes do not have a constructor, cannot be instantiated    
    * * do not have instance variables, only signleton/static variables
    * * do not have instance methods, only singletong/static methods
    * * is similar in namespace to an object literal, but is a class
    * * benefit is it is similar to other coding languages (e.g. Java, C#), thus is more readable to other developers
 *
 * 
 * Purpose of GameEnv 
    * * stores game objects (e.g. gameObjects, player, levels, etc.)
    * * stores game attributes (e.g. gravity, speed, width, height, top, bottom, etc.)
    * * defines methods to update, draw, and destroy game objects
    * * defines methods to initialize and resize game objects
* 
* 
* Usage Notes - 
* * GameEnv is used by other classes to manage the game environment.  
* * It is dangerous to use GameEnv directly, it is not protected from misuse. Comments below show locations of usage
* * Here are some methods supported by GameEnv:
    * * call GameEnv.initialize() to initialize window dimensions
    * * call GameEnv.resize() to resize game objects
    * * call GameEnv.update() to update, searlize, and draw game objects
    * * call GameEnv.destroy() to destroy game objects
*/

export class GameEnv {

    // GameControl properties
    static currentLevel = null; // used by GameControl
    static player = null; // used by GameControl
    static levels = []; // used by GameControl
    static gameObjects = []; // used by GameControl
    static isInverted = false; // localstorage key, canvas filter property, used by GameControl

    // game speed controls
    static gameSpeed = 2; //localstorage key, used by platformer objects
    static backgroundHillsSpeed = 0;  // used by background objects
    static backgroundMountainsSpeed = 0; // used by background objects

    // game attributes
    static gravity = 3; //localstorage key, used by platformer objects
    static innerWidth; // used by platformer objects
    static prevInnerWidth; // used by platformer objects
    static innerHeight; // used by platformer objects
    static top;  // used by platformer objects
    static bottom; // used by platformer objects
    static prevBottom; // used by platformer objects
    
    // timer properties
    static time = 0; // Initialize time variable, used by timer objects
    static timerInterval; // Variable to hold the interval reference, used by timer objects
    
    // Make the constructor throw an error, or effectively make it private
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

     // Setter for Top position, called by initialize in GameEnv
     static setTop() {
        // set top of game as header height
        const header = document.querySelector('header');
        if (header) {
            this.top = header.offsetHeight;
        }
    }

    // Setter for Bottom position, called by resize in GameEnv
    static setBottom() {
        // sets the bottom or gravity 0
        this.bottom =
        this.top + this.backgroundHeight;
    }

    // Setup for Game Environment, called by transitionToLevel in GameControl
    static initialize() {
        // store previous for ratio calculatins on resize
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
    
        // game uses available width and heith
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        this.setTop();
        //this.setBottom(); // must be called in platformer objects
    }

    // Resize for Game Objects, called by window resize event
    static resize() {
        GameEnv.initialize();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObject of GameEnv.gameObjects){
            gameObject.size();
        }
    }

    // Update for Game Objects, called by gameLoop
    static update() {
        // Update game state, including all game objects
        for (const gameObject of GameEnv.gameObjects) {
            gameObject.update();
            gameObject.serialize();
            gameObject.draw();
        }
    }

    // Destroy all existing game objects, called by transitionToLevel in GameControl
    static destroy() {
        // Destroy objects in reverse order
        for (var i = GameEnv.gameObjects.length - 1; i >= 0; i--) {
            const gameObject = GameEnv.gameObjects[i];
            gameObject.destroy();
        }
        GameEnv.gameObjects = [];
    }

    // Set "canvas filter property" between inverted and normal, called by setInvert in GameControl
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
