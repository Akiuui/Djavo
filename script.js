const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const keys = {
    ArrowLeft: {
        pressed: false,
        name: 'ArrowLeft'
    },
    ArrowRight: {
        pressed: false,
        name: 'ArrowRight'
    },
    ArrowUp: {
        pressed: false,
        name: 'ArrowUp'
    },
    ArrowDown: {
        pressed: false,
        name: 'ArrowDown'
    },
    Space: {
        pressed: false,
        name: "Space"
    }
}

const player = new Player({
    position: { x: 490, y: 250 },
    scale: 1.2,
    imgOffset: { x: 40, y: 10 },
    hitbox: { w: 30, h: 50 },
    damage: 50,
    attackBox: {
        offset: { x: 0, y: 5 },
        width: 65,
        height: 40
    },
    animations: {
        idle: {
            framesMax: 4,
            framesHold: 7,
            imageSrc: "./public/player/idle.png"
        },
        run: {
            framesMax: 12,
            framesHold: 6,
            imageSrc: "./public/player/run.png"
        },
        attack: {
            framesMax: 4,
            framesHold: 7,
            imageSrc: "./public/player/attack.png"
        }
    },
    type: "player"
})
const backgroundImage = new Sprite({
    position: { x: 0, y: 0 },
    sprite: { framesMax: 1, framesHold: 1, imageSrc: "./public/map.png" }
})
// const namesOfEnemies = ["ghost", "beast", "fireskull", "hound", "nightmare", "demon"]

const enemies = {
    ghost: {
        scale: 1.2,
        isFlipped: false,
        hitbox: { w: 30, h: 50 },
        animations: {
            idle: {
                framesMax: 7,
                framesHold: 4,
                imageSrc: "./public/enemies/ghost/idle.png"
            },
        },
        imgOffset: { x: 25, y: 28 },
        attackBox: {
            offset: { x: 0, y: 0 },
            width: 10,
            height: 50
        },
        health: 150,
        speedOfRunning: 2,
        damage: 2,
        XpDrop: 10,
        type: "ghost",

    },
    beast: {
        scale: 1.4,
        isFlipped: true,
        hitbox: { w: 55, h: 70 },
        animations: {
            idle: {
                framesMax: 6,
                framesHold: 6,
                imageSrc: "./public/enemies/beast/idle.png"
            },
        },
        imgOffset: { x: 5, y: 20 },
        attackBox: {
            offset: { x: 0, y: 0 },
            width: 15,
            height: 70
        },
        health: 200,
        speedOfRunning: 1,
        damage: 2,
        XpDrop: 20,
        type: "beast"

    },
    fireskull: {
        scale: .5,
        isFlipped: false,
        hitbox: { w: 35, h: 40 },
        animations: {
            idle: {
                framesMax: 8,
                framesHold: 6,
                imageSrc: "./public/enemies/fireskull/idle.png"
            },
        },
        imgOffset: { x: 5, y: 15 },
        attackBox: {
            offset: { x: 0, y: 0 },
            width: 10,
            height: 40
        },
        health: 70,
        speedOfRunning: 2,
        damage: 1,
        XpDrop: 5,
        type: "fireskull"

    },
    hound: {
        scale: 1.4,
        isFlipped: false,
        hitbox: { w: 60, h: 40 },
        animations: {
            idle: {
                framesMax: 12,
                framesHold: 6,
                imageSrc: "./public/enemies/hound/idle.png"
            },
        },
        imgOffset: { x: 15, y: 8 },
        attackBox: {
            offset: { x: 0, y: 0 },
            width: 10,
            height: 40
        },
        health: 50,
        speedOfRunning: 4,
        damage: .5,
        XpDrop: 5,
        type: "hound"

    },
    nightmare: {
        scale: 1,
        isFlipped: false,
        hitbox: { w: 80, h: 70 },
        animations: {
            idle: {
                framesMax: 4,
                framesHold: 6,
                imageSrc: "./public/enemies/nightmare/idle.png"
            },
        },
        imgOffset: { x: 50, y: 25 },
        attackBox: {
            offset: { x: 0, y: 0 },
            width: 20,
            height: 70
        },
        health: 200,
        speedOfRunning: 2,
        damage: 1,
        XpDrop: 50,
        type: "nightmare"

    },
    demon: {
        scale: 1,
        isFlipped: false,
        hitbox: { w: 80, h: 90 },
        animations: {
            idle: {
                framesMax: 6,
                framesHold: 6,
                imageSrc: "./public/enemies/demon/idle.png"
            },
        },
        imgOffset: { x: 55, y: 35 },
        attackBox: {
            offset: { x: 0, y: 0 },
            width: 20,
            height: 90
        },
        health: 300,
        speedOfRunning: 1,
        damage: 4,
        XpDrop: 100,
        type: "demon"

    },
}
let namesOfEnemies = ["hound", "fireskull"]

let collectsToUpdate = []
let enemiesToUpdate = []

let maxEnemiesOnScreen = 20
let activated = true
let isPaused = false
let choosenUpgrade
let act = true
let act1 = true
let act2 = true
let score



function Animate() {
    window.requestAnimationFrame(Animate)


    backgroundImage.update()
    player.velocity.x = 0
    player.velocity.y = 0

    if (keys.Space.pressed) {
        player.attack()
        player.changeAnimationState("attack")
    } else {
        player.changeAnimationState("idle")
    }

    if (isPaused) {
        if (player.alive) {
            player.update(keys, enemiesToUpdate, isPaused)

            enemiesToUpdate.forEach(e => {
                if (e != undefined)
                    e.update(player, enemiesToUpdate)
            })
            collectsToUpdate.forEach(e => {
                if (e != undefined)
                    e.update()
            })

            if (getNumberOfElementsThatAreNotUndefined(enemiesToUpdate) < maxEnemiesOnScreen && seconds % 10 === 0 && activated === true) {
                activated = false
                let enemiesToAdd = maxEnemiesOnScreen - getNumberOfElementsThatAreNotUndefined(enemiesToUpdate)
                let object
                let index
                for (let i = 0; i < enemiesToAdd; i++) {
                    index = randomIntFromInterval(0, namesOfEnemies.length - 1)
                    object = namesOfEnemies[index]
                    let instance = new Enemy({
                        position: getRandomPositionOutsideCanvas(canvas.width, canvas.height),
                        ...enemies[object]
                    });
                    enemiesToUpdate.push(instance);
                }

            }
            if (seconds % 10 != 0 && activated == false) {
                activated = true
            }
            if (seconds === 50) {
                maxEnemiesOnScreen = 40
            }
            if (seconds === 25) {
                namesOfEnemies = ["ghost", "fireskull", "hound"]
            }
            if (seconds === 30 && act === true) {
                act = false
                let instance = new Enemy({
                    position: getRandomPositionOutsideCanvas(canvas.width, canvas.height),
                    ...enemies["beast"]
                });
                enemiesToUpdate.push(instance);
            }
            if (seconds === 55) {
                namesOfEnemies = ["ghost", "fireskull", "hound", "nightmare"]
            }
            if (seconds === 75 && act1) {
                act1 = false
                let instance = new Enemy({
                    position: getRandomPositionOutsideCanvas(canvas.width, canvas.height),
                    ...enemies["demon"]
                });
                enemiesToUpdate.push(instance);
            }
            if (seconds === 80) {
                namesOfEnemies = ["ghost", "fireskull", "hound", "nightmare", "beast"]
            }
            if (seconds === 100) {
                namesOfEnemies = ["demon", "ghost", "fireskull", "hound", "nightmare", "beast"]
            }

        } else if (act2) {
            document.getElementById("death").style.display = "flex"
            score = seconds * 5 + player.EnemiesKilled * 10 + player.coinsCollected * 20 + player.XpLevel * 5
            document.getElementById("score").innerHTML = "Your Score: " + score
            clearInterval(timerId)
            act2 = false
        }
    }
}
let timerId


Animate()

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true
            player.lastKeyPressed = "ArrowLeft"
            break
        case "ArrowRight":
            keys.ArrowRight.pressed = true
            player.lastKeyPressed = "ArrowRight"
            break
        case "ArrowUp":
            keys.ArrowUp.pressed = true
            player.lastKeyPressed = "ArrowUp"
            break
        case "ArrowDown":
            keys.ArrowDown.pressed = true
            player.lastKeyPressed = "ArrowDown"
            break
        case " ":
            keys.Space.pressed = true
            player.lastKeyPressed = "Space"
            // keys.Space.pressed = true
            // player.lastKeyPressed = "Space"

            break
    }
})


window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break
        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break
        case "ArrowUp":
            keys.ArrowUp.pressed = false
            break
        case "ArrowDown":
            keys.ArrowDown.pressed = false
            break
        case " ":
            keys.Space.pressed = false
            break
    }
})
