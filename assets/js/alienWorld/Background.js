import Layer from './Layer.js';

export class Background extends Layer {
    constructor(ctx, image, gameSpeed, speedRatio) {
        super(image, gameSpeed, speedRatio);
        this.ctx = ctx;
    }
    update() {
        this.x = (this.x - this.speed) % this.width;
    }
    draw() {
        this.ctx.drawImage(this.image, this.x, this.y);
        this.ctx.drawImage(this.image, this.x + this.width, this.y);
    }
}

export function initBackground(canvasID, image, gameSpeed, speedRatio) {
    // Prepare Window extents related to viewport
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Prepare context
    const ctx = canvasID.getContext('2d');

    // Build game object
    var background = new Background(ctx, image, gameSpeed, speedRatio);

    // Setup background constant to adjust display size
    const ADJUST = 1.42 // visual layer adjust, use "1"" for a perfect loop 

    // Set Dimensions to match the image width
    const canvasWidth = maxWidth;
    const canvasHeight = canvasWidth / background.aspect_ratio;  // height is oriented by width
    const canvasLeft = 0; // Start image from the left edge horizontally
    const canvasTop = (maxHeight - canvasHeight) / 2;  // center image vertically

    // Set Style properties for the background canvas
    canvasID.width = background.width / ADJUST;
    canvasID.height = background.height / ADJUST;
    canvasID.style.width = `${canvasWidth}px`;
    canvasID.style.height = `${canvasHeight}px`;
    canvasID.style.position = 'absolute';
    canvasID.style.left = `${canvasLeft}px`;
    canvasID.style.top = `${canvasTop}px`;

    return background;
}

export default Background;