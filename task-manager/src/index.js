const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;
require('./db/mongoose.js'); // Ensures that file runs and mongoose connects to database
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task.js');

const cookieParser = require('cookie-parser');
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const publicDirectoryPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicDirectoryPath));
const viewsPath = path.join(__dirname, '.', 'views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});



