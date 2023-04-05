// variables element id, name, avatar, health and dice score
const heroClass = {
  id: "hero",
  name: "Wizard",
  avatar: "/images/wizard.png",
  health: 60,
  diceRoll: [3, 1, 4],
  diceCount: 3,
};
const monsterClass = {
  id: "monster",
  name: "Orc",
  avatar: "images/orc.png",
  health: 10,
  diceRoll: [2],
  diceCount: 1,
};

// Render Page
function renderCharacter(data) {
  const { id, name, avatar, health, diceRoll, diceCount } = data;
  let diceHtml = diceRoll
    .map((roll) => `<div class="dice">${roll}</div>`)
    .join("");
  document.getElementById(id).innerHTML = `<div class="character-card">
         <h4 class="name">${name}</h4>
         <img class="avatar" src="${avatar}"/>
         <p class="health">health: <b>${health}</b></p>
         <div class="dice-container">${diceHtml}</div>
      </div>  `;
}
renderCharacter(heroClass);
renderCharacter(monsterClass);
