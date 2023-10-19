export class CollisionManager{
    constructor(gameObjectList = []){
        // Make a game object array so we can keep track of all of the game objects that can collide
        this.gameObjectList = gameObjectList;
    }

    addCollisionBox(gameObject){
        this.gameObjectList.push(gameObject);
    }

    checkForCollisions(){
        for (var thisObject of this.gameObjectList){
            var thisObjectIndex = this.gameObjectList.indexOf(thisObject);
            var subGameObjectList = this.gameObjectList.slice(thisObjectIndex + 1);
            for (var otherObject of subGameObjectList){
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