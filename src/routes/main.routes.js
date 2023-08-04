const { Router } = require('express')
const router = Router();

const mainController = require('../controller/main.controller')

router.get('/index', mainController.index)
router.get('/groupView', mainController.groupView)

module.exports = router;