import { characterData } from "./data.js";
import { Character } from "./character.js";

let monstersArray = ["orc", "demon", "goblin"];
let isWaiting = false;

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  if (!isWaiting) {
    wizard.setDiceHtml();
    monster.setDiceHtml();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    render();
    if (wizard.dead) {
      gameOver();
    } else if (monster.dead) {
      isWaiting = true;
      if (monstersArray.length > 0) {
        monster = getNewMonster();
        setTimeout(() => render(), 1500);
        isWaiting = false;
      } else {
        setTimeout(() => gameOver(), 1500);
      }
    }
  }
}

function gameOver() {
  isWaiting = true;
  const endMessage =
    wizard.dead && monster.dead
      ? "all creature dead no victory"
      : monster.dead
      ? "The Wizard Wins"
      : "The monster is Victorious";
  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
  setTimeout(() => {
    document.body.innerHTML = `<div class="end-game">
  <h2>Game Over</h2>
  <h3>${endMessage}</h3>
  <p class="end-emoji">${endEmoji}</p>
</div>`;
  }, 1500);
}

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}
document.getElementById("attack-button").addEventListener("click", attack);

const wizard = new Character(characterData.hero);
let monster = getNewMonster();

render();
