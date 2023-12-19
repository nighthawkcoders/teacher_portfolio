---
layout: base
title: Refactored Alien World with Coyote
description: Use JavaScript without external libraries to loop background moving across screen. Depends on Background.js and GameObject.js.
image: /images/alien_planet.jpg
type: hacks
courses: { compsci: {week: 2} }
image: /images/alien_planet1..jpg
images:
  background:
    src: /images/alien_planet1..jpg
  chicken:
    src: /images/chickenSprite.png
  coyote:
    src: /images/coyote.png

---
<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}
{% assign chickenSpriteImage = site.baseurl | append: page.images.chicken.src %}
{% assign coyoteSpriteImage = site.baseurl | append: page.images.coyote.src %}

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
    import GameEnv from '{{site.baseurl}}/assets/js/alienWorld/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/alienWorld/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/alienWorld/Background.js';
    import Character from '{{site.baseurl}}/assets/js/alienWorld/Character.js';
    import { initChicken } from '{{site.baseurl}}/assets/js/alienWorld/CharacterChicken.js';
    import { initCoyote } from '{{site.baseurl}}/assets/js/alienWorld/CharacterCoyote.js';

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
    window.addEventListener('resize', function () {
        GameEnv.setGameEnv();  // Update GameEnv dimensions

        // Call the sizing method on all game objects
        for (var gameObj of GameObject.gameObjectArray){
            gameObj.size();
        }
    });

    // Toggle "canvas filter property" between alien and normal
    var isFilterEnabled = true;
    const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
    toggleCanvasEffect.addEventListener("click", function () {
        for (var gameObj of GameObject.gameObjectArray){
            if (gameObj.invert && isFilterEnabled) {  // toggle off
                gameObj.canvas.style.filter = "none";  // remove filter
            } else if (gameObj.invert) { // toggle on
                gameObj.canvas.style.filter = defaultFilter;  // remove filter
            } else {
                gameObj.canvas.style.filter = "none";  // remove filter
            }
        }
        isFilterEnabled = !isFilterEnabled;  // switch boolean value
    });
  
    // Setup and store Game Objects
    async function setupGame() {
        try {
            // Open image files for Game Objects
            const [backgroundImg, chickenImg, coyoteImg] = await Promise.all([
                loadImage('{{backgroundFile}}'),
                loadImage('{{chickenSpriteImage}}'),
                loadImage('{{coyoteSpriteImage}}'),
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

            // Prepare HTML with Chicken Canvas
            const chickenCanvas = document.createElement("canvas");
            chickenCanvas.id = "characters";
            document.querySelector("#canvasContainer").appendChild(chickenCanvas);
            // Chicken object
            const chickenSpeedRatio = 0
            initChicken(chickenCanvas, chickenImg, chickenSpeedRatio);

            // Prepare HTML with many Coyotes
            for (var i = 0; i < 10; i++) {
                const coyoteCanvas = document.createElement("canvas");
                coyoteCanvas.id = "characters";
                document.querySelector("#canvasContainer").appendChild(coyoteCanvas);
                // Coyote object
                const coyoteSpeedRatio = 0
                initCoyote(coyoteCanvas, coyoteImg, coyoteSpeedRatio);
            }

        // Trap errors on failed image loads
        } catch (error) {
            console.error('Failed to load one or more images:', error);
        }
    }
  
    // Call and wait for Game Objects to be ready
    await setupGame();

    // Trigger a resize at start up
    window.dispatchEvent(new Event('resize'));
    toggleCanvasEffect.dispatchEvent(new Event('click'));

    // Start the game
    gameLoop();

</script>
