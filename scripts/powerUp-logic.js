import * as gameController from "./gameController";

var powerUp = {
  id: "",
  title: "",
  value: "",
  duration: "",
};

export function checkCoinType(coin) {
  console.log(coin);
  switch (coin.coinType) {
    case 1:
      playCoinSound("#shield_sound") ; 
      enableShieldMode();
      break;
    case 2:
      playCoinSound("#hearts_sound") ; 
      extraHeartsMode();
      break; 
    default:
      playCoinSound("#coin_sound");
      break; 
  }
}

export function enableShieldMode() {
  var shield = Object.assign({}, powerUp);
  shield.id = 1;
  shield.title = "Shield";
  shield.value = 0;
  shield.duration = 5;
  gameController.powerUpsList.push(shield);
  displayNewPowerup(shield);
  console.log("Shield Mode Enabled");
}

export function extraHeartsMode() {
  var extraHearts = Object.assign({}, powerUp);
  extraHearts.id = 2;
  extraHearts.title = "Extra Hearts";
  extraHearts.value = 3;
  extraHearts.duration = 0;
  gameController.increasePlayerHearts(extraHearts.value);
  console.log("Extra Hearts Mode Enabled");
}

function displayNewPowerup(powerupElement) {
  var prevPowerup = document.querySelector(".powerup-" + powerupElement.id);
  if (prevPowerup) prevPowerup.remove();

  var powerupList = document.querySelector(".powerup-wrapper");
  var newPowerup = document.createElement("div");

  newPowerup.classList.add("powerup-" + powerupElement.id);
  newPowerup.style = "display:flex";

  var value = document.createElement("div");

  newPowerup.innerHTML = powerupElement.title + " : ";
  value.innerHTML = powerupElement.duration;

  newPowerup.append(value);
  powerupList.append(newPowerup);
}

function playCoinSound(id){
  document.getElementById(id).components.sound.stopSound();
  document.getElementById(id).components.sound.playSound();
}
