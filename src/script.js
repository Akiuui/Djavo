import Player from "./models/Player.js"
import Sprite from "./models/Sprite.js"
import Fighter from "./models/Fighter.js"
import Enemy from "./models/Enemy.js"
import Collect from "./models/Collect.js"


import { getNumberOfElementsThatAreNotUndefined, seconds } from "./utils/utils.js"
import { StartGame,  isPaused, showLeaderboard, SaveScore, RestartGame, unPause, muteMusic } from "./controllers/menuController.js"
import { playerSettings, enemySettings } from "./utils/entitySettings.js"

window.menuActions = {
    StartGame,
    showLeaderboard,
    SaveScore,
    RestartGame,
    unPause,
    muteMusic,
}

import { keys } from "./controllers/keyboardController.js"

//Getting the canvas
const canvas = document.querySelector("canvas")
export const c = canvas.getContext("2d")

//Setting the size of the canvas window to the screen size
canvas.width = window.innerWidth
canvas.height = window.innerHeight - 5

//Detecting if touch screen is supported
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    console.log("Touch is supported.");
} else {
    console.log("Touch is not supported.");
}

//Player setttings
const player = new Player({...playerSettings})
//Background settings
const backgroundImage = new Sprite({
    position: { x: 0, y: 0 },
    sprite: { framesMax: 1, framesHold: 1, imageSrc: "./public/map.png" },
})
// const namesOfEnemies = ["ghost", "beast", "fireskull", "hound", "nightmare", "demon"]

let namesOfEnemies = ["hound", "fireskull"]

//Elements to draw on the canvas
let collectsToUpdate = []
let enemiesToUpdate = []

//Game settings
let maxEnemiesOnScreen = 20
let activated = true
// let isPaused = true
let choosenUpgrade
let act = true
let act1 = true
let act2 = true
let score
let timerId

//Setting the default color of the canvas
c.fillStyle = "rgb(24,40,72)"
c.fillRect(0, 0, canvas.width, canvas.height)

function Animate() {
    window.requestAnimationFrame(Animate) //Creates a recursive loop
    
    //Setting the background image
    backgroundImage.update()

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

    
    //Player Settings
    player.velocity.x = 0
    player.velocity.y = 0

    if (keys.Space.pressed) {
        player.attack()
        player.changeAnimationState("attack")
    } else {
        player.changeAnimationState("idle")
    }

    if(isPaused){
        return
    }

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
                    ...enemySettings[object],
                    c
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
                ...enemySettings["beast"]
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
                ...enemySettings["demon"]
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


Animate()
