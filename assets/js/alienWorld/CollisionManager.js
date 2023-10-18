export class CollisionManager{
    constructor(gameObjectList = []){
        this.gameObjectList = gameObjectList;
    }

    addCollisionBox(gameObject){
        this.gameObjectList.push(gameObject);
    }

    checkForCollisions(){
        for (let gameObject1 of this.gameObjectList){
            let gameObject1Index = this.gameObjectList.indexOf(gameObject1);
            let subGameObjectList = this.gameObjectList.slice(gameObject1Index + 1);
            for (let gameObject2 of subGameObjectList){
                if (gameObject1.isCollision(gameObject2)){
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

                    const collision1Event = new CustomEvent('collision_' + gameObject1.constructor.name, {
                        detail: {eventData: {collisionSides: collision1Sides}}});
                    const collision2Event = new CustomEvent('collision_' + gameObject2.constructor.name, {
                        detail: {eventData: {collisionSides: collision2Sides}}});

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