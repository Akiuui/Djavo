import { StartTimer } from "../utils/utils.js"

export let isPaused = true
export let timerId
export function StartGame() {
    document.getElementById("menu").style.display = "none"
    isPaused = false

    // console.log("isPaused: ", isPaused)
    // if (isPaused)
    timerId = StartTimer(0)
}

export function showLeaderboard() {
    document.getElementById("leader1").style.display = "flex"
    document.getElementById("leader2").style.display = "flex"

    let tableHtml = '<div onclick="ExitWindow()" style="cursor: pointer;position: absolute; top: 5px; right: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div><h1>LeaderBoard</h1><table style="width: 100%"><tr><th>NickName</th><th>Value</th></tr>';
    let array = []

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        array.push({ key, value })
    }

    array.sort((a, b) => a.value - b.value);

    array.forEach(e => {
        if (isNumericString(e.value) && e.value !== "undefined") {
            tableHtml += `<tr><td style="border-right: 1px solid black; margin-right: 10px; padding-right: 10px; display: flex; justify-content: center; align-items: center">${e.key}</td><td ">${e.value}</td></tr>`;
        }
    })
    tableHtml += "</table>";

    document.getElementById("leader2").innerHTML = tableHtml;

}

export function SaveScore() {
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

export function RestartGame() {
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
    act2 = true

    enemiesToUpdate = []
    collectsToUpdate = []
    maxEnemiesOnScreen = 20

    namesOfEnemies = ["fireskull", "hound"]

    timerInterval = StartTimer(0)

    document.getElementById("timer").innerHTML = "0"
    document.getElementById("xpLevel").innerHTML = "1"
    document.getElementById("coins").innerHTML = "0"

    document.getElementById("death").style.display = "none"
}

export function unPause(e) {
    isPaused = false
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
export function muteMusic() {
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