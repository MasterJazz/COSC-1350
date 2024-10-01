/*
    Student Name: Matthew Sleight
    File Name: fizzBuzz.js
    Date: 09/30/2024
*/

/* Defining each variable */
let number = 1;
let fizz = 'Fizz';
let buzz = 'Buzz';

/* Loop result until 100 */
while (number <= 100) {
    /* Check for numbers divisible by 3 */
    if (number % 3 == 0) {
        /* Replace number with 'Fizz' */
        console.log(fizz);
        number += 1;
    }
    /* Check for numbers divisible by 5 */
    if (number % 5 == 0) {
        /* Replace number with 'Buzz' */
        console.log(buzz);
        number += 1;
    } else {
        /* Printing each number */
        console.log(number);
        number += 1;
    }
}