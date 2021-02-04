const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse'); // is there an actual id for this token?
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token}); // does the user with this id still have the token?
        if (!user) {
            throw new Error();
        }
        req.user = user; // pass user to route handler
        next();
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.'});
    }
}

module.exports = auth;