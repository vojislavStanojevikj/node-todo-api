const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://172.17.0.2:27017/TodoApp', (err, client) => {

    if (err) {
        console.error('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    const db = client.db('TodoApp');


    // db.collection('Todos').find().toArray()
    //     .then(docks => {
    //         console.log(JSON.stringify(docks, undefined, 2));
    //     })
    //     .catch(error => {
    //         console.error('Can not read entries.', error)
    //     });
    //
    // db.collection('Todos').find({completed: false}).toArray()
    //     .then(docks => {
    //         console.log(JSON.stringify(docks, undefined, 2));
    //     })
    //     .catch(error => {
    //         console.error('Can not read entries.', error)
    //     });
    //
    // db.collection('Todos').find({_id: new ObjectId('5c44862d4239a722c39ef512')}).toArray()
    //     .then(docks => {
    //         console.log(JSON.stringify(docks, undefined, 2));
    //     }).catch(error => {
    //         console.error('Can not read entries.', error)
    //     });
    //
    // db.collection('Todos').find().count()
    //     .then(count => {
    //         console.log(`Todos count: ${count}`);
    //     })
    //     .catch(error => {
    //         console.error('Can not read entries.', error)
    //     });

    db.collection('Users').find({name: 'Vojislav'}).toArray()
        .then(docks => {

            console.log(JSON.stringify(docks, undefined, 2));

        }).catch(err => {
            console.error('Error reading document!', err);
        });

    db.collection('Users').find({name: 'Vojislav'}).count()
        .then(count => {
            console.log(`Users count: ${count}`);

        }).catch(err => {
        console.error('Error reading document!', err);
    });


    client.close();
});