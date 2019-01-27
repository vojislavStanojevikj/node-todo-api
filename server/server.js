const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const PORT = process.env.PORT || require('../config/config').PORT;

const {Todo} = require('../model/Todo');
const {User} = require('../model/User');


const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    const toPersistTodo = new Todo({text: req.body.text});
    toPersistTodo.save().then(result => {
        console.log('Persisting Todo......');
        res.status(200).json(result);
    }).catch(error => {
        const msg = 'Persisting Todo failed......';
        console.error(msg);
        res.status(400).json({error: msg})
    });
});

app.get('/todos', (req, res) => {

    Todo.find().then(todos => {
        console.log('Persisting Todo......');
        res.status(200).json({todos});
    }).catch(error => {
        const msg = 'Fetching Todo failed......';
        console.error(msg);
        res.status(400).json({error: msg})
    });
});


app.get('/todos/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return sendError(400, 'Provided id is not valid!', res);
    }

    Todo.findById(req.params.id)
        .then(result => {
            if (!result) {
                return sendError(404, 'Requested resource not found!', res);
            } else {
                return res.status(200).send({todo: result});
            }
        })
        .catch(error => sendError(400, 'Internal server error', res));

});

app.delete('/todos/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return sendError(400, 'Provided id is not valid!', res);
    }

    Todo.findByIdAndRemove(req.params.id)
        .then(result => {
            if (!result) {
                return sendError(404, 'Requested resource not found!', res);
            } else {
                return res.status(200).send({todo: result});
            }
        }).catch(error => sendError(400, 'Internal server error', res));

});


function sendError(status, msg, res) {
    res.status(status).send({error: msg});
}

app.listen(PORT, () =>{
   console.log(`Listening at PORT: ${PORT}`);
});


module.exports = {app};