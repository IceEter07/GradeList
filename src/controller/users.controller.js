const userController = {}
const passport = require('passport');
const User = require('../models/user')



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
        css: ['main','userEdit'],
        js: []
    }})
}

userController.updateUser = async (req, res) =>{
    const {name, ap1, ap2} = req.body

    await User.findByIdAndUpdate(req.params.id, {name, ap1, ap2})
    req.flash('success_msg', 'Los datos han sido actualizados correctamente');
    res.redirect(`../../user/editForm/${req.params.id}`)
}

//controlador que renderiza a la pagina de inicio de sesion
// userController.renderSignForm = (req, res) => {
//     res.render('users/formRegister',{
//         template: {
//             path: 'users/formRegister',
//             title: 'Inicio Sesion',
//             css: ['main','formRegister']
//         },
//     })
// }
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

// Controlador que renderiza la página del fórmulario de registro de usuario
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
    
    // const nameExpression = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]*){0,}$/;
    // const lastnameExpression = /^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*){0,2}$/;
    
    const nameExpression = /^(?:[ÁÉÍÓÚÜÑA-Z][áéíóúüña-zA-Z]*\s)*[ÁÉÍÓÚÜÑA-Z][áéíóúüña-zA-Z]*$/;
    const lastnameExpression = /^(?:[ÁÉÍÓÚÜÑA-Z][áéíóúüña-zA-Z]*\s)*[ÁÉÍÓÚÜÑA-Z][áéíóúüña-zA-Z]*$/;
    const emailExpression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.])(?!.*\s).{8,}$/;
    let seguro = true;
    
    // Ciclo que valida los campos del formulario con las expresiones regulares
    if(!name.match(nameExpression)) {
        req.flash('errorName', 'El nombre debe iniciar con mayúsculas al inicio y despues de cada espacio');
        seguro = false;
    }if(!ap1.match(lastnameExpression)){
        req.flash('errorLast1', 'El primer apellido debe iniciar con mayúsculas al inicio y despues de cada espacio');
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

userController.aboutUs = (req,res) => {
    res.render('layouts/aboutUs',{
        template: {
            path: ['partials/navbar','partials/infoContainer'],
            title: 'AboutUs',
            css: ['main','aboutUs']
        }
    });
}
module.exports = userController;