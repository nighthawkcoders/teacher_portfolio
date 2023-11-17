import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Platform from './Platform.js';
import { initPlayer } from './Player.js';

// Store the assets and attributes of the Game at the specific GameLevel.
class GameLevel {
    constructor() {
        this.backgroundImg = null;
        this.platformImg = null;
        this.playerImg = null;
        this.nextLevel = null;
        this.isComplete = null; // function that determines if level is complete
    }

    setBackgroundFile(file) {
        this.backgroundImg = file;
    }

    setPlatformFile(file) {
        this.platformImg = file;
    }

    setPlayerFile(file) {
        this.playerImg = file;
    }

    setNextLevel(gameLvl) {
        this.nextLevel = gameLvl;
    }

    setIsComplete(callBack) {
        this.isComplete = callBack;
    }

    // Load level data
    async load() { 
        try {
            // Open image files for Game Objects
            const [backgroundImg, platformImg, playerImg] = await Promise.all([
                this.loadImage(this.backgroundImg),
                this.loadImage(this.platformImg),
                this.loadImage(this.playerImg),
            ]);
        
            // Prepare HTML with Background Canvas
            const backgroundCanvas = document.createElement("canvas");
            backgroundCanvas.id = "background";
            document.querySelector("#canvasContainer").appendChild(backgroundCanvas);
            // Background object
            const backgroundSpeedRatio = 0
            new Background(backgroundCanvas, backgroundImg, backgroundSpeedRatio);  // Background Class calls GameObject Array which stores the instance

            // Prepare HTML with Platform Canvas
            const platformCanvas = document.createElement("canvas");
            platformCanvas.id = "platform";
            document.querySelector("#canvasContainer").appendChild(platformCanvas);
            // Platform object
            const platformSpeedRatio = 0
            new Platform(platformCanvas, platformImg, platformSpeedRatio);

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

     }

    // Create a function to load an image and return a Promise
    async loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = reject;
        });
    }

    // Generate level elements
    generate() { /* Generate level elements */ }
    // Additional level-specific methods
}

export default GameLevel;