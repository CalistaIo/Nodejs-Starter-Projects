const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

const dataBuffer = fs.readFileSync('1-json.json');
const data = dataBuffer.toString();
const dataJSON = JSON.parse(data);
dataJSON.name = 'Calista';
dataJSON.age = 20;
const newDataJSON = JSON.stringify(dataJSON);
fs.writeFileSync('1-json.json', newDataJSON);