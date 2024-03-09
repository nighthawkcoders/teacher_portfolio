import Multiplayer from './Multiplayer.js'
import createSound from './Sound.js';
/**
 * Prevents players from typing no-no words in the chat.
 * If these words are detected, a pre-written message 
 * will be displayed instead
 */
class Chat {
    constructor(wordsToAdd){
        this.prohibitedWords = ['westview', 'pee', 'poo', 
        'multiplayer', 'multi', 'leaderboard', 'enemies', 
        'gamelevels', 'interactions', 'sass', 'sassy', 'sas', 
        '911', 'die', 'luigi', 'peach', 'bowser', 'mario', 
        'mr.mortensen', 'mr. mortensen', 'mortensen', 'lopez', 
        'mr.lopez', 'mr. lopez','mister mortensen', 'mister lopez', 
        'aws', 'amazonwebservices', 'amazon', 'amazonweb'];

        this.prohibitedWords.concat(wordsToAdd);
    }

    soundSource = "/game_levels_mp/assets/audio/discord-ping.mp3";
    soundArray = [];

    sendMessage(message){
        message = this.parseMessage(message);  
        Multiplayer.sendData("message",message);
    }

    parseMessage(message){
        this.prohibitedWords.forEach(word => {
            const regex = new RegExp('\\b' + word + '\\b', 'gi');
            message = message.replace(regex, 'I Love CSSE! '.repeat(word.length));
        });
        return message;
    }
/**
 * Sets up primary chat interfaces and quality of life features, 
 * like usernames, buttons, or message placeholders
 * 
 */
    get chatBoxContainer(){
        const div = document.createElement("div");
        div.className = ""; //create a class for the chatBox
        div.id = "chatBoxContainer";

        const div2 = document.createElement("div");
        div2.id = "chatBox";

        const input = document.createElement("input");
        input.id = "chatInput";
        input.type = "text";
        input.placeholder = "Type your message...";

        const button = document.createElement("button");
        button.id = "chatButton";
        button.innerText = "Send";

        function addMessage(message,name){
            const div3 = document.createElement("div");
            const para = document.createElement("p");
            para.innerHTML = "<b>"+name+":</b>"+" "+message;
            para.style.color = "black";
            div3.append(para);
            div2.append(div3);
        }

        function onMessage(){
                Multiplayer.removeListener("onMessage")
                Multiplayer.createListener("onMessage",(data)=>{
                    var message = this.parseMessage(data.message);
                    addMessage(message,data.name?data.name:data.id);
                    this.soundArray.forEach((d)=>{
                        if (d[1]==true){ //sound can be played
                            d[0].play();
                            d[1]=false;
                            return;
                        }
                    });
                    var sound = createSound(this.soundSource);
                    var arrayToAdd = [sound,true];
                    this.soundArray.push(arrayToAdd);
                    sound.addEventListener("ended",()=>{
                        arrayToAdd[1]=true;
                    })
                    sound.play();
                })
                var message = input.value;
                message = this.parseMessage(message);
                addMessage(message,"you");
                this.sendMessage(message);
            }
        button.addEventListener("click",onMessage.bind(this));

        function KeyCheck(e){
            //console.log(this)
            if(e.key == "Enter"){
                onMessage.bind(this)()
            }
        }
        window.addEventListener("keypress",KeyCheck.bind(this));

        div.append(div2);
        div.append(input);
        div.append(button);
        return div;
    }
}
export default Chat;