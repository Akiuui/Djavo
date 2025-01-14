import { c } from "../script.js"

class Sprite {
    constructor({
        position,
        scale = 1,
        sprite = { framesMax: undefined, framesHold: undefined, imageSrc: undefined },
        isFlipped = false,
        imgOffset = { x: 0, y: 0 },
        type,
        smallElements = 1,
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
        //Other
        this.type
        this.smallElements = smallElements
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
            (this.image.width / this.framesMax) * this.scale * this.smallElements, //W
            this.image.height * this.scale * this.smallElements, //H
        )

        c.restore()
    }
    update() {
        this.draw()

        if (this.framesMax == 1)
            return

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
export default Sprite