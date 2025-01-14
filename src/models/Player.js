import Fighter from "./Fighter.js";

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
        type,
        smallElements,
    }) {
        super({ position, scale, animations, isFlipped, imgOffset, attackBox, health, velocity, hitbox, speedOfRunning, damage, type, smallElements});
        this.alive = true
        this.coinsCollected = 0
        this.Xp = 0
        this.XpToLevelUp = 20
        this.XpLevel = 1
        this.maxHealth = health
        this.EnemiesKilled = 0
    }
    update(keys, enemiesToHandle, isPaused) {
        this.movement(keys)
        this.drawHealthBar()
        this.drawXpBar()

        super.update(enemiesToHandle)
        //Collision
        enemiesToHandle.forEach(e => {
            if (e != undefined) {

                if (
                    rectCollison({ rect1: this, rect2: e })
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


        // if (this.isAttacking) {
        //     c.strokeRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        // }

        if (this.health <= 0) {
            console.log("Umro si")
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

        // if (player.position.x < 0) {
        //     player.position.x = 0; // Prevent player from moving outside left boundary
        // } else if (player.position.x + player.hitbox.w > canvas.width) {
        //     player.position.x = canvas.width - player.hitbox.w; // Prevent player from moving outside right boundary
        // }

        // if (player.position.y < 0) {
        //     player.position.y = 0; // Prevent player from moving outside top boundary
        // } else if (player.position.y + player.hitbox.h > canvas.height) {
        //     player.position.y = canvas.height - player.hitbox.h; // Prevent player from moving outside bottom boundary
        // }

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

        clearInterval(timerId)

        isPaused = true

    }
    increaseHealth() {
        this.maxHealth = this.maxHealth + this.maxHealth * (50 / 100)
    }
    increaseSpeed() {
        this.speedOfRunning = this.speedOfRunning + this.speedOfRunning * (15 / 100)
    }
    increaseDamage() {
        this.damage = this.damage + this.damage * (15 / 100)
    }
}

export default Player