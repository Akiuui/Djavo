import Sprite from "./Sprite.js"

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
export default Collect