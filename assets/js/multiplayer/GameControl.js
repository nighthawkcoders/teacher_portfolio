import GameEnv from './GameEnv.js';

/* GameControl is an object literal.
 *   Informerly GameControl looks like defining a variable with methods.
 *   By definition GameControl is a singleton object, without a constructor.
 *   This style of definition ensures one instance, an object literal.
 *   
 *   Observe, encapulation of this.inTransition and sharing between methods.
*/

const GameControl = {

    // Level transition method (destroy then newlevel)
    async transitionToLevel(newLevel) {
        GameEnv.inTransition = true;

        GameEnv.socket.off("stateUpdate", this.handleSocketMessage)
        GameEnv.socket.off("disconnect", this.handleSocketDisconnect)

        // Destroy existing game objects
        GameEnv.destroy();

        // Load GameLevel objects
        await newLevel.load();
        GameEnv.currentLevel = newLevel;

        // Trigger a resize to redraw canvas elements
        window.dispatchEvent(new Event('resize'));
        // Update invert property, twice means same as befores
        toggleCanvasEffect.dispatchEvent(new Event('click'));
        toggleCanvasEffect.dispatchEvent(new Event('click'));

        GameEnv.socket.on("stateUpdate", this.handleSocketMessage)
        GameEnv.socket.on("disconnection", this.handleSocketDisconnect)
        GameEnv.inTransition = false;
    },

    // Game control loop
    gameLoop() {
        // Turn game loop off during transitions
        if (!GameEnv.inTransition) {

            // Get current level
            GameEnv.update();
            const currentLevel = GameEnv.currentLevel;

            // currentLevel is defined
            if (currentLevel) {
                // run the isComplete callback function
                if (currentLevel.isComplete && currentLevel.isComplete()) {
                    const currentIndex = GameEnv.levels.indexOf(currentLevel);
                    // next index is in bounds
                    if (currentIndex !== -1 && currentIndex + 1 < GameEnv.levels.length) {
                        // transition to the next level
                        this.transitionToLevel(GameEnv.levels[currentIndex + 1]);
                    }
                }
                // currentLevel is null, (ie start or restart game)
            } else {
                // transition to beginning of game
                this.transitionToLevel(GameEnv.levels[0]);
            }
        }

        // recycle gameLoop, aka recursion
        requestAnimationFrame(this.gameLoop.bind(this));
    },

    async handleSocketMessage(data) {
        console.log("update", data)
        let updated = false
        if (data.tag === GameEnv.currentLevel.tag) {
            for (var gameObj of GameEnv.gameObjects) {
                updated = updated || gameObj.updateInfo(data)
            }
            if (!updated && data.id.includes("character")) {
                const obj = await GameEnv.currentLevel.addCharacter(data.id.replace("character", ""))
                obj.updateInfo(data)
            }
        }
    },

    handleSocketDisconnect(id) {
        for (var gameObj of GameEnv.gameObjects) {
            if (gameObj.canvas.id.includes(id)) {
                gameObj.destroy();
            }
        }
    }
};

export default GameControl;