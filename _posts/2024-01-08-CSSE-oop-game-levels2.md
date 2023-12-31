---
layout: base
title: Dynamic Game Levels v2.0 
description: Increasing functionality of game objects and levels through student lessons.  This includes adding goombas, platforms, parallax backgrounds, etc.
type: ccc
courses: { csse: {week: 18} }
image: /images/platformer/backgrounds/hills.png
---

<style>
  #gameBegin, #controls, #gameOver, #settings {
      position: relative;
      z-index: 2; /*Ensure the controls are on top*/
  }

  .sidebar {
      position: fixed;
      height: 100%; /* 100% Full-height */
      width: 0px; /* 0 width - change this with JavaScript */
      z-index: 3; /* Stay on top */
      top: 0; /* Stay at the top */
      left: 0;
      overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 60px; /* Place content 60px from the top */
      transition: 0.5s; /* 0.5-second transition effect to slide in the sidebar */
      background-color: black; 
  }
</style>

<!-- Prepare DOM elements -->
<div id="sidebar" class="sidebar">
  <a href="javascript:void(0)" id="toggleSettingsBar1" class="closebtn">&times;</a>
</div>

<!-- Wrap both the canvas and controls in a container div -->
<div id="canvasContainer">
  <div id="gameBegin" hidden>
      <button id="startGame">Start Game</button>
  </div>
  <div id="controls"> <!-- Controls -->
      <!-- Background controls -->
      <button id="toggleCanvasEffect">Invert</button>
  </div>
  <div id="settings"> <!-- Controls -->
      <!-- Background controls -->
      <button id="toggleSettingsBar">Settings</button>
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
    import Controller from '{{site.baseurl}}/assets/js/platformer2/Controller.js';

    import Background from '{{site.baseurl}}/assets/js/platformer2/Background.js'
    import BackgroundHills from '{{site.baseurl}}/assets/js/platformer2/BackgroundHills.js';
    import BackgroundMountains from '{{site.baseurl}}/assets/js/platformer2/BackgroundMountains.js';
    import Platform from '{{site.baseurl}}/assets/js/platformer2/Platform.js';
    import JumpPlatform from '{{site.baseurl}}/assets/js/platformer2/JumpPlatform.js';
    import Player from '{{site.baseurl}}/assets/js/platformer2/Player.js';
    import Tube from '{{site.baseurl}}/assets/js/platformer2/Tube.js';
    import Goomba from '{{site.baseurl}}/assets/js/platformer2/Goomba.js';

    /*  ==========================================
     *  ===== Game Level Call Backs ==============
     *  ==========================================
    */

    // Level completion callback, based on Player off screen
    function playerOffScreenCallBack() {
        // console.log(GameEnv.player?.x)
        if (GameEnv.player?.x > GameEnv.innerWidth) {
            GameEnv.player = null; // reset for next level
            return true;
        } else {
            return false;
        }
    }

    // Helper function that waits for a button click event
    function waitForButton(buttonName) {
      // Returns a promise that resolves when the button is clicked
      return new Promise((resolve) => {
          const waitButton = document.getElementById(buttonName);
          // Listener function to resolve the promise when the button is clicked
          const waitButtonListener = () => {
              resolve(true);
          };
          // Add the listener to the button's click event
          waitButton.addEventListener('click', waitButtonListener);
      });
    }

    // Start button callback
    async function startGameCallback() {
      const id = document.getElementById("gameBegin");
      // Unhide the gameBegin button
      id.hidden = false;
      
      // Wait for the startGame button to be clicked
      await waitForButton('startGame');
      // Hide the gameBegin button after it is clicked
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
      
      // Wait for the restart button to be clicked
      await waitForButton('restartGame');
      id.hidden = true;
      
      // Change currentLevel to start/restart value of null
      GameEnv.currentLevel = null;

      return true;
    }

    /*  ==========================================
     *  ======= Data Definitions =================
     *  ==========================================
    */

    // Define assets and properties for the Game Objects in JSON text
    const assets = {
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
    };

    // Defile File location in assets, ensure valid site.baseurl
    Object.keys(assets).forEach(category => {
      Object.keys(assets[category]).forEach(assetName => {
        assets[category][assetName]['file'] = "{{site.baseurl}}" + assets[category][assetName].src;
      });
    });

    /*  ==========================================
     *  ========== Game Level setup ==============
     *  ==========================================
     * Game Level sequence as defined in code below
     * a.) tag: "start" level defines button selection and cycles to the home screen
     * b.) tag: "home" defines background and awaits "start" button selection and cycles to 1st game level
     * c.) tag: "hills" and other levels before the tag: "end" define key gameplay levels
     * d.) tag: "end"  concludes levels with game-over-screen background and replay selections
     * 
     * Definitions of new Object creations and JSON text
     * 1.) "new GameLevel" adds game objects to the game environment.
     * * JSON key/value "tag" is for readability
     * * JSON "callback" contains function references defined above that terminate a GameLevel
     * * JSON "objects" contain zero to many "GameObject"(s)
     * 2.) "GameObject"(s) are defined using JSON text and include name, id, class, and data.  
     * * JSON key/value "name" is for readability
     * * JSON "id" is a GameObject classification and may have program significance
     * * JSON "class" is the JavaScript class that defines the GameObject
     * * JSON "data" contains assets and properties for the GameObject
    */

    // Start/Home screens
    new GameLevel( {tag: "start", callback: startGameCallback } );
    const homeGameObjects = [
      { name:'background', id: 'background', class: Background, data: assets.backgrounds.start }
    ];
    new GameLevel( {tag: "home",  callback: homeScreenCallback, objects: homeGameObjects, passive: true } );
    
    // 1st Game Play is Hills Game screen
    const hillsGameObjects = [
      // GameObject order is important
      { name: 'mountains', id: 'background', class: BackgroundMountains,  data: assets.backgrounds.mountains },
      { name: 'hills', id: 'background', class: BackgroundHills, data: assets.backgrounds.hills },
      { name: 'grass', id: 'platform', class: Platform, data: assets.platforms.grass },
      { name: 'bricks', id: 'jumpPlatform', class: JumpPlatform, data: assets.platforms.bricks },
      { name: 'goomba', id: 'goomba', class: Goomba, data: assets.enemies.goomba },
      { name: 'mario', id: 'player', class: Player, data: assets.players.mario },
      { name: 'tube', id: 'tube', class: Tube, data: assets.obstacles.tube },
    ];
    new GameLevel( {tag: "hills", callback: playerOffScreenCallBack, objects: hillsGameObjects } );

    // 2nd Game Play is Avenida Game screen
    const avenidaGameObjects = [
      // GameObject order is important
      { name: 'avenida', id: 'background', class: Background, data: assets.backgrounds.avenida },
      { name: 'grass', id: 'platform', class: Platform, data: assets.platforms.grass },
      { name: 'goomba', id: 'goomba', class: Goomba, data: assets.enemies.goomba },
      { name: 'lopez', id: 'player', class: Player, data: assets.players.lopez },
    ];
    new GameLevel( {tag: "avenida", callback: playerOffScreenCallBack, objects: avenidaGameObjects } );

    // Game Over screen
    const endGameObjects = [
      { name:'background', class: Background, id: 'background', data: assets.backgrounds.end}
    ];
    new GameLevel( {tag: "end",  callback: gameOverCallBack, objects: endGameObjects } );


    /*  ==========================================
     *  ========== Game Control ==================
     *  ==========================================
     * Game Control manages the Game Environment
     * 1.) There are one-to-many GameLevels under control
     * 2.) GameControl cycles through GameLevels when the "callback" condition is true
     * 3.) Each GameLevel is on a looping timer, called the "gameLoop"
     * 4.) The "gameLoop" allows the game player (user) to interact with game objects 
    */

    //Start game loop and activate game objects
    GameControl.gameLoop();

    /*  ==========================================
     *  ========== Settings Control ==============
     *  ==========================================
    */
    // Initiliaze Game settings controller 
    var settingsControl = new Controller();
    settingsControl.initialize();

    // Get/Construct an HTML table/menu from GameEnv.levels[]
    var table = settingsControl.levelTable;
    // Add table/menu to sidebar menu
    document.getElementById("sidebar").append(table);

    // Listener/toggle for sidebar open and close
    var toggle = false;
    function toggleWidth(){
      toggle = !toggle;
      document.getElementById("sidebar").style.width = toggle?"250px":"0px";
    }
    document.getElementById("toggleSettingsBar").addEventListener("click",toggleWidth);
    document.getElementById("toggleSettingsBar1").addEventListener("click",toggleWidth);

    /*  ==========================================
     *  ========== Event / Listeners =============
     *  ==========================================
    */    
    toggleCanvasEffect.addEventListener('click', GameEnv.toggleInvert);
    window.addEventListener('resize', GameEnv.resize);

</script>
