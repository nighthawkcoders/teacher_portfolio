// GameSehup.js Key objective is to define GameLevel objects and their assets.
import GameEnv from './GameEnv.js';
import GameLevel from './GameLevel.js';
// To build GameLevels, each contains GameObjects from below imports
import Background from './Background.js'
import BackgroundHills from './BackgroundHills.js';
import BackgroundMountains from './BackgroundMountains.js';
import Platform from './Platform.js';
import JumpPlatform from './JumpPlatform.js';
import Player from './Player.js';
import Tube from './Tube.js';
import Goomba from './Goomba.js';

/* Coding Style Notes
 *
 * GameSetup is defined as an object literal in in Name Function Expression (NFE) style
 * * const GameSetup = function() { ... } is an NFE
 * * NFEs are a common pattern in JavaScript, reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function 
 *
 * * Informerly, inside of GameSetup it looks like defining keys and values that are functions.
 * * * GameSetup is a singleton object, object literal, without a constructor.
 * * * This coding style ensures one instance, thus the term object literal.
 * * * Inside of GameSetup, the keys are functions, and the values are references to the functions.
 * * * * The keys are the names of the functions.
 * * * * The values are the functions themselves.
 *
 * * Observe, encapulation of this.assets and sharing data between methods.
 * * * this.assets is defined in the object literal scope.
 * * * this.assets is shared between methods.
 * * * this.assets is not accessible outside of the object literal scope.
 * * * this.assets is not a global variable.
 * 
 * * Observe, the use of bind() to bind methods to the GameSetup object.
 * * * * bind() ensures "this" inside of methods binds to "GameSetup"
 * * * * this avoids "Temporal Dead Zone (TDZ)" error...
 * 
 * 
 * Usage Notes
 * * call GameSetup.initLevels() to setup the game levels and assets.
 * * * the remainder of GameSetup supports initLevels()
 * 
*/

// Define the GameSetup object literal
const GameSetup = {

    /*  ==========================================
     *  ===== Game Level Methods +++==============
     *  ==========================================
     * Game Level methods support Game Play, and Game Over
     * * Helper functions assist the Callback methods
     * * Callback methods are called by the GameLevel objects
     */ 

    /**
     * Helper function that waits for a button click event.
     * @param {string} id - The HTML id or name of the button.
     * @returns {Promise<boolean>} - A promise that resolves when the button is clicked.
     * References:
     * * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
     * *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
     */
    waitForButton: function(id) {
        // Returns a promise that resolves when the button is clicked
        return new Promise((resolve) => {
            const waitButton = document.getElementById(id);
            // Listener function to resolve the promise when the button is clicked
            const waitButtonListener = () => {
                resolve(true);
            };
            // Add the listener to the button's click event
            waitButton.addEventListener('click', waitButtonListener);
        });
      },
  
    /*  ==========================================
     *  ===== Game Level Call Backs ==============
     *  ==========================================
     * Game Level callbacks are functions that return true or false
     */
    
    /**
     * Start button callback.
     * Unhides the gameBegin button, waits for it to be clicked, then hides it again.
     * @async
     * @returns {Promise<boolean>} Always returns true.
     */    
    startGameCallback: async function() {
        const id = document.getElementById("gameBegin");
        // Unhide the gameBegin button
        id.hidden = false;
        
        // Wait for the startGame button to be clicked
        await this.waitForButton('startGame');
        // Hide the gameBegin button after it is clicked
        id.hidden = true;
        
        return true;
    }, 

    /**
     * Home screen exits on the Game Begin button.
     * Checks if the gameBegin button is hidden, which means the game has started.
     * @returns {boolean} Returns true if the gameBegin button is hidden, false otherwise.
     */
    homeScreenCallback: function() {
      // gameBegin hidden means the game has started
      const id = document.getElementById("gameBegin");
      return id.hidden;
    },

    /**
     * Level completion callback, based on Player off screen.
     * Checks if the player's x position is greater than the innerWidth of the game environment.
     * If it is, resets the player for the next level and returns true.
     * If it's not, returns false.
     * @returns {boolean} Returns true if the player's x position is greater than the innerWidth, false otherwise.
     */
    playerOffScreenCallBack: function() {
        // console.log(GameEnv.player?.x)
        if (GameEnv.player?.x > GameEnv.innerWidth) {
            GameEnv.player = null; // reset for next level
            return true;
        } else {
            return false;
        }
    },

    /**
     * Game Over callback.
     * Unhides the gameOver button, waits for it to be clicked, then hides it again.
     * Also sets the currentLevel of the game environment to null.
     * @async
     * @returns {Promise<boolean>} Always returns true.
     */    
    gameOverCallBack: async function() {
      const id = document.getElementById("gameOver");
      id.hidden = false;
      
      // Wait for the restart button to be clicked
      await this.waitForButton('restartGame');
      id.hidden = true;
      
      // Change currentLevel to start/restart value of null
      GameEnv.currentLevel = null;

      return true;
    },    

    /*  ==========================================
     *  ======= Data Definitions =================
     *  ==========================================
     * Assets for the Game Objects defined in nested JSON key/value pairs
     *
     * * assets: contains definitions for all game objects, images, and properties
     * * * 1st level: category (obstacles, platforms, backgrounds, players, enemies)
     * * * 2nd level: item (tube, grass, mario, goomba)
     * * * 3rd level: property (src, width, height, scaleSize, speedRatio, w, wa, wd, a, s, d)
    */

    assets: {
      obstacles: {
        tube: { src: "/images/platformer/obstacles/tube.png" },
      },
      platforms: {
        grass: { src: "/images/platformer/platforms/grass.png" },
        alien: { src: "/images/platformer/platforms/alien.png" },
        bricks: { src: "/images/platformer/platforms/brick_wall.png" },
      },
      backgrounds: {
        start: { src: "/images/platformer/backgrounds/home.png" },
        hills: { src: "/images/platformer/backgrounds/hills.png" },
        avenida: { src: "/images/platformer/backgrounds/avenida.png" },
        mountains: { src: "/images/platformer/backgrounds/mountains.jpg" },
        planet: { src: "/images/platformer/backgrounds/planet.jpg" },
        castles: { src: "/images/platformer/backgrounds/castles.png" },
        end: { src: "/images/platformer/backgrounds/game_over.png" }
      },
      players: {
        mario: {
          src: "/images/platformer/sprites/mario.png",
          width: 256,
          height: 256,
          scaleSize: 80,
          speedRatio: 0.7,
          w: { row: 10, frames: 15 },
          wa: { row: 11, frames: 15 },
          wd: { row: 10, frames: 15 },
          a: { row: 3, frames: 7, idleFrame: { column: 7, frames: 0 } },
          s: {  },
          d: { row: 2, frames: 7, idleFrame: { column: 7, frames: 0 } }
        },
        monkey: {
          src: "/images/platformer/sprites/monkey.png",
          width: 40,
          height: 40,
          scaleSize: 80,
          speedRatio: 0.7,
          w: { row: 9, frames: 15 },
          wa: { row: 9, frames: 15 },
          wd: { row: 9, frames: 15 },
          a: { row: 1, frames: 15, idleFrame: { column: 7, frames: 0 } },
          s: { row: 12, frames: 15 },
          d: { row: 0, frames: 15, idleFrame: { column: 7, frames: 0 } }
        },
        lopez: {
          src: "/images/platformer/sprites/lopezanimation.png", 
          width: 46,
          height: 52.5,
          scaleSize: 60,
          speedRatio: 0.7,
          w: {row: 1, frames: 4},
          wa: {row: 1, frames: 4},
          wd: {row: 2, frames: 4},
          idle: { row: 6, frames: 1, idleFrame: {column: 1, frames: 0} },
          a: { row: 1, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Right Movement
          s: {}, // Stop the movement 
          d: { row: 2, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Left Movement 
          runningLeft: { row: 5, frames: 4, idleFrame: {column: 1, frames: 0} },
          runningRight: { row: 4, frames: 4, idleFrame: {column: 1, frames: 0} },
        }
      },
      enemies: {
        goomba: {
          src: "/images/platformer/sprites/goomba.png",
          width: 448,
          height: 452,
          scaleSize: 60,
          speedRatio: 0.7,
        }
      }
    },

    /*  ==========================================
     *  ========== Game Level init ===============
     *  ==========================================
     * 
     * Game Level sequence as defined in code below
     * * a.) tag: "start" level defines button selection and cycles to the home screen
     * * b.) tag: "home" defines background and awaits "start" button selection and cycles to 1st game level
     * * c.) tag: "hills" and other levels before the tag: "end" define key gameplay levels
     * * d.) tag: "end"  concludes levels with game-over-screen background and replay selections
     * 
     * Definitions of new Object creations and JSON text
     * * 1.) "new GameLevel" adds game objects to the game environment.
     * * * JSON key/value "tag" is for readability
     * * * JSON "callback" contains function references defined above that terminate a GameLevel
     * * * JSON "objects" contain zero to many "GameObject"(s)
     * * 2.) "GameObject"(s) are defined using JSON text and include name, id, class, and data.  
     * * * JSON key/value "name" is for readability
     * * * JSON "id" is a GameObject classification and may have program significance
     * * * JSON "class" is the JavaScript class that defines the GameObject
     * * J* SON "data" contains assets and properties for the GameObject
    */

    initLevels: function(path) {  // ensure valid {{site.baseurl}} for path

        // Add File location in assets relative to the root of the site
        Object.keys(this.assets).forEach(category => {
            Object.keys(this.assets[category]).forEach(item => {
            this.assets[category][item]['file'] = path + this.assets[category][item].src;
            });
        });

        // Home screen added to the GameEnv ...
        new GameLevel( {tag: "start", callback: this.startGameCallback } );
        const homeGameObjects = [
        { name:'background', id: 'background', class: Background, data: this.assets.backgrounds.start }
        ];
        // Home Screen Background added to the GameEnv, "passive" means complementary, not an interactive level..
        new GameLevel( {tag: "home",  callback: this.homeScreenCallback, objects: homeGameObjects, passive: true } );
        
        // Hills Game Level defintion...
        const hillsGameObjects = [
        // GameObject(s), the order is important to z-index...
        { name: 'mountains', id: 'background', class: BackgroundMountains,  data: this.assets.backgrounds.mountains },
        { name: 'hills', id: 'background', class: BackgroundHills, data: this.assets.backgrounds.hills },
        { name: 'grass', id: 'platform', class: Platform, data: this.assets.platforms.grass },
        { name: 'bricks', id: 'jumpPlatform', class: JumpPlatform, data: this.assets.platforms.bricks },
        { name: 'goomba', id: 'goomba', class: Goomba, data: this.assets.enemies.goomba },
        { name: 'mario', id: 'player', class: Player, data: this.assets.players.mario },
        { name: 'tube', id: 'tube', class: Tube, data: this.assets.obstacles.tube },
        ];
        // Hills Game Level added to the GameEnv ...
        new GameLevel( {tag: "hills", callback: this.playerOffScreenCallBack, objects: hillsGameObjects } );

        // Avenida Game Level definition...
        const avenidaGameObjects = [
        // GameObject(s), the order is important to z-index...
        { name: 'avenida', id: 'background', class: Background, data: this.assets.backgrounds.avenida },
        { name: 'grass', id: 'platform', class: Platform, data: this.assets.platforms.grass },
        { name: 'goomba', id: 'goomba', class: Goomba, data: this.assets.enemies.goomba },
        { name: 'lopez', id: 'player', class: Player, data: this.assets.players.lopez },
        ];
        // Avenida Game Level added to the GameEnv ...
        new GameLevel( {tag: "avenida", callback: this.playerOffScreenCallBack, objects: avenidaGameObjects } );

        // Game Over Level definition...
        const endGameObjects = [
        { name:'background', class: Background, id: 'background', data: this.assets.backgrounds.end}
        ];
        // Game Over screen added to the GameEnv ...
        new GameLevel( {tag: "end",  callback: this.gameOverCallBack, objects: endGameObjects } );
    }
} 
// Bind the methods to the GameSetup object, ensures "this" inside of methods binds to "GameSetup"
// * * this avoids "Temporal Dead Zone (TDZ)" error... 
// * * * * "Cannot access 'GameSetup' before initialization", light reading TDZ (ha ha)...
// * * * * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_Dead_Zone
GameSetup.startGameCallback = GameSetup.startGameCallback.bind(GameSetup);
GameSetup.gameOverCallBack = GameSetup.gameOverCallBack.bind(GameSetup);

export default GameSetup;
