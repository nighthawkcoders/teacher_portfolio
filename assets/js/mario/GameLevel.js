// Store the assets and attributes of the Game at the specific GameLevel.
class GameLevel {
    constructor(playerImg, backgroundImg, platformImg, nextLevel, isComplete) {
        this.platforms = []; // Array of platforms in the level
        this.enemies = [];   // Array of enemies in the level
        this.playerImg = playerImg;
        this.backgroundImg = backgroundImg;
        this.platformImg = platformImg;
        this.nextLevel = nextLevel;
        this.isComplete = isComplete; // function that determines if level is complete
    }

    // Load level data
    load() { /* Load level data */ }

    // Generate level elements
    generate() { /* Generate level elements */ }
    // Additional level-specific methods
}

export default GameLevel;