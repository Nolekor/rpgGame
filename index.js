// variables element id, name, avatar, health and dice score
const heroClass = {
  id: "hero",
  name: "Wizard",
  avatar: "/images/wizard.png",
  health: 60,
  diceCount: 3,
};
const monsterClass = {
  id: "monster",
  name: "Orc",
  avatar: "images/orc.png",
  health: 10,
  diceCount: 1,
};

function getDiceRollArray(diceCount) {
  return new Array(diceCount)
    .fill(0)
    .map(() => Math.floor(Math.random() * 6) + 1);
}

function getDiceHtml(rolls) {
  return getDiceRollArray(rolls)
    .map((roll) => `<div class="dice">${roll}</div>`)
    .join("");
}

// Render Page

function renderCharacter(data) {
  const { id, name, avatar, health, diceCount } = data;
  let diceHtml = getDiceHtml(diceCount);
  document.getElementById(id).innerHTML = `<div class="character-card">
          <h4 class="name">${name}</h4>
          <img class="avatar" src="${avatar}"/>
          <p class="health">health: <b>${health}</b></p>
          <div class="dice-container">${diceHtml}</div>
       </div>  `;
}
renderCharacter(heroClass);
renderCharacter(monsterClass);
