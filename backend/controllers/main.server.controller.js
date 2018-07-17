// Libraries 
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoClient = require('mongodb').MongoClient;
const mongoObjId = require('mongodb').ObjectID;
const assert = require('assert');
const Jimp = require("jimp");
const multer = require('multer');
const upload = multer({ dest: 'tempFiles' });
const fs = require('fs');

//Variables
const mongoURL = 'mongodb://localhost:27017/kantasnet';
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const imagePath = `${__dirname}/../files/images/`;
const sidebar = [
    { title: 'Home', link: '' },
    { title: 'Show Tags', link: '/api/showTags' },
    { title: 'Show Projects', link: '/api/showProjects' },
    { title: 'Add Project', link: '/api/addProject' }
];

//Functions
function failAction(res, activeElement, err) {
    res.render('adminMessage', {
        sidebar,
        activeElement,
        message: {
            title: "Error occupied ...",
            text: JSON.stringify(err)
        }
    });
}

function successAction(res, activeElement, type, project) {
    let message;

    switch (type) {
        case 'add':
            message = {
                title: 'Project Added!',
                text: `Project <a href="/api/editProject/${project._id}">${project.name}</a> added successfully!!`
            }
            break;
        case 'update':
            message = {
                title: 'Project Updated!',
                text: `Project <a href="/api/editProject/${project._id}">${project.name}</a> updated successfully!!`
            }
    }

    res.render('adminMessage', {
        sidebar,
        activeElement,
        message
    });
}

//Controller
const mainController = function () {
    const home = (req, res) => {
        res.render('index', {
            title: 'Super Site',
            mainText: 'What a site !!!',
            secondaryText: 'Its really amazing!!!'
        })
    }

    const getProjects = (req, res) => {
        MongoClient.connect(mongoURL, (err, db) => {
            if (err) { failAction(res, activeElement, err); return }
            db.collection('projects').find({}).toArray((err, projects) => {
                if (err) { failAction(res, activeElement, err); return }
                res.json(projects);
            })
        })
    }

    const addProject = (req, res) => {
        activeElement = 3
        res.render('addProject', {
            sidebar,
            activeElement
        })
    }

    const showProjects = (req, res) => {
        activeElement = 2
        MongoClient.connect(mongoURL, (err, db) => {
            if (err) { failAction(res, activeElement, err); return }
            db.collection('projects').find({}).toArray((err, projects) => {
                if (err) { failAction(res, activeElement, err); return }
                res.render('showProjects', {
                    sidebar,
                    activeElement,
                    projects
                })
            })
        })

    }

    const editProject = (req, res) => {
        let _id = new mongoObjId(req.params.projectId)
        MongoClient.connect(mongoURL, (err, db) => {
            if (err) { failAction(res, activeElement, err); return }
            db.collection('projects').findOne({ _id }, (err, project) => {
                if (err) { failAction(res, activeElement, err); return }
                console.log(project);
                res.render('editProject', {
                    sidebar,
                    activeElement: 1,
                    project
                })
            })
        })
    }

    const updateProject = [
        urlencodedParser,
        (req, res) => {
            let { id, name, description, text, github, page, imageURL, order } = req.body;
            MongoClient.connect(mongoURL, (err, db) => {
                if (err) { failAction(res, activeElement, err); return }
                db.collection('projects').updateOne({ _id: new mongoObjId(id) }, { name, description, text, github, page, imageURL, order }, (err, dbRes) => {
                    if (err) { failAction(res, activeElement, err); return }
                    successAction(res, -1, 'update', { _id: id, name });
                })
            })
        }]

    const addProjectAction = [
        upload.single('image'),
        (req, res) => {
            let project, image;
            let { name, description, text, github, page, order } = req.body;
            activeElement = 3;
            project = {
                name,
                description,
                text,
                technologies: JSON.parse(req.body.technologies),
                github,
                page,
                order
            }
            image = req.file ? req.file.path : (req.body.imageURL) ? req.body.imageURL : ""; // image = file or url or ""

            MongoClient.connect(mongoURL, (err, db) => {
                if (err) { failAction(res, activeElement, err); return }
                if (image) project.imageURL = text.replace(/\s/g, '').toLowerCase() + '.jpg';
                db.collection('projects').insertOne(project, (err, dbres) => {
                    if (err) { failAction(res, activeElement, err); return }
                    if (image) {
                        let imageName = '/' + text.replace(/\s/g, '').toLowerCase() + '.jpg';
                        Jimp.read(image).then(img => {
                            img.resize(535, Jimp.AUTO).write(imagePath + project.imageURL);
                            if (!req.file) { successAction(res, activeElement, 'add', { _id: '#', name }); return }
                            fs.unlink(image, err => {
                                if (err) { failAction(res, activeElement, err); return }
                                successAction(res, activeElement, 'add', { _id: '#', name });
                            })
                        }).catch(err => failAction(res, activeElement, err))
                        return;
                    }
                    successAction(res, activeElement, 'add', { _id: '#', name });
                })
            })
        }]

    return { home, getProjects, addProject, addProjectAction, showProjects, editProject, updateProject }
}

module.exports = mainController();