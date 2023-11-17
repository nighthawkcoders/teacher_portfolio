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
        
        // test for presence of Images
        const imagesToLoad = [];
        if (this.backgroundImg) {
            imagesToLoad.push(this.loadImage(this.backgroundImg));
        }
        if (this.platformImg) {
            imagesToLoad.push(this.loadImage(this.platformImg));
        }
        if (this.playerImg) {
            imagesToLoad.push(this.loadImage(this.playerImg));
        }

        try {
            // Do not proceed until images are loaded
            const loadedImages = await Promise.all(imagesToLoad);
            var i = 0;

            // Prepare HTML with Background Canvas (if backgroundImg is defined)
            if (this.backgroundImg) {
                const backgroundCanvas = document.createElement("canvas");
                backgroundCanvas.id = "background";
                document.querySelector("#canvasContainer").appendChild(backgroundCanvas);
                const backgroundSpeedRatio = 0;
                new Background(backgroundCanvas, loadedImages[i], backgroundSpeedRatio);
                i++;
            }

            // Prepare HTML with Platform Canvas (if platformImg is defined)
            if (this.platformImg) {
                const platformCanvas = document.createElement("canvas");
                platformCanvas.id = "platform";
                document.querySelector("#canvasContainer").appendChild(platformCanvas);
                const platformSpeedRatio = 0;
                new Platform(platformCanvas, loadedImages[i], platformSpeedRatio);
                i++;
            }

            // Prepare HTML with Player Canvas (if playerImg is defined)
            if (this.playerImg) {
                const playerCanvas = document.createElement("canvas");
                playerCanvas.id = "characters";
                document.querySelector("#canvasContainer").appendChild(playerCanvas);
                const playerSpeedRatio = 0.7;
                GameEnv.player = initPlayer(playerCanvas, loadedImages[i], playerSpeedRatio);
                i++;
            }

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