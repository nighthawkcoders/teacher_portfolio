---
layout: base
title: Mario Player with Hills Background
description: Early step in adding Mario into OOP Game
type: ccc
courses: { csse: {week: 14} }
image: /images/mario/hills.png
images:
  background:
    src: /images/mario/hills.png
  backgroundAlt:
    src: /images/mario/background.png
  mario:
    src: /images/mario_animation.png
---
<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}
{% assign backgroundFileAlt = site.baseurl | append: page.images.backgroundAlt.src %}
{% assign playerFile = site.baseurl | append: page.images.mario.src %}

<style>
    #controls {
        position: relative;
        z-index: 2; /*Ensure the controls are on top*/
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the dog canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect">Invert</button>
    </div>
</div>

<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/mario/GameEnv.js';
    import GameObject from '{{site.baseurl}}/assets/js/mario/GameObject.js';
    import Background from '{{site.baseurl}}/assets/js/mario/Background.js';
    import { initPlayer } from '{{site.baseurl}}/assets/js/mario/Player.js';
    import GameInitializer from '{{site.baseurl}}/assets/js/mario/GameInitializer.js';
    import GameLevel from '{{site.baseurl}}/assets/js/mario/GameLevel.js';

    function levelOneCompletion() {
        console.log(GameEnv.player?.x)
        if (GameEnv.player?.x > 500) {
            return true;
        } else {
            return false;
        }
    }

    var levelTwo = new GameLevel('{{playerFile}}', '{{backgroundFileAlt}}');
    var levelOne = new GameLevel('{{playerFile}}', '{{backgroundFile}}', levelTwo, levelOneCompletion);

    // create the game
    await GameInitializer.initGame(
        levelOne
    );
</script>
