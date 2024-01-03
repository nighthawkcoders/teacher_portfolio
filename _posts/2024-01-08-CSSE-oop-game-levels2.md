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

    /*  ==========================================
     *  ========== Event / Listeners =============
     *  ==========================================
     * System Event listeners, the other listeners remain near impacting functions
     * 1.) Window resize and GameEnv.resize trigger many system updates
     * 2.) Starting game provides an entry point for timing game levels
    */ 
    window.addEventListener('resize', GameEnv.resize);
    document.getElementById('startGame').addEventListener('click', () => {
        GameControl.startTimer(); // Start the timer when the game starts
    });

</script>
