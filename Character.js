import { getDiceRollArray, getDicePlaceholderHtml } from "./utils.js";

export function Character(data) {
  Object.assign(this, data);

  this.diceArray = getDicePlaceholderHtml(this.diceCount);

  this.getDiceHtml = function () {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArray = this.currentDiceScore
      .map((roll) => `<div class="dice">${roll}</div>`)
      .join("");
  };

  this.takeDamage = function (attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce(function (total, num) {
      return total + num;
    });
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.health = 0;
    }
  };

  this.getCharacterHtml = function () {
    const { elementId, name, avatar, health, diceCount, diceArray } = this;
    let diceHtml = this.getDiceHtml(diceCount);
    return `<div class="character-card">
          <h4 class="name">${name}</h4>
          <img class="avatar" src="${avatar}"/>
          <p class="health">health: <b>${health}</b></p>
          <div class="dice-container">${diceArray}</div>
       </div>  `;
  };
}
