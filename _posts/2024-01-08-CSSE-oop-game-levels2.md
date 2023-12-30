---
layout: base
title: Dynamic Game Levels v2.0 
description: Increasing functionality of game objects and levels through student lessons.  This includes adding goombas, platforms, parallax backgrounds, etc.
type: ccc
courses: { csse: {week: 18} }
image: /images/platformer/backgrounds/hills.png
---

<style>
    #gameBegin, #controls, #gameOver {
        position: relative;
        z-index: 2; /*Ensure the controls are on top*/
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="gameBegin" hidden>
        <button id="startGame">Start Game</button>
    </div>
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect">Invert</button>
    </div>
    <div id="gameOver" hidden>
        <button id="restartGame">Restart</button>
    </div>
</div>

<script type="module">
    // Imports
    import GameEnv from '{{site.baseurl}}/assets/js/platformer2/GameEnv.js';
    import GameLevel from '{{site.baseurl}}/assets/js/platformer2/GameLevel.js';
    import GameControl from '{{site.baseurl}}/assets/js/platformer2/GameControl.js';
    import Background from '{{site.baseurl}}/assets/js/platformer2/Background.js'
    import BackgroundHills from '{{site.baseurl}}/assets/js/platformer2/BackgroundHills.js';
    import BackgroundMountains from '{{site.baseurl}}/assets/js/platformer2/BackgroundMountains.js';
    import Platform from '{{site.baseurl}}/assets/js/platformer2/Platform.js';
    import JumpPlatform from '{{site.baseurl}}/assets/js/platformer2/JumpPlatform.js';
    import Player from '{{site.baseurl}}/assets/js/platformer2/Player.js';
    import Tube from '{{site.baseurl}}/assets/js/platformer2/Tube.js';
    import Goomba from '{{site.baseurl}}/assets/js/platformer2/Goomba.js';


    /*  ==========================================
     *  ======= Data Definitions =================
     *  ==========================================
    */

    // Define assets for the game
    var assets = {
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
          w: {row: 1, frames: 4},
          wa: {row: 1, frames: 4},
          wd: {row: 2, frames: 4},
          idle: { row: 6, frames: 1, idleFrame: {column: 1, frames: 0} },
          a: { row: 1, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Right Movement
          d: { row: 2, frames: 4, idleFrame: { column: 1, frames: 0 } }, // Left Movement 
          runningLeft: { row: 5, frames: 4, idleFrame: {column: 1, frames: 0} },
          runningRight: { row: 4, frames: 4, idleFrame: {column: 1, frames: 0} },
          s: {}, // Stop the movement 
        }
      },
      enemies: {
        goomba: {
          src: "/images/platformer/sprites/goomba.png",
          width: 448,
          height: 452,
          scaleSize: 60,
        }
      }
    };

    // add File to assets, ensure valid site.baseurl
    Object.keys(assets).forEach(category => {
      Object.keys(assets[category]).forEach(assetName => {
        assets[category][assetName]['file'] = "{{site.baseurl}}" + assets[category][assetName].src;
      });
    });

    /*  ==========================================
     *  ===== Game Level Call Backs ==============
     *  ==========================================
    */

    // Level completion tester
    function playerOffScreenCallBack() {
        // console.log(GameEnv.player?.x)
        if (GameEnv.player?.x > GameEnv.innerWidth) {
            GameEnv.player = null; // reset for next level
            return true;
        } else {
            return false;
        }
    }

    // Helper function for button click
    function waitForButton(buttonName) {
      // resolve the button click
      return new Promise((resolve) => {
          const waitButton = document.getElementById(buttonName);
          const waitButtonListener = () => {
              resolve(true);
          };
          waitButton.addEventListener('click', waitButtonListener);
      });
    }

    // Start button callback
    async function startGameCallback() {
      const id = document.getElementById("gameBegin");
      id.hidden = false;
      
      // Use waitForRestart to wait for the restart button click
      await waitForButton('startGame');
      id.hidden = true;
      
      return true;
    }

    // Home screen exits on the Game Begin button
    function homeScreenCallback() {
      // gameBegin hidden means the game has started
      const id = document.getElementById("gameBegin");
      return id.hidden;
    }

    // Game Over callback
    async function gameOverCallBack() {
      const id = document.getElementById("gameOver");
      id.hidden = false;
      
      // Use waitForRestart to wait for the restart button click
      await waitForButton('restartGame');
      id.hidden = true;
      
      // Change currentLevel to start/restart value of null
      GameEnv.currentLevel = null;

      return true;
    }

    /*  ==========================================
     *  ========== Game Level setup ==============
     *  ==========================================
     * Start/Homme sequence
     * a.) the start level awaits for button selection
     * b.) the start level automatically cycles to the home level
     * c.) the home advances to 1st game level when button selection is made
    */
    // Start/Home screens
    
    new GameLevel( {tag: "start", callback: startGameCallback } );
    var homeGameObjects = [
      { name:'background', class: Background, id: 'background', speedRatio: 0, data: assets.backgrounds.start}
    ];
    new GameLevel( {tag: "home",  callback: homeScreenCallback, objects: homeGameObjects } );
    
    // Hills Game screens
    var hillsGameObjects = [
      // GameObject order is important
      { name: 'backgroundMountains', class: BackgroundMountains, id: 'background', speedRatio: 0, data: assets.backgrounds.mountains },
      { name: 'backgroundHills', class: BackgroundHills, id: 'background', speedRatio: 0, data: assets.backgrounds.hills },
      { name: 'platform', class: Platform, id: 'platform', speedRatio: 0, data: assets.platforms.grass },
      { name: 'jumpPlatform', class: JumpPlatform, id: 'jumpPlatform', speedRatio: 0, data: assets.platforms.bricks },
      { name: 'goomba', class: Goomba, id: 'goomba', speedRatio: 0.7, data: assets.enemies.goomba },
      { name: 'player', class: Player, id: 'player', speedRatio: 0.7, data: assets.players.mario },
      { name: 'tube', class: Tube, id: 'tube', speedRatio: 0, data: assets.obstacles.tube },
    ];
    //new GameLevel( {tag: "hills", callback: playerOffScreenCallBack, objects: hillsGameObjects } );

    // Lopez Game screens
    var lopezGameObjects = [
      // GameObject order is important
      { name: 'avenida', class: Background, id: 'background', speedRatio: 0, data: assets.backgrounds.avenida },
      { name: 'platform', class: Platform, id: 'platform', speedRatio: 0, data: assets.platforms.grass },
      { name: 'goomba', class: Goomba, id: 'goomba', speedRatio: 0.7, data: assets.enemies.goomba },
      { name: 'lopez', class: Player, id: 'player', speedRatio: 0.7, data: assets.players.lopez },
    ];
    new GameLevel( {tag: "lopez", callback: playerOffScreenCallBack, objects: lopezGameObjects } );


    // Game Over screen
    var endGameObjects = [
      { name:'background', class: Background, id: 'background', speedRatio: 0, data: assets.backgrounds.end}
    ];
    new GameLevel( {tag: "end",  callback: gameOverCallBack, objects: endGameObjects } );


    /*  ==========================================
     *  ========== Game Control ==================
     *  ==========================================
    */

    // create listeners
    toggleCanvasEffect.addEventListener('click', GameEnv.toggleInvert);
    window.addEventListener('resize', GameEnv.resize);

    // start game
    GameControl.gameLoop();

</script>
