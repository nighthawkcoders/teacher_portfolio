import GameEnv from './GameEnv.js';
import Background from './Background.js';
import Platform from './Platform.js';
import Player from './Player.js';

// Store the assets and attributes of the Game at the specific GameLevel.
class GameLevel {
    constructor(tag) {
        this.tag = tag;
        this.backgroundImg = null;
        this.platformImg = null;
        this.playerImg = null;
        this.playerData = null;
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

    setPlayerData(player) {
        this.playerData = player;
    }

    setIsComplete(callBack) {
        this.isComplete = callBack;  // callBack is function to test for level completion
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
                playerCanvas.id = "character";
                document.querySelector("#canvasContainer").appendChild(playerCanvas);
                const playerSpeedRatio = 0.7;
                new Player(playerCanvas, loadedImages[i], playerSpeedRatio, this.playerData);
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

    // Add a GameLevel to the array levels
    static create(tag, background, platform, player, isComplete) {
        const newLevel = new GameLevel(tag);
        newLevel.setBackgroundFile(background.file);
        newLevel.setPlatformFile(platform.file);
        newLevel.setPlayerFile(player.file);
        newLevel.setPlayerData(player);
        newLevel.setIsComplete(isComplete);
        GameEnv.levels.push(newLevel);
    }

}

export default GameLevel;