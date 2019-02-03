require('../config/config');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {Todo} = require('../model/Todo');
const {User} = require('../model/User');


const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    const toPersistTodo = new Todo({text: req.body.text});
    toPersistTodo.save().then(result => {
        return res.status(200).json(result);
    }).catch(error => sendError(400, 'Persisting Todo failed......', res));
});

app.get('/todos', (req, res) => {

    Todo.find().then(todos => {
        return res.status(200).json({todos});
    }).catch(error => sendError(400, 'Error fetching data......', res));
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

app.patch('/todos/:id', (req, res) => {

    if (!ObjectID.isValid(req.params.id)) {
        return sendError(400, 'Provided id is not valid!', res);
    }

    const body = _.pick(req.body, ['text', 'completed']);

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(req.params.id, {$set: body}, {new: true})
        .then(result => {

            if (!result) {
                return sendError(404, 'Requested resource not found!', res);
            } else {
                return res.status(200).send({todo: result});
            }

        }).catch(error => sendError(400, 'Internal Server error', res));

});

app.post('/users', (req, res) => {

    const body = _.pick(req.body, ['email', 'password']);

    const userToPersist = new User(body);
    userToPersist.save()
        .then(result => {
            return result.generateAuthToken();
        })
        .then(token => {
            res.header('x-auth', token).status(200).json(userToPersist);
        })
        .catch(error => sendError(400, 'Persisting User failed......', res));

});


function sendError(status, msg, res) {
    res.status(status).send({error: msg});
}

app.listen(process.env.PORT, () =>{
   console.log(`Listening at PORT: ${process.env.PORT}`);
});


module.exports = {app};