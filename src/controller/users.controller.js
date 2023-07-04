const userController = {}
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
    res.render('users/editUser', {user})
}

userController.updateUser = async (req, res) =>{
    const {name, ap1, ap2, email} = req.body

    const emailUser = await User.findOne({email: email})
    
    if(emailUser){
        req.flash('error_msg', 'El correo ya esta en uso');
        
        //La línea de abajo no se podía ejecutar porque el método put que se hacía desde el formulario
        //hacia que entrara en una "subcarpeta" que no permitia que el redirect funcionara adecuadamente.
        //SE RECOMIENDA REVISIÓN
        res.redirect(`../../user/editForm/${req.params.id}`)
    }
    else{
        //La línea req.params.id deberá cambiarse una vez que se tenga listo el login
        await User.findByIdAndUpdate(req.params.id, {name, ap1, ap2, email})
        console.log("User updated succesfully");
        req.flash('success_msg', 'Los datos han sido actualizados correctamente');
        res.redirect(`../../user/editForm/${req.params.id}`)
    }
    // res.redirect('/index')
    
}

module.exports = userController;
