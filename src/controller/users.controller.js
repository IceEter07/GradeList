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
    console.log("object");

    res.render('users/editUser', {user})
}

userController.updateUser = async (req, res) =>{
    const {name, email} = req.body
    await User.findByIdAndUpdate(req.params.id, {name, email})
    console.log("User updated succesfully");
    res.redirect('/index')
    
}

module.exports = userController;