const express = require('express');
const startup = express.Router();
const startupController = require('../controllers/startupController');
const auth = require('../middleware/auth'); 

startup.post('/create', auth, startupController.createStartup);
startup.get('/my-startups', auth, startupController.getUserStartups);
startup.get('/all', startupController.getAllStartups);
startup.get('/:id', startupController.getStartupById);
startup.put('/update/:id', auth, startupController.updateStartup);
startup.delete('/delete/:id', auth, startupController.deleteStartup);

module.exports = startup;