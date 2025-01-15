import { getNumberOfElementsThatAreNotUndefined, randomIntFromInterval, getRandomPositionOutsideCanvas } from "../utils/utils.js"
import { enemySettings } from "../utils/entitySettings.js"
import Enemy from "../models/Enemy.js"
import { canvas } from "../script.js"


//Enemies that can be spawned
let namesOfEnemies = ["hound", "fireskull"]
//Game settings
let maxEnemiesOnScreen = 20

function gameController(enemiesToUpdate, seconds){

    if (getNumberOfElementsThatAreNotUndefined(enemiesToUpdate) < maxEnemiesOnScreen && seconds % 10 === 0/* && activated === true*/) {

        // activated = false
        let enemiesToAdd = maxEnemiesOnScreen - getNumberOfElementsThatAreNotUndefined(enemiesToUpdate)

        let object
        let index
        for (let i = 0; i < enemiesToAdd; i++) {
            //We choose a random type of enemy from the available types
            index = randomIntFromInterval(0, namesOfEnemies.length - 1)
            object = namesOfEnemies[index]

            let instance = new Enemy({
                position: getRandomPositionOutsideCanvas(canvas.width, canvas.height),
                ...enemySettings[object],
            });

            enemiesToUpdate.push(instance);
        }

    }
    // if (seconds % 10 != 0 && activated == false) {
    //     activated = true
    // }
    if (seconds === 50) {
        maxEnemiesOnScreen = 40
    }
    if (seconds === 25) {
        namesOfEnemies = ["ghost", ...namesOfEnemies]
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
        namesOfEnemies = [...namesOfEnemies, "nightmare"]
    }
    if (seconds === 75/* && act1*/) {
        // act1 = false
        let instance = new Enemy({
            position: getRandomPositionOutsideCanvas(canvas.width, canvas.height),
            ...enemySettings["demon"]
        });
        enemiesToUpdate.push(instance);
    }
    if (seconds === 80) {
        namesOfEnemies = [...namesOfEnemies, "beast"]
    }
    if (seconds === 100) {
        namesOfEnemies = ["demon", ...namesOfEnemies]
    }

}

export default gameController