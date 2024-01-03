---
layout: base
title: Dynamic Game Levels v2.0 
description: Incorporate student lessons goombas, platforms, parallax backgrounds, settings with local storage, etc.  Refactor code introducing GameSetup and SettingsControl.  Style is moved into _sass.
type: ccc
courses: { csse: {week: 18} }
image: /images/platformer/backgrounds/hills.png
---

<!-- Syle is now located, as of Jan 2024 v2.0, in _sass/minima/platformer-styles.scss -->

<!-- DOM Settings Panel (sidebar id and div), managed by SettingsContro.js -->
<div id="sidebar" class="sidebar">
  <a href="javascript:void(0)" id="sidebar-header">&times; Settings</a>
</div>

<!-- Wrap both the controls and gameplay in a container div -->
<div id="canvasContainer">
  <div class="submenu">
    <div id="score">
        Timer: <span id="timeScore">0</span>
    </div>
    <div id="gameBegin" hidden>
        <button id="startGame">Start Game</button>
    </div>
    <div id="gameOver" hidden>
        <button id="restartGame">Restart</button>
    </div>
    <div id="settings"> <!-- Controls -->
        <!-- Background controls -->
        <button id="settings-button">Settings</button>
    </div>
    <div id="leaderboard"> <!-- Controls -->
      <button id="leaderboard-button">Leaderboard</button>
    </div>
  </div>
  <!-- JavaScript-generated canvas items are inserted here -->
</div>

<script type="module">
    // Imports
    import GameSetup from '{{site.baseurl}}/assets/js/platformer2/GameSetup.js';
    import GameControl from '{{site.baseurl}}/assets/js/platformer2/GameControl.js';
    import SettingsControl from '{{site.baseurl}}/assets/js/platformer2/SettingsControl.js';
    import GameEnv from '{{site.baseurl}}/assets/js/platformer2/GameEnv.js';

    /* ==========================================
     * ========== Game Setup ====================
     * ==========================================
     * Game Setup prepares the Game Levels and Objects
     * 1.) There are one-to-many GameLevels in a Game
     * 2.) Each GameLevel has one-to-many GameObjects
     * ==========================================
    */
    GameSetup.initLevels("{{site.baseurl}}"); 

    /* ==========================================
     * ========== Game Control ==================
     * ==========================================
     * Game Control starts the game loop and activates game objects
     * 1.) GameControl cycles through GameLevels
     * 2.) Each GameLevel is on a looping timer, called within the game loop 
     * 3.) The game loop allows the game player (user), to interact with the game objects 
     * ==========================================
    */
    GameControl.gameLoop();

    /* ==========================================
     * ========== Settings Control ==============
     * ==========================================
     * Settings Control provides the ability to select game level and change game settings
     * 1.) SettingsControl must be after GameControl, it depends on GameLevels 
     * 2.) GameControl extends and implements LocalStorage for settings modifications
     * 3.) Invert moved into Settings; GameSpeed and Gravity can be customized
     * ==========================================
    */
    SettingsControl.sidebar();

    /* ==========================================
     * ========== Leaderboard ===================
     * ========================================== 
     */

    // Leaderboard Team
    let time = 0; // Initialize time variable
    let timerInterval; // Variable to hold the interval reference


    // Function to update and display the timer
    function updateTimer() {
        const id = document.getElementById("gameOver");
        if (id.hidden == false) {
            stopTimer()
            time=-1
        }
      time++; // Increment time (you can adjust this based on your game logic)


      // Display the updated time in the span element with id 'timeScore'
      const timeScoreElement = document.getElementById('timeScore');
      if (timeScoreElement) {
          timeScoreElement.textContent = time; // Update the displayed time
      }
    }


    // Function to start the timer
    function startTimer() {
      // Start the timer interval, updating the timer every second (1000 milliseconds)
      timerInterval = setInterval(updateTimer, 1000);
    }


    // Function to stop the timer
    function stopTimer() {   
        clearInterval(timerInterval); // Clear the interval to stop the timer
    }


    // Event listener for the start game button click
    document.getElementById('startGame').addEventListener('click', () => {
      startTimer(); // Start the timer when the game starts
    });


    // Function to reset the timer
    function resetTimer() {
      stopTimer(); // Stop the timer
      time = 0; // Reset the time variable
      updateTimer(); // Update the displayed time to show 0
    }


    // Game Over callback
    async function gameOverCallBack() {
      const id = document.getElementById("gameOver");
      id.hidden = false;


      // Stop the timer on game over
      stopTimer();


      // Use waitForRestart to wait for the restart button click
      await waitForButton('restartGame');
      id.hidden = true;


      // Change currentLevel to start/restart value of null
      GameEnv.currentLevel = null;


      // Reset the timer when restarting the game
      resetTimer();


      return true;
    }

    // Function to switch to the leaderboard screen
    function showLeaderboard() {
      const id = document.getElementById("gameOver");
      id.hidden = false;
      // Hide game canvas and controls
      document.getElementById('canvasContainer').style.display = 'none';
      document.getElementById('controls').style.display = 'none';

      // Create and display leaderboard section
      const leaderboard = document.createElement('div');
      leaderboard.id = 'leaderboard';
      leaderboard.innerHTML = '<h1 style="text-align: center; font-size: 18px;">Leaderboard </h1>';
      document.querySelector(".page-content").appendChild(leaderboard)
      // document.body.appendChild(leaderboard);

      const playerScores = localStorage.getItem("playerScores")
      const playerScoresArray = playerScores.split(";")
      const scoresObj = {}
      const scoresArr = []
      for(let i = 0; i< playerScoresArray.length-1; i++){
        const temp = playerScoresArray[i].split(",")
        scoresObj[temp[0]] = parseInt(temp[1])
        scoresArr.push(parseInt(temp[1]))
      }

      scoresArr.sort()

      const finalScoresArr = []
      for (let i = 0; i<scoresArr.length; i++) {
        for (const [key, value] of Object.entries(scoresObj)) {
          if (scoresArr[i] ==value) {
            finalScoresArr.push(key + "," + value)
            break;
          }
        }
      }
      let rankScore = 1;
      for (let i =0; i<finalScoresArr.length; i++) {
        const rank = document.createElement('div');
        rank.id = `rankScore${rankScore}`;
        rank.innerHTML = `<h2 style="text-align: center; font-size: 18px;">${finalScoresArr[i]} </h2>`;
        document.querySelector(".page-content").appendChild(rank)    
      }
    }

    // Event listener for leaderboard button to be clicked
    document.getElementById('leaderboard-button').addEventListener('click', showLeaderboard);


    /*  ==========================================
     *  ========== Event / Listeners =============
     *  ==========================================
     * System Event listeners, the other listeners remain near impacting functions
    */    
    window.addEventListener('resize', GameEnv.resize);

</script>
