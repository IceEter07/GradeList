const { Router } = require('express')
const router = Router();

const mainController = require('../controller/main.controller')
const usersController = require('../controller/users.controller')

router.get('/dashboard',usersController.isLogged, mainController.renderDashboard)

// Rutas de grupos
router.get('/groupRegisterForm', usersController.isLogged, mainController.groupRegisterForm)
router.post('/groupRegister', usersController.isLogged, mainController.groupRegister)
router.get('/editGroupForm/:id', usersController.isLogged, mainController.editGroupForm)
router.post('/updateGroup/:id', usersController.isLogged, mainController.updateGroup)
router.delete('/deleteGroup/:id',usersController.isLogged, mainController.deleteGroup)

//Rutas de los estudiantes
router.post('/user/addStudent',usersController.isLogged, mainController.addNewStudent);
router.get('/user/allStudent',usersController.isLogged, mainController.renderStudent);
router.get('/editStudentForm/:id', usersController.isLogged, mainController.editStudentForm)
router.post('/updateStudent/:id', usersController.isLogged, mainController.updateStudent)
router.post('/deleteStudent/:id', usersController.isLogged, mainController.deleteStudent)


// Rutas de instituciones
router.post('/registerInstitution', usersController.isLogged, mainController.registerInstitution);
router.get('/showInstitution/:id', usersController.isLogged, mainController.showInstitutions);
router.get('/editInstitution/:id', usersController.isLogged, mainController.editInstitution);
router.post('/updateInstitution/:id', usersController.isLogged, mainController.updateInstitution);
router.post('/deleteInstitution/:id', usersController.isLogged, mainController.deleteInstitution);



module.exports = router;