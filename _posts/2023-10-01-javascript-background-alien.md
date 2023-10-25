---
layout: base
title: Alien World Background
description: Use JavaScript without external libraries to loop background moving across screen.
image: /images/alien_planet.jpg
type: tangibles
courses: { compsci: {week: 1} }
---
{% assign alienPlanetFile = site.baseurl | append: page.image %}

<!-- Prepare alienWorld DOM canvas -->
<canvas id="alienWorld"></canvas>

<script>
// Prepare Canvas
const canvas = document.getElementById("alienWorld");
const ctx = canvas.getContext('2d');

// Prepare Window extents
const maxWidth = window.innerWidth;
const maxHeight = window.innerHeight;

// Prepare Image
const backgroundImg = new Image();
backgroundImg.src = '{{alienPlanetFile}}';

backgroundImg.onload = function () {
    const WIDTH = backgroundImg.width;
    const HEIGHT = backgroundImg.height;
    const ASPECT_RATIO = WIDTH / HEIGHT;

    // Set Dimensions to match the image width
    const canvasWidth = maxWidth;
    const canvasHeight = canvasWidth / ASPECT_RATIO;
    const canvasLeft = 0; // Start from the left edge
    const canvasTop = (maxHeight - canvasHeight) / 2;

    // Set Style properties
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    canvas.style.position = 'absolute';
    canvas.style.left = `${canvasLeft}px`;
    canvas.style.top = `${canvasTop}px`;
  
    var gameSpeed = 2;
    class Layer {
            constructor(image, speedRatio) {
            this.x = 0;
            this.y = 0;
            this.width = WIDTH;
            this.height = HEIGHT;
            this.image = image
            this.speedRatio = speedRatio
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

    var backgroundObj = new Layer(backgroundImg, 0.5)

    function background() {
        backgroundObj.update();
        backgroundObj.draw();
        requestAnimationFrame(background);
    }
    background();
};

</script>
