const {mongoose} = require('../mongoose/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true,
            minLength: 1
        },
        token: {
            type: String,
            required: true,
            minLength: 1
        }
    }]
});

UserSchema.methods.toJSON = function() {
    return _.pick(this.toObject(), ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {

    const user = this;

    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = user.tokens.concat({access, token});

    return user.save()
        .then(() => {
            return token;
        });
};


const User = mongoose.model('User', UserSchema);

module.exports = {User};