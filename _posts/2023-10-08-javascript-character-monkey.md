---
layout: base
title: Monkey Animation
description: Use JavaScript without external libraries to animate a sprite. Layer is in OOP style.
image: /images/monkeySprite.png
type: tangibles
courses: { compsci: {week: 1} }
---

{% assign spriteImage = site.baseurl | append: page.image %}

<body>
    <div id="controls"> <!--basic radio buttons which can be used to check whether each individual animaiton works -->
        <button id="toggleCanvasEffect">Invert</button>
        <input type="radio" name="animation" id="walkRight" checked>
        <label for="walkRight">Walk Right</label>
        <input type="radio" name="animation" id="walkLeft">
        <label for="walkLeft">Walk Left</label>
        <input type="radio" name="animation" id="jumpRight">
        <label for="jumpRight">Jump Right</label>
        <input type="radio" name="animation" id="jumpLeft">
        <label for="jumpLeft">Jump Left</label>
    </div>
    <div>
        <canvas id="spriteContainer"> <!-- Within the base div is a canvas. An HTML canvas is used only for graphics. It allows the user to access some basic functions related to the image created on the canvas (including animation) -->
            <img id="monkeySprite" src="{{spriteImage}}">  // change sprite here
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
        const SPRITE_WIDTH = 40;  // matches sprite pixel width
        const SPRITE_HEIGHT = 40; // matches sprite pixel height
        const FRAME_LIMIT = 15;  // matches number of frames per sprite row, this code assume each row is same

        const SCALE_FACTOR = 2;  // control size of sprite on canvas
        canvas.width = SPRITE_WIDTH * SCALE_FACTOR;
        canvas.height = SPRITE_HEIGHT * SCALE_FACTOR;

        // a class to store the differences in the animations to make it clear what the animation changes are for
        class AnimationType{
            constructor(initFrameX = 0, maxFrame = FRAME_LIMIT, animationDelay = 75){
                this.maxFrame = maxFrame;
                this.initFrameX = initFrameX;
                this.animationDelay = animationDelay;
            }
        }

        class Monkey {
            constructor() {
                this.image = document.getElementById("monkeySprite");
                this.x = 0;
                this.y = 0;
                this.minFrame = 0;
                this.animationType = new AnimationType();
                this.frameX = 0;
                this.frameY = 0;
            }

            // draw Monkey object
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
                // this sprite sheet uses a variable number of frames for different animations
                if (this.frameX < this.animationType.maxFrame) {
                    this.frameX++;
                } else {
                    // the start frame of the animations changes in this sprite sheet
                    this.frameX = this.animationType.initFrameX;
                }
            }
        }

        // Monkey object
        const monkey = new Monkey();

        // Make the animations that deviate from the default use a class 
        // to make it more readible what the changes are doing
        const jumpRightAnimation = new AnimationType(undefined, 7, undefined); // frames go from 0 to 7 but everything else is the same
        const jumpLeftAnimation = new AnimationType(8, undefined, undefined); // frames go from 8 to 14 but everything else is the same

        // update frameY of monkey object, action from radio controls
        const controls = document.getElementById('controls');
        controls.addEventListener('click', function (event) {
            if (event.target.tagName === 'INPUT') {
                const selectedAnimation = event.target.id;
                switch (selectedAnimation) {
                    case 'walkRight':
                        monkey.frameY = 0;
                        monkey.animationType = new AnimationType();
                        break;
                    case 'walkLeft':
                        monkey.frameY = 1;
                        monkey.animationType = new AnimationType();
                        break;
                    case 'jumpRight':
                        monkey.frameY = 2;
                        monkey.animationType = jumpRightAnimation;
                        break;
                    case 'jumpLeft':
                        // this animation is on the same line as jumpRight
                        monkey.frameY = 2;
                        monkey.animationType = jumpLeftAnimation;
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
            monkey.draw(ctx);

            // Updates the `frameX` property to prepare for the next frame in the sprite sheet.
            monkey.update();

            // Uses `requestAnimationFrame` to synchronize the animation loop with the display's refresh rate,
            // ensuring smooth visuals.
            requestAnimationFrame(function() {
                setTimeout(animate, monkey.animationType.animationDelay); // Adjust the delay (in milliseconds) to control the frame rate.
            });
        }

        // run 1st animate
        animate();
    });
</script>