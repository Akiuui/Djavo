import Sprite from "./Sprite.js"
import { gameState } from "../script.js"
import { detectCollision } from "../utils/utils.js"

class Collect extends Sprite {
    constructor({
        player,
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
        this.player = player
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
        this.index = gameState.collectsToUpdate.length

    }

    update() {
        super.update()
        
        if (this.collected == false && detectCollision({ rect1: this, rect2: this.player })) {

            if (this.type === "coin") {

                this.player.coinsCollected++
                document.getElementById("coins").innerHTML = this.player.coinsCollected
                this.collected = true
                // gameState.collectsToUpdate[this.index] = undefined

            } else if (this.type === "heart" && this.player.health != this.player.maxHealth) {

                this.player.health += 20
                this.collected = true
                // gameState.collectsToUpdate[this.index] = undefined
                
            }

        }



    }
}
export default Collect