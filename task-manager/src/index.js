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

const Task = require('./models/task.js');
const User = require('./models/user.js');
const main = async () => {
    // const task = await Task.findById('601e1654a6352f31445cff30');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);
    const user = await User.findById('601e14752ea636347ce8281c');
    await user.populate('tasks').execPopulate();
    console.log(user.tasks);
};

main();
