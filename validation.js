// Clears the warnings and success message.
function clearWarnings() {
    document.getElementById("message").innerHTML = "";
}

// Displays a warning with the field name in the given color.
function showWarning(text, field, color) {
    document.getElementById("message").innerHTML +=
        "<p>" + text + " <strong style='color:" + color + "'>" +
        field + "</strong></p>";
}

// Checks whether a field is empty or does not match its regular expression.
function checkField(id, regex, name) {
    let value = document.getElementById(id).value;

    if (value.match(/^\s*$/)) {
        showWarning("Please Enter", name, "red");
        return false;
    } else if (!value.match(regex)) {
        showWarning("Please Enter", "a valid " + name.toLowerCase(), "orange");
        return false;
    }

    return true;
}

// Validates the form and shows a success message if all checks pass.
function validateForm() {
    clearWarnings();

    let valid = true;

    if (!checkField("username", /^[a-z0-9]{4,12}$/, "Username")) {
        valid = false;
    }

    if (!checkField(
        "email",
        /^[^\s@]+@[^\s@]+\.(net|com|org|edu)$/i,
        "Email"
    )) {
        valid = false;
    }

    if (!checkField(
        "phone",
        /^\(\d{3}\)-\d{3}-\d{4}$/,
        "Phone Number"
    )) {
        valid = false;
    }

    let password = document.getElementById("password").value;

    if (!checkField("password", /^[A-Za-z0-9_]{9,}$/, "Password")) {
        valid = false;
    } else if (!password.match(/[A-Z]/) ||
               !password.match(/[a-z]/) ||
               !password.match(/[0-9]/) ||
               !password.match(/_/)) {

        showWarning("Please Enter", "a valid password", "orange");
        valid = false;
    }

    let confirmation = document.getElementById("confirmPassword").value;

    if (confirmation !== password) {
        valid = false;
        alert("passwords do not match");
    }

    let genders = document.getElementsByName("gender");
    let selectedGender = "";

    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            selectedGender = genders[i].value;
        }
    }

    if (selectedGender === "") {
        showWarning("Please Select", "Gender", "red");
        valid = false;
    } else if (!selectedGender.match(/^(Male|Female|Other)$/)) {
        showWarning("Please Select", "a valid gender", "orange");
        valid = false;
    }

    let age = document.getElementById("age").value;

    if (age === "") {
        showWarning("Please Select", "Age Group", "red");
        valid = false;
    } else if (!age.match(/^(under21|21to25|26to35|36to50|50)$/)) {
        showWarning("Please Select", "a valid age group", "orange");
        valid = false;
    }

    if (valid) {
        document.getElementById("message").innerHTML =
            "<p>Form submitted successfully!</p>";

        window.location.hash = "message";
    }
}

document.getElementById("registrationForm").onreset = clearWarnings;
