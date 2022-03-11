export default class Game {
    gameCombination
    gameGuessesRemaining
    gameDifficultyLevel
    apiErrorMessage

    constructor() {
        this.gameCombination = null;
        this.gameGuessesRemaining = 10;
        this.gameDifficultyLevel = "4";
        this.apiErrorMessage = "";
    }

    getGameCombination() {
        return this.gameCombination;
    }

    getGameGuessesRemaining() {
        return this.gameGuessesRemaining;
    }

    getGameDifficultyLevel() {
        return this.gameDifficultyLevel;
    }

    getErrorMessage() {
        return this.apiErrorMessage;
    }

    newGameCombination() {
        // sending a get request to random.org api to get game combination
        // integers changed to vintegers to test status code
        fetch(`https://www.random.org/vintegers/?num=${this.gameDifficultyLevel}&min=0&max=7&col=1&base=10&format=plain&rnd=new`, {
            method: 'GET'
        })
        .then((response) => this.checkStatus(response))
        // .then((response) => response.text())
        // .then((text) => console.log(text))
        // .catch(e => {
        //     console.log(e);
        // })
        ;
    }

    storeGameCombination(combination) {
        // using regex, I'm splitting the number combination from the random num api on the new lines and storing in an array
        const numArray = combination.split(/\r?\n/);
        // because the number combination string ended on a newline, it gets included as the last item in the array,
        // so I am removing it with .pop()
        numArray.pop();
        this.gameCombination = numArray;
        console.log(this.gameCombination);
    }

    changeDifficultyLevel(level) {
        switch(level) {
            case "easy":
                this.gameDifficultyLevel = "4";
                break;
            case "medium":
                this.gameDifficultyLevel = "5";
                break;
            case "hard":
                this.gameDifficultyLevel = "6"
                break;
        }
    }
    
    // checking the status code and if it not 200, creating an error message. 
    // If it is 200, storing the game combination
    checkStatus(getResponse) {
        if (getResponse.status != 200) {
            this.apiErrorMessage = `Sorry, there seems to be an error loading the number combination. Status code: ${getResponse.status}`;
        } else {
            this.storeGameCombination(getResponse.text());
        }
    }

}