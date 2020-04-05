const express = require('express');
const multer = require('multer');

const authMiddleware = require('./middlewares/auth');

const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.use('/user/delete', authMiddleware);
routes.use('/user/update', authMiddleware);
routes.use('/user/items', authMiddleware);

routes.use('/item/create', authMiddleware);
routes.use('/item/update', authMiddleware);
routes.use('/item/delete', authMiddleware);

routes.get('/user/', UserController.index);
routes.get('/user/items', UserController.items);
routes.post('/user/create', UserController.create);
routes.post('/user/authenticate', UserController.authenticate);
routes.put('/user/update', UserController.update);
routes.delete('/user/delete', UserController.delete);

routes.get('/item/index', ItemController.index);
routes.get('/item/search', ItemController.search);
routes.post('/item/create', upload.array('thumbnail', 2), ItemController.create);
routes.put('/item/update', upload.array('thumbnail', 2), ItemController.update);
routes.delete('/item/delete', ItemController.delete);

module.exports = routes;