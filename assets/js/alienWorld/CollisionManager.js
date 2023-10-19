export class CollisionManager{
    constructor(gameObjectList = []){
        // Make a game object array so we can keep track of all of the game objects that can collide
        this.gameObjectList = gameObjectList;
    }

    addCollisionBox(gameObject){
        this.gameObjectList.push(gameObject);
    }

    checkForCollisions(){
        // Check every object position against each other to see if any have collided
        for (let gameObject1 of this.gameObjectList){
            // Get the index of the current game object being checked and only loop through 
            // the objects in the list after that
            // We don't want to compare two objects twice or compare the same object against itself
            let gameObject1Index = this.gameObjectList.indexOf(gameObject1);
            let subGameObjectList = this.gameObjectList.slice(gameObject1Index + 1);
            for (let gameObject2 of subGameObjectList){
                // A collision has occured
                if (gameObject1.isCollision(gameObject2)){
                    // Calculate which sides of our game object boxes are colliding and add them to an array
                    var collision1Sides = [];
                    var collision2Sides = [];
                    if (gameObject1.x < gameObject2.x){
                        collision1Sides.push('right');
                        collision2Sides.push('left');
                    }
                    else if (gameObject1.x > gameObject2.x){
                        collision1Sides.push('left');
                        collision2Sides.push('right');
                    }

                    if (gameObject1.y < gameObject2.y){
                        collision1Sides.push('bottom');
                        collision2Sides.push('top');
                    }
                    else if (gameObject1.y > gameObject2.y){
                        collision1Sides.push('top');
                        collision2Sides.push('bottom');
                    }

                    // Create custom events to send to the colliding objects to let them know that they have collided
                    // Include the side that they have collided on
                    const collision1Event = new CustomEvent('collision_' + gameObject1.constructor.name, {
                        detail: {eventData: {collisionSides: collision1Sides}}});
                    const collision2Event = new CustomEvent('collision_' + gameObject2.constructor.name, {
                        detail: {eventData: {collisionSides: collision2Sides}}});

                    // Send the event to the colliding objects
                    document.dispatchEvent(collision1Event);
                    document.dispatchEvent(collision2Event);
                }
            }
        }
    }
}

export function initCollisionManager(gameObjectList){
    return new CollisionManager(gameObjectList);
}

export default CollisionManager;