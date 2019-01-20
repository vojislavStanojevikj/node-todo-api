const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://172.17.0.2:27017/TodoApp');

const Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
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

// const newTodo = new Todo({text: '   Edit this video'});
//
// newTodo.save()
//     .then(document => {
//         console.log('Saved Todo!', document);
//     }).catch(error => {
//         console.error('Saving Todo failed!', error);
//     });


const firstUser = new User({email: 'Test@test.com'});

firstUser.save()
    .then(document => {
        console.log('User saved!', JSON.stringify(document, undefined, 2));
    }).catch(error => {
        console.error('Error saving user!', error);
    });

// const firstUser = new User({email: {}});
//
// firstUser.save()
//     .then(document => {
//         console.log('User saved!', JSON.stringify(document, undefined, 2));
//     }).catch(error => {
//     console.error('Error saving user!', error);
// });