

function rectCollison({ rect1, rect2 }) {
    return (
        //X axis
        rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x
        &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.hitbox.w &&
        //Y axis
        rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
        &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.hitbox.h
    )
}
export let seconds
function StartTimer(sec) {
    seconds = sec
    let timerInterval = setInterval(function () {
        seconds++;
        document.getElementById("timer").innerHTML = seconds
        // timerElement.textContent = formatTime(seconds); // Update the timer display
    }, 1000);
    return timerInterval
}


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export function getNumberOfElementsThatAreNotUndefined(array) {
    let cnt = 0
    array.forEach(e => {
        if (e !== undefined)
            cnt++;
    })
    return cnt
}

function getRandomPositionOutsideCanvas(canvasWidth, canvasHeight) {
    const buffer = 50; // Buffer to ensure enemies spawn outside the canvas
    let x
    let y
    if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
            //x je left
            x = -1 * buffer
            y = randomIntFromInterval(-1 * buffer, canvasHeight + buffer)
        } else {
            //x je desno
            x = buffer + canvasWidth
            y = randomIntFromInterval(-1 * buffer, canvasHeight + buffer)
        }
    } else {
        if (Math.random() > 0.5) {
            //y je gore
            x = randomIntFromInterval(-1 * buffer, canvasWidth + buffer)
            y = -1 * buffer
        } else {
            //y je dole
            x = randomIntFromInterval(-1 * buffer, canvasWidth + buffer)
            y = canvasHeight + buffer
        }
    }

    return { x, y };
}
function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

// export function unPause(e) {
//     isPaused = false
//     choosenUpgrade = e

//     document.getElementById("levelUp").style.display = "none"
//     timerId = StartTimer(seconds)

//     switch (choosenUpgrade) {
//         case "speed":
//             player.increaseSpeed()
//             break
//         case "damage":
//             player.increaseDamage()
//             break
//         case "health":
//             player.increaseHealth()
//             break
//     }
//     document.getElementById("speed").innerHTML = player.speedOfRunning
//     document.getElementById("damage").innerHTML = player.damage


// }
// let now = true
// export function muteMusic() {
//     const audio = document.getElementById("backgroundMusic")
//     if (now) {
//         audio.pause()
//         document.getElementById("muteButton").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>'
//         now = false
//     } else {
//         audio.play()
//         document.getElementById("muteButton").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
//         now = true

//     }
// }
// export function RestartGame() {
//     player.health = 100
//     player.coinsCollected = 0
//     player.Xp = 0
//     player.XpToLevelUp = 10
//     player.EnemiesKilled = 0
//     player.speedOfRunning = 10
//     player.damage = 50

//     player.maxHealth = 100
//     player.XpLevel = 1
//     player.alive = true
//     player.position = { x: 490, y: 250 }
//     act2 = true

//     enemiesToUpdate = []
//     collectsToUpdate = []
//     maxEnemiesOnScreen = 20

//     namesOfEnemies = ["fireskull", "hound"]

//     timerInterval = StartTimer(0)

//     document.getElementById("timer").innerHTML = "0"
//     document.getElementById("xpLevel").innerHTML = "1"
//     document.getElementById("coins").innerHTML = "0"

//     document.getElementById("death").style.display = "none"
// }


function OpenWindow() {
    document.getElementById("form").style.display = "flex"
    document.getElementById("form1").style.display = "flex"

}
// export function SaveScore() {
//     const input = document.getElementById("input").value
//     console.log(localStorage.getItem(input))

//     if (localStorage.getItem(input) === null) {
//         localStorage.setItem(input, score);
//         document.getElementById("form").style.display = "none"
//         document.getElementById("form1").style.display = "none"
//     } else {
//         let result = confirm("Score with that name is already saved, Do you want to overwrite it?")
//         if (result) {
//             document.getElementById("form").style.display = "none"
//             document.getElementById("form1").style.display = "none"
//             localStorage.setItem(input, score);
//         } else {
//             document.getElementById("form").style.display = "none"
//             document.getElementById("form1").style.display = "none"
//         }

//     }

// }
function isNumericString(str) {
    return /^\d+$/.test(str);
}

function ExitWindow() {
    document.getElementById("leader1").style.display = "none"
    document.getElementById("leader2").style.display = "none"

}