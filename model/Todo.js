const {mongoose} = require('../mongoose/mongoose');


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

module.exports = {Todo};