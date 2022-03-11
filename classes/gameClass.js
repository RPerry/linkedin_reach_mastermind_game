export default class Game {
    gameNumber
    gameCombination
    gameGuessesRemaining
    gameUsername

    constructor(gaNumber, gaCombination, gaGuessesRemaining, gaUsername) {
        this.gameNumber = gaNumber;
        this.gameCombination = gaCombination;
        this.gameGuessesRemaining = gaGuessesRemaining;
        this.gameUsername = gaUsername;
    }

    getGameNumber() {
        return this.gameNumber;
    }

    getGameCombination() {
        return this.gameCombination;
    }

    getGameGuessesRemaining() {
        return this.gameGuessesRemaining;
    }

    getGameUsername() {
        return this.gameUsername;
    }

}