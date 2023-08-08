const mainController = {}
const school = require('../models/school')
const group = require('../models/group')
const student = require('../models/student')

mainController.renderDashboard = async (req,res) => {

    const groups = await group.find({user: req.user._id}).sort({createdAt: 'desc' }).lean();
    
    res.render('layouts/index',{
        template: {
            path: 'users/dashboard',
            title: 'Principal',
            css: ['dashboardUser', 'aboutUs'],
            js: ['emergente']
        },
        messages: [],
        //Se crea variables. En ella se mandan los datos a las vistas.
        variables: [groups]
    })
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
    newGroup.user = req.user._id;
    await newGroup.save();

    res.redirect('/dashboard');
}

mainController.editGroupForm = async (req, res) => {
    const groupQuery = await group.findById(req.params.id).lean();

    res.render('main/editGroupForm', {groupQuery})
}

mainController.updateGroup = async (req, res) => {
    const {name, description} = req.body;
    await group.findByIdAndUpdate(req.params.id, {name, description})
    req.flash('success_msg', 'Grupo actualizado')
    res.redirect('/dashboard')
}

mainController.deleteGroup = async (req, res) => {
    await group.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Grupo eliminado')

    res.redirect('/dashboard')

}

module.exports = mainController;