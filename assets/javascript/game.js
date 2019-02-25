///////// Display
//  Press any key to get started!
//  Win & Lose
//  _ _ _ _ _ (Same length of the answer)
//  number of Guess Remaining
//  Letters Already Guessed

///////// Process
// Pick the random word
// display '_' same as word length
// User Enter Key
// if it is in answer word, reveal it.
// else, write it in letters already guessed & decrease Number of Guesses Remaining.
// if userguess = word, win++
// if remaining ==0, lose++


///////// STEP1. define var & pick the answer and hide it.
// 1. define variables
var validLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var wordCollection = ['tomato', 'cherries', 'raspberry', 'radish', 'strawberry', 'watermelon', 'squash', 'peach', 'carrot', 'orange', 'pumpkin', 'banana', 'lemon', 'corn', 'pineapple', 'mango', 'kiwi', 'apple', 'lime', 'pear', 'avocado', 'broccoli', 'eggplant', 'onion', 'plum', 'blackberry', 'grapes', 'fig', 'beet', 'blueberry']
var word = ""
var win = 0
var lose = 0
var remaining = 12
var lettersAlreadyGuessed = []

// 2-1. pick the answer from word collection
var answer = wordCollection[Math.floor(Math.random() * wordCollection.length)];
console.log(answer)

// 2-2. change the answer in array
var arrayOfAnswer = answer.split("")
console.log(arrayOfAnswer)

// 3. display word with '_' in same length of answer & change it in array
word = "_".repeat(answer.length)
var arrayOfWord = word.split("")
console.log(arrayOfWord)

///////// STEP2. set the functions 
// 1. function to check if the letter is in array. 
function includeCheck(arr, letter) {
    if (arr.includes(letter) == true) {
        return true
    }
    else {
        return false
    }
}

// 2. function to decrease remaining by 1 and add the letter into letter already guessed. (in case of wrong letter)
function wrongLetter(letter) {
    lettersAlreadyGuessed.push(letter)
    remaining = remaining - 1
    console.log(lettersAlreadyGuessed)
    console.log('remaining: ' + remaining)
}

// 3. if the letter is in array1, change element in same index of array2 to letter. (in case of correct letter)
function replace(arr1, arr2, letter) {
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] == letter) {
            arr2[i] = letter
            console.log(arr2)
        }
    }
}

// 4. function to append variables into html
function append(id, variable) {
    var targetDiv = document.getElementById(id)
    targetDiv.textContent = variable
}

// 5. function to reset the game - reset & append word, remaining and letterAlreadyGuessed
function newGame() {
    word = ""
    remaining = 12
    lettersAlreadyGuessed = []
    answer = wordCollection[Math.floor(Math.random() * wordCollection.length)]
    arrayOfAnswer = answer.split("")
    word = "_".repeat(answer.length)
    arrayOfWord = word.split("")
    append("word", arrayOfWord.join(" "))
    append("remaining", remaining)
    append("letters_already_guessed", lettersAlreadyGuessed)

    console.log('-----new game-----')
    console.log('win: ' + win)
    console.log('lose: ' + lose)
    console.log('remaining: ' + remaining)
    console.log('letters already guessed: ' + lettersAlreadyGuessed)
    console.log('new answer: ' + arrayOfAnswer)
    console.log('word: ' + arrayOfWord)
    console.log('------------------')
}


///////// STEP3. set the onkeyup event
// define var howManyKey to know when user press their first key
var howManyKey = 0

// when user press the key,
document.onkeyup = function (event) {

    // increase var howManyKey
    howManyKey++

    var userEnter = event.key.toLocaleLowerCase()
    console.log(userEnter)

    // if it is their first key, start the new game
    if (howManyKey == 1) {
        newGame()
        append("direction","")
    }

    // if it is not the first key,
    if (howManyKey > 1) {

        // if the userEnter is valid letter,
        if (includeCheck(validLetter, userEnter)) {

            // if the userEnter is in answer, replace '_' to userEnter
            if (includeCheck(arrayOfAnswer, userEnter)) {
                replace(arrayOfAnswer, arrayOfWord, userEnter)
                append("word", arrayOfWord.join(" "))

                // if all the letters are revealed (if there's no '_'), win++ & new game & append win to HTML
                if (includeCheck(arrayOfWord, "_") == false) {
                    win++

                    console.log('win: ' + win)
                    newGame()
                    append("win", win)
                }
            }

            // if the userEnter is not in both answer and letter already guessed, run 'wrongletter' function
            else if (includeCheck(arrayOfAnswer, userEnter) == false && includeCheck(lettersAlreadyGuessed, userEnter) == false) {
                wrongLetter(userEnter)
                append("remaining", remaining)
                append("letters_already_guessed", lettersAlreadyGuessed)

                // if remaining is 0, lose++ & new game & append lose to HTML
                if (remaining == 0) {
                    lose++

                    console.log('lose: ' + lose)
                    newGame()
                    append("lose", lose)
                }
            }
        }
    }
}



