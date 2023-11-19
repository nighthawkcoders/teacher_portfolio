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
    import GameManager from '{{site.baseurl}}/assets/js/mario/GameManager.js';

    // Setup GameEnv
    GameEnv.gameSpeed = 2;
    GameEnv.gravity = 3;

    // Level completion tester
    function testerCompletion() {
        console.log(GameEnv.player?.x)
        if (GameEnv.player?.x > 500) {
            return true;
        } else {
            return false;
        }
    }

    // Start button callback
    var isStarted = false;
    async function startGameCallback() {
      const gameOver = document.getElementById("gameBegin");
      isStarted = false;

      // Show the game over restart button
      gameOver.hidden = false;

      // Helper function to wait for the restart button click
      function waitForButton() {
        return new Promise((resolve) => {
            // Listen for the restart button click
            const waitButton = document.getElementById('startGame');
            const waitButtonListener = () => {
                // Restart the game when the button is clicked
                resolve(true);
            };

            // Attach the restart button listener
            waitButton.addEventListener('click', waitButtonListener);
        });
      }
      
      // Use waitForRestart to wait for the restart button click
      await waitForButton();
      gameOver.hidden = true;
      isStarted = true;
      
      return true;
    }

    // Start button verification call back
    function startSequenceCallback() {
      return isStarted;
    }

    // Game Over callback
    async function gameOverCallBack() {
      const gameOver = document.getElementById("gameOver");

      // Show the game over restart button
      gameOver.hidden = false;

      // Helper function to wait for the restart button click
      function waitForRestart() {
        return new Promise((resolve) => {
            // Listen for the restart button click
            const restartButton = document.getElementById('restartGame');
            const restartButtonListener = () => {
                // Restart the game when the button is clicked
                resolve(true);
            };

            // Attach the restart button listener
            restartButton.addEventListener('click', restartButtonListener);
        });
      }
      
      // Use waitForRestart to wait for the restart button click
      await waitForRestart();
      gameOver.hidden = true;
      
      // Change currentLevel to start/restart value of null
      GameEnv.currentLevel = null;

      return true;
    }


    // Store Game levels
    const levels = [];

    // Add a GameLevel to the array levels
    function createLevel(backgroundFile, platformFile, playerFile, isComplete) {
        const newLevel = new GameLevel();
        newLevel.setBackgroundFile(backgroundFile);
        newLevel.setPlatformFile(platformFile);
        newLevel.setPlayerFile(playerFile);
        newLevel.setIsComplete(isComplete);
        levels.push(newLevel);
    }

    // Start sequence, the 1st level authomacally cycles to second level
    createLevel('', '', '', startGameCallback);
    createLevel('{{homeFile}}', '', '', startSequenceCallback);

    // Game Screens
    // Mario Hills
    createLevel('{{backgroundFile}}', '{{platformFile}}', '{{playerFile}}', testerCompletion);
    // Alien World
    createLevel('{{backgroundFileAlt}}', '{{platformFile}}', '{{playerFile}}', testerCompletion);

    // Test Game Screens, used during development and test
    // No Platform tester
    // createLevel('{{backgroundFileCastles}}', '', '{{playerFile}}', testerCompletion);
    // No Background tester
    // createLevel('', '{{platformFile}}', '{{playerFile}}', testerCompletion);

    // Game Over
    createLevel('{{backgroundFileGameOver}}', '', '', gameOverCallBack);

    // Assign the levels to GameEnv
    GameEnv.levels = levels;

    // create listeners
    toggleCanvasEffect.addEventListener('click', GameEnv.toggleInvert);
    window.addEventListener('resize', GameEnv.resize);

    // start game
    GameManager.gameLoop();

</script>
