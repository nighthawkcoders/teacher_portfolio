---
layout: base
title: Mario on Platform
description: Early steps in adding Mario into OOP Game.  This also includes a level change.
type: ccc
courses: { csse: {week: 14} }
image: /images/mario/hills.png
images:
  background:
    src: /images/mario/hills.png
  platform:
    src: /images/mario/platform.png
  backgroundAlt:
    src: /images/mario/planet.jpg
  mario:
    src: /images/mario/player.png
---
<!-- Liquid code, run by Jekyll, used to define location of asset(s) -->
{% assign backgroundFile = site.baseurl | append: page.images.background.src %}
{% assign platformFile = site.baseurl | append: page.images.platform.src %}
{% assign backgroundFileAlt = site.baseurl | append: page.images.backgroundAlt.src %}
{% assign playerFile = site.baseurl | append: page.images.mario.src %}

<style>
    #controls {
        position: relative;
        z-index: 2; /*Ensure the controls are on top*/
    }
</style>

<!-- Prepare DOM elements -->
<!-- Wrap both the canvas and controls in a container div -->
<div id="canvasContainer">
    <div id="controls"> <!-- Controls -->
        <!-- Background controls -->
        <button id="toggleCanvasEffect">Invert</button>
    </div>
</div>


<script type="module">
    import GameEnv from '{{site.baseurl}}/assets/js/mario/GameEnv.js';
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

    var levelTwo = new GameLevel('{{playerFile}}', '{{backgroundFileAlt}}', '{{platformFile}}');
    var levelOne = new GameLevel('{{playerFile}}', '{{backgroundFile}}', '{{platformFile}}', levelTwo, levelOneCompletion);

    // create listeners
    toggleCanvasEffect.addEventListener('click', GameEnv.toggleInvert);
    window.addEventListener('resize', GameEnv.resize);

    // create game
    await GameInitializer.initGame(
        levelOne
    );

</script>
