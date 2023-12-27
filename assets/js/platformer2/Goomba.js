import Character from './Character.js';
import GameEnv from './GameEnv.js';

export class Goomba extends Character {
    // constructors sets up Character object 
    constructor(canvas, image, speedRatio, goombaData){
        super(canvas, 
            image, 
            speedRatio,
            goombaData.width, 
            goombaData.height, 
        );

        //Initial Position of Goomba
        this.x = .6 * GameEnv.innerWidth;
        this.x += this.speed;
    }

    update() {
        // Check if the Goomba is at the left or right boundary
        if (this.x <= 0 || this.x + this.width >= GameEnv.innerWidth) {
            // Change direction by reversing the speed
            this.speed = -this.speed;
        }

        //Randomly change when the Goomba changes position
        if (Math.random() < 0.006) {
            this.speed = Math.random() < 0.5 ? -this.speed : this.speed;
        }
        
    }
    
}


export default Goomba