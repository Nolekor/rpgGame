import {
  getDiceRollArray,
  getDicePlaceholderHtml,
  getPercentage,
} from "./utils.js";

export function Character(data) {
  Object.assign(this, data);

  this.maxHealth = this.health;

  this.diceArrayHtml = getDicePlaceholderHtml(this.diceCount);

  this.setDiceHtml = function () {
    this.currentDiceScore = getDiceRollArray(this.diceCount);
    this.diceArrayHtml = this.currentDiceScore
      .map((roll) => `<div class="dice">${roll}</div>`)
      .join("");
  };

  this.getHealthBarHtml = () => {
    const percent = getPercentage(this.health, this.maxHealth);
    return `<div class="health-bar-outer">
    <div class="health-bar-inner ${percent > 26 ? "" : "danger"} " 
        style="width: ${percent}%;">
    </div>
</div>`;
  };

  this.takeDamage = function (attackScoreArray) {
    const totalAttackScore = attackScoreArray.reduce(
      (total, num) => total + num
    );
    this.health -= totalAttackScore;
    if (this.health <= 0) {
      this.health = 0;
      this.dead = true;
    }
  };

  this.getCharacterHtml = function () {
    const { elementId, name, avatar, health, diceCount, diceArrayHtml } = this;
    const healthBar = this.getHealthBarHtml();
    return `<div class="character-card">
          <h4 class="name">${name}</h4>
          <img class="avatar" src="${avatar}"/>
          <p class="health">health: <b>${health}</b></p>
          ${healthBar}
          <div class="dice-container">${diceArrayHtml}</div>
       </div>  `;
  };
}
