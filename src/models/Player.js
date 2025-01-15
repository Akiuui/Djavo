import Fighter from "./Fighter.js";
import { detectCollision } from "../utils/utils.js";
import { canvas, c, player } from "../script.js";
import { gameState } from "../script.js";

import { playerSettings } from "../utils/entitySettings.js";

function MovementOnX({ keys, player, left, right, speedOfRunning }) {
    if (keys[left].pressed) {
        player.velocity.x = speedOfRunning * -1
        // player.flipSpriteLeft()
    } else if (keys[right].pressed) {
        player.velocity.x = speedOfRunning
        // player.flipSpriteRight()

    }
}
function MovementOnY({ keys, player, up, down, speedOfRunning }) {
    if (keys[up].pressed) {
        player.velocity.y = speedOfRunning * -1
    } else if (keys[down].pressed) {
        player.velocity.y = speedOfRunning
    }
}


class Player extends Fighter {
    constructor({
        position = { x: 0, y: 0 },
        scale = 1,
        imgOffset = { x: 0, y: 0 },
        hitbox = { w: undefined, h: undefined },
        damage,
        attackBox = { offset: { x: undefined, y: undefined }, width: undefined, height: undefined },
        animations = {},
        type,
        smallElements,
        isFlipped = false,
        velocity = { x: 0, y: 0 },
        health = 100,
        speedOfRunning = 10,
        XpToLevelUp = 20
    }) {
        super({ position, scale, animations, isFlipped, imgOffset, attackBox, health, velocity, hitbox, speedOfRunning, damage, type, smallElements});
        this.alive = true
        this.coinsCollected = 0
        this.Xp = 0
        this.XpToLevelUp = XpToLevelUp
        this.XpLevel = 1
        this.maxHealth = health
        this.EnemiesKilled = 0
    }
    update(keys, enemiesToHandle) {
        this.movement(keys)
        this.drawHealthBar()
        this.drawXpBar()
        super.update(enemiesToHandle)
        
        //Collision
        enemiesToHandle.forEach(e => {
            if (e != undefined) {

                if (
                    detectCollision({ rect1: this, rect2: e })
                    &&
                    this.isAttacking
                    &&
                    (this.frameCurrent == 1 || this.frameCurrent == 2)
                ) {
                    this.isAttacking = false
                    e.health -= this.damage

                    let dx = this.position.x - e.position.x;
                    let dy = this.position.y - e.position.y;

                    e.velocity.x -= dx * 1
                    e.velocity.y -= dy * 1
                }
            }
        })

        if (this.isAttacking && this.frameCurrent == 3)
            this.isAttacking = false

        if (keys.Space.pressed) {
            this.attack()
            this.changeAnimationState("attack")
        } else {
            this.changeAnimationState("idle")
        }

        this.velocity.x = 0
        this.velocity.y = 0
    
        
        if (this.isAttacking) {
            c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }

        if (this.health <= 0) {
            this.alive = false
        }
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth
        }
        if (this.Xp >= this.XpToLevelUp) {
            this.levelUp()
        }
    }
    attack() {
        this.isAttacking = true
    }
    movement(keys) {
        MovementOnX({ keys, player: this, left: "ArrowLeft", right: "ArrowRight", speedOfRunning: this.speedOfRunning })
        MovementOnY({ keys, player: this, up: "ArrowUp", down: "ArrowDown", speedOfRunning: this.speedOfRunning })

        //Prevents the movement of the player outside of the bounds of the screen
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.hitbox.w > canvas.width) {
            this.position.x = canvas.width - this.hitbox.w;
        }
    
        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.hitbox.h > canvas.height) {
            this.position.y = canvas.height - this.hitbox.h;
        }
    }
    drawHealthBar() {
        document.getElementById("playerHealth").style.width = (this.health / this.maxHealth) * 100 + "%"
        document.getElementById("health").innerHTML = this.health
        document.getElementById("maxHealth").innerHTML = this.maxHealth
    }
    drawXpBar() {
        document.getElementById("playerXp").style.width = (this.Xp / this.XpToLevelUp) * 100 + '%'
    }
    levelUp() {
        this.Xp -= this.XpToLevelUp

        this.XpToLevelUp *= 2
        this.XpLevel++

        document.getElementById("xpLevel").innerHTML = this.XpLevel
        document.getElementById("playerXp").style.width = 0
        document.getElementById("levelUp").style.display = "flex"

        clearInterval(gameState.timerId)

        gameState.isPaused = true
    }
    increaseHealth() {
        this.maxHealth = this.maxHealth + this.maxHealth * (50 / 100)
        this.health = this.maxHealth
    }
    increaseSpeed() {
        this.speedOfRunning = this.speedOfRunning + this.speedOfRunning * (15 / 100)
    }
    increaseDamage() {
        this.damage = this.damage + this.damage * (15 / 100)
    }
    restartSettings(){
        this.health = playerSettings.health
        this.coinsCollected = 0
        this.Xp = 0
        this.XpToLevelUp = playerSettings.XpToLevelUp
        this.EnemiesKilled = 0
        this.speedOfRunning = playerSettings.speedOfRunning
        this.damage = playerSettings.damage
        this.position = /*playerSettings.position*/ {x: 300, y:400}


        this.maxHealth = playerSettings.health
        this.XpLevel = 1
        this.alive = true

        document.getElementById("xpLevel").innerHTML = this.XpLevel
        document.getElementById("playerXp").style.width = this.Xp
    }
}

export default Player