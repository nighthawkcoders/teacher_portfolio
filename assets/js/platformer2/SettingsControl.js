import LocalStorage from "./LocalStorage.js";
import GameEnv from "./GameEnv.js";
import GameControl from "./GameControl.js";

export class SettingsControl extends LocalStorage{
    constructor(){ //default keys for localStorage
        var keys = {
            currentLevel:"currentLevel",
            gameSpeed:"gameSpeed",
            gravity:"gravity",
            isInverted:"isInverted",
        }; 
        super(keys); //creates this.keys
        
    }

    //separated from constructor so that class can be created before levels are added
    initialize(){ 
        this.loadAll(); // load data
        
        if(this[this.keys.currentLevel]){ //update to active level
            GameControl.transitionToLevel(GameEnv.levels[Number(this[this.keys.currentLevel])]);
        }
        else{ //if not currentLevel then set this.currentLevel to 0 (default)
            this[this.keys.currentLevel] = 0;
        }

        if(this[this.keys.isInverted]){ //update to custom isInverted   
            GameEnv.isInverted = this[this.keys.isInverted] === "true";
        }
        else{ //if not isInverted then set this.isInverted to GameEnv.isInverted (default)
            this[this.keys.isInverted] = GameEnv.isInverted;
        }

        if(this[this.keys.gameSpeed]){ //update to custom gameSpeed
           GameEnv.gameSpeed = Number(this[this.keys.gameSpeed]);
        }
        else{ //if not gameSpeedthen set this.gameSpeed to GameEnv.gameSpeed (default)
            this[this.keys.gameSpeed] = GameEnv.gameSpeed;
        }

        if(this[this.keys.gravity]){ //update to custom gravity
            GameEnv.gravity = Number(this[this.keys.gravity]);
        }
        else{ //if not gravity then set this.gravity to GameEnv.gravity (default)
            this[this.keys.gravity] = GameEnv.gravity;
        }
        
        window.addEventListener("resize",()=>{ //updates this.currentLevel when the level changes
            this[this.keys.currentLevel] = GameEnv.levels.indexOf(GameEnv.currentLevel);
            this.save(this.keys.currentLevel); //save to local storage
        });

        window.addEventListener("isInverted", (e)=>{ //updates this.isInverted when an invert event is fired
            this[this.keys.isInverted] = e.detail.isInverted();
            GameEnv.isInverted = this[this.keys.isInverted]; //reload or change levels to see effect
            this.save(this.keys.isInverted); //save to local storage
        });

        window.addEventListener("gameSpeed",(e)=>{ //updates this.gameSpeed when a speed event is fired
            this[this.keys.gameSpeed] = e.detail.gameSpeed();
            GameEnv.gameSpeed = this[this.keys.gameSpeed]; //reload or change levels to see effect
            this.save(this.keys.gameSpeed); //save to local storage
d        });
 
    }

    get levelTable(){
        var t = document.createElement("table");
        //create table header
        var header = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.innerText = "#";
        header.append(th1);
        var th2 = document.createElement("th");
        th2.innerText = "Level Tag";
        header.append(th2);
        t.append(header);

        //create table rows/data
        for(let i = 0, count = 1;i < GameEnv.levels.length;i++){
            if (GameEnv.levels[i].passive) //skip passive levels
                continue; 
            // add level to table
            var row = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerText = String(count++); //human counter
            row.append(td1);
            var td2 = document.createElement("td");
            td2.innerText = GameEnv.levels[i].tag;
            td2.addEventListener("click",()=>{ // when player clicks on level name
                GameControl.transitionToLevel(GameEnv.levels[i]); //transition to that level
            })
            row.append(td2);
            t.append(row);
        }

        return t; //returns <table> element
    }

    get isInvertedInput() {
        const div = document.createElement("div");
        div.innerHTML = "Invert: "; // label
    
        const isInverted = document.createElement("input");  // get user defined invert boolean
        isInverted.type = "checkbox";
        isInverted.checked = GameEnv.isInverted; // GameEnv contains latest isInverted state
    
        isInverted.addEventListener("change", () => { 
            //`dispatch event to update isInverted
            window.dispatchEvent(new CustomEvent("isInverted", { detail: {isInverted:()=>isInverted.checked} }));
        });
    
        div.append(isInverted); // wrap input element in div
        return div;
    }

    get gameSpeedInput() {
        const div = document.createElement("div");
        div.innerHTML = "Game Speed: "; // label
    
        const gameSpeed = document.createElement("input");  // get user defined game speed
        gameSpeed.type = "number";
        gameSpeed.min = 1.0;
        gameSpeed.max = 8.0;
        gameSpeed.step = 0.1;
        gameSpeed.default = 2.0; // customed property for default value
        gameSpeed.value = GameEnv.gameSpeed; // GameEnv contains latest game speed
        gameSpeed.className = "input gameSpeed";    // custom style in teacher-styles.scss
    
        gameSpeed.addEventListener("change", () => { 
            // check values are within range
            const value = parseFloat(gameSpeed.value).toFixed(1);
            gameSpeed.value = (value < gameSpeed.min || value > gameSpeed.max || isNaN(value)) ? gameSpeed.default : value;
            // dispatch event to update game speed
            window.dispatchEvent(new CustomEvent("gameSpeed", { detail: {gameSpeed:()=>gameSpeed.value} }));
        });
    
        div.append(gameSpeed); // wrap input element in div
        return div;
    }

    
}

export default SettingsControl;