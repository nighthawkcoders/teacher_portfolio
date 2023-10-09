---
layout: base
title: Alien World - Dog and Background
image: /images/alien_planet.jpg
sprite: /images/dogSprite.png
type: hacks
courses: { compsci: {week: 1} }
---

<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign backgroundFile = site.baseurl | append: page.image %}
{% assign spriteImage = site.baseurl | append: page.sprite %}

<style>
    #controls {
        position: relative;
        z-index: 2; /* Ensure the controls are on top of the dog canvas */
    }

    /* Style the dog canvas to be the same size as the viewport */
    #dogCanvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0; /* Place it below the background */
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the dog canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <button id="toggleCanvasEffect">Invert</button>

        <input type="radio" name="animation" id="idle">
        <label for="idle">Idle</label>
        <input type="radio" name="animation" id="barking">
        <label for="barking">Barking</label>
        <input type="radio" name="animation" id="walking" checked>
        <label for="walking">Walking</label>
    </div>
    <canvas id="backgroundID">
        <img id="backgroundImage" src="{{backgroundFile}}">
    </canvas>
</div>

<script>
/* Background part of Game
 * scrolling 
*/
// Prepare Background Image
const backgroundImg = new Image();
backgroundImg.src = '{{backgroundFile}}';  // Jekyll/Liquid puts filename here

// Prepare Sprite Image
const dogImg = new Image();
dogImg.src = '{{spriteImage}}';

// Prepare Canvas
const canvas = document.getElementById("backgroundID");
const ctx = canvas.getContext('2d');

// Dog animation part
const dogCanvas = document.createElement("canvas");
const dogCtx = dogCanvas.getContext("2d");

// Prepare Window extents related to viewport
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

backgroundImg.onload = function () {
    // Setup background constants from background image
    const WIDTH = backgroundImg.width;  // Image() width (meta data)
    const HEIGHT = backgroundImg.height; // Image() height
    const ASPECT_RATIO = WIDTH / HEIGHT;
    const ADJUST = 1.42 // visual layer adjust, use "1"" for a perfect loop 

    // Set Dimensions to match the image width
    const canvasWidth = maxWidth;
    const canvasHeight = canvasWidth / ASPECT_RATIO;  // height is oriented by width
    const canvasLeft = 0; // Start image from the left edge horizontally
    const canvasTop = (maxHeight - canvasHeight) / 2;  // center image vertically

    // Set Style properties for the background canvas
    canvas.width = WIDTH / ADJUST;
    canvas.height = HEIGHT / ADJUST;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.position = 'absolute';
    canvas.style.left = `${canvasLeft}px`;
    canvas.style.top = `${canvasTop}px`;

    // Game speed is a common game variable
    var gameSpeed = 2;

    // Layer is set up to support Parallax, multiple layers
    class Layer {
        constructor(image, speedRatio) {
            this.x = 0;
            this.y = 0;
            this.width = WIDTH;
            this.height = HEIGHT;
            this.image = image;
            this.speedRatio = speedRatio;
            this.speed = gameSpeed * this.speedRatio;
            this.frame = 0;
        }
        update() {
            this.x = (this.x - this.speed) % this.width;
        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y);
            ctx.drawImage(this.image, this.x + this.width, this.y);
        }
    }

    // Setup Dog sprite constraints
    const SPRITE_WIDTH = 160;  // matches sprite pixel width
    const SPRITE_HEIGHT = 144; // matches sprite pixel height
    const SPRITE_FRAMES = 48;  // matches number of frames per sprite row; this code assumes each row is the same
    const SPRITE_SCALE = 1;  // controls the size of the sprite on the canvas

    class Dog extends Layer {
        constructor(image, speedRatio) {
            super(image, speedRatio);
            this.minFrame = 0;
            this.maxFrame = SPRITE_FRAMES;
            this.frameX = 0;
            this.frameY = 2;  // walking as default
            this.dogX = canvasWidth; // Initialize the dog's x position to the right edge of the canvas
        }
    
        update() {
            if (this.frameY == 2) {
                this.dogX -= this.speed;  // Move the dog to the left
                // Check if the dog has moved off the left edge of the canvas
                if (this.dogX < -dogCanvas.width) {
                    this.dogX = canvasWidth; // Reset the dog's x position to the right edge
                }
            }
            // Update frameX of the object
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
    
        // Draw dog object
        draw() {
            // Set fixed dimensions and position for the dogCanvas
            dogCanvas.width = SPRITE_WIDTH * SPRITE_SCALE;
            dogCanvas.height = SPRITE_HEIGHT * SPRITE_SCALE;
            dogCanvas.style.width = `${dogCanvas.width}px`;
            dogCanvas.style.height = `${dogCanvas.height}px`;
            dogCanvas.style.position = 'absolute';
            dogCanvas.style.left = `${this.dogX}px`; // Set the dog's left position based on its x-coordinate
            dogCanvas.style.top = `${canvasHeight}px`;
    
            dogCtx.drawImage(
                this.image,
                this.frameX * SPRITE_WIDTH,
                this.frameY * SPRITE_HEIGHT,
                SPRITE_WIDTH,
                SPRITE_HEIGHT,
                0,
                0,
                dogCanvas.width,
                dogCanvas.height
            );
        }
    }
    

    // Background object
    var backgroundObj = new Layer(backgroundImg, 0.2);
    var dogObj = new Dog(dogImg, 0.5);

    // Append the dog canvas to the body
    document.body.appendChild(dogCanvas);

    // Animation loop
    function animation() {
        backgroundObj.update();
        backgroundObj.draw();

        dogObj.update();
        dogObj.draw();

        requestAnimationFrame(animation);  // cycle animation, recursion
    }

    // Start animation process
    animation();

    /* Toggle "canvas filter property" 
    * look in _sass/minima/dark-mode.scss
    */
    var isFilterEnabled = true;
    const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
    toggleCanvasEffect.addEventListener("click", function () {
        if (isFilterEnabled) {
            canvas.style.filter = "none";  // remove filter
            dogCanvas.style.filter = "none";
        } else {
            canvas.style.filter = defaultFilter; // Apply the default filter value
            dogCanvas.style.filter = defaultFilter; 
        }

        isFilterEnabled = !isFilterEnabled;  // switch boolean value
    });
    /* Control "dog action" 
     * changes y value, the row in sprite
    */
    // update frameY of dog object, action from idle, bark, walk radio control
    const controls = document.getElementById('controls');
    controls.addEventListener('click', function (event) {
        if (event.target.tagName === 'INPUT') {
            const selectedAnimation = event.target.id;
            switch (selectedAnimation) {
                case 'idle':
                    dogObj.frameY = 0;
                    break;
                case 'barking':
                    dogObj.frameY = 1;
                    break;
                case 'walking':
                    dogObj.frameY = 2;
                    break;
                default:
                    break;
            }
        }
    });
};
</script>