//Audio when jumping
function playJump() {
  const PlayerJumpSound = document.getElementById("PlayerJump");
  PlayerJumpSound.play();
}

/*To Add Other Audio Functions:
  function soundFunction() {
    const soundVariable = document.getElementById("soundID");
    soundVariable.play();
  }
*/


//Export Sound
export default playJump