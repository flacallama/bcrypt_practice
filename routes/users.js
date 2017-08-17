var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next){
  // console.log(req.body)
  knex.raw(`SELECT * FROM users WHERE username = '${req.body.username}'`)
  .then(function(user){
    bcrypt.hash(user.rows[0].id, 12, function(err, hashID){
      bcrypt.compare(req.body.password, user.rows[0].password, function(err, resp){
        if(resp){
          res.cookie('id', '${hashID}', {maxAge: 100000, httpOnly: true})
          res.cookie('username', user.rows[0].username, {maxAge: 100000, httpOnly: true})
          // console.log(user.rows[0])
          res.render('show', {user: user.rows[0]})
        } else {
          res.render('login')
        }
      })
    })
  })
})

router.get('/logout', function(req, res, next){
  res.cookie('password', null)
  res.redirect('/')
})










router.get('/create', function(req, res, next) {
  res.render('create')
});

router.post('/create', function(req, res, next){
  console.log(req.body);
  if(req.body.password === req.body.confirm){
    bcrypt.hash(req.body.password, 12, function(err, hash){
      knex.raw(`INSERT INTO users (username, age, email, password) VALUES ('${req.body.username}', '${req.body.age}', '${req.body.email}', '${hash}' )`)
      .then(function(){
        res.render('login')
      })
    });
  } else {
    res.redirect('/create');
  }
});

// router.post('/create', function(req, res,next) {
//   console.log(req.body)
//   if (req.body.password === req.body.confirm) {
//     bcrypt.hash(req.body.password, 16, function(err, hash) {
//       knex.raw(`INSERT INTO users (username, age, email, password) values ('${req.body.username}', ${req.body.age}, '${req.body.email}', '${hash}')`)
//       .then(function() {
//         res.send("SUCCESS")
//       })
//     });
//   } else {
//     res.redirect('/create');
//   }
// });






module.exports = router;
