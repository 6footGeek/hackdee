var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'UniEat' });
});
//gethomepage
router.get('/test', function(req, res) {
	res.render('test', {title: 'testpage!'})
});

module.exports = router;
