// Libraries 
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//
const mongoURL = 'mongodb://localhost:27017/kantasnet';

let projects;

//
projects = [{
    "name": "Prolog",
    "description": "Web application in SWI Prolog for back-end and Semantic-UI CSS framework for front-end.",
    "imageURL": "https://cloud.githubusercontent.com/assets/7612837/26174273/71599934-3b57-11e7-8ad0-2b08a0f1b38e.png",
    "text": "Prolog Site",
    "technologies":[
        {
           "name" :"Semantic-UI",
           "description":"Over 20 custom different pages",
           "iconClass":"semantic"
        },
        {
           "name" :"SWI Web Prolog",
           "description":"\u00A0",
           "iconClass":"server"
        },
        {
           "name" :"JavaScript",
           "description":"Use of custom JQuery",
           "iconClass":"javascript"
        }
    ],
    "github": "https://github.com/alexzzzboom/PrologIntelligentTutoringSystems",
    "page": "http://prolog.kantas.net",
    "order":"0"
},
{
    "name": "Image Quiz",
    "description": "Image Quiz Game developed in Materialize CSS framework and PHP",
    "imageURL": "public/images/imageQuiz.jpg",
    "text": "imageQuiz",
    "technologies":[
        {
           "name" :"Materialize CSS",
           "description":"Buid it with Materialize CSS components",
           "iconClass":"css3"
        },
        {
           "name" :"PHP",
           "description":"Use custom php backend for easy adding questions",
           "iconClass":"server"
        },
        {
           "name" :"SQL",
           "description":"\u00A0",
           "iconClass":"database"
        },
        {
           "name" :"JavaScript",
           "description":"Single page app with use of JS and JQuery library",
           "iconClass":"javascript"
        }
    ],
    "github": "https://github.com/alexzzzboom/imageQuiz",
    "page": "http://projects.kantas.net/imageQuiz",
    "order":"0"
},
{
    "name": "Location",
    "description": "Experimental page with Google maps and geolocation API.",
    "text": "Location",
    "technologies":[
        {
           "name" :"Google Maps Api",
           "description":"\u00A0",
           "iconClass":"google"
        },
        {
           "name" :"Geolocation API",
           "description":"\u00A0",
           "iconClass":"marker"
        }
    ],
    "page": "http://projects.kantas.net/location",
    "order":"0"
}]
//

MongoClient.connect(mongoURL, (err, db) => {
    assert.equal(null, err);
    db.collection('projects').insertMany(projects, (err, res) => {
        if (err) throw err;
        console.log(`Projects added succefully: ${JSON.stringify(res)} !`);
    })
})