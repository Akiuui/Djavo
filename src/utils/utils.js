

export function rectCollison({ rect1, rect2 }) {
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
export function StartTimer(sec) {
    seconds = sec
    let timerInterval = setInterval(function () {
        seconds++;
        document.getElementById("timer").innerHTML = seconds
        // timerElement.textContent = formatTime(seconds); // Update the timer display
    }, 1000);
    return timerInterval
}


export function randomIntFromInterval(min, max) { // min and max included 
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

export function getRandomPositionOutsideCanvas(canvasWidth, canvasHeight) {
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
function OpenWindow() {
    document.getElementById("form").style.display = "flex"
    document.getElementById("form1").style.display = "flex"

}
function ExitWindow() {
    document.getElementById("leader1").style.display = "none"
    document.getElementById("leader2").style.display = "none"

}