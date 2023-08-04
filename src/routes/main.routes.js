const { Router } = require('express')
const router = Router();

const mainController = require('../controller/main.controller')

router.get('/index', mainController.index)
router.get('/groupView', mainController.groupView)
router.get('/groupRegisterForm', mainController.groupRegisterForm)
router.post('/groupRegister', mainController.groupRegister)

router.get('/editGroupForm/:id', mainController.editGroupForm)
router.post('/updateGroup/:id', mainController.updateGroup)



module.exports = router;