var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex.js')

/* GET home page. */
router.get('/', controllerIndex.tela_principal);
router.post('/', controllerIndex.tela_principal);

/* GET página sobre */
router.get('/sobre', controllerIndex.sobre);

/* GET página de ajuda */
router.get('/ajuda', controllerIndex.ajuda);

module.exports = router;
