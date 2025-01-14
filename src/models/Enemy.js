import Fighter from "./Fighter.js";

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
        this.index = enemiesToUpdate.length
        this.isArrayCreated = true
        this.XpDrop = XpDrop
        this.maxHealth = health
    }
    update(player, collisionForEnemies) {

        let array

        if (this.isArrayCreated)
            array = this.createCollisionArray(collisionForEnemies)

        super.update(array)
        this.movement(player)

        // this.attack()
        if (rectCollison({ rect1: this, rect2: player }))
            player.health -= this.damage

        if (this.health < this.maxHealth && this.health > 0)
            this.drawHealthBar()

        if (this.health <= 0) {
            //Death animation
            enemiesToUpdate[this.index] = undefined
            player.EnemiesKilled++
            // enemiesToUpdate.splice(this.index, 1)
            this.dropCollect()
            // this.destroy()
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
    dropCollect() {
        if (!this.isDropped) {
            let randomNumber = Math.floor(Math.random() * 100);
            player.Xp += this.XpDrop

            if (randomNumber < 50) {
                console.log("Enemy dropped nothing.");

            }
            else if (randomNumber < 80) {
                const coin = new Collect({
                    position: { x: this.position.x, y: this.position.y },
                    // scale: 0.7,
                    sprite: { framesMax: 5, framesHold: 7, imageSrc: "./public/collectibles/coin.png" },
                    hitbox: { w: 10, h: 10 },
                    attackBox: {
                        offset: { x: 0, y: 0 },
                        width: 10,
                        height: 10
                    },
                    type: "coin",
                })
                collectsToUpdate.push(coin)

            }
            else {
                const hearth = new Collect({
                    position: { x: this.position.x, y: this.position.y },
                    scale: 1.5,
                    sprite: { framesMax: 5, framesHold: 7, imageSrc: "./public/collectibles/heart.png" },
                    hitbox: { w: 10, h: 10 },
                    attackBox: {
                        offset: { x: 0, y: -20 },
                        width: 18,
                        height: 15
                    },
                    type: "heart",

                })
                collectsToUpdate.push(hearth)
            }
            this.isDropped = true
        }
    }

}
export default Enemy