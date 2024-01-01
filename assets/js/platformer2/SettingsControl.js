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
        // Load all keys from local storage
        this.loadAll();

        /**
         * Handles a key by checking if it exists in local storage and parsing its value.
         * If the key does not exist in local storage, it sets the key to the current value of the game environment variable.
         *
         * @param {string} key - The localstorae key.
         * @param {*} gameEnvVariable - The corresponding game environment variable.
         * @param {function} [parser=(val) => val] - An optional function to parse the value from local storage.
         * If no parser parameter/function is provided, (val) => val is unchanged.
         * Else if parser is provided, the value is parsed ... e.g.: 
         * * (val) => vall === "true" parses the value as a boolean
         * * (val) =>  parseFloat(val) parses the value as a floating point number
         */
        const handleKey = (key, gameEnvVariable, parser = (val) => val) => {
            if (this[this.keys[key]]) {
                return parser(this[this.keys[key]]);
            } else {
                this[this.keys[key]] = gameEnvVariable;
                return gameEnvVariable;
            }
        };

        /* Call the handleKey function to set up each game environment variable
         * The handleKey function takes three parameters:
            * * key - the local storage key
            * * gameEnvVariable - the corresponding game environment variable
            * * parser - an optional function to parse the value extracted from local storage
        */
        // 'currentLevel', the value is parsed as a an index into the GameEnv.levels array
        GameEnv.currentLevel = handleKey('currentLevel', GameEnv.levels[Number(this[this.keys.currentLevel])]);
        // 'isInverted', the value is parsed to a boolean
        GameEnv.isInverted = handleKey('isInverted', GameEnv.isInverted, (val) => val === "true");
        // 'gameSpeed', the value is parsed to a floating point number
        GameEnv.gameSpeed = handleKey('gameSpeed', GameEnv.gameSpeed, parseFloat);
        // 'gravity', the value is parsed to a floating point number
        GameEnv.gravity = handleKey('gravity', GameEnv.gravity, parseFloat);

        
        // Listen for the 'resize' update event
        window.addEventListener("resize",()=>{ 
            // Update the current level index when the level changes
            this[this.keys.currentLevel] = GameEnv.levels.indexOf(GameEnv.currentLevel);
            // Save the current level index to local storage
            this.save(this.keys.currentLevel); 
        });

        // Listen for the 'isInverted' update event
        window.addEventListener("isInverted", (e)=>{ 
            // Update the isInverted value when an invert event is fired
            this[this.keys.isInverted] = e.detail.isInverted();
            // Update the isInverted value in the game environment
            GameEnv.isInverted = this[this.keys.isInverted]; 
            // Save the isInverted value to local storage
            this.save(this.keys.isInverted); 
        });

        // Listen for the 'gameSpeed' update event
        window.addEventListener("gameSpeed",(e)=>{ 
            // Update the gameSpeed value when a speed event is fired
            this[this.keys.gameSpeed] = e.detail.gameSpeed();
            // Update the gameSpeed value in the game environment
            GameEnv.gameSpeed = parseFloat(this[this.keys.gameSpeed]); 
            // Save the gameSpeed value to local storage
            this.save(this.keys.gameSpeed); 
        });

        // Listen for the 'gravity' update event
        window.addEventListener("gravity",(e)=>{ 
            // Update the gravity value when a gravity event is fired
            this[this.keys.gravity] = e.detail.gravity();
            // Update the gravity value in the game environment
            GameEnv.gravity = parseFloat(this[this.keys.gravity]); 
            // Save the gravity value to local storage
            this.save(this.keys.gravity); 
        });
 
    }

    // Getter for the level table
    get levelTable(){
        // create table element
        var t = document.createElement("table");
        t.className = "table levels";
        //create table header
        var header = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.innerText = "#";
        header.append(th1);
        var th2 = document.createElement("th");
        th2.innerText = "Level Tag";
        header.append(th2);
        t.append(header);

        // Create table rows/data
        for(let i = 0, count = 1; i < GameEnv.levels.length; i++){
            if (GameEnv.levels[i].passive) //skip passive levels
                continue; 
            // add level to table
            var row = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerText = String(count++); //human counter
            row.append(td1);
            // place level name in button   
            var td2 = document.createElement("td");
            td2.innerText = GameEnv.levels[i].tag;
            row.append(td2);
            // listen for row click
            row.addEventListener("click",()=>{ // when player clicks on the row
                //transition to selected level
                GameControl.transitionToLevel(GameEnv.levels[i]); // resize event is triggered in transitionToLevel
            })
            // add level row to table
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
        gameSpeed.className = "input gameSpeed";    // custom style in platformer-styles.scss
    
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

    get gravityInput() {
        const div = document.createElement("div");
        div.innerHTML = "Gravity: "; // label
    
        const gravity = document.createElement("input");  // get user defined gravity
        gravity.type = "number";
        gravity.min = 1.0;
        gravity.max = 8.0;
        gravity.step = 0.1;
        gravity.default = 3.0; // customed property for default value
        gravity.value = GameEnv.gravity; // GameEnv contains latest gravity
        gravity.className = "input gravity";    // custom style in platformer-styles.scss
    
        gravity.addEventListener("change", () => { 
            // check values are within range
            const value = parseFloat(gravity.value).toFixed(1);
            gravity.value = (value < gravity.min || value > gravity.max || isNaN(value)) ? gravity.default : value;
            // dispatch event to update gravity
            window.dispatchEvent(new CustomEvent("gravity", { detail: {gravity:()=>gravity.value} }));
        });
    
        div.append(gravity); // wrap input element in div
        return div;
    }

    
}

export default SettingsControl;