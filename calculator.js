let calculations = [];
let validResults = [];
let shouldContinue = true;


// This will loop until the user clicks "Cancel"
// This code ask the user for two numbers and an operator and then performs the calculation and stores the result.
while (shouldContinue) {
    let xInput = prompt("Please Enter X:");

    if (xInput === null) {
        break;
    }
    
    let yInput = prompt("Please Enter Y:");

    if (yInput === null) {
        break;
    }

     let operator = prompt(
        "Please Enter an operator (+, -, *, /, or %):"
    );
    
    if (operator === null) {
        break;
    }

    let x = Number(xInput);
    let y = Number(yInput);
    let result;
    let validResult = true;

    if (
        xInput === "" ||
        yInput === "" ||
        isNaN(xInput) ||
        isNaN(yInput)
    ) {
        result = "wrong input number";
        validResult = false;
    } else {
        switch (operator) {
            case "+":
                result = x + y;
                break;

            case "-":
                result = x - y;
                break;

            case "*":
                result = x * y;
                break;

            case "/":
                if (y === 0) {
                    result = "computation error";
                    validResult = false;
                } else {
                    result = x / y;
                }
                break;

            case "%":
                if (y === 0) {
                    result = "computation error";
                    validResult = false;
                } else {
                    result = x % y;
                }
                break;

            default:
                result = "computation error";
                validResult = false;
        }
    }

    calculations.push({
        x: xInput,
        operator: operator,
        y: yInput,
        result: result,
        valid: validResult
    });

    if (validResult) {
        validResults.push(result);
    }

    shouldContinue = confirm(
        "Do you want to perform another calculation?"
    );
}

// This grabs all the calculations and displays them in a table format.
document.write("<h2>Summary of Valid Results</h2>");
document.write("<table>");

document.write("<tr>");
document.write("<th>Min</th>");
document.write("<th>Max</th>");
document.write("<th>Average</th>");
document.write("<th>Total</th>");
document.write("</tr>");

if (validResults.length === 0) {
    document.write("<tr>");
    document.write(
        "<td colspan='4'>There are no valid results to summarize.</td>"
    );
    document.write("</tr>");
} else {
    let minimum = validResults[0];
    let maximum = validResults[0];
    let total = 0;

    for (let i = 0; i < validResults.length; i++) {
        if (validResults[i] < minimum) {
            minimum = validResults[i];
        }

        if (validResults[i] > maximum) {
            maximum = validResults[i];
        }

        total = total + validResults[i];
    }

    let average = total / validResults.length;

    document.write("<tr>");
    document.write("<td>" + minimum + "</td>");
    document.write("<td>" + maximum + "</td>");
    document.write("<td>" + average + "</td>");
    document.write("<td>" + total + "</td>");
    document.write("</tr>");
}

document.write("</table>");
