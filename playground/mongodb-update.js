const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://172.17.0.2:27017/TodoApp', (err, client) => {

    if (err) {
        console.error('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');

    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectId('5c449accad40e49f5a7bd8c8')},
    //     {$set: {completed: true}}, {returnOriginal: false})
    //     .then(result => {
    //         console.log(JSON.stringify(result, undefined, 2));
    //     }).catch(error => {
    //         console.error('Error updating documents!', error);
    //     });

    db.collection('Users').findOneAndUpdate({_id: new ObjectId('5c44948bad40e49f5a7bd787')},
        {$set: {name: 'Vojislav'}, $inc: {age: 3}}, {returnOriginal: false})
        .then(result => {
            console.log(JSON.stringify(result, undefined, 2));
        }).catch(error => {
            console.error('Error updating documents!', error);
        });

    client.close();
});