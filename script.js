// Registration Form - Username Validation:
// The username cannot be blank.handled by "required" in HTML
// The username must be at least four characters long.  handled by minlength="4" in HTML

const form = document.getElementById('registration')
const loginForm = document.getElementById('login')
const errorDisplay = document.getElementById('errorDisplay')
const users = JSON.parse(localStorage.getItem('users') || '{}');

form.addEventListener("submit", validate);
loginForm.addEventListener("submit", validateLogin);

function validate(e) {
    e.preventDefault();
    errorDisplay.innerHTML = '';

    const username = form[0].value
    const email = form[1].value

    // The username must contain at least two unique characters.
    if (uniqueCharacters(username) < 2) {
        errorDisplay.innerHTML = 'The username must contain at least two unique characters.';
        return false;
    }

    // The username cannot contain any special characters or whitespace.
    if (/\s/.test(username)) {
        errorDisplay.innerHTML = 'The username cannot contain whitespace.';
        return false;
    }

    if (/[^a-zA-Z0-9]/.test(username)) {
        errorDisplay.innerHTML = 'The username cannot contain any special characters.';
        return false;
    }

    if (users[username.toLowerCase()]) {
        errorDisplay.innerHTML = 'That username is already taken.';
        return false;
    }

    // Email validation
    const emailError = validateEmail(email);
    if (emailError) {
        errorDisplay.innerHTML = emailError;
        return false;
    }

    const password = form[2].value
    const passwordCheck = form[3].value

    // Password validation
    const passwordError = validatePassword(password, passwordCheck, username);
    if (passwordError) {
        errorDisplay.innerHTML = passwordError;
        return false;
    }

    // Terms and Conditions
    if (!form.terms.checked) {
        errorDisplay.innerHTML = 'You must accept the Terms and Conditions.';
        return false;
    }

    // Store user — key is lowercase username
    const storedUsername = username.toLowerCase();
    users[storedUsername] = {
        email: email.toLowerCase(),
        password: password
    };
    localStorage.setItem('users', JSON.stringify(users));

    form.reset();
    errorDisplay.innerHTML = `Registration successful! Welcome, ${storedUsername}.`;
    alert(`Registration successful! Welcome, ${storedUsername}.`);
    console.log('Registered users:', users);
}

// Registration Form - Email Validation:
// The email must be a valid email address.
// The email must not be from the domain "example.com."
function validateEmail(email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return 'The email must be a valid email address.';
    }
    if (email.endsWith('example.com')) {
        return 'The email must not be from the domain "example.com."';
    }
    return '';
}

// Login Form - Username Validation
function validateLogin(e) {
    e.preventDefault();
    errorDisplay.innerHTML = '';

    const username = loginForm.username.value;

    if (!username) {
        errorDisplay.innerHTML = 'Username cannot be blank.';
        return false;
    }

    if (!users[username.toLowerCase()]) {
        errorDisplay.innerHTML = 'That username does not exist.';
        return false;
    }

    const keepLoggedIn = loginForm.persist.checked;
    loginForm.reset();
    errorDisplay.innerHTML = keepLoggedIn
        ? `Welcome back, ${username.toLowerCase()}! You will be kept logged in.`
        : `Welcome back, ${username.toLowerCase()}!`;
}

// Registration Form - Password Validation
function validatePassword(password, passwordCheck, username) {
    if (password.length < 12) {
        return 'Password must be at least 12 characters long.';
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        return 'Password must have at least one uppercase and one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number.';
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return 'Password must contain at least one special character.';
    }
    if (/password/i.test(password)) {
        return 'Password cannot contain the word "password."';
    }
    if (password.toLowerCase().includes(username.toLowerCase())) {
        return 'Password cannot contain your username.';
    }
    if (password !== passwordCheck) {
        return 'Both passwords must match.';
    }
    return '';
}

function uniqueCharacters(str) {
    let uniqueChars = [];
    for (let c of str) {
        if (!uniqueChars.includes(c)) {
            uniqueChars.push(c);
        }
    }
    return uniqueChars.length;
}


