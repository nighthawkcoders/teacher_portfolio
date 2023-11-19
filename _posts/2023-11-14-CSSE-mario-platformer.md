---
layout: base
title: Mario on Platform
description: Early steps in adding Mario into OOP Game.  This also includes a level change.
type: ccc
courses: { csse: {week: 14} }
image: /images/mario/hills.png
images:
  home:
    src: /images/mario/home.png
  background:
    src: /images/mario/hills.png
  platform:
    src: /images/mario/platform.png
  backgroundAlt:
    src: /images/mario/planet.jpg
  backgroundCastles:
    src: /images/mario/castles.png
  backgroundGameOver:
    src: /images/mario/game_over.png
  mario:
    src: /images/mario/player.png
---
<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign homeFile = site.baseurl | append: page.images.home.src %}
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}
{% assign platformFile = site.baseurl | append: page.images.platform.src %}
{% assign backgroundFileAlt = site.baseurl | append: page.images.backgroundAlt.src %}
{% assign backgroundFileCastles = site.baseurl | append: page.images.backgroundCastles.src %}
{% assign backgroundFileGameOver = site.baseurl | append: page.images.backgroundGameOver.src %}

{% assign playerFile = site.baseurl | append: page.images.mario.src %}

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
    import GameEnv from '{{site.baseurl}}/assets/js/mario/GameEnv.js';
    import GameLevel from '{{site.baseurl}}/assets/js/mario/GameLevel.js';
    import GameControl from '{{site.baseurl}}/assets/js/mario/GameControl.js';

    /*  ==========================================
     *  ===== Game Level Call Backs ==============
     *  ==========================================
    */

    // Level completion tester
    function testerCallBack() {
        // console.log(GameEnv.player?.x)
        if (GameEnv.player?.x > 500) {
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

    // Home screen exits on Game Begin button
    function homeScreenCallback() {
      // gameBegin hidden means game has started
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
    */

    // Store Game levels
    GameEnv.levels = [];

    // Add a GameLevel to the array levels
    function createLevel(backgroundFile, platformFile, playerFile, isComplete) {
        const newLevel = new GameLevel();
        newLevel.setBackgroundFile(backgroundFile);
        newLevel.setPlatformFile(platformFile);
        newLevel.setPlayerFile(playerFile);
        newLevel.setIsComplete(isComplete);
        GameEnv.levels.push(newLevel);
    }

    /* Start sequence (1st wo levels) 
     * a.) the 1st level awaits for key
     * b.) await authomacally cycles to next level, result of managing levels through list order
     * c.) the second level looks at button is press from await
    */
    createLevel('', '', '', startGameCallback);
    createLevel('{{homeFile}}', '', '', homeScreenCallback);

    // Game Screens
    // Mario Hills
    createLevel('{{backgroundFile}}', '{{platformFile}}', '{{playerFile}}', testerCallBack);
    // Alien World
    createLevel('{{backgroundFileAlt}}', '{{platformFile}}', '{{playerFile}}', testerCallBack);

    // Test Game Screens, used during development and test
    // No Platform tester
    // createLevel('{{backgroundFileCastles}}', '', '{{playerFile}}', testerCallBack);
    // No Background tester
    // createLevel('', '{{platformFile}}', '{{playerFile}}', testerCallBack);

    // Game Over
    createLevel('{{backgroundFileGameOver}}', '', '', gameOverCallBack);

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
