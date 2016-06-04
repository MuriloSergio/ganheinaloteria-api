'use strict';

var express = require('express'),
    router  = express.Router(),
    pkg     = require('../package.json');
  
router.get('/versao', function(req, res) {
  res.json({
    "nomeAplicacao": pkg.name,
    "dataVersao": pkg.versionDate,
    "versao": pkg.version
  });
});

module.exports = router;