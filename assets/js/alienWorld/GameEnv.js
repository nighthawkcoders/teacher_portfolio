export class GameEnv {
    static innerWidth = window.innerWidth;
    static innerHeight = window.innerHeight;
    static gameSpeed;
    static controls;

    static initialize() {
        // Startup initialization logic here
        window.addEventListener('resize', GameEnv.handleResize);
    }

    static handleResize() {
        GameEnv.innerWidth = window.innerWidth;
        GameEnv.innerWidth = window.innerHeight;
        // Add logic for window resize events here
    }
}

// Initialize GameEnv at startup
GameEnv.initialize();

// Share GameEnv
export default GameEnv;