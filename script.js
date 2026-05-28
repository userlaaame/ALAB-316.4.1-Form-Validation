console.log("==========================Part 3: Registration Form Validation Requirements======================")

// Registration Form - Username Validation:
// The username cannot be blank. 
// The username must be at least four characters long. 

// ====="Check Index.html"=====

//form selected
const form = document.getElementById('registration')

//handle form submission
form.addEventListener("submit", validate);

//event handler function with the event object
function validate(e) {
    // we need to prevent form from refreshing page
    e.preventDefault();

    //We need the Username value that the user typed into the input
    const username = form[0].value



// The username must contain at least two unique characters.
if (uniqueCharacters(username) < 2) {
    alert('The username must contain atleast two unique characters')
    return false;
}

// The username cannot contain any special characters or whitespace.
//Whitespace regular expression syntax
    if (/\s/.test(username)) {
        alert('The username cannot contain whitespace.')
        return false;
    }

    //Negated Character set to check for anything other than a-z or 0-9
    if (/[^a-zA-Z0-9]/.test(username)) {
        alert('The username cannot contain any special characters.')
        return false;
    }    

    //EMAIL VALIDATION
    // Registration Form - Email Validation:
// The email must be a valid email address.
// ====="Check Index.html"=====

// The email must not be from the domain "example.com."
function validateEmail(e) {
    if(/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(e) && !e.endWith("example.com")) {
        return;
    }

// if (/["example.com"]/) {
      
    // alert('The domain cannot be from example.com.')

    }
}

function uniqueCharacters(str) {
    let unique = [];

    let uniqueCharacters = [];
    //we'll loop over the string and check each character "c"
    for (let c of str) {
        //we'll check if the array includes the character
        if (uniqueCharacters.includes(c) === false) {
            uniqueCharacters.push(c);
        }
    }
    return uniqueCharacters.length
} 


