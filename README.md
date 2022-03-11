This README should explain how an
interviewer could run your code, document your thought process and/or code structure, and
describe any creative extensions attempted or implemented. There is no prescribed format for
the README, but it should be clear and unambiguous in listing all the steps in building, running,
and playing the game you built (you should make no assumptions about what software the
interviewer has, and err on the side of being explicit). Your interviewers will be engineers, so
you can assume a certain level of technical ability as relates to installing what your project
requires. Please create a new public repository in Github and provide the link to your recruiter

Game Instructions:
- The game will select a combination of random numbers between 0-7 based on their choice of game difficulty. 4 numbers on easy, 5 on medium, 6 on hard.

- Players will have 10 tries to guess the combination.

- Players will be given feedback after every guess.

- Players will be able to view how many guesses you have remaining, as well as how long you have been playing the game

- Players are also able to view the history of their guesses and feedback within the game

To run the Mastermind Game locally:
    You will need to have npm and Node.js installed
- clone down the repository
- run 'npm install' in your terminal to install the following dependencies: 
    - bootstrap
    - core-js
    - easytimer.js
    - vue
    - vue-router
- to compile and view the game in your browser, run 'npm run serve' and view http://localhost:8080/ in your browser

The game has also been deployed to Github Pages and can be viewed and played at ______

Game Details:

This game is built with Vue, Javascript and HTML/CSS.
I also utilized the Random.org API, Bootstrap and easytimer.js.

I implemented two extensions:
- difficulty levels and adjusting the length of the combination
- timing how long it takes for the user to either win the game or use all 10 of their guesses



The game checks each guess for input that does not follow the game rules - such as numbers over 7 or combinations longer or shorter than specified based on their chosen level of difficulty.

It also checks if the response from the GET request returns a status code other than 200, meaning that a random number combination could not be received and displays an error message to the user.

Used CSS Grid for the layout.



# Linkedin Reach Code Challege: Mastermind Game

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
