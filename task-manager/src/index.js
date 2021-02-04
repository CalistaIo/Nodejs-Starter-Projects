const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./db/mongoose.js'); // Ensures that file runs and mongoose connects to database
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task.js');

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// const pet = {
//     name: 'Hal'
// };
// pet.toJSON = function () {
//     console.log(this);
//     return this;
// };

// console.log(JSON.stringify(pet));
