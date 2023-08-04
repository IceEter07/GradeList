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

mainController.groupRegisterForm = (req, res) => {
    res.render('layouts/index',{
        template: {
            path: 'main/groupRegister',
            title: 'Group Register',
            css: ['main']
        }
    });
}

mainController.groupRegister = async (req, res) => {
    const {name, description} = req.body;
    const newGroup = new group({name, description})
    await newGroup.save();

    res.redirect('/dashboard');
}

mainController.editGroupForm = async (req, res) => {
    const groupQuery = await group.findById(req.params.id).lean();

    console.log(groupQuery);

    res.render('main/editGroupForm', {groupQuery})
}

mainController.updateGroup = async (req, res) => {
    const {name, description} = req.body;
    await group.findByIdAndUpdate(req.params.id, {name, description})
    req.flash('success_msg', 'Grupo actualizado')
    res.redirect('/dashboard')
}

module.exports = mainController;