---
layout: base
title: Dog Animation
description: Use JavaScript without external libraries to animate a sprite. Layer is in OOP style.
image: /images/dogSprite.png
type: tangibles
courses: { compsci: {week: 1} }
---

{% assign spriteImage = site.baseurl | append: page.image %}

<body>
    <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
        <button id="toggleCanvasEffect">Invert</button>
        <input type="radio" name="animation" id="idle" checked>
        <label for="idle">Idle</label>
        <input type="radio" name="animation" id="barking">
        <label for="barking">Barking</label>
        <input type="radio" name="animation" id="walking">
        <label for="walking">Walking</label>
    </div>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="dogSprite" src="{{spriteImage}}">  // change sprite here
        </canvas>

    </div>
</body>

<script>
    const canvas = document.getElementById('spriteContainer');
    const ctx = canvas.getContext('2d');
    /* Toggle "canvas filter propery" 
    * look in _sass/minima/dark-mode.scss
    */
    var isFilterEnabled = true;
    const defaultFilter = getComputedStyle(document.documentElement).getPropertyValue('--default-canvas-filter');
    toggleCanvasEffect.addEventListener("click", function () {
        if (isFilterEnabled) {
            canvas.style.filter = "none";  // remove filter
        } else {
            canvas.style.filter = defaultFilter; // Apply the default filter value
        }

        isFilterEnabled = !isFilterEnabled;  // switch boolean value
    });
    // start on page load
    window.addEventListener('load', function () {
        const SPRITE_WIDTH = 160;  // matches sprite pixel width
        const SPRITE_HEIGHT = 144; // matches sprite pixel height
        const FRAME_LIMIT = 48;  // matches number of frames per sprite row, this code assume each row is same

        const SCALE_FACTOR = 2;  // control size of sprite on canvas
        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        class Dog {
            constructor() {
                this.image = document.getElementById("dogSprite");
                this.x = 0;
                this.y = 0;
                this.minFrame = 0;
                this.maxFrame = FRAME_LIMIT;
                this.frameX = 0;
                this.frameY = 0;
            }

            // draw dog object
            draw(context) {
                context.drawImage(
                    this.image,
                    this.frameX * SPRITE_WIDTH,
                    this.frameY * SPRITE_HEIGHT,
                    SPRITE_WIDTH,
                    SPRITE_HEIGHT,
                    this.x,
                    this.y,
                    canvas.width,
                    canvas.height
                );
            }

            // update frameX of object
            update() {
                if (this.frameX < this.maxFrame) {
                    this.frameX++;
                } else {
                    this.frameX = 0;
                }
            }
        }

        // dog object
        const dog = new Dog();

        // update frameY of dog object, action from idle, bark, walk radio control
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'idle':
                        dog.frameY = 0;
                        break;
                    case 'barking':
                        dog.frameY = 1;
                        break;
                    case 'walking':
                        dog.frameY = 2;
                        break;
                    default:
                        break;
                }
            }
        });

        // Animation recursive control function
        function animate() {
            // Clears the canvas to remove the previous frame.
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draws the current frame of the sprite.
            dog.draw(ctx);

            // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
            dog.update();

            // Uses `requestAnimationFrame` to synchronize the animation loop with the display's refresh rate,
            // ensuring smooth visuals.
            requestAnimationFrame(animate);
        }

        // run 1st animate
        animate();
    });
</script>