var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/foodlist', function(req, res) {
    var db = req.db;
    db.collection('food').find().toArray(function (err, items) {
        res.json(items);
    });
});



router.post('/addfood', function(req, res) {
    var db = req.db;
    db.collection('food').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * POST to addfood.
 */
router.post('/addfood/:id', function(req, res) {
    var db = req.db;
    db.collection('food').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deletefood.
 */
router.delete('/deletefood/:id', function(req, res) {
    var db = req.db;
    var foodToDelete = req.params.id;
    db.collection('food').removeById(foodToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;