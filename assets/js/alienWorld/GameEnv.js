export class GameEnv {
    static innerWidth = window.innerWidth;
    static innerHeight = window.innerHeight;
    static top = document.querySelector('header').offsetHeight;
    static bottom = document.querySelector('main').offsetHeight;;

    static gameSpeed;
    static controls;

    static initialize() {
        // Startup initialization logic here
        window.addEventListener('resize', GameEnv.handleResize);
    }

    static handleResize() {
        GameEnv.innerWidth = window.innerWidth;
        GameEnv.innerWidth = window.innerHeight;
        // Account for the header height
        GameEnv.top = document.querySelector('header').offsetHeight;
    }
}

// Initialize GameEnv at startup
GameEnv.initialize();

// Share GameEnv
export default GameEnv;