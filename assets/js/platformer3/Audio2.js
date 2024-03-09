//Audio when player Dies
function playPlayerDeath() {
  const playerDeathSound = document.getElementById("PlayerDeath");
  playerDeathSound.play();
}

/*To Add Other Audio Functions:
  function soundFunction() {
    const soundVariable = document.getElementById("soundID");
    soundVariable.play();
  }
*/


//Export Sound
export default playPlayerDeath

