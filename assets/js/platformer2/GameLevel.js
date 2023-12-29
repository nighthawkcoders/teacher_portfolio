import GameEnv from './GameEnv.js';

class GameLevel {
    constructor(levelObject) {
        this.tag = levelObject?.tag; // friendly name used to identify level
        this.isComplete = levelObject?.callback; // function that determines if level is complete
        // assign game objects
        this.levelObjects = levelObject;        
        this.gameObjects = this.levelObjects?.objects || [];
        // store GameLevel instance in GameEnv
        GameEnv.levels.push(this);
    }

    // load each image and create a new instance of the game element
    async load() {
        try {
            for (const obj of this.gameObjects) {
                if (obj.data.file) {
                    // load image
                    obj.image = await this.loadImage(obj.data.file);
                    const canvas = document.createElement("canvas");
                    canvas.id = obj.id;
                    document.querySelector("#canvasContainer").appendChild(canvas);
                    // game element instance
                    new obj.class(canvas, obj.image, obj.speedRatio, obj.data);
                }
            }
        // halt game if any images or new objects fail
        } catch (error) {
            console.error('Failed to load one or more GameLevel objects:', error);
        }
    }

    // image loader
    async loadImage(src) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => resolve(image);
            image.onerror = reject;
        });
    }
}

export default GameLevel;