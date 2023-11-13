export class GameEnv {
    // Prototype static variables
    static innerWidth;
    static prevInnerWidth;
    static innerHeight;
    static top;
    static bottom;
    static prevBottom;
    static gameSpeed;
    static gravity;

    // Make the constructor private to prevent instantiation
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
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
    
    // Setter for Game Environment 
    static setGameEnv() {
        // store previous for ratio calculatins on resize
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
    
        // game uses available width and heith
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;

        this.setTop();
        // this.setBottom() is ignored for now as resize of background object determinse bottom
    }
}

export default GameEnv;
