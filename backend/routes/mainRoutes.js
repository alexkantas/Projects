// Libraries 
const express = require('express');
const mainController = require('../controllers/main.server.controller.js');

//
const mainRouter = express.Router();

//Router object
const Router = function () {

    mainRouter.route('/').get(mainController.home);
    mainRouter.route('/getProjects').get(mainController.getProjects);
    mainRouter.route('/showProjects').get(mainController.showProjects);
    mainRouter.route('/editProject/:projectId').get(mainController.editProject);
    mainRouter.route('/addProject').get(mainController.addProject);
    mainRouter.route('/updateProject').post(mainController.updateProject);
    mainRouter.route('/addProject/action').post(mainController.addProjectAction);

    return mainRouter;
}

module.exports = Router;