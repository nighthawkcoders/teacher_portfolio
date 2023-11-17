// Store the assets and attributes of the Game at the specific GameLevel.
class GameLevel {
    constructor() {
        this.backgroundImg = null;
        this.platformImg = null;
        this.playerImg = null;
        this.nextLevel = null;
        this.isComplete = null; // function that determines if level is complete
    }

    setBackgroundFile(file) {
        this.backgroundImg = file;
    }

    setPlatformFile(file) {
        this.platformImg = file;
    }

    setPlayerFile(file) {
        this.playerImg = file;
    }

    setNextLevel(gameLvl) {
        this.nextLevel = gameLvl;
    }

    setIsComplete(callBack) {
        this.isComplete = callBack;
    }

    // Load level data
    load() { /* Load level data */ }

    // Generate level elements
    generate() { /* Generate level elements */ }
    // Additional level-specific methods
}

export default GameLevel;