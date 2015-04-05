/*
 * GET userlist page.
 */

exports.foodlist = function(db) {
  return function(req, res) {
    db.collection('food').find().toArray(function (err, items) {
      res.json(items);
    })
  }
};

/*
 * POST to adduser.
 */

exports.addfood = function(db) {
  return function(req, res) {
    db.collection('food').insert(req.body, function(err, result){
      res.send(
        (err === null) ? { msg: '' } : { msg: err }
      );
    });
  }
};

/*
 * DELETE to deleteuser.
 */

exports.deletefood = function(db) {
  return function(req, res) {
    var foodToDelete = req.params.id;
    db.collection('food').removeById(foodToDelete, function(err, result) {
      res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
  }
};