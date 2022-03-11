export default class Guess {
    guessNumber
    guessCombination
    guessFeedback
    guessUsername

    constructor(gNumber, gCombination, gFeedback, gUsername) {
        this.guessNumber = gNumber;
        this.guessCombination = gCombination;
        this.guessFeedback = gFeedback;
        this.guessUsername = gUsername;
    }

    getGuessNumber() {
        return this.guessNumber;
    }

    getGuessCombination() {
        return this.guessCombination;
    }

    getGuessFeedback() {
        return this.guessFeedback;
    }

    getGuessUsername() {
        return this.guessUsername;
    }

}