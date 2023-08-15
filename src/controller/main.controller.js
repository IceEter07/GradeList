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
    res.render('layouts/index',{
        template: {
            path: 'main/editGroupForm',
            title: 'Edit Group',
            css: ['dashboardUser', 'aboutUs'],
            js: ['emergente','eliminar']
        },
        messages: [],
        //Se crea variables. En ella se mandan los datos a las vistas.
        variables: [groupQuery]
    });
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
    await school.findByIdAndDelete(req.params.id)
    res.redirect('/dashboard');

}

//----------------------------------
//Inicio del controlador de estudiantes
//----------------------------------
mainController.renderStudentForm = (req, res) =>{
    res.render('layouts/index',{
        template:{
            path: 'users/addStudent',
            title: 'Listas',
            css: ['dashboardUser'],
            js:[]
        }, messages: [],
        variables:[]
    })
}

mainController.addNewStudent = async (req, res) =>{
    const {name, ap1, ap2} = req.body;
    const newStudent = new student({name, ap1, ap2})
    console.log(req.session);
    const idGrupo = req.session.idGroup
    //Se guarda el ID para aislar los datos entre Alumnos
    newStudent.user = req.user._id;
    newStudent.groups = idGrupo;
    await group.findByIdAndUpdate(idGrupo, {$push: {student: newStudent._id.toString()}}).lean();
    await newStudent.save();
    req.flash('success_msg', 'Se agrego correctamente')
    res.redirect('/user/allStudent')
};

mainController.renderStudent = async (req, res) =>{
    const idGroup = await group.find(req.params)
    req.session.idGroup = idGroup[0]._id
    const alumnos = await student.find({user: req.user._id}).lean();
    res.render('layouts/index', {
        template:{
            path: 'users/allStudent',
            title: 'Estudiantes',
            css: ['main', 'dashboardUser', 'aboutUs', 'studentsList'],
            js:['emergenteStudents']
        }, messages: [],
        variables:[alumnos, idGroup]
    });
};



mainController.editStudentForm = async (req, res) =>{
    const alumno = await student.findById({_id: req.params.id});
    res.render('layouts/index', {
        template:{
            path: 'main/editStudent',
            title: 'Estudiantes',
            css: ['main', 'dashboardUser', 'aboutUs', 'studentsList'],
            js:[]
        }, messages: [],
        variables:[alumno]
    });
}

mainController.updateStudent = async (req, res) => {
    const {name, ap1, ap2} = req.body
    await student.findByIdAndUpdate(req.params.id, {name, ap1, ap2})
    req.flash('success_msg', 'Estudiante actualizado correctamente');
    res.redirect('/user/allStudent');
}

mainController.deleteStudent = async (req, res) => {
    await student.findByIdAndDelete(req.params.id)
    req.flash('succes_msg', 'student eliminado correctamente')
    res.redirect('/user/allStudent')
}
//----------------------------------
//Fin del controlador de estudiantes
//----------------------------------


module.exports = mainController;