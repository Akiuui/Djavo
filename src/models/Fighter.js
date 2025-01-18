import Sprite from "./Sprite.js"
import { c } from "../script.js"

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
        type,
        smallElements,
    }) {
        super({ position, scale, sprite: animations.idle, isFlipped, imgOffset, type, smallElements})
        //MAIN PROPERTIES
        this.health = health
        this.damage = 5
        this.velocity = velocity
        this.hitbox = hitbox
        this.hitbox.w = hitbox.w
        this.hitbox.h = hitbox.h

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
        this.drawA()
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

export default Fighter