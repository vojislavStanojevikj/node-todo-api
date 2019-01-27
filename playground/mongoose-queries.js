const {ObjectId} = require('mongodb');
const {Todo} = require('../model/Todo');
const {User} = require('../model/User');

// const ID = '5c4dc7e54bf68b3549083ee5';
const userID = '5c44ae6de83c9e382003bab';

// if (!ObjectId.isValid(ID)) {
//     console.error('Invalid ID');
// }

// Todo.find({_id: ID}).then(result => {
//
//     if(result.length === 0) {
//         console.log('No records found!');
//     } else {
//         console.log('Todos:', result);
//     }
//
// }).catch(error => {
//    console.error('Error occurred.');
// });
//
// Todo.findOne({_id: ID}).then(result => {
//
//     if (!result) {
//         console.log('No records found!');
//     } else {
//         console.log('Todo:', result);
//     }
//
// }).catch(error => {
//     console.error('Error occurred.');
// });
//
// Todo.findById(ID).then(result => {
//
//     if (!result) {
//         console.log('No records found!');
//     } else {
//         console.log('Todo:', result);
//     }
//
// }).catch(error => {
//     console.error('Error occurred.');
// });


if (ObjectId.isValid(userID)) {
    User.findById(userID).then(result => {
        if (!result) {
            console.log(`User with ID: ${userID}, not found!`)
        } else {
            console.log('User:', result);
        }
    });
} else {
    console.error('Invalid user id.');
}

