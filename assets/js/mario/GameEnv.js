export class GameEnv {
    // Prototype static variables
    static gameObjects = [];

    static innerWidth;
    static prevInnerWidth;
    static innerHeight;
    static top;
    static bottom;
    static prevBottom;
    static gameSpeed;
    static gravity;

    static isInverted = true;
    static defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');

    // Make the constructor private to prevent instantiation
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    static update() {
        // Update game state, including all game objects
        for (const gameObject of this.gameObjects) {
            gameObject.update();
            gameObject.draw();
        }
    }

     // Setter for Top position
     static setTop() {
        // set top of game as header height
        const header = document.querySelector('header');
        if (header) {
            this.top = header.offsetHeight;
        }
    }

    // Setter for Bottom position
    static setBottom() {
        // set bottom of game as background height
        const background = document.querySelector('#background');
        if (background) {
            this.bottom = background.offsetHeight;
        }
    }
    
    // Setup for Game Environment 
    static initialize() {
        // store previous for ratio calculatins on resize
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
    
        // game uses available width and heith
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        this.setTop();
        // this.setBottom() is ignored for now as resize of background object determinse bottom
    }

    // Resize for Game Objects
    static resize() {
        GameEnv.initialize();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObj of GameEnv.gameObjects){
            gameObj.size();
        }
    }

    static update() {
        // Update game state, including all game objects
        for (const gameObject of this.gameObjects) {
            gameObject.update();
            gameObject.draw();
        }
    }

    // Toggle "canvas filter property" between alien and normal
    static toggleInvert() {
        for (var gameObj of GameEnv.gameObjects){
            if (gameObj.invert && this.isInverted) {  // toggle off
                gameObj.canvas.style.filter = "none";  // remove filter
            } else if (gameObj.invert) { // toggle on
                gameObj.canvas.style.filter = this.defaultFilter;  // remove filter
            } else {
                gameObj.canvas.style.filter = "none";  // remove filter
            }
        }
        this.isInverted = !this.isInverted;  // switch boolean value
    }
}

export default GameEnv;
