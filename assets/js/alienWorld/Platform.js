import GameObject from "./GameObject.js";

// The platform object can be checked directionally by characters to 
// see if the character should collide with it
export class Platform extends GameObject{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    }
}

export default Platform;