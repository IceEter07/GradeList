const { Router } = require('express')
const router = Router();

const usersController = require('../controller/users.controller');
const userController = require('../controller/users.controller');

// router.get('/user/signup', userController.renderSignUpForm)
// router.post('/user/signup', userController.signUp)

// router.get('/user/signin', userController.renderSignInForm)
// router.post('/user/signin', userController.signIn)

router.get('/user/editForm/:id', usersController.isLogged, usersController.renderEditForm)
router.put('/user/edit/:id', usersController.isLogged, usersController.updateUser)
router.post('/register', usersController.registerUser);
// router.get('/', userController.aboutUs)

router.post('/login', usersController.signin);
router.get('/registerForm', usersController.register);
// router.post('/registerForm', usersController.renderSignForm);
router.post('/logout',usersController.isLogged, usersController.logout);
router.post('/logout',usersController.isLogged, usersController.logout);
router.get('/user/student',usersController.isLogged, usersController.renderStudentForm);
router.post('/user/addStudent',usersController.isLogged, usersController.addNewStudent);
router.get('/user/allStudent',usersController.isLogged, usersController.addNewStudent);




// router.get('/user/logout', userController.logout)

router.get('/', userController.aboutUs)

module.exports = router;
