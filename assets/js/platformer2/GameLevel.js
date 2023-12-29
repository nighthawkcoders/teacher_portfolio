import GameEnv from './GameEnv.js';
import Background from './Background.js'
import BackgroundHills from './BackgroundHills.js';
import BackgroundMountains from './BackgroundMountains.js';
import Platform from './Platform.js';
import JumpPlatform from './JumpPlatform.js';
import Player from './Player.js';
import Tube from './Tube.js';
import Goomba from './Goomba.js';

class GameLevel {
    constructor(gameObject) {
        // order objects are loaded is important
        this.gameObjects = [
            { name: 'backgroundMountains', class: BackgroundMountains, id: 'background', speedRatio: 0 },
            { name: 'backgroundHills', class: BackgroundHills, id: 'background', speedRatio: 0 },
            { name: 'background', class: Background, id: 'background', speedRatio: 0 },
            { name: 'platform', class: Platform, id: 'platform', speedRatio: 0 },
            { name: 'jumpPlatform', class: JumpPlatform, id: 'jumpPlatform', speedRatio: 0 },
            { name: 'player', class: Player, id: 'player', speedRatio: 0.7 },
            { name: 'tube', class: Tube, id: 'tube', speedRatio: 0 },
            { name: 'goomba', class: Goomba, id: 'goomba', speedRatio: 0.7 },
        ];
        
        this.tag = gameObject?.tag; // friendly name used to identify level
        this.isComplete = gameObject?.callback; // function that determines if level is complete

        // associate data with each gameObject
        this.gameObjects.forEach(obj => {
            obj.file = gameObject[obj.name]?.file;
            obj.data = gameObject[obj.name];
        });

        // store GameLevel instance in GameEnv
        GameEnv.levels.push(this);
    }

    // load each image and create a new instance of the game element
    async load() {
        try {
            for (const obj of this.gameObjects) {
                if (obj.file) {
                    // load image
                    obj.image = await this.loadImage(obj.file);
                    const canvas = document.createElement("canvas");
                    canvas.id = obj.id;
                    document.querySelector("#canvasContainer").appendChild(canvas);
                    // game element instance
                    new obj.class(canvas, obj.image, obj.speedRatio, obj.data);
                }
            }
        // halt game if any images fail to load
        } catch (error) {
            console.error('Failed to load one or more images:', error);
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