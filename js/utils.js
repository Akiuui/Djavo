function MovementOnX({ keys, player, left, right, speedOfRunning }) {
    if (keys[left].pressed) {
        player.velocity.x = speedOfRunning * -1
        // player.flipSpriteLeft()
    } else if (keys[right].pressed) {
        player.velocity.x = speedOfRunning
        // player.flipSpriteRight()

    }
}
function MovementOnY({ keys, player, up, down, speedOfRunning }) {
    if (keys[up].pressed) {
        player.velocity.y = speedOfRunning * -1
    } else if (keys[down].pressed) {
        player.velocity.y = speedOfRunning
    }
}


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
let seconds

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
function getNumberOfElementsThatAreNotUndefined(array) {
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

function unPause(e) {
    isPaused = true
    choosenUpgrade = e

    document.getElementById("levelUp").style.display = "none"
    timerId = StartTimer(seconds)

    switch (choosenUpgrade) {
        case "speed":
            player.increaseSpeed()
            break
        case "damage":
            player.increaseDamage()
            break
        case "health":
            player.increaseHealth()
            break
    }
    document.getElementById("speed").innerHTML = player.speedOfRunning
    document.getElementById("damage").innerHTML = player.damage


}
let now = true
function muteMusic() {
    const audio = document.getElementById("backgroundMusic")
    if (now) {
        audio.pause()
        document.getElementById("muteButton").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6"/></svg>'
        now = false
    } else {
        audio.play()
        document.getElementById("muteButton").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#474747" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>'
        now = true

    }
}
function RestartGame() {
    player.health = 100
    player.coinsCollected = 0
    player.Xp = 0
    player.XpToLevelUp = 10
    player.EnemiesKilled = 0
    player.speedOfRunning = 10
    player.damage = 50

    player.maxHealth = 100
    player.XpLevel = 1
    player.alive = true
    player.position = { x: 490, y: 250 }

    enemiesToUpdate = []
    collectsToUpdate = []
    namesOfEnemies = ["fireskull", "hound"]


    timerInterval = StartTimer(0)

    document.getElementById("timer").innerHTML = "0"
    document.getElementById("xpLevel").innerHTML = "1"
    document.getElementById("coins").innerHTML = "0"

    document.getElementById("death").style.display = "none"
}
function StartGame() {
    document.getElementById("menu").style.display = "none"
    isPaused = true

    if (isPaused)
        timerId = StartTimer(0)
}
function OpenWindow() {
    document.getElementById("form").style.display = "flex"
    document.getElementById("form1").style.display = "flex"

}
function SaveScore() {
    const input = document.getElementById("input").value
    console.log(localStorage.getItem(input))

    if (localStorage.getItem(input) === null) {
        localStorage.setItem(input, score);
        document.getElementById("form").style.display = "none"
        document.getElementById("form1").style.display = "none"
    } else {
        let result = confirm("Score with that name is already saved, Do you want to overwrite it?")
        if (result) {
            document.getElementById("form").style.display = "none"
            document.getElementById("form1").style.display = "none"
            localStorage.setItem(input, score);
        } else {
            document.getElementById("form").style.display = "none"
            document.getElementById("form1").style.display = "none"
        }

    }

}
function isNumericString(str) {
    return /^\d+$/.test(str);
}
function show() {
    document.getElementById("leader1").style.display = "flex"
    document.getElementById("leader2").style.display = "flex"
    let allObjects
    let tableHtml = '<div onclick="ExitWindow()" style="cursor: pointer;position: absolute; top: 5px; right: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div><h1>LeaderBoard</h1><table style="width: 100%"><tr><th>NickName</th><th>Value</th></tr>';


    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        if (isNumericString(value) && value !== "undefined") {
            tableHtml += `<tr><td style="border-right: 1px solid black; margin-right: 10px; padding-right: 10px; display: flex; justify-content: center; align-items: center">${key}</td><td ">${value}</td></tr>`;
        }

    }
    tableHtml += "</table>";

    document.getElementById("leader2").innerHTML = tableHtml;

}
function ExitWindow() {
    document.getElementById("leader1").style.display = "none"
    document.getElementById("leader2").style.display = "none"

}