class Sprite {
    constructor({
        position,
        scale = 1,
        sprite = { framesMax: undefined, framesHold: undefined, imageSrc: undefined },
        isFlipped = false,
        imgOffset = { x: 0, y: 0 },
        type
    }) {
        //Basic properties
        this.position = position
        this.scale = scale
        this.sprite = sprite
        this.isFlipped = isFlipped
        //Animation properties
        this.framesMax = sprite.framesMax
        this.framesHold = sprite.framesHold
        this.frameCurrent = 0
        this.framesElapsed = 0
        //Image properties
        this.image = new Image()
        this.image.src = sprite.imageSrc
        this.imgOffset = imgOffset
        this.type
        switch (type) {
            case "hound":
                this.flipCords = -1
                break
            case "fireskull":
                this.flipCords = 10
                break
            case "ghost":
                this.flipCords = 1 / 10
                break
            case "beast":
                this.flipCords = -1 / 25
                break
            case "demon":
                this.flipCords = 1 / 2
                break
            case "nightmare":
                this.flipCords = 1 / 2
                break
            case "player":
                this.flipCords = 1
                break
        }

    }
    draw() {
        c.save()

        if (this.isFlipped)
            c.scale(-1, 1)

        c.drawImage(
            this.image, //image to render
            // CROP PROPERTIES
            this.frameCurrent * this.image.width / this.framesMax,//cropX
            0,  //cropY
            this.image.width / this.framesMax, //crop Width 
            this.image.height, //crop Height
            // //BASIC PROPERTIES
            this.isFlipped ?
                -1 * this.position.x - this.image.width / this.framesMax + this.imgOffset.x * this.flipCords : this.position.x - this.imgOffset.x, //X
            this.position.y - this.imgOffset.y, //Y
            (this.image.width / this.framesMax) * this.scale, //W
            this.image.height * this.scale, //H
        )

        c.restore()
    }
    update() {
        this.draw()

        if (this.framesMax != 1)
            this.animateFrames()
    }
    animateFrames() {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMax - 1)
                this.frameCurrent++
            else
                this.frameCurrent = 0
        }

    }
    flipSpriteLeft() {
        this.isFlipped = true
    }
    flipSpriteRight() {
        this.isFlipped = false
    }
    destroy() {
        for (let prop in this)
            delete this[prop];
    }
}
class Fighter extends Sprite {
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
        damage = 5,
        type
    }) {
        super({ position, scale, sprite: animations.idle, isFlipped, imgOffset, type })
        //MAIN PROPERTIES
        this.health = health
        this.damage = 5
        this.velocity = velocity
        this.hitbox = hitbox
        this.animations = animations
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.speedOfRunning = speedOfRunning
        //FUNCTION PROPERITES
        this.lastKeyPressed
        this.isAttacking
        this.damage = damage

        let startIndex = this.image.src.indexOf("public");
        this.extractedString = this.image.src.substring(startIndex);
        this.extractedString = "./" + this.extractedString;
        // this.image = animations.idle.imageSrc
    }
    changeAnimationState(name) {

        if (this.extractedString === this.animations["attack"].imageSrc && this.frameCurrent < this.animations["attack"].framesMax - 1) {
            return
        }
        if (this.extractedString !== this.animations[name].imageSrc) {

            this.extractedString = this.animations[name].imageSrc

            this.image.src = this.extractedString
            this.framesMax = this.animations[name].framesMax
            this.framesHold = this.animations[name].framesHold
            this.framesCurrent = 0
        }
    }
    handleCollison(enemiesToHandle) {
        enemiesToHandle.forEach(e => {
            if (e != undefined) {
                let dx = e.position.x - this.position.x;
                let dy = e.position.y - this.position.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.hitbox.w / 2 + e.hitbox.w / 2) {
                    let pushForce = 3; // Adjust as needed

                    this.velocity.x -= (dx / distance) * pushForce;
                    this.velocity.y -= (dy / distance) * pushForce;
                }
            }
        })

    }
    drawA() {
        c.strokeStyle = "white"
        c.strokeRect(this.position.x, this.position.y, this.hitbox.w, this.hitbox.h)
    }
    update(enemiesToHandle) {
        // this.drawA()
        this.draw()
        this.animateFrames()
        this.autoFlipSprite()
        this.handleCollison(enemiesToHandle)
        // this.changeAnimationState()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.isFlipped)
            this.attackBox.position.x = this.position.x - this.attackBox.width + this.attackBox.offset.x
        else
            this.attackBox.position.x = this.position.x + this.hitbox.w + this.attackBox.offset.x

        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

    }
    autoFlipSprite() {
        if (this.velocity.x > 0 && this.isFlipped != false)
            this.flipSpriteRight()
        else if (this.velocity.x < 0 && this.isFlipped != true)
            this.flipSpriteLeft()
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
        type

    }) {
        super({ position, scale, animations, isFlipped, imgOffset, attackBox, health, velocity, hitbox, speedOfRunning, damage, type });
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

        if (player.position.x < 0) {
            player.position.x = 0; // Prevent player from moving outside left boundary
        } else if (player.position.x + player.hitbox.w > canvas.width) {
            player.position.x = canvas.width - player.hitbox.w; // Prevent player from moving outside right boundary
        }

        if (player.position.y < 0) {
            player.position.y = 0; // Prevent player from moving outside top boundary
        } else if (player.position.y + player.hitbox.h > canvas.height) {
            player.position.y = canvas.height - player.hitbox.h; // Prevent player from moving outside bottom boundary
        }

    }
    drawHealthBar() {
        console.log(this.maxHealth)
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

        isPaused = false

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
        type
    }) {
        super({ position, scale, animations, isFlipped, imgOffset, attackBox, health, velocity, hitbox, speedOfRunning, damage, type });
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
class Collect extends Sprite {
    constructor({
        position = { x: 0, y: 0 },
        scale = 1,
        sprite = { framesMax: undefined, framesHold: undefined, imageSrc: undefined },
        isFlipped = false,
        hitbox = { w: undefined, h: undefined },
        imgOffset = { x: 0, y: 0 },
        attackBox,
        type
    }) {
        super({ position, scale, sprite, isFlipped, imgOffset })
        this.hitbox = hitbox
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        }
        this.collected = false
        this.type = type
        this.index = collectsToUpdate.length

    }

    update() {
        super.update()
        if (!this.collected && rectCollison({ rect1: this, rect2: player })) {
            if (this.type === "coin") {
                player.coinsCollected++
                document.getElementById("coins").innerHTML = player.coinsCollected
                this.collected = true
                collectsToUpdate[this.index] = undefined

            } else if (this.type === "heart" && player.health != 100) {
                player.health += 20
                this.collected = true
                collectsToUpdate[this.index] = undefined
            }
        }



    }
}
//class projectiles
