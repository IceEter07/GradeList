const { Router } = require('express')
const router = Router();

const mainController = require('../controller/main.controller')

router.get('/index', mainController.index)
router.get('/groupView', mainController.groupView)
router.get('/groupRegisterForm', mainController.groupRegisterForm)
router.post('/groupRegister', mainController.groupRegister)

module.exports = router;