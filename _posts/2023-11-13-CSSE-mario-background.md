---
layout: base
title: Mario Hills Background
description: Early step in turning Mario game into OOP
type: ccc
courses: { csse: {week: 44} }
image: /images/platformer/backgrounds//hills.png
images:
  background:
    src: /images/platformer/backgrounds//hills.png
---
<!-- Liquid code, run by Jekyll, used to define the location of the asset(s) -->
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}

<style>
    #controls {
        position: relative;
        z-index: 2; /*Ensure the controls are on top*/
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the dog canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect">Invert</button>
    </div>
</div>

<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/platformer/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/platformer/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/platformer/Background.js';

    // Create a function to load an image and return a Promise
    async function loadImage(src) {
        return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.onload = () => resolve(image);
        image.onerror = reject;
        });
    }

    // Game loop
    function gameLoop() {
        GameEnv.update();
        requestAnimationFrame(gameLoop);  // cycle game, aka recursion
    }

    // Window resize
    window.addEventListener('resize', function () {
        GameEnv.resize();
    });

    // Toggle "canvas filter property" between alien and normal
    toggleCanvasEffect.addEventListener("click", function () {
        GameEnv.toggleInvert();
    });
  
    // Setup and store Game Objects
    async function setupGame() {
        try {
            // Open image files for Game Objects
            const [backgroundImg, vaderImg] = await Promise.all([
                loadImage('{{backgroundFile}}'),
            ]);

            // Setup Globals
            GameEnv.gameSpeed = 2;
            GameEnv.gravity = 3;

            // Prepare HTML with Background Canvas
            const backgroundCanvas = document.createElement("canvas");
            backgroundCanvas.id = "background";
            document.querySelector("#canvasContainer").appendChild(backgroundCanvas);
            // Background object
            const backgroundSpeedRatio = 0
            new Background(backgroundCanvas, backgroundImg, backgroundSpeedRatio);  // Background Class calls GameObject Array which stores the instance

        // Trap errors on failed image loads
        } catch (error) {
            console.error('Failed to load one or more images:', error);
        }
    }
  
    // Call and wait for Game Objects to be ready
    await setupGame();

    // Trigger a resize at the start-up
    window.dispatchEvent(new Event('resize'));
    toggleCanvasEffect.dispatchEvent(new Event('click'));

    // Start the game
    gameLoop();

</script>
