function startCalculator() {
    const calculations = [];
    const validResults = [];
    
    let continueCalculating = true;

    while (continueCalculating) {
        const firstInput = prompt("Enter the first number:");

        if (firstInput === null) {
            break;
        }

        const operator = prompt(
            "Enter an operator: +, -, *, /, or %"
        );

        if (operator === null) {
            break;
        }

        const secondInput = prompt("Enter the second number:");

        if (secondInput === null) {
            break;
        }

        const x = Number(firstInput);
        const y = Number(secondInput);

        let result;
        let validResult = true;

        if (
            firstInput.trim() === "" ||
            secondInput.trim() === "" ||
            isNaN(x) ||
            isNaN(y)
        ) {
            result = "Error: Enter valid numbers.";
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
                        result = "Error: Cannot divide by zero.";
                        validResult = false;
                    } else {
                        result = x / y;
                    }
                    break;

                case "%":
                    if (y === 0) {
                        result = "Error: Cannot divide by zero.";
                        validResult = false;
                    } else {
                        result = x % y;
                    }
                    break;

                default:
                    result = "Error: Invalid operator.";
                    validResult = false;
            }
        }

        calculations.push({
            firstNumber: firstInput,
            operator: operator,
            secondNumber: secondInput,
            result: result,
            valid: validResult
        });

        if (validResult) {
            validResults.push(result);
        }

        continueCalculating = confirm(
            "Would you like to perform another calculation?"
        );
    }

    displayResults(calculations, validResults);
}

function displayResults(calculations, validResults) {
    const resultsArea = document.getElementById("results");

    let output = "";

    output += "<h2>Calculation Results</h2>";
    output += "<table>";

    output += "<tr>";
    output += "<th>Number 1</th>";
    output += "<th>Operator</th>";
    output += "<th>Number 2</th>";
    output += "<th>Result</th>";
    output += "</tr>";

    if (calculations.length === 0) {
        output += "<tr>";
        output += "<td colspan='4'>No calculations were entered.</td>";
        output += "</tr>";
    } else {
        for (let i = 0; i < calculations.length; i++) {
            const calculation = calculations[i];

            output += "<tr>";
            output += "<td>" + calculation.firstNumber + "</td>";
            output += "<td>" + calculation.operator + "</td>";
            output += "<td>" + calculation.secondNumber + "</td>";

            if (calculation.valid) {
                output += "<td>" + calculation.result + "</td>";
            } else {
                output +=
                    "<td class='error'>" +
                    calculation.result +
                    "</td>";
            }

            output += "</tr>";
        }
    }

    output += "</table>";

    output += "<h2>Summary of Valid Results</h2>";
    output += "<table>";

    output += "<tr>";
    output += "<th>Minimum</th>";
    output += "<th>Maximum</th>";
    output += "<th>Average</th>";
    output += "<th>Total</th>";
    output += "</tr>";

    if (validResults.length === 0) {
        output += "<tr>";
        output +=
            "<td colspan='4'>There are no valid results to summarize.</td>";
        output += "</tr>";
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

            total += validResults[i];
        }

        const average = total / validResults.length;

        output += "<tr>";
        output += "<td>" + minimum + "</td>";
        output += "<td>" + maximum + "</td>";
        output += "<td>" + average.toFixed(2) + "</td>";
        output += "<td>" + total + "</td>";
        output += "</tr>";
    }

    output += "</table>";

    resultsArea.innerHTML = output;
}
