export class GameEnv {
    // Prototype static variables
    static innerWidth;
    static innerHeight;
    static top;
    static bottom;
    
    // Make the constructor private to prevent instantiation
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    // Initialize the static variables with a method
    static initialize() {
        // Initial call to setGameEnv
        this.setGameEnv();  
        
        // Trigger setGameEnv to reset on window resize event
        window.addEventListener('resize', this.setGameEnv.bind(this));
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

// Call the initialize method once with the required values
GameEnv.initialize();

export default GameEnv;
