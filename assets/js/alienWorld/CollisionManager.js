export class CollisionManager{
    constructor(gameObjectList = []){
        // Make a game object array so we can keep track of all of the game objects that can collide
        this.gameObjectList = gameObjectList;
    }

    addCollisionBox(gameObject){
        this.gameObjectList.push(gameObject);
    }

    checkForCollisions(){
        // Go through every game object stored in our gameObjectList to see if any of them overlap
        for (var thisObject of this.gameObjectList){
            // For our second loop we only want to compare everything after this object to avoid comaparing 
            // objects twice and so we don't compare the object to itself
            var thisObjectIndex = this.gameObjectList.indexOf(thisObject);
            var subGameObjectList = this.gameObjectList.slice(thisObjectIndex + 1);
            for (var otherObject of subGameObjectList){
                // If the two objects are colliding then inform the two objects that they have been in a collision
                var collisionData = thisObject.isCollision(otherObject);
                if (collisionData.hit){
                    document.dispatchEvent(
                        new CustomEvent('collision_' + thisObject.constructor.name, {
                            detail: {eventData: collisionData.this}})
                    );
                    document.dispatchEvent(
                        new CustomEvent('collision_' + otherObject.constructor.name, {
                            detail: {eventData: collisionData.other}})
                    );
                }
            }
        }
    }
}

export function initCollisionManager(gameObjectList){
    return new CollisionManager(gameObjectList);
}

export default CollisionManager;