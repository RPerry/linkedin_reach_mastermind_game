export default class Game {
    gameNumber
    gameCombination
    gameGuessesRemaining
    gameUsername

    constructor(gaNumber, gaUsername) {
        this.gameNumber = gaNumber;
        this.gameCombination = null;
        this.gameGuessesRemaining = 10;
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

    newGameCombination() {
        fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new", {
            method: 'GET'
        })
        // .then((response) => checkStatus(response))
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


          
        //   checkStatus(getResponse) {
        //     if (getResponse.status != 200) {
        //         throw new this.statusCode(getResponse.status);
        //     } else {
        //         return getResponse.json()
        //     }
        //   },
          
        //   statusCode: function statusCodeException(code) {
        //     let message = `Sorry, there seems to be an error loading the number combination. Status code: ${code}`;
        //     console.log(message);
        //     return message;
        //   },
        
          // iterating through JSON  object and creating a div element for each trivia question and adding it the DOM
        //   addQuestion: function addQuestionToPage(data) {
        
        //     for (let i= 0; i<= data.results.length; i++) {
        //       const questionSection = document.createElement("div");
        //       questionSection.className = "questionItem";
              
        //       let triviaInfo = {};
        
        //       for (const [key, value] of Object.entries(data.results[i])) {
        //         triviaInfo[key] = value;
        //       }
        
        //       const sectionContents = 
        //       `
        //       <h3 class="category">${triviaInfo.category}</h3>
        //       <p class="question">${triviaInfo.question}</p>
        //       `;
        
        //       questionSection.innerHTML = sectionContents;
        //       const allTrivia = document.getElementsByClassName("allTriviaQ")[0];
        //       allTrivia.appendChild(questionSection);
        //       this.answers.push(triviaInfo.correct_answer);
        //       let num = i + 1
        //       this.answerString +="     " + num + ". " + triviaInfo.correct_answer
        //     }
        //   }
    // }

}