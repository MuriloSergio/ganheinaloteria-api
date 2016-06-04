'use strict';

var express = require('express'),
    router  = express.Router();

var MegasenaController = require('../controllers/MegasenaController');
var QuinaController = require('../controllers/QuinaController');
     
router.get('/', function(req, res, next) {
  res.send('Rodando');
});

//megasena
router.get('/megasena', MegasenaController.ultimoResultado);
router.get('/megasena/:concurso', MegasenaController.resultadoDoConcurso);

//quina
router.get('/quina', QuinaController.ultimoResultado);
router.get('/quina/:concurso', QuinaController.resultadoDoConcurso);

module.exports = router;
