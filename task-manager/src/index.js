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

const bcrypt = require('bcryptjs');

const myFunction = async () => {
    const password = 'Red12345!';
    const salt = await bcrypt.genSalt(8);
    const hashhash = await bcrypt.hash(password, salt);
    console.log(hashhash);
    const hashhash2 = await bcrypt.hash(password, salt);
    console.log(hashhash2);
    console.log(hashhash2 == hashhash2);
}

myFunction();