const User = require('./models/user.js').User;

var user = new User({
    username: "Tester2",
    password: "secret"
});

user.save(function(err, user, affected) {
    console.log(arguments);

    User.findOne({username: "Tester"}, function(err, tester) {
        console.log(tester);
    })
});










/*//Mongoose
const schema  = mongoose.Schema({
    name: String
});
schema.methods.meow = function() {
    console.log(this.get('name'));
};

const Cat = mongoose.model('Cat', schema);

const kitty = new Cat({
    name: 'Zildjian',
});

kitty.save(function(err, kitty, affected) {
    kitty.meow();
    //kitty.save().then(() => console.log('meow'));

});*/




/*
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'maze';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    db.collection('documents').remove({}, function(err, results) {
        console.log(arguments);
    });
    // removeDocument(db, function () {
    //     findDocuments(db, function() {
    //         client.close();
    //     });
    // });
});

//Вставка коллекции
const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a: 1}, {a: 2}, {a: 3}
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

//Поиск коллекций
const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};

//Обновление коллекции
const updateDocument = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({a: 2}
        , {$set: {b: 1}}, function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
};

//Удаление
const removeDocument = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({a : 3}, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n); //были ли эти строки
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
};

//Индексирование
const indexCollection = function(db, callback) {
    db.collection('documents').createIndex(
        { "a": 1 },
        null,
        function(err, results) {
            console.log(results);
            callback();
        }
    );
};*/
