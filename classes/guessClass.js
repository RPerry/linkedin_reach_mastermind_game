export default class Guess {
    guessNumber
    guessCombination
    guessFeedback

    constructor(gNumber, gCombination, gFeedback) {
        this.guessNumber = gNumber;
        this.guessCombination = gCombination;
        this.guessFeedback = gFeedback;
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

}