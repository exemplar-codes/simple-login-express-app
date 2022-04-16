const nedb = require('nedb');

const db = new nedb('./inputs.db');

db.loadDatabase();

// db.insert({ name: 'Ahmar', age: Math.floor(Math.random() * 100) }, function (err, data) {
//     if (err)
//         console.log(err);
// })

async function checkDB(enteredInput) {
    let retDB = false;

    db.find({ username: enteredInput.username }, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        if (data.length) {
            if (data[0].password == enteredInput.password)
                retDB = 'PASSWORD_MATCHES';
            else
                retDB = 'WRONG_PASSWORD';
        }
        else
            retDB = 'USERNAME_INEXISTENT';

        // passowrd does not match - login
        // password matches - error message show
        // username does not exist - signup
    });
    return retDB;
}

module.exports = checkDB;