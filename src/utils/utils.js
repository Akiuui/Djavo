import { gameState } from "../main.js";

export function detectCollision({ rect1, rect2 }) {
  return (
    //X axis
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <= rect2.position.x + rect2.hitbox.w &&
    //Y axis
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.position.y + rect2.hitbox.h
  );
}

export function StartTimerFrom(sec) {
  gameState.seconds = sec;
  let timerInterval = setInterval(function () {
    gameState.seconds++;
    document.getElementById("timer").innerHTML = gameState.seconds;
    // timerElement.textContent = formatTime(seconds); // Update the timer display
  }, 1000);
  return timerInterval;
}

export function RandFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function NumberOfDefined(array) {
  let cnt = 0;
  array.forEach((e) => {
    if (e !== undefined) cnt++;
  });
  return cnt;
}

export function RandPositionOutsideBox(width, height) {
  const buffer = 50; // Buffer to ensure enemies spawn outside the canvas
  let x;
  let y;
  if (Math.random() > 0.5) {
    if (Math.random() > 0.5) {
      //x je left
      x = -1 * buffer;
      y = RandFromInterval(-1 * buffer, height + buffer);
    } else {
      //x je desno
      x = buffer + width;
      y = RandFromInterval(-1 * buffer, height + buffer);
    }
  } else {
    if (Math.random() > 0.5) {
      //y je gore
      x = RandFromInterval(-1 * buffer, width + buffer);
      y = -1 * buffer;
    } else {
      //y je dole
      x = RandFromInterval(-1 * buffer, width + buffer);
      y = height + buffer;
    }
  }

  return { x, y };
}
