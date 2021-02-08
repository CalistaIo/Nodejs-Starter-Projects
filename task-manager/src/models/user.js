const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task.js');

const userSchema = new mongoose.Schema({
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
        unique: true,
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
    },
    tokens: [{
        token: { // token is property of object in array
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer // store binary image data
    }
}, {
    timestamps: true
});

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject; // return object containing public user data
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    });
    if (!user) {
        throw new Error('Unable to login email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login password');
    }
    return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    };
    next();
});

// delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this;
    await Task.deleteMany({owner: user._id});
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;