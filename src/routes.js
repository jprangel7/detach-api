const express = require('express');

const authMiddleware = require("./middlewares/auth");

const UserController = require('./controllers/UserController');
const ProjectsController = require('./controllers/projectController');

const routes = express.Router();

routes.use('/projects', authMiddleware);
routes.use('/user/delete', authMiddleware);
routes.use('/user/update', authMiddleware);

routes.get('/user/', UserController.index);
routes.post('/user/create', UserController.create);
routes.post('/user/authenticate', UserController.authenticate);
routes.put('/user/update', UserController.update);
routes.delete('/user/delete', UserController.delete);

routes.get('/projects', ProjectsController.test);

module.exports = routes;