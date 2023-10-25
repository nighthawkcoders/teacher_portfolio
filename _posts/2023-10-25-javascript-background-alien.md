---
layout: base
title: Refactored Alien World
description: Use JavaScript without external libraries to loop background moving across screen. Depends on Background.js and GameObject.js.
image: /images/alien_planet.jpg
type: hacks
courses: { compsci: {week: 2} }
image: /images/alien_planet2.jpg
images:
  background:
    src: /images/alien_planet2.jpg
---
<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}

<style>
    #controls {
        position: relative;
        z-index: 2; /* Ensure the controls are on top */
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect">Invert</button>
    </div>
</div>

<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/alienWorld/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/alienWorld/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/alienWorld/Background.js';
    import Character from '{{site.baseurl}}/assets/js/alienWorld/Character.js';
    import Platform from '{{site.baseurl}}/assets/js/alienWorld/Platform.js';

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
        for (var gameObj of GameObject.gameObjectArray){
            gameObj.update();
            gameObj.draw();
        }
        requestAnimationFrame(gameLoop);  // cycle game, aka recursion
    }

    // Window resize
    function setSize() {
        GameEnv.setGameEnv();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObj of GameObject.gameObjectArray){
            gameObj.size();
        }
    }

    // Setup Game Objects and Event Listeners
    async function setupGame() {   
        try {
            // Open image files for Game Objects
            const [backgroundImg] = await Promise.all([
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
            const backgroundSpeedRatio = 0.2
            var backgroundObj = new Background(backgroundCanvas, backgroundImg, backgroundSpeedRatio);

            // Define Event Listeners 

            // Listen for window resize events and trigger the handleResize function
            window.addEventListener('resize', setSize);

            // Toggle "canvas filter property" between alien and normal
            var isFilterEnabled = true;
            const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
            toggleCanvasEffect.addEventListener("click", function () {
                for (var gameObj of GameObject.gameObjectArray){
                    if (isFilterEnabled) {  // toggle off
                        gameObj.canvas.style.filter = "none";  // remove filter
                    } else { // toggle on
                        gameObj.canvas.style.filter = defaultFilter;  // remove filter
                    }
                }
                isFilterEnabled = !isFilterEnabled;  // switch boolean value
            });

        // Trap errors on bad images
        } catch (error) {
            console.error('Failed to load one or more images:', error);
        }
    }
  
    // Call and wait for Game Objects and Event Listeners to be ready
    await setupGame();

    // Start the game
    setSize();
    gameLoop();
  
</script>
