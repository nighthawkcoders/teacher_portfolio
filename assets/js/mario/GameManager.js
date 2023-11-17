import GameEnv from './GameEnv.js';

const GameManager = {
    // ... (other init methods)

    async transitionToLevel(newLevel) {
        this.inTransition = true;

        // Destroy existing game objects
        this.destroyGameObjects();

        await newLevel.load();
        GameEnv.currentLevel = newLevel;

        // Trigger a resize at start up
        window.dispatchEvent(new Event('resize'));
        // need these to get Invert in Sync
        toggleCanvasEffect.dispatchEvent(new Event('click'));
        toggleCanvasEffect.dispatchEvent(new Event('click'));

        this.inTransition = false;
    },

    // Destroy all existing game objects
    destroyGameObjects() {
        let toDestroy = []
        for (const gameObject of GameEnv.gameObjects) {
            toDestroy.push(gameObject);
        }
        for (const gameObject of toDestroy) {
            gameObject.destroy();
        }
    },

    gameLoop() {
        if (!this.inTransition) {
            for (var gameObj of GameEnv.gameObjects){
                gameObj.update();
                gameObj.draw();
            }

            if (GameEnv.currentLevel?.isComplete?.()) {
                this.transitionToLevel(GameEnv.currentLevel.nextLevel);
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));  // cycle game, aka recursion
    },

    async startGame(level) {
        
        // init the level
        await this.transitionToLevel(level)

        // Start the game
        this.gameLoop();
    }
};

export default GameManager;