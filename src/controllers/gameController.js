import { NumberOfDefined, RandFromInterval, RandPositionOutsideBox } from "../utils/utils.js"
import { enemySettings } from "../utils/entitySettings.js"
import Enemy from "../models/Enemy.js"
import { canvas } from "../script.js"
import { gameState } from "../script.js"

//Enemies that can be spawned
// let gameState.namesOfEnemies = ["hound", "fireskull"]
//Game settings
// let maxEnemiesOnScreen = 20

function gameController(enemiesToUpdate, seconds){

    if (NumberOfDefined(enemiesToUpdate) < gameState.maxEnemiesOnScreen && seconds % 10 === 0/* && activated === true*/) {

        // activated = false
        let enemiesToAdd = gameState.maxEnemiesOnScreen - NumberOfDefined(enemiesToUpdate)

        let object
        let index
        for (let i = 0; i < enemiesToAdd; i++) {
            //We choose a random type of enemy from the available types
            index = RandFromInterval(0, gameState.namesOfEnemies.length - 1)
            object = gameState.namesOfEnemies[index]

            let instance = new Enemy({
                position: RandPositionOutsideBox(canvas.width, canvas.height),
                ...enemySettings[object],
            });

            enemiesToUpdate.push(instance);
        }

    }
    // if (seconds % 10 != 0 && activated == false) {
    //     activated = true
    // }
    if (seconds === 50) {
        gameState.maxEnemiesOnScreen = 40
    }
    if (seconds === 25) {
        gameState.namesOfEnemies = ["ghost", ...gameState.namesOfEnemies]
    }
    if (seconds === 30/* && act === true*/) {
        // act = false
        let instance = new Enemy({
            position: RandPositionOutsideBox(canvas.width, canvas.height),
            ...enemySettings["beast"]
        });
        enemiesToUpdate.push(instance);
    }
    if (seconds === 55) {
        gameState.gameState.namesOfEnemies = [...gameState.namesOfEnemies, "nightmare"]
    }
    if (seconds === 75/* && act1*/) {
        // act1 = false
        let instance = new Enemy({
            position: RandPositionOutsideBox(canvas.width, canvas.height),
            ...enemySettings["demon"]
        });
        enemiesToUpdate.push(instance);
    }
    if (seconds === 80) {
        gameState.namesOfEnemies = [...gameState.namesOfEnemies, "beast"]
    }
    if (seconds === 100) {
        gameState.namesOfEnemies = [ ...gameState.namesOfEnemies, "demon"]
    }

}

export default gameController