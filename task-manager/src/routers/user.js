const express = require('express');
const router = new express.Router();
const User = require('../models/user.js');
const auth = require('../middleware/auth.js');
const multer = require('multer');
const sharp = require('sharp');

// Create user
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const token = await user.generateAuthToken(); // user is saved inside this method
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

// Find user using credentials
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        // res.send({user: user.getPublicProfile(), token});
        res.send({user, token});
    } catch (e) {
        res.status(400).send();
    }
});

// Logout
router.post('/users/logout', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter((token) => { // remove token that was used for authentication
            return token.token != req.token;
        });
        await user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

// Logout of all accounts
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        const user = req.user;
        user.tokens = [];
        await user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

// Get own user data after authentication
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send();
    // }
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
});

// Update individual user
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }
    try {
        for (const property in req.body) {
            req.user[property] = req.body[property];
        }
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
});

// delete user
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
});

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        const user = req.user;
        const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer(); // modify buffer before returning it
        user['avatar'] = buffer;
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
}, (error, req, res, next) => {res.status(400).send({error: error.message})});

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        const user = req.user;
        user['avatar'] = undefined;
        await user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
}, (error, req, res, next) => {res.send({error: error.message})});

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(400).send();
    }
});

module.exports = router;