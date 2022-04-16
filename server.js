const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./public/login.html', { root: __dirname });
    res.status(200);
});

app.get('/:folder/:file', (req, res) => {
    res.sendFile(`./public/${req.params.folder}/${req.params.file}`, { root: __dirname });
    res.status(200);
});

app.post('/login-check', (req, res) => {
    const enteredInput = req.body;
    const checkDB = require('./db');
    res.send({msg: checkDB(enteredInput)});
    res.status(200);
});

app.get('/:file', (req, res) => {
    res.sendFile(`./public/${req.params.file}`, { root: __dirname });
    res.status(200);
});

const port = process.env.PORT || 3000;

app.listen(3000, () => {
    console.log(`Server running on port ${port}`)
});