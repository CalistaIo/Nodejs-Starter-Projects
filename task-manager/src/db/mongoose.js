const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017' + '/task-manager-api';
mongoose.connect(connectionURL, {useUnifiedTopology: true, useCreateIndex: true});
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate: function(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: function(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate: function(value) {
            if (validator.contains(value.toLowerCase(), 'password')) {
                throw new Error('Password cannot contain "password"');
            }
        }
    }
});

// const me = new User({
//     name: 'Calista',
//     email: 'ann.calista@gmail.com',
//     password: 'phone098!'
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log('Error!', error);
// });

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
    description: 'Clean room'
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
});
