/*
    Student Name: Matthew Sleight
    File Name: guessingGame.js
    Date: 11/04/2024
*/

// Cache frequently accessed DOM elements for efficiency
const messageElement = document.getElementById("message");
const remainingTurnsElement = document.getElementById("remainingTurns");
const previousGuessesElement = document.getElementById("previousGuesses");
const submitButton = document.getElementById("submitResponse");

function startGame() {
    // Initialize the game
    randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    remainingTurns = 10;
    previousGuesses = []; // Store guesses

    // Update the UI
    messageElement.innerHTML = "Enter a number between 1 and 100 to get started!";
    remainingTurnsElement.innerHTML = "Turns left: " + remainingTurns;
    previousGuessesElement.innerHTML = "Previous Guesses: None";
}

function guess() {
    /* Get the player's guess from the input field */
    const guess = parseInt(document.getElementById("guessInput").value);

    /* Validate the guess */
    if (!guess || guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100.");
        return;
    }

    // Add guess to the list of previous guesses
    previousGuesses.push(guess);

    // Check if the guess is correct or not
    if (guess === randomNumber) {
        messageElement.innerHTML = "Correct! Nicely done!";
        disableSubmitButton(); // Disable the button when the game ends
        return;
    }
    
    // Make sure to subtract the amount of turns remaining after each guess
    remainingTurns--;

    // If turns are finished, display the game over message
    if (remainingTurns === 0) {
        messageElement.innerHTML = "You ran out of turns... The correct number was: " + randomNumber;
        remainingTurnsElement.innerHTML = "Turns left: 0";
        disableSubmitButton(); // Disable the button when the game ends
    } else {
        // Inform the user if the guess was too low or too high
        let hint;
        if (guess < randomNumber) {
            hint = "low";
        } else {
            hint = "high";
        }
        messageElement.innerHTML = "Incorrect. Your guess is too " + hint + ".";

        // Inform user how many guesses are left
        remainingTurnsElement.innerHTML = "Turns left: " + remainingTurns;

        // Inform user what the previous guess was
        previousGuessesElement.innerHTML = "Previous guesses: " + previousGuesses;
    }
}

function disableSubmitButton() {
    submitButton.disabled = true;
}

function restartGame() {
    startGame();

    // Re-enable the button on restart
    submitButton.disabled = false;
}