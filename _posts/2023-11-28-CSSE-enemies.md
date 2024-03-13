---
toc: true
comments: false
layout: post
title: Enemies
description: Provide a lesson on enemies.
type: ccc
courses: { csse: {week: 15} }
---

### Spawning and Synchronization
Make a lesson and code around Enemies and Obstacles.  Explain or try ideas so they can be adapted to the Teacher's project. 

NPC Characters should extend Character, see Goomba.js.  Introduce a new NPC GameObject class for another NPC.  Implement game logic for NPC movement and collision with the player.

Obstacles should extend GameObject, the Tube.js, Coin.js, and Tree.js files.   Review logic to detect when the player interacts with the obstacle.  The obstacles can be used to gain points or trigger a Callback that ends the level.

Collision Detection:
- Implement collision detection between the player, enemies or obstacles.
Assign points based on successful interactions, considering the type of interaction (e.g., jumping on a Goomba versus colliding with a Gomba).

## Google searches
Think about behaviors to add, then think about what to do to change code.

Perhaps looking at glitches can provide some ideas for behaviors. [Super Mario Glitches](https://www.mariowiki.com/List_of_Super_Mario_Bros._glitches
)

To date we have not come up with [Spawning and Synchronization](https://www.reddit.com/r/MarioMaker/comments/3lcrqb/super_mario_maker_science_spawning_despawning_and/?rdt=43064)