//Detecting if touch screen is supported

if ('ontouchstart' in window || navigator.maxTouchPoints) {
    console.log("Touch is supported.");
} else {
    console.log("Touch is not supported.");
}