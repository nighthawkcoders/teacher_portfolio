import GameObject from './GameObject.js';
import Background from './Background.js';
import GameEnv from './GameEnv.js';
import { initPlayer } from './Player.js';

const GameInitializer = {
    // ... (other init methods)

    async transitionToLevel(newLevel) {
        this.inTransition = true;

        // Destroy existing game objects
        this.destroyGameObjects();

        await this.initLevel(newLevel);
        GameEnv.currentLevel = newLevel;

        // Create new game objects for the new level
        this.createGameObjectsForLevel(newLevel);

        // Trigger a resize at start up
        this.resize();

        this.inTransition = false;
    },

    // Destroy all existing game objects
    destroyGameObjects() {
        let toDestroy = []
        for (const gameObject of GameObject.gameObjectArray) {
            toDestroy.push(gameObject);
        }
        for (const gameObject of toDestroy) {
            gameObject.destroy();
        }
    },

    // Initialize the level with loaded images
    async initLevel(level) {
        // Initialize and add platforms to the level
        // (similar to what you did in initLevel previously)
        // ...        
        try {
            // Open image files for Game Objects
            const [backgroundImg, playerImg] = await Promise.all([
                loadImage(level.backgroundImg),
                loadImage(level.playerImg),
            ]);
    
            // Setup Globals
            GameEnv.gameSpeed = 2;
            GameEnv.gravity = 3;
    
            // Prepare HTML with Background Canvas
            const backgroundCanvas = document.createElement("canvas");
            backgroundCanvas.id = "background";
            document.querySelector("#canvasContainer").appendChild(backgroundCanvas);
            // Background object
            const backgroundSpeedRatio = 0
            new Background(backgroundCanvas, backgroundImg, backgroundSpeedRatio);  // Background Class calls GameObject Array which stores the instance

            // Prepare HTML with Player Canvas
            const playerCanvas = document.createElement("canvas");
            playerCanvas.id = "characters";
            document.querySelector("#canvasContainer").appendChild(playerCanvas);
            // Player object
            const playerSpeedRatio = 0.7
            GameEnv.player = initPlayer(playerCanvas, playerImg, playerSpeedRatio);    
        // Trap errors on failed image loads
        } catch (error) {
            console.error('Failed to load one or more images:', error);
        }
    },

    // Create game objects for the given level
    createGameObjectsForLevel(level) {
        // Create game objects based on the level's configuration
        // (similar to what you did in initLevel previously)
        // ...
    },

    gameLoop() {
        if (!this.inTransition) {
            for (var gameObj of GameObject.gameObjectArray){
                gameObj.update();
                gameObj.draw();
            }

            if (GameEnv.currentLevel?.isComplete?.()) {
                this.transitionToLevel(GameEnv.currentLevel.nextLevel);
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));  // cycle game, aka recursion
    },

    resize() {
        GameEnv.setGameEnv();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObj of GameObject.gameObjectArray){
            gameObj.size();
        }
    },

    async initGame(level) {
        // Window resize
        window.addEventListener('resize', this.resize);

        // Toggle "canvas filter property" between alien and normal
        var isFilterEnabled = false;
        const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
        toggleCanvasEffect.addEventListener("click", function () {
            for (var gameObj of GameObject.gameObjectArray){
                if (gameObj.invert && isFilterEnabled) {  // toggle off
                    gameObj.canvas.style.filter = "none";  // remove filter
                } else if (gameObj.invert) { // toggle on
                    gameObj.canvas.style.filter = defaultFilter;  // remove filter
                } else {
                    gameObj.canvas.style.filter = "none";  // remove filter
                }
            }
            isFilterEnabled = !isFilterEnabled;  // switch boolean value
        });

        // init the level
        await this.transitionToLevel(level)

        toggleCanvasEffect.dispatchEvent(new Event('click'));

        // Start the game
        this.gameLoop();
    }
};

// Create a function to load an image and return a Promise
async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
}

export default GameInitializer;