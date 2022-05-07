const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({info: 'marketplace backend api'})
});

app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)


app.listen(port, () => {
    console.log(`App running on port: ${port}.`)
});
