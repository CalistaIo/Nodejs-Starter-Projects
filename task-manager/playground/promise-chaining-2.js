require('../src/db/mongoose.js');
const Task = require('../src/models/task.js');

const _id = "6012e0cc23718a341839eed8";
// Task.findByIdAndDelete(_id).then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed: false});
// }).then((count) => {
//     console.log(count);
// }).catch((e) => {
//     console.log(e);
// });

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteTaskAndCount().then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
});
