const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://172.17.0.2:27017/TodoApp', (err, client) => {

    if (err) {
        console.error('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.error('Unable to insert new document!!', error);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //
    // });

    db.collection('Users').insertOne({
        name: 'Vojislav',
        age: 33,
        location: 'Tetovo, Macedonia'
    }, (error, result) => {
        if (error) {
            return console.error('Unable to insert new document!!', error);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});