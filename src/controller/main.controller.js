const mainController = {}
const school = require('../models/school');
const group = require('../models/group');
const student = require('../models/student');

mainController.renderDashboard = async (req,res) => {

    const groups = await group.find({user: req.user._id}).sort({createdAt: 'desc' }).lean();
    const institutions = await  school.find({user: req.user._id}).sort({createdAt: 'desc' }).lean();

    res.render('layouts/index',{
        template: {
            path: 'users/dashboard',
            title: 'Principal',
            css: ['dashboardUser', 'aboutUs'],
            js: ['emergente']
        },
        messages: [],
        //Se crea variables. En ella se mandan los datos a las vistas.
        variables: [groups, institutions]
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

    const idInstitution = req.session.institutions._id
    const {name, description} = req.body;
    const newGroup = new group({name, description})
    newGroup.school = idInstitution;
    newGroup.user = req.user._id;
    await school.findByIdAndUpdate(idInstitution, {$push: { group: newGroup._id.toString() }}).lean();    
    await newGroup.save();
    // res.redirect('/dashboard');
    res.redirect(`/showInstitution/${idInstitution}`);

    
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

mainController.registerInstitution = async (req,res) => {
    const {name} = req.body;
    const newInstitution = new school({name});
    newInstitution.user = req.user._id
    await newInstitution.save();
    res.redirect('/dashboard');
}

mainController.showInstitutions = async (req,res) => {
    
    const institutions = await school.findById(req.params.id).lean();
    req.session.institutions = institutions
    const groups = await group.find({user: req.user._id, school: institutions._id}).sort({createdAt: 'desc' }).lean();
        
    res.render('layouts/index',{
        template: {
            path: 'main/institutions',
            title: 'Principal',
            css: ['dashboardUser', 'aboutUs'],
            js: ['emergente','eliminar']
        },
        messages: [],
        //Se crea variables. En ella se mandan los datos a las vistas.
        variables: [groups, institutions]
    });
};

mainController.editInstitution = async (req,res) => {
    
    const institution = await school.findById(req.params.id).lean();
    
    res.render('layouts/index',{
        template: {
            path: 'main/editInstitutions',
            title: 'Edit Institutions',
            css: ['dashboardUser', 'aboutUs'],
            js: [],
        },
        variables: [institution]
    })
}

mainController.updateInstitution = async (req,res) => {
    const {name} = req.body;
    await school.findByIdAndUpdate(req.params.id, {name})
    res.redirect(`/showInstitution/${req.params.id}`);
}

mainController.deleteInstitution = async (req,res) => {
    console.log(req.params.id);
    await school.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard');
}

module.exports = mainController;