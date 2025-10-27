import Fighter from "./Fighter.js";
import { detectCollision } from "../utils/utils.js";
import { gameState } from "../main.js";
import { c } from "../main.js";
// import { c } from "../utils/canvas.js";
import Collect from "./Collect.js";
import { coinSettings, hearthSettings } from "../utils/entitySettings.js";

class Enemy extends Fighter {
    constructor({
        position,
        scale = 1,
        // sprite = { framesMax: undefined, framesHold: undefined, imageSrc: undefined },
        isFlipped = false,
        velocity = { x: 0, y: 0 },
        hitbox = { w: undefined, h: undefined },
        animations = {},
        imgOffset = { x: 0, y: 0 },
        attackBox = { offset: { x: undefined, y: undefined }, width: undefined, height: undefined },
        health = 100,
        speedOfRunning = 10,
        damage,
        XpDrop,
        type,
        smallElements
    }) {
        super({ position, scale, animations, isFlipped, imgOffset, attackBox, health, velocity, hitbox, speedOfRunning, damage, type, smallElements });
        this.isAttacking = true
        this.isDropped = false
        this.index = gameState.enemiesToUpdate.length
        this.isArrayCreated = true
        this.XpDrop = XpDrop
        this.maxHealth = health
        this.isAlive = true
    }
    update(player, collisionForEnemies) {

        let array
        if (this.isArrayCreated)
            array = this.createCollisionArray(collisionForEnemies)

        super.update(array)
        this.movement(player)

        //We check if arguments are touching
        if (detectCollision({ rect1: this, rect2: player }))
            player.health -= this.damage
        //If an enemy is damaged we show the health bar
        if (this.health < this.maxHealth && this.health > 0)
            this.drawHealthBar()

        if (this.health <= 0) {
            //Death animation
            this.isAlive = false
            gameState.enemiesToUpdate = gameState.enemiesToUpdate.filter(e => e.isAlive)

            // gameState.enemiesToUpdate[this.index] = undefined
            player.EnemiesKilled++
            this.dropCollect(player)
        }
    }
    createCollisionArray(collisionForEnemies) {
        return collisionForEnemies.filter(enemy => enemy !== this);
    }
    attack() {
        if (this.isAttacking) {
            c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
    drawHealthBar() {
        c.fillStyle = "red"
        c.strokeRect(this.position.x - 10, this.position.y + this.hitbox.h + 5, this.hitbox.w + 20, 7)
        c.fillRect(this.position.x - 10, this.position.y + this.hitbox.h + 5, ((this.hitbox.w + 20) * (this.health / this.maxHealth)), 7)
    }
    movement(player) {
        // console.log(player.position)
        let dx = player.position.x - this.position.x;
        let dy = player.position.y - this.position.y;

        // Normalize the direction vector
        let length = Math.sqrt(dx * dx + dy * dy);
        dx /= length;
        dy /= length;

        // Move towards the player at a certain speed
        this.velocity.x = dx * this.speedOfRunning;
        this.velocity.y = dy * this.speedOfRunning;
    }
    dropCollect(player) {
        if (!this.isDropped) {
           
            let randomNumber = Math.floor(Math.random() * 100);
            player.Xp += this.XpDrop

            if (randomNumber < 50) {
                console.log("Enemy dropped nothing.");
            }
            else if (randomNumber < 80) {
                const coin = new Collect({
                    player,
                    ...coinSettings,
                    position: { x: this.position.x, y: this.position.y },})
                gameState.collectsToUpdate.push(coin)
            }
            else {
                const hearth = new Collect({
                    player,
                    ...hearthSettings,
                    position: { x: this.position.x, y: this.position.y },
                })
                gameState.collectsToUpdate.push(hearth)
            }

            this.isDropped = true
        }
    }

}
export default Enemy