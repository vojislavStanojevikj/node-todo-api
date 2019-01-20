const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://172.17.0.2:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});
//
// const toDoActivity = new Todo({text: 'Cock Dinner'});
//
// toDoActivity.save().then(result => {
//     console.log('Saved Todo!', result);
// }).catch(error => {
//     console.error('Saving Todo failed!', error);
// });

const newTodo = new Todo({text: 'Go to the gym', completed: true, completedAt: new Date().getTime()});

newTodo.save()
    .then(document => {
        console.log('Saved Todo!', document);
    }).catch(error => {
        console.error('Saving Todo failed!', error);
    });

