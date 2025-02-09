const decreaseSize = 1
import { canvas } from "../script.js"

export let coinSettings = {
    //Position is relative to the enemy
    // scale: 0.7,
    sprite: { framesMax: 5, framesHold: 7, imageSrc: "./public/sprites/collectibles/coin.png" },
    hitbox: { w: 10, h: 10 },
    attackBox: {
        offset: { x: 0, y: 0 },
        width: 10,
        height: 10
    },
    type: "coin",
}
export let hearthSettings = {
    //Position is relative to the enemy
    scale: 1.5,
    sprite: { framesMax: 5, framesHold: 7, imageSrc: "./public/sprites/collectibles/heart.png" },
    hitbox: { w: 10, h: 10 },
    attackBox: {
        offset: { x: 0, y: -20 },
        width: 18,
        height: 15
    },
    type: "heart",
}
export let backgroundSettings = {
    // overrideWidth: canvas.width,
    // overrideHeight: canvas.height,
    position: { x: 0, y: 0 },
    sprite: { framesMax: 1, framesHold: 1, imageSrc: "./public/map.png" }
}
export let playerSettings = {
    // position: { x: canvas.width, y: canvas.height }, //Should be center based on the canvas width and height
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
            imageSrc: "./public/sprites/player/idle.png"
        },
        run: {
            framesMax: 12,
            framesHold: 6,
            imageSrc: "./public/sprites/player/run.png"
        },
        attack: {
            framesMax: 4,
            framesHold: 7,
            imageSrc: "./public/sprites/player/attack.png"
        }
    },
    type: "player",
    smallElements: decreaseSize,
    isFlipped: false,
    health: 100,
    speedOfRunning: 7,
    XpToLevelUp: 20
}
export let enemySettings = {
    ghost: {
        scale: 1.2,
        isFlipped: false,
        hitbox: { w: 30, h: 50 },
        animations: {
            idle: {
                framesMax: 7,
                framesHold: 4,
                imageSrc: "./public/sprites/enemies/ghost/idle.png"
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
        smallElements: decreaseSize

    },
    beast: {
        scale: 1.4,
        isFlipped: true,
        hitbox: { w: 55, h: 70 },
        animations: {
            idle: {
                framesMax: 6,
                framesHold: 6,
                imageSrc: "./public/sprites/enemies/beast/idle.png"
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
        type: "beast",
        smallElements: decreaseSize

    },
    fireskull: {
        scale: .5,
        isFlipped: false,
        hitbox: { w: 35, h: 40 },
        animations: {
            idle: {
                framesMax: 8,
                framesHold: 6,
                imageSrc: "./public/sprites/enemies/fireskull/idle.png"
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
        type: "fireskull",
        smallElements: decreaseSize

    },
    hound: {
        scale: 1.4,
        isFlipped: false,
        hitbox: { w: 60, h: 40 },
        animations: {
            idle: {
                framesMax: 12,
                framesHold: 6,
                imageSrc: "./public/sprites/enemies/hound/idle.png"
            },
        },
        imgOffset: { x: 15, y: 8 },
        attackBox: {
            offset: { x: 0, y: 0 },
            width: 10,
            height: 40
        },
        health: 50,
        speedOfRunning: 3,
        damage: .5,
        XpDrop: 5,
        type: "hound",
        smallElements: decreaseSize

    },
    nightmare: {
        scale: 1,
        isFlipped: false,
        hitbox: { w: 80, h: 70 },
        animations: {
            idle: {
                framesMax: 4,
                framesHold: 6,
                imageSrc: "./public/sprites/enemies/nightmare/idle.png"
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
        type: "nightmare",
        smallElements: decreaseSize

    },
    demon: {
        scale: 1,
        isFlipped: false,
        hitbox: { w: 80, h: 90 },
        animations: {
            idle: {
                framesMax: 6,
                framesHold: 6,
                imageSrc: "./public/sprites/enemies/demon/idle.png"
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
        type: "demon",
        smallElements: decreaseSize

    },
}