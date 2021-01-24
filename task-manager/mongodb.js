// CRUD create read update delete

const {MongoClient, ObjectID} = require('mongodb');
const id = new ObjectID();
console.log(id.id);

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // });
    // db.collection('users').insertMany([{
    //     name: 'Jen',
    //     age: 28
    // }, {
    //     name: 'Gunther',
    //     age: 27
    // }],
    //      (error, result) => {
    //          if (error) {
    //              return console.log('Unable to insert documents');
    //          }
    //          console.log(result.ops);
    // });
    // db.collection('tasks').insertMany([{
    //     description: 'do homework',
    //     completed: false
    // }, {
    //     description: 'watch Netflix',
    //     completed: true
    // }, {
    //     description: 'clean room',
    //     completed: false
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents');
    //     }
    //     console.log(result.ops);
    // });
});