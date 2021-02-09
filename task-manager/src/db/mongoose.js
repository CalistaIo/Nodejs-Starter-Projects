const mongoose = require('mongoose');
const connectionURL = process.env.MONGODB_URL;
mongoose.connect(connectionURL, {useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

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

// const task = new Task({
//     description: 'Clean room'
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// });
