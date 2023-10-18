export class GameEnv {
    // Prototype static variables
    static innerWidth;
    static innerHeight;
    static top;
    static bottom;
    static gameSpeed;
    static controls;
    
    // Make the constructor private to prevent instantiation
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    // Setter for Game Environment 
    static setGameEnv() {
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
