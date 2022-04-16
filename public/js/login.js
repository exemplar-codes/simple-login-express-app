function getInput() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const enteredInput = { username: usernameInput.value, password: passwordInput.value };

    usernameInput.value = '';
    passwordInput.value = '';

    return enteredInput;
}

async function checkPassword(enteredInput) {
    const response = await fetch('/login-check', (options = {
        method: "POST",
        body: JSON.stringify(enteredInput),
        headers: {
            'Content-Type': 'application/json'
        }
    }));

    if (response == 'PASSWORD_MATCHES')
        return true;

    if (response == 'USERNAME_INEXISTENT') {
        const usernameWarning = document.getElementById('username-warning');
        usernameWarning.style.visibility = 'visible';
        setTimeout(() => {
            usernameWarning.style.visibility = 'hidden';
        }, 1500)
    }
    else {
        const passwordWarning = document.getElementById('password-warning');
        passwordWarning.style.visibility = 'visible';
        setTimeout(() => {
            passwordWarning.style.visibility = 'hidden';
        }, 1500)
    }
}

async function loginSignup() {
    const enteredInput = getInput();
    if (!(enteredInput.username || enteredInput.age))
        return;

    if (await checkPassword(enteredInput)) {
        window.location.replace('./loggedIn.html');
    }
}