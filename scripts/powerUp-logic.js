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
      enableShieldMode();
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
