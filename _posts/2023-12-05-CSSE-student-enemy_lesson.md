---
comments: true
toc: true
layout: post
title: Mario | Enemies | Student
description: Goomba addition to GameLevels project
type: collab
courses: { csse: {week: 15} }
author: Daniel, Justin, Xavier
---

## Lesson - Enemy
In this lesson, we'll be going over the different characteristics in which all enemies need, and how eventually you will add a fully functional enemy into your own game.

## Instructions
Make sure to be following along, so you'll have the best time understanding the content. As we go over the lesson, keep in mind what you'll exactly need to do for in order to make the player work. Here is a brief list of essential things that the enemy must do.
- Ability to move
- Interaction with Player
- Ability to be killed by player
- Must be in OOP

Once we go over how the enemy works, it will be YOUR job implementing into your own game. Snippets and this guide will be resources you can use to refer back on how to make your enemy.

## Step 1 - Creating the Enemy
The first step in creating the enemy in the game is creating a new file just for it. The file should be in assets/js/platformer and should called either Enemy.js, Goomba.js or something related. Once you have created the file, we shall now start defining the Enemy class.

```
import Character from './Character.js';
import GameEnv from './GameEnv.js';

export class Enemy extends Character {
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio, enemyData){
        super(canvas, 
            image, 
            speedRatio,
            enemyData.width, 
            enemyData.height, 
        );

        // Player Data is required for Animations
        this.enemyData = enemyData;
    }
}

export default Enemy
```

This code is essentially the same as the player code with few differences. The Enemy class is being extended to the Character class, and once extended, we can start defining the different properties in which our enemy will have.

After configuring the enemy in Enemy.js, you will then have to connect Enemy to the main game. There are two files in which you'll have to do this. The main file in which the game is initialized and GameLevels.js in where the enemy is actually created as an instance.

First, we'll be adding the enemy into the main file. You'll notice here that there is a variable that defines all the different assets of the game. Players, Backgrounds, Obstacles, etc. Seeing how everything in the game is defined here, it'd be reasonable to say the enemy will be defined in the assets variable as well.

```
var assets = {
      //previous code above ...

      players: {
        mario: {
          src: "/images/platformer/sprites/mario.png",
          width: 256,
          height: 256,
          w: { row: 10, frames: 15 },
          wa: { row: 11, frames: 15 },
          wd: { row: 10, frames: 15 },
          a: { row: 3, frames: 7, idleFrame: { column: 7, frames: 0 } },
          s: {  },
          d: { row: 2, frames: 7, idleFrame: { column: 7, frames: 0 } }
        },
      },
}
```

Here is a snippet on how one of the players is defined. We can base our enemy after the player. Our player has an image (src), a width, and a height. The rest doesn't apply to our enemy.

```
var assets {
  enemies: {
    goomba: {
      src: "/images/platformer/sprites/goomba.png",
      width: 448,
      height: 452,
    }
  }
}
```

Once we define the goomba in assets, we'll have to add it to the gameLevel (refer to the code).


```
new GameLevel( {tag: "hills", background: assets.backgrounds.hills, platform: assets.platforms.grass, player: assets.players.mario, enemy: assets.enemies.goomba, tube: assets.obstacles.tube, callback: testerCallBack } );
```


## Step 2 - Basic Features
Now that we have the enemy actually defined and created within our game, we can now begin the process of giving our enemy its necessary attributes. The first of these attributes will be movement.

Movement is quite easy to implement. We just need the user of the enemy to continually check its position and based on its position, decide in which direction it needs to go.

The following is how this can be done (this will be added onto the Enemy class):

```
 update() {
        // Check if the enemy is at the left or right boundary
        if (this.x <= 0 || this.x + this.width >= GameEnv.innerWidth) {
            // Change direction by reversing the speed
            this.speed = -this.speed;
        }

        //Initially get the enemy moving
        this.x += this.speed;

    }
```

The code is using an if statement to check whether the player is on the left side of the canvas or all the way on the right side, the direction of the goomba will reverse.


//Talk about how there is code below to initially get the player moving

Now that the Goomba can travel across the canvas, it will hence now eventually cross paths with the player. The next step would be to add collisions between the Goomba and Character, so that the two characters can interact with one another.

The thing about collisions however is Mr. Mortensen has already laid out the foundation for the collision code. We won’t have to code the actual logic for collisions, rather a simpler version of such. Code for collisions will be handled in Player.js rather than in the Enemy file, hence the following is an excerpt from the Player code:

```
// Enemy collision
        if (this.collisionData.touchPoints.other.id === "enemy") {
            // Collision with the left side of the Enemy
            if (this.collisionData.touchPoints.other.left) {
                // Kill Player (Reset Game)
            }
            // Collision with the right side of the Enemy
            if (this.collisionData.touchPoints.other.right) {
                deathController.setDeath(1);
                // Kill Player (Reset Game)
            }
            // Collision with the top of the Enemy
            if (this.collisionData.touchPoints.other.ontop) {
                // Kill Goomba
                // Make Mario Bounce
            }
          }
```

## Step 3 - Homework / Extra Features

- Implement the enemy into your game
- Add what happens in the event of a collision
- Add special events occur at random
- Give your Goomba something unique