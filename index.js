import { characterData } from "./data.js";
import { Character } from "./character.js";

let monstersArray = ["orc", "demon", "goblin"];

function getNewMonster() {
  const nextMonsterData = characterData[monstersArray.shift()];
  return nextMonsterData ? new Character(nextMonsterData) : {};
}

function attack() {
  wizard.getDiceHtml();
  monster.getDiceHtml();
  wizard.takeDamage(monster.currentDiceScore);
  monster.takeDamage(wizard.currentDiceScore);
  render();
  if (wizard.dead) {
    setTimeout(() => gameOver(), 1500);
  } else if (monster.dead) {
    if (monstersArray.length > 0) {
      monster = getNewMonster();
      setTimeout(() => render(), 1500);
    } else {
      setTimeout(() => gameOver(), 1500);
    }
  }
}

function gameOver() {
  const endMessage =
    wizard.dead && monster.dead
      ? "all creature dead no victory"
      : monster.dead
      ? "The Wizard Wins"
      : "The monster is Victorious";
  const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
  document.body.innerHTML = `<div class="end-game">
  <h2>Game Over</h2>
  <h3>${endMessage}</h3>
  <p class="end-emoji">${endEmoji}</p>
</div>`;
}

function render() {
  document.getElementById("hero").innerHTML = wizard.getCharacterHtml();
  document.getElementById("monster").innerHTML = monster.getCharacterHtml();
}
document.getElementById("attack-button").addEventListener("click", attack);

const wizard = new Character(characterData.hero);
let monster = getNewMonster();

render();
