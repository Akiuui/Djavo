import Player from "./models/Player.js"
import Sprite from "./models/Sprite.js"

import {  seconds } from "./utils/utils.js"
import { StartGame,  isPaused, timerId, showLeaderboard, SaveScore, RestartGame, unPause, muteMusic } from "./controllers/menuController.js"
import { playerSettings, backgroundSettings } from "./utils/entitySettings.js"
import gameController from "./controllers/gameController.js"
import { keys } from "./controllers/keyboardController.js"

window.menuActions = {
    StartGame,
    showLeaderboard,
    SaveScore,
    RestartGame,
    unPause,
    muteMusic,
}

//Getting the canvas
export const canvas = document.querySelector("canvas")
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

const player = new Player({...playerSettings})
const backgroundImage = new Sprite({...backgroundSettings})

//Elements to draw on the canvas
export let collectsToUpdate = []
export let enemiesToUpdate = []

//Game settings
// let activated = true
// // let choosenUpgrade
// let act = true
// let act1 = true
// let act2 = true
let score
// let timerId

//Setting the default color of the canvas
c.fillStyle = "rgb(24,40,72)"
c.fillRect(0, 0, canvas.width, canvas.height)

function Animate() {
    window.requestAnimationFrame(Animate) //Creates a recursive loop
    
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

    if(!player.alive){
        document.getElementById("death").style.display = "flex"
        score = seconds * 5 + player.EnemiesKilled * 10 + player.coinsCollected * 20 + player.XpLevel * 5
        document.getElementById("score").innerHTML = "Your Score: " + score
        clearInterval(timerId)

        return
    }

    //We render the enteties
    backgroundImage.update()
    player.update(keys, enemiesToUpdate)
    enemiesToUpdate.forEach(e => {
        if (e != undefined)
            e.update(player, enemiesToUpdate)
    })
    collectsToUpdate.forEach(e => {
        if (e != undefined)
            e.update()
    })
    //Function that controlles the game
    gameController(enemiesToUpdate, seconds)
    
}

Animate()
