const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://172.17.0.2:27017/TodoApp', (err, client) => {

    if (err) {
        console.error('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'})
    //     .then(result => {
    //         console.log(JSON.stringify(result.result, undefined, 2));
    //     })
    //     .catch(error => {
    //         console.error('Can not delete entries.', error)
    //     });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'})
    //     .then(result => {
    //         console.log(JSON.stringify(result.result, undefined, 2));
    //     })
    //     .catch(error => {
    //         console.error('Can not delete entries.', error)
    //     });

    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false})
    //     .then(result => {
    //         console.log(JSON.stringify(result, undefined, 2));
    //     })
    //     .catch(error => {
    //         console.error('Can not delete entries.', error)
    //     });

    db.collection('Users').deleteMany({name: 'Vojislav'})
        .then(result => {
            console.log(JSON.stringify(result.result, undefined, 2));
        }).catch(error => {
            console.error('Error deleting documents!', error);
        });

    db.collection('Users').findOneAndDelete({_id: new ObjectId('5c449470ad40e49f5a7bd77b')})
        .then(result => {
            console.log(JSON.stringify(result, undefined, 2));
        }).catch(error => {
        console.error('Error deleting documents!', error);
    });

    client.close();
});