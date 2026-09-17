let calculations = [];
let validResults = [];
let continueCalculating = true;

while (continueCalculating) {
    let xInput = prompt("Enter the first number (x):");

    if (xInput === null) {
        break;
    }

    let operator = prompt(
        "Enter an operator (+, -, *, /, or %):"
    );
    
    let yInput = prompt("Enter the second number (y):");

    if (yInput === null) {
        break;
    }

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

    continueCalculating = confirm(
        "Do you want to perform another calculation?"
    );
}

document.write("<h2>Calculation Results</h2>");
document.write("<table>");

document.write("<tr>");
document.write("<th>Number 1</th>");
document.write("<th>Operator</th>");
document.write("<th>Number 2</th>");
document.write("<th>Result</th>");
document.write("</tr>");

if (calculations.length === 0) {
    document.write(
        "<tr><td colspan='4'>No calculations were entered.</td></tr>"
    );
} else {
    for (let i = 0; i < calculations.length; i++) {
        document.write("<tr>");

        document.write(
            "<td>" + calculations[i].x + "</td>"
        );

        document.write(
            "<td>" + calculations[i].operator + "</td>"
        );

        document.write(
            "<td>" + calculations[i].y + "</td>"
        );

        if (calculations[i].valid) {
            document.write(
                "<td>" + calculations[i].result + "</td>"
            );
        } else {
            document.write(
                "<td class='error'>" +
                calculations[i].result +
                "</td>"
            );
        }

        document.write("</tr>");
    }
}

document.write("</table>");

document.write("<h2>Summary of Valid Results</h2>");
document.write("<table>");

document.write("<tr>");
document.write("<th>Minimum</th>");
document.write("<th>Maximum</th>");
document.write("<th>Average</th>");
document.write("<th>Total</th>");
document.write("</tr>");

if (validResults.length === 0) {
    document.write(
        "<tr>" +
        "<td colspan='4'>" +
        "There are no valid results to summarize." +
        "</td>" +
        "</tr>"
    );
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
    document.write("<th>x</th>");
    document.write("<th>op</th>");
    document.write("<th>y</th>");
    document.write("<th>result</th>");
    document.write("</tr>");
}

document.write("</table>");
