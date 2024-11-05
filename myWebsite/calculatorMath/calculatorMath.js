/*
    Student Name: Matthew Sleight
    File Name: calculatorMath.js
    Date: 10/13/2024
*/

function calculator() {
    /* Get the value of the bill amount from the input field */
    const theBillAmount = document.getElementById("billAmount").value;
    /* Get the value of the tip percentage from the input field */
    const theTipPercentage = document.getElementById("tipPercentage").value;

    /* Convert the inputs to numbers */
    const billAmount = parseFloat(theBillAmount);
    const tipPercentage = parseFloat(theTipPercentage);


    // // Troubleshooting / Debugging
    // console.log("Bill Amount (type): ", typeof billAmount);
    // console.log("Tip Percentage (type): ", typeof tipPercentage);


    /* Call the function to calculate the tip based on user input */
    calculate(billAmount, tipPercentage);
}

function calculate(theBillAmount, theTipPercentage) {
    /* Validate the user input */
    if (theBillAmount <= 0) {
        alert("Your input was invalid.");
        return calculator;
    }
    else {
        /* Calculate tip */
        let tip = theBillAmount * theTipPercentage;

        /* Calculate total amount */
        let total = theBillAmount + tip;

        document.getElementById("result").innerHTML = "Tip: $" + tip + " | Total: $" + total;
    }
}