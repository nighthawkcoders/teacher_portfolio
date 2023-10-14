import GameEnv from './GameEnv.js';

class GameObject {
    constructor(canvas, image, speedRatio) {
        this.x = 0;
        this.y = 0;
        this.frame = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = image;
        this.width = image.width;  // Image() width (meta data)
        this.height = image.height; // Image() height
        this.aspect_ratio = this.width / this.height;
        this.speedRatio = speedRatio;
        this.speed = GameEnv.gameSpeed * this.speedRatio;
    }

    // X position setter
    setX(x) {
        this.x = x;
    }

    // Y position setter
    setY(y) {
        this.y = y;
    }

    /* Collision detection method
     * usage: if (player.isCollision(platform)) { // action }
    */
    isCollision(otherGameObject) {
        return (
            this.x + this.width > otherGameObject.x &&
            this.x < otherGameObject.x + otherGameObject.width &&
            this.y + this.height > otherGameObject.y &&
            this.y < otherGameObject.y + otherGameObject.height
        );
    }
}

export default GameObject;
