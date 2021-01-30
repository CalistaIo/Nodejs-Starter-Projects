require('../src/db/mongoose.js');
const User = require('../src/models/user.js');

const _id = "601038780947c13d585fa89d";
// User.findByIdAndUpdate(_id, {age: 1}).then((res) => {
//     console.log(res);
//     return User.countDocuments({age: 1});
// }).then((res) => {
//     console.log(res);
// }).catch((e) => {
//     console.log(e);
// });

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age});
    const count = await User.countDocuments({age: age});
    return count;
}

updateAgeAndCount(_id, 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});