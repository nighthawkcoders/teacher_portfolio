---
toc: true
comments: false
layout: post
title: Animation Transitions
description: Provide a lesson on enemies.
type: ccc
courses: { csse: {week: 15} }
---

## Player Animation Improvements
Make a lesson and code around Animations. There are animations for the Player, Goomba, etc.  But there are typically animations for collisions or entering a portal.  This task is primarily on collision variety. Integrate ideas so they can be adapted to the Teacher project. 

Improve animations associated with movements of the player.  The animations should apply to NPCs or Objects in collisions.   

- Idle Animation, idle(). Add an idle animation that plays when the player is not moving.
  - Include subtle movements to make the character appear more dynamic.
  - Transitioning Movement, moveLeft() and moveRight()

- Gradually transition from walking to running animations based on the duration of key presses.
  - Implement a deceleration effect when the player stops moving.

- Attack Animation attack(). Create an attack animation/scene that plays when the player interacts with enemies.
  - Implement logic to avoid enemy kills through proper timing of attacks.
  - Animations at Death
  - Animations at restart after Death.
  - ...

Google search
Look for ideas, [Platformer transition animation](https://www.google.com/search?q=platformer+transition+animation&oq=platformer+transition+an&gs_lcrp=EgZjaHJvbWUqBwgBECEYoAEyBggAEEUYOTIHCAEQIRigATIHCAIQIRigATIHCAMQIRigATIHCAQQIRirAjIHCAUQIRirAtIBCTExNzkyajBqN6gCALACAA&sourceid=chrome&ie=UTF-8)
