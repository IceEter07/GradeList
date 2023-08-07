const { Router } = require('express')
const router = Router();

const usersController = require('../controller/users.controller')

// router.get('/user/signup', userController.renderSignUpForm)
// router.post('/user/signup', userController.signUp)

// router.get('/user/signin', userController.renderSignInForm)
// router.post('/user/signin', userController.signIn)

router.get('/user/editForm/:id', usersController.renderEditForm)
router.put('/user/edit/:id', usersController.updateUser)
router.post('/register', usersController.registerUser);
router.post('/login', usersController.signin);
router.get('/registerForm', usersController.register);
// router.post('/registerForm', usersController.renderSignForm);
router.post('/logout',usersController.isLogged, usersController.logout);



// router.get('/user/logout', userController.logout)

module.exports = router;
