import Player from "./models/Player.js"
import Sprite from "./models/Sprite.js"


import { StartGame, ShowLeaderboard, SaveScore, RestartGame, selectedUpgrade, muteMusic, OpenSaveScore, ExitSaveScore } from "./controllers/menuController.js"
import { playerSettings, backgroundSettings } from "./utils/entitySettings.js"
import gameController from "./controllers/gameController.js"
import { keys } from "./controllers/keyboardController.js"
import touchScreenController from "./controllers/touchscreenController.js"

window.menuActions = {
    StartGame,
    RestartGame,

    OpenSaveScore,
    SaveScore,
    ExitSaveScore,

    ShowLeaderboard,

    selectedUpgrade,
    muteMusic,
}

//Getting the canvas
export const canvas = document.querySelector("canvas")
export const c = canvas.getContext("2d")

//Setting the size of the canvas window to the screen size
canvas.width = window.innerWidth
canvas.height = window.innerHeight+5

//Setting the default color of the canvas
c.fillStyle = "rgb(24,40,72)"
c.fillRect(0, 0, canvas.width, canvas.height)

export const player = new Player({
    ...playerSettings,
    position: {x: canvas.width/2, y: canvas.height/2}
})
const backgroundImage = new Sprite({
    ...backgroundSettings,
    overrideWidth: canvas?.width,
    overrideHeight: canvas?.height,
})

//Game settings
export const gameState = {
    isPaused: true,
    timerId: null,
    seconds: 0,
    collectsToUpdate: [],
    enemiesToUpdate: [],
    namesOfEnemies: ["hound", "fireskull"],
    maxEnemiesOnScreen: 20
}
let frameCount = 0;
let fps = 0;
let lastTime = 0;


function Animate(timestamp) {
    // Calculate frames per second
    frameCount++;

    if (timestamp - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = timestamp;

        // Display the FPS in the HTML element
        // document.getElementById('fpsCounter').innerText = `FPS: ${fps}`;
    }

    window.requestAnimationFrame(Animate) //Creates a recursive loop
    backgroundImage.update()
    

    if(gameState.isPaused){
        return
    }

    if(!player.alive){
        document.getElementById("death").style.display = "flex"
        let score = gameState.seconds * 5 + player.EnemiesKilled * 10 + player.coinsCollected * 20 + player.XpLevel * 5
        document.getElementById("score").innerHTML = "Your Score: " + score
        clearInterval(gameState.timerId)

        return
    }

    //We render the enteties
    player.update(keys, gameState.enemiesToUpdate)
    gameState.enemiesToUpdate.forEach(e => {
            e.update(player, gameState.enemiesToUpdate)
    })
    gameState.collectsToUpdate.forEach(e => {
            e.update()
    })
    //Function that controlles the game
    gameController(gameState.enemiesToUpdate, gameState.seconds)

}

Animate()

//Detecting if touch screen is supported
if (('ontouchstart' in window || navigator.maxTouchPoints)) {
    touchScreenController()
} else {
    console.log("Touch is not supported.");
}
