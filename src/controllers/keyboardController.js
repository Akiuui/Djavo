export const keys = {
  ArrowLeft: {
    pressed: false,
    name: "ArrowLeft",
  },
  ArrowRight: {
    pressed: false,
    name: "ArrowRight",
  },
  ArrowUp: {
    pressed: false,
    name: "ArrowUp",
  },
  ArrowDown: {
    pressed: false,
    name: "ArrowDown",
  },
  Space: {
    pressed: false,
    name: "Space",
  },
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      // player.lastKeyPressed = "ArrowLeft"
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      // player.lastKeyPressed = "ArrowRight"
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      // player.lastKeyPressed = "ArrowUp"
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      // player.lastKeyPressed = "ArrowDown"
      break;
    case " ":
      keys.Space.pressed = true;
      // player.lastKeyPressed = "Space"
      // keys.Space.pressed = true
      // player.lastKeyPressed = "Space"

      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case " ":
      keys.Space.pressed = false;
      break;
  }
});
