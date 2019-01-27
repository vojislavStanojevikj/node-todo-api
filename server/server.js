const express = require('express');
const bodyParser = require('body-parser');
const PORT = require('../config/config').PORT;

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



app.listen(PORT, () =>{
   console.log(`Listening at PORT: ${PORT}`);
});





//
// const toDoActivity = new Todo({text: 'Cock Dinner'});
//
// toDoActivity.save().then(result => {
//     console.log('Saved Todo!', result);
// }).catch(error => {
//     console.error('Saving Todo failed!', error);
// });

// const newTodo = new Todo({text: '   Edit this video'});
//
// newTodo.save()
//     .then(document => {
//         console.log('Saved Todo!', document);
//     }).catch(error => {
//         console.error('Saving Todo failed!', error);
//     });


// const firstUser = new User({email: 'Test@test.com'});
//
// firstUser.save()
//     .then(document => {
//         console.log('User saved!', JSON.stringify(document, undefined, 2));
//     }).catch(error => {
//         console.error('Error saving user!', error);
//     });

// const firstUser = new User({email: {}});
//
// firstUser.save()
//     .then(document => {
//         console.log('User saved!', JSON.stringify(document, undefined, 2));
//     }).catch(error => {
//     console.error('Error saving user!', error);
// });