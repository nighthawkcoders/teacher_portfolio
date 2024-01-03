// SettingsControl.js key purpose is key/value management for game settings.
import LocalStorage from "./LocalStorage.js";
import GameEnv from "./GameEnv.js";
import GameControl from "./GameControl.js";

/* Coding Style Notes
 *
 * SettingsControl is defined as a Class
 * * SettingsControl contains a constructor.
 * * SettingsControl.constructor() is called when SettingsControl is instantiated.
 * * SettingsControl is instantiated in SettingsControl.sidebar().
 * * This coding style allows multiple instances of SettingsControl.
 * * This coding style is a common pattern in JavaScript and is very similar to Java.
 * * Methods are defined as ES6 shorthand
 * 
 * 
 * * Observe, instantiation/scoping/encapulation of this.keys 
 * * * The constructor makes an instance of this.keys by calling super(keys). 
 * * * * Observe the super(keys) call, this calls extended LocalStorage class constructor.
 * * * * Review LocalStorage.js for more details.
 * 
 * * SettingsControl manages keys following Model-View-Control (MVC) design pattern.
 * *  * Model is the LocalStorage class, which enables persistence of settings between sessions.
 * *  * View is the HTML/CSS sidebar, which displays and stores document elements in the DOM.
 * *  * Control is the SettingsControl class, which manages exchange of data between Model and View.
 * 
 * 
 * Usage Notes
 * * call SettingsControl.sidebar() to run the settings sidebar.
 * * * the remainder of SettingsControl supports the sidebar and MVC design for settings keys/values. 
 * 
*/

// define the SettingsControl class
export class SettingsControl extends LocalStorage{
    constructor(){ //default keys for localStorage
        var keys = {
            userID:"userID",
            currentLevel:"currentLevel",
            isInverted:"isInverted",
            gameSpeed:"gameSpeed",
            gravity:"gravity",
        }; 
        super(keys); //creates this.keys
    }

    /**
     * Note. Separated from constructor so that class can be created before levels are addeda
     * 
     * Initializes the SettingsControl instance.
     * Loads all keys from local storage.
     * For each key, 
     * * If it exists in local storage, loads and parses its value.
     * * Else when the key does not exist in local storage, sets key to the corresponding GameEnv.js variable.
     */
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
        // 'userID', the value is parsed as a string
        GameEnv.userID = handleKey('userID', GameEnv.userID);
        // 'currentLevel', the value is parsed as a an index into the GameEnv.levels array
        GameEnv.currentLevel = handleKey('currentLevel', GameEnv.levels[Number(this[this.keys.currentLevel])]);
        // 'isInverted', the value is parsed to a boolean
        GameEnv.isInverted = handleKey('isInverted', GameEnv.isInverted, (val) => val === "true");
        // 'gameSpeed', the value is parsed to a floating point number
        GameEnv.gameSpeed = handleKey('gameSpeed', GameEnv.gameSpeed, parseFloat);
        // 'gravity', the value is parsed to a floating point number
        GameEnv.gravity = handleKey('gravity', GameEnv.gravity, parseFloat);

        // List for th 'userID' update event
        window.addEventListener("userID", (e)=>{
            // Update the userID value when a userID event is fired
            this[this.keys.userID] = e.detail.userID();
            // Update the userID value in the game environment
            GameEnv.userID = this[this.keys.userID];
            // Save the userID value to local storage
            this.save(this.keys.userID);
        });
        
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

    /**
     * Getter for the userID property.
     * Creates a div with a text input for the user to enter a userID.
     * The input's value is bound to the GameEnv's userID string.
     * @returns {HTMLDivElement} The div containing the userID input.
     */
    get userIDInput() {
        const div = document.createElement("div");
        div.innerHTML = "User ID: "; // label

        const userID = document.createElement("input");  // get user defined userID
        userID.type = "text";
        userID.value = GameEnv.userID; // GameEnv contains latest userID
        userID.maxLength = 10; // set maximum length to 10 characters
        userID.className = "input userID";    // custom style in platformer-styles.scss

        userID.addEventListener("change", () => { 
            // dispatch event to update userID
            window.dispatchEvent(new CustomEvent("userID", { detail: {userID:()=>userID.value} }));
        });

        div.append(userID); // wrap input element in div
        return div;
    }

    /**
     * Getter for the levelTable property.
     * Creates a table with a row for each game level.
     * Each row contains the level number and the level tag.
     * Passive levels are skipped and not added to the table.
     * @returns {HTMLTableElement} The table containing the game levels.
     */
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

    /**
     * Getter for the isInvertedInput property.
     * Creates a div with a checkbox input for the user to invert the game controls.
     * The checkbox's checked state is bound to the GameEnv's isInverted state.
     * @returns {HTMLDivElement} The div containing the isInverted checkbox.
     */
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

    /**
     * Getter for the gameSpeedInput property.
     * Creates a div with a number input for the user to adjust the game speed.
     * The input's value is bound to the GameEnv's gameSpeed state.
     * @returns {HTMLDivElement} The div containing the gameSpeed input.
     */
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

    /**
     * Getter for the gravityInput property.
     * Creates a div with a number input for the user to adjust the game gravity.
     * The input's value is bound to the GameEnv's gravity state.
     * @returns {HTMLDivElement} The div containing the gravity input.
     */
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

    /**
     * Static method to initialize the game settings controller and add the settings controls to the sidebar.
     * Constructs an HTML table/menu from GameEnv.levels[] and HTML inputs for invert, game speed, and gravity.
     * Each input has an event update associated with it.
     * All elements are appended to the sidebar.
     */
    static sidebar(){
        // Initiliaze Game settings controller 
        var settingsControl = new SettingsControl();
        settingsControl.initialize();

        // Get/Construct an HTML input for userID
        var userID = settingsControl.userIDInput;
        document.getElementById("sidebar").append(userID);

        // Create a new div element to act as a spacer
        var spacer = document.createElement("div");
        spacer.style.height = "20px"; // Set the height of the spacer
        document.getElementById("sidebar").append(spacer); // Add the spacer to the sidebar

        // Get/Construct an HTML table/menu from GameEnv.levels[]
        var levels = settingsControl.levelTable;
        document.getElementById("sidebar").append(levels);

        // Get/Construct HTML input and event update for invert
        var invertControl = settingsControl.isInvertedInput;
        document.getElementById("sidebar").append(invertControl); 

        // Get/Construct HTML input and event update for game speed 
        var gameSpeed = settingsControl.gameSpeedInput;
        document.getElementById("sidebar").append(gameSpeed);

        // Get/Construct HTML input and event update for gravity
        var gravityInput = settingsControl.gravityInput;
        document.getElementById("sidebar").append(gravityInput);

        // Listener, isOpen, and function for sidebar open and close
        var isOpen = false; // default sidebar is closed
        var submenuHeight = 0; // calculated height of submenu
        function sidebarPanel(){
            // toggle isOpen
            isOpen = !isOpen;
            // open and close properties for sidebar based on isOpen
            var sidebar = document.querySelector('.sidebar');
            sidebar.style.width = isOpen?"200px":"0px";
            sidebar.style.paddingLeft = isOpen?"10px":"0px";
            sidebar.style.paddingRight = isOpen?"10px":"0px";
            sidebar.style.top = `calc(${submenuHeight}px + ${GameEnv.top}px)`;
        }
        // settings-button and event listener opens sidebar
        document.getElementById("settings-button").addEventListener("click",sidebarPanel);
        // sidebar-header and event listener closes sidebar
        document.getElementById("sidebar-header").addEventListener("click",sidebarPanel);

        window.addEventListener('load', function() {
            var submenu = document.querySelector('.submenu');
            submenuHeight = submenu.offsetHeight;
        });
    }
    
}

export default SettingsControl;