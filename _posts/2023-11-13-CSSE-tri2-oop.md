---
toc: false
comments: false
layout: post
title: OOP, CSSE mini project
description: Convert Mario to Object Oriented Programming (OOP)
type: ccc
courses: { csse: {week: 13} }
---

{% include nav_oop.html %}

## OOP Conversion Outline

Teams will be a maximum size of 3 people.  The objective of this project is to covert functionalities of "Imperative Style" Mario Game to "Object Oriented Programming" paradigm.  Expectation is we will work on this, have tech talks, and complete activy in week 15.

The OOP hierarchy show below is designed to promote reusability, encapsulation, and a clear separation of entities.

- GameEnv manages the overall game state
- GameObject provides a common base for various game entities
- GameLevel holds level-specific assets and elements
- GameStateManager handles the transition between different game states.

```text
GameEnv
│
├── GameObject
│   ├── Player
│   └── Platform
│   └── ...
│
├── GameLevel
│   ├── platforms: Array
│   └── enemies: Array
│
└── GameStateManager
```

### Game Environment

GameEnv is the overarching environment class that holds the game state, objects, and the current game level.

```javascript
class GameEnv {
    static gameObjects = [];
    static height;
    static width;
    static currentLevel;

    // sets up initial environment settings, like width and heigh
    static initialize(width, height) {
        this.width = width;
        this.height = height;
        // Additional initialization logic
    }

    // initializes the game by creating the first level and loading its elements
    static startGame() {
        // Initialize or load the first level
        this.currentLevel = new GameLevel();
        this.currentLevel.load(); // or generate
        // Additional game start logic
    }

    static update() {
        // Update game state, including all game objects
        for (const gameObject of this.gameObjects) {
            gameObject.update();
            gameObject.draw();
        }
    }

}
```

### GameObject

GameObject is the base class for all objects in the game. It contains common attributes and methods.

```javascript
// Common attributes, methods, prototype methods for all objects in the Game.
class GameObject {
    constructor(canvas, config) {
        this.x = config.x;
        this.y = config.y;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.image = config.image;
        this.frame = config.frame;
        this.width = config.width;
        this.height = config.height;
        this.aspect_ratio = this.width / this.height;
        this.speedRatio = config.speedRatio;
        this.speed = GameEnv.gameSpeed * this.speedRatio;
        this.collisionWidth = 0;
        this.collisionHeight = 0;
        this.collisionData = {};
        GameObject.gameObjects.push(this);
    }

    destroy() {
        const index = GameObject.gameObjects.indexOf(this);
        if (index !== -1) {
            // Remove the canvas from the DOM
            this.canvas.parentNode.removeChild(this.canvas);
            GameObject.gameObjects.splice(index, 1);
        }
    }

    update() { }
    draw() { }
    size() { }
    isCollision(object) { }
    collisionAction(object) { }
    handleCollision(object) {
        if (this.isCollision(object)) {
            this.collisionAction(object);
        }
    }
}
```

### Player

Player is a class specific to the player character, extending GameObject and adding properties like speed, jump height, etc.

```javascript
// Create a class specifically for the player character, extending the GameObject class.
class Player extends GameObject {
    constructor(canvas, config) {
        super(canvas, config);
        this.speed = config.speed;
        this.jumpHeight = config.jumpHeight;
        this.health = config.health;

        // Set up event listeners for user input
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        // Handle key down events (e.g., move left or right, jump)
        switch (event.key) {
            case 'ArrowLeft':
                this.moveLeft();
                break;
            case 'ArrowRight':
                this.moveRight();
                break;
            case 'Space':
                this.jump();
                break;
            // Handle other keys as needed
        }
    }

    handleKeyUp(event) {
        // Handle key up events (e.g., stop moving)
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.stopMoving();
                break;
            // Handle other keys as needed
        }
    }

    moveLeft() { /* Implement left movement logic */ }
    moveRight() { /* Implement right movement logic */ }
    stopMoving() { /* Implement stop movement logic */ }
    jump() { /* Implement jump logic */ }
    attack() { /* Implement attack logic */ }
}
```

### Platform

Platform is a class for platforms that the player can stand on, extending GameObject.

```javascript
// Create a class for platforms that the player can stand on.
class Platform extends GameObject {
    constructor(canvas, config) {
        super(canvas, config);

    }
    // Additional platform-specific methods or properties
}
```

### Game Level

GameLevel stores the assets and attributes specific to a particular level. It has properties like platforms and enemies.

```javascript
// Store the assets and attributes of the Game at the specific GameLevel.
class GameLevel {
    constructor() {
        this.platforms = []; // Array of platforms in the level
        this.enemies = [];   // Array of enemies in the level
        // Additional level-specific properties
    }

    // Load level data
    load() { /* Load level data */ }

    // Generate level elements
    generate() { /* Generate level elements */ }
    // Additional level-specific methods
}
```

### Game State Management

GameStateManager is responsible for managing different game states and handling transitions between them.

```javascript
// Implement a system to manage different game states (e.g., menu, playing, game over).
class GameStateManager {
    constructor() {
        this.currentState = "menu"; // Initial state
    }

    // Change level and handle transitions
    changeLevel(newLevel) {
        // Logic for transitioning between states
        await GameInitializer.transitionToLevel(newLevel);
    }
}
```

### Game Initializer

Assist with setup and teardown between levels

```javascript
// Assist with setup and teardown between levels
const GameInitializer = {
    // ... (other init methods)

    async transitionToLevel(newLevel) {
        // Destroy existing game objects
        this.destroyGameObjects();

        // Load images for the new level
        const levelImages = await this.loadLevelImages(newLevel);

        // Initialize the new level with loaded images
        const level = this.initLevel(newLevel, levelImages);
        GameEnv.currentLevel = level;

        // Create new game objects for the new level
        this.createGameObjectsForLevel(level);
    },

    // Destroy all existing game objects
    destroyGameObjects() {
        for (const gameObject of GameObject.gameObjects) {
            gameObject.destroy();
        }
    },

    // Load images specific to the given level
    async loadLevelImages(level) {
        const levelImagePromises = level.imageFiles.map(file => loadImage(file));
        return Promise.all(levelImagePromises);
    },

    // Initialize the level with loaded images
    initLevel(level, levelImages) {
        const initializedLevel = new GameLevel();

        // Initialize and add platforms to the level
        // (similar to what you did in initLevel previously)
        // ...

        return initializedLevel;
    },

    // Create game objects for the given level
    createGameObjectsForLevel(level) {
        // Create game objects based on the level's configuration
        // (similar to what you did in initLevel previously)
        // ...
    }
};
```
