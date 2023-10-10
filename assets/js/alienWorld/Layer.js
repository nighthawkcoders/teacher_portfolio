class Layer {
    constructor(image, gameSpeed, speedRatio) {
        this.x = 0;
        this.y = 0;
        this.frame = 0;
        this.image = image;
        this.width = image.width;  // Image() width (meta data)
        this.height = image.height; // Image() height
        this.aspect_ratio = this.width / this.height;
        this.speedRatio = speedRatio;
        this.speed = gameSpeed * this.speedRatio;
    }
}

export default Layer;