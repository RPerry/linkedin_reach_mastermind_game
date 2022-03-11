export default class User {
    userName
    guessNumber

    constructor(uName) {
        this.userName = uName;
    }

    getUserName(){
        return this.userName;
    }

    getGuessNumber() {
        return this.guessNumber;
    }

    // submitGuess(guess){
        // save guess
        // check if correct
        // return feedback
    // }

}