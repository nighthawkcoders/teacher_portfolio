---
hide: true
toc: true
comments: true
layout: post
title: Daily Meeting Log
description: Start a game project
type: plans
courses: { compsci: {week: 1} }
categories: [C1.4]
---

### PBL Ideation Weeks

Learning outcome for week.  Start shared GitHub, learn how to plan.

- Weekend - Do some exploration
  - Mr Lopez found and animated a Monkey Sprite (Gorilla)
  - Mr M got background to be continuous
  - Mr M put dog on background and added some effects

- Monday - Get together with Mr Lopez, Safin, and Rohan.
  - Mr M wants to work on Code Quality as there are too many globals and it caused a lot of problems.  Expectations are there will many elements to add to game and correction should be done now.

```javascript
class Layer {
    constructor(image, speedRatio, canvasWidth, canvasHeight) {
      //...
    }
}
class BackgroundLayer extends Layer {
}
class CharacterLayer extends Layer {
}
function initializeBackgroundLayer(imageUrl, canvasId, canvasWidth, canvasHeight) {
    // Create and return an instance of BackgroundLayer
}

function initializeCharacterLayer(imageUrl, canvasId, canvasWidth, canvasHeight, characterType) {
    // Create and return an instance of CharacterLayer
}
function gameLoop() {
    // Update and draw all layers (background, characters, etc.)
    backgroundLayer.update();
    characterLayer.update();

    backgroundLayer.draw();
    characterLayer.draw();

    // Handle user input, collision detection, etc.
    // ...

    // Request the next frame
    requestAnimationFrame(gameLoop);
}    
```

- To go with rework start restructuring files for easier maintenance

```text
project-root/
    index.html
    assets/
        js/
            layers/
                Layer.js
                BackgroundLayer.js
                CharacterLayer.js
    images/
        alien_planet.jpg
        dogSprite.png
```

- Tu Restructure Files, Experiment with Monkey added to Game, experiment with Shadow Dog
- W  Tech Talk
- Th Study and implement a Platform, Create Monkey as Main Character
- Friday.  Review initial features with Teacher
  