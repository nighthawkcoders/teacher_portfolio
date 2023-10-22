export class GameEnv {
    // Prototype static variables
    static innerWidth;
    static prevInnerWidth;
    static innerHeight;
    static top;
    static bottom;
    static prevBottom;
    static gameSpeed;
    static controls;
    static gravity;

    // Make the constructor private to prevent instantiation
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    // Setter for background bottom
    static setBottom(bottom) {
        this.bottom = bottom;
    }
    
    // Setter for Game Environment 
    static setGameEnv() {
        // store previous for ratio calcs
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
    
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        
        const header = document.querySelector('header');
        if (header) {
            this.top = header.offsetHeight;
        }
    }
}

export default GameEnv;
