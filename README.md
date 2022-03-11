# Linkedin Reach Code Challege: Mastermind Game
### Game Instructions:
- The game will select a combination of random numbers between 0-7 based on the users choice of game difficulty. 4 numbers on easy, 5 on medium, 6 on hard.

- Players will have 10 tries to guess the combination.

- Players will be given feedback after every guess.

- Players will be able to view how many guesses you have remaining, as well as how long you have been playing the game

- Players are also able to view the history of their guesses and feedback within the game

### To Run the Mastermind Game Locally:
- You will need to have npm and Node.js installed
- Clone down the repository
- Run ``` npm install ``` in your terminal to install the following dependencies: 
    - bootstrap
    - core-js
    - easytimer.js
    - vue
    - vue-router
- To compile and view the game in your browser, run ``` npm run serve ``` and view http://localhost:8080/ in your browser

**The game has also been deployed to Github Pages and can be viewed and played at ______**

### Game Details:

This game is built with Vue, Javascript and HTML/CSS/CSS Grid.
I also utilized the Random.org API, Bootstrap and EasyTimer.js.

I implemented two extensions:
- difficulty levels and adjusting the length of the combination
- timing how long it takes for the user to either win the game or use all 10 of their guesses

#### Code Structure:

I created the classes Game and Guess to store the data needed for each structure and reduce the amount of repeated code.

Game has the properties gameCombination, gameGuessesRemaining, gameDifficultyLevel and apiErrorMessage. It also has the methods
changeDifficultyLevel() to determine the length of the combination based on the users difficulty choice, newGameCombination() - to send a GET request to the Random.org API to get a number combination and to call checkStatus() to check if the response from the GET request returns a status code other than 200, meaning that a random number combination could not be received, and displays an error message to the user. storeGameCombination() adds the number combination to an array and stores it in the Game objects gameCombination property.

Guess has the properties guessNumber, guessCombination and guessFeedback to store the data of each guess and to easily display the history of guesses and feedback.

There are 3 components. playButton is the home page and displays the game instructions and start button. The UI for gameDifficulty gathers the users chosen level of difficulty and handles the logic for creating a new Game object and starting the game timer. It passes the game and timer objects as props to gamePlay, its child component. gamePlay handles all of the game playing logic. It's UI displays the time elapsed, number of turns remaining, feedback for each guess, guess input area, and history of guesses. When the game has ended, it displays a message depending on whether the user won or lost, time spent on the game and number of tries it took to win, if the user did not use all 10.  
