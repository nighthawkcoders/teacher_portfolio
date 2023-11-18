import GameEnv from './GameEnv.js';

const GameManager = {

    // Level transition method (destroy then newlevel)
    async transitionToLevel(newLevel) {
        this.inTransition = true;

        // Destroy existing game objects
        this.destroyGameObjects();

        // Load GameLevel objects
        await newLevel.load();
        GameEnv.currentLevel = newLevel;

        // Trigger a resize to redraw canvas elements
        window.dispatchEvent(new Event('resize'));
        // Update invert property, twice means same as before
        toggleCanvasEffect.dispatchEvent(new Event('click'));
        toggleCanvasEffect.dispatchEvent(new Event('click'));

        this.inTransition = false;
    },

    // Destroy all existing game objects
    destroyGameObjects() {
        // Destroy objects in reverse order
        for (let i = GameEnv.gameObjects.length - 1; i >= 0; i--) {
            const gameObject = GameEnv.gameObjects[i];
            gameObject.destroy();
        }
    },

    // Game control loop
    gameLoop() {
        // Turn game loop off during transition of level
        if (!this.inTransition) {

            // Primary game loop actions
            for (const gameObj of GameEnv.gameObjects) {
                gameObj.update();
                gameObj.draw();
            }

            // Get current level
            const currentLevel = GameEnv.currentLevel;

            // Test if there is and isComplete method
            if (currentLevel && currentLevel.isComplete && currentLevel.isComplete()) {
                const currentIndex = GameEnv.levels.indexOf(currentLevel);

                // Transition to next level
                if (currentIndex !== -1 && currentIndex + 1 < GameEnv.levels.length) {
                    // Transition to the next level in the array
                    this.transitionToLevel(GameEnv.levels[currentIndex + 1]);
                } else {
                    // Handle no next level, perhaps recycle to start screen
                    console.log('Game completed!');
                }
            }
        }

        // cycle game, aka recursion
        requestAnimationFrame(this.gameLoop.bind(this));  
    },

    async startGame(level) {
        // Initialize the level
        await this.transitionToLevel(level)

        // Start the game
        this.gameLoop();
    }
};

export default GameManager;