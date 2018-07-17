// Libraries 
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//
const mongoURL = 'mongodb://localhost:27017/kantasnet';

let project;

//
project = {
    "name": "PHP MySQL Query Builder",
    "description": "Simple Query Builer to fetch MySQL Queries into PHP Objects",
    "text": "PHP Query Builder",
    "github": "https://github.com/alexzzzboom/PhpMySqlQueryBuilder",
    "technologies": [
        {
            "name": "PHP",
            "description": "Use of object oriented PHP and Composer",
            "iconClass": "server"
        },
        {
            "name": "SQL",
            "description": "Create PHP objects from SQL queries",
            "iconClass": "database"
        }
    ],
    "order": "0"
}
//

MongoClient.connect(mongoURL, (err, db) => {
    assert.equal(null, err);
    db.collection('projects').insertOne(project, (err, res) => {
        if (err) {console.log(err); return}
        console.log(`Project added succefully with response ${JSON.stringify(res)} !`);
    })
})