const { Router } = require('express')
const router = Router();

const mainController = require('../controller/main.controller')
const usersController = require('../controller/users.controller')

router.get('/dashboard',usersController.isLogged, mainController.renderDashboard)
router.get('/groupRegisterForm', usersController.isLogged, mainController.groupRegisterForm)
router.post('/groupRegister', mainController.groupRegister)

router.get('/editGroupForm/:id', usersController.isLogged, mainController.editGroupForm)
router.post('/updateGroup/:id', mainController.updateGroup)

router.delete('/deleteGroup/:id', mainController.deleteGroup)

//Rutas de los estudiantes
router.post('/user/addStudent',usersController.isLogged, mainController.addNewStudent);
router.get('/user/allStudent',usersController.isLogged, mainController.renderStudent);

router.get('/editStudentForm/:id', usersController.isLogged, mainController.editStudentForm)
router.post('/updateStudent/:id', usersController.isLogged, mainController.updateStudent)
router.post('/deleteStudent/:id', usersController.isLogged, mainController.deleteStudent)






module.exports = router;