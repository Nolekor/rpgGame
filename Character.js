import { getDiceRollArray } from "./utils.js";
export function Character(data) {
  Object.assign(this, data);
  this.getDiceHtml = function (rolls) {
    return getDiceRollArray(rolls)
      .map((roll) => `<div class="dice">${roll}</div>`)
      .join("");
  };
  this.getCharacterHtml = function () {
    const { elementId, name, avatar, health, diceCount } = this;
    let diceHtml = this.getDiceHtml(diceCount);
    return `<div class="character-card">
          <h4 class="name">${name}</h4>
          <img class="avatar" src="${avatar}"/>
          <p class="health">health: <b>${health}</b></p>
          <div class="dice-container">${diceHtml}</div>
       </div>  `;
  };
}
