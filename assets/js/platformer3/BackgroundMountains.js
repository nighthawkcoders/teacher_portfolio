import GameEnv from './GameEnv.js';
import Background from './Background.js';

export class BackgroundMountains extends Background {
    constructor(canvas, image, data) {
        super(canvas, image, data);
    }

    // speed is used to background parallax behavior
    update() {
        this.speed = GameEnv.backgroundMountainsSpeed;
        super.update();
    }
}

export default BackgroundMountains;