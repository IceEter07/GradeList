const userController = {}
const passport = require('passport');
const User = require('../models/user');
const student = require('../models/student');


userController.index = (req, res) => {
    res.render('layouts/index',{
        template: {
            path: 'users/editUser',
            title: 'Passport',
            css: ['main','userEdit']
        }
    });
}


userController.renderEditForm = async (req, res) =>{
    
    const user = await User.findById(req.params.id).lean()
    res.render('layouts/index', {user: user,
    template:{
        path: 'users/editUser',
        title: 'Edit User',
        css: ['main','userEdit']
    }})
}

userController.updateUser = async (req, res) =>{
    const {name, ap1, ap2} = req.body

    await User.findByIdAndUpdate(req.params.id, {name, ap1, ap2})
    console.log("User updated succesfully");
    req.flash('success_msg', 'Los datos han sido actualizados correctamente');
    res.redirect(`../../user/editForm/${req.params.id}`)
    
    // const emailUser = await User.findOne({email: email})
    // if(emailUser){
    //     req.flash('error_msg', 'El correo ya esta en uso');
        
    //     //La línea de abajo no se podía ejecutar porque el método put que se hacía desde el formulario
    //     //hacia que entrara en una "subcarpeta" que no permitia que el redirect funcionara adecuadamente.
    //     //SE RECOMIENDA REVISIÓN
    //     res.redirect(`../../user/editForm/${req.params.id}`)
    // }
    // else{
    //     //La línea req.params.id deberá cambiarse una vez que se tenga listo el login
    //     await User.findByIdAndUpdate(req.params.id, {name, ap1, ap2, email})
    //     console.log("User updated succesfully");
    //     req.flash('success_msg', 'Los datos han sido actualizados correctamente');
    //     res.redirect(`../../user/editForm/${req.params.id}`)
    // }
    // // res.redirect('/index')
    
}

//controlador que renderiza a la pagina de inicio de sesion

userController.signin = passport.authenticate('local', {
    failureRedirect: '/registerForm',
    successRedirect: '/dashboard',
    failureFlash: true
});

userController.isLogged = (req,res,next) => {
    if (req.isAuthenticated()) {
        return next();
    } else{
        res.redirect("/registerForm")
    }
}

userController.logout = (req,res) => {
    req.logout(req.user, (err) => {
        res.redirect('/registerForm',)
    })
}


userController.renderDashboard = (req,res) => {
    res.render('layouts/index',{
        template: {
            path: 'users/dashboard',
            title: 'Principal',
            css: ['main','formRegister']
        }, messages: []
    })
}

// Controlador que renderiza la página del fórmulario de registro de uruario
userController.register = async (req,res) => {
    res.render('layouts/register',{
        template: {
            path: 'users/formRegister',
            title: 'Registration Form',
            css: ['main','formRegister']
        }, messages: [req.flash('errorName'), req.flash('errorLast1'), req.flash('errorLast2'), req.flash('errorEmail'), req.flash('errorPass'), req.flash('errorPassMatch'), req.flash('errorEmail2'),req.flash('success_msg')]
    })
}

// Controlador del POST del formulario para hacer la validación de los campos y hacer la inserción a la BD en MONGODB
userController.registerUser = async (req,res) => {
    // Destructuración del objeto de formulario
    const {name, ap1, ap2, email, password, confirm_password} = req.body
    
    // Espresiones regulares para las validaciones de los campos del formulario
    const nameExpression = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]*){0,}$/;
    const lastnameExpression = /^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*){0,}$/;
    const emailExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
    let seguro = true;
    
    // Ciclo que valida los campos del formulario con las expresiones regulares
    if(!name.match(nameExpression)) {
        req.flash('errorName', 'El nombre debe iniciar con mayúsculas al inicio y despues de cada espacio');
        seguro = false;
    }if(!ap1.match(lastnameExpression)){
        req.flash('errorLast1', 'El apellido debe iniciar con mayúsculas al inicio y despues de cada espacio');
        seguro = false;
    }if(!ap2.match(lastnameExpression)){
        req.flash('errorLast2', 'El segundo apellido debe iniciar con mayúsculas al inicio y despues de cada espacio');
        seguro = false;
    }if(!email.match(emailExpression)){
        req.flash('errorEmail', 'La dirección de correo no es correcta');
        seguro = false;
    }if(!password.match(passExpression)){
        req.flash('errorPass', 'Contraseña incorrecta, debe tener mayúsculas, minúsculas, números y un caracteres especiales');
        seguro = false;
    }if(password != confirm_password){
        req.flash('errorPassMatch', 'Las contraseñas no coinciden');
        seguro = false;
    }
    console.log(seguro);
    if (seguro == false) {
        res.redirect('/registerForm');
    }else{
        const emailUser = await User.findOne({email: email})
        
        if(emailUser){
            req.flash('errorEmail2', 'El correo ya esta en uso');
            res.redirect('/registerForm');
        }else{
            const newUser = new User({name, ap1, ap2, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','Registro exitoso');
            res.redirect('/registerForm');
        }
    }
    

}

userController.renderStudentForm = (req, res) =>{
    res.render('layouts/index',{
        template:{
            path: 'users/addStudent',
            title: 'Listas',
            css: []
        }, messages: []
    })
}

userController.addNewStudent = async (req, res) =>{
    const {name, ap1, ap2, calification, groups} = req.body;
    const newStudent = new student({name, ap1, ap2, calification, groups})
    //Se guarda el ID para aislar los datos entre Alumnos
    newStudent.user = req.user_id;
    await newStudent.save();
    req.flash('succes_msg', 'Se agrego correctamente')
    res.redirect('/user/student')
};

userController.renderStudent = async (req, res) =>{
    const alumnos = await student.find({user: req.user._id});
    res.render('users/allStudents', { alumnos });
};

userController.editStudentForm = (req, res) =>{
    const alumno = student.findById(req.params.id).lean()
    if(alumno.user!= req.user._id){
        req.flash('error_msg', 'Not authorized')
        return res. redirect('/user/student')
    }

    res.render('/user/editStudent', { alumno });
}

userController.updateStudent = async (req, res) => {
    const {name, ap1, ap2, calification, groups} = req.body
    await student.findByIdAndUpdate(req.params.id, {name, ap1, ap2, calification, groups})
    req.flash('succes_msg', 'Estudiante actualizado correctamente');
    res.redirect('/users/student');
}

userController.deleteStudent = async (req, res) => {
    await student.findByIdAndDelete(req.params.id)
    req.flash('succes_msg', 'student eliminado correctamente')
    res.redirect('/user/student')
}

module.exports = userController;
