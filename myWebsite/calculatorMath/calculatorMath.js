/*
    Student Name: Matthew Sleight
    File Name: calculatorMath.js
    Date: 10/13/2024
*/

function main() {
    /* Get the value of the bill amount from the input field */
    const theBillAmount = document.getElementByld("billAmount").value;
    /* Get the value of the tip percentage from the input field */
    const theTipPercentage = document.getElementByld("tipPercentage").value;

    /* Call the function to calculate the tip based on user input */
    calculate(theBillAmount, theTipPercentage);
}

function calculate(theBillAmount, tipPercentage) {
    /* Validate the user input */
    if (theBillAmount == 0 || theBillAmount == String) {
        alert("Your input was invalid.");
        return main;
    }
    else {
        /* Calculate tip */
        let tip = (theBillAmount * tipPercentage) / 100;

        /* Calculate total amount */
        let total = theBillAmount + tip;

        calculate.innerHTML = "The calculated tip was: " + total;
        return "Tip: " + tip + "Total: " + total;
    }
}