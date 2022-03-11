export default class Game {
    gameCombination
    gameGuessesRemaining
    gameDifficultyLevel

    constructor() {
        this.gameCombination = null;
        this.gameGuessesRemaining = 10;
        this.gameDifficultyLevel = "4";
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

    newGameCombination() {
        // sending a get request to random.org api to get game combination
        fetch(`https://www.random.org/integers/?num=${this.gameDifficultyLevel}&min=0&max=7&col=1&base=10&format=plain&rnd=new`, {
            method: 'GET'
        })
        // .then((response) => this.checkStatus(response))
        .then((response) => response.text())
        .then((data) => this.storeGameCombination(data))
        .catch(e => {
            console.log(e);
        });
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


          
    // checkStatus(getResponse) {
    //     if (getResponse.status != 200) {
    //         // throw new this.statusCode(getResponse.status);
    //         console.log(getResponse.status);
    //     } else {
    //         return getResponse.json()
    //     }
    // }
          
    // statusCode(code) {
    // let message = `Sorry, there seems to be an error loading the number combination. Status code: ${code}`;
    // console.log(message);
    // return message;
    // }

}