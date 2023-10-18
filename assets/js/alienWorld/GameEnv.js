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
    
    // Make the constructor private to prevent instantiation
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    // Setter for Game Environment 
    static setGameEnv() {
        // store previous for ratio calcs
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
    
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        if (header && main) {
            this.top = header.offsetHeight;
            this.bottom = main.offsetHeight;
        }
    }
}

export default GameEnv;
