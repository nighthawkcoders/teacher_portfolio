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
    import GameSetup from '{{site.baseurl}}/assets/js/platformer2/GameSetup.js';
    import GameControl from '{{site.baseurl}}/assets/js/platformer2/GameControl.js';
    import SettingsControl from '{{site.baseurl}}/assets/js/platformer2/SettingsControl.js';

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
    */    
    window.addEventListener('resize', GameEnv.resize);

</script>
