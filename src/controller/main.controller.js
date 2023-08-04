const mainController = {}
const school = require('../models/school')
const group = require('../models/group')
const student = require('../models/student')


mainController.index = (req, res) => {
    res.render('layouts/index',{
        template: {
            path: 'main/index',
            title: 'Passport',
            css: ['main']
        }
    });
}

mainController.groupView = (req, res) => {
    res.render('layouts/index',{
        template: {
            path: 'main/group',
            title: 'Group',
            css: ['main']
        }
    });
}



module.exports = mainController;