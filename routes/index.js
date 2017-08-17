var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.cookie('chocolate', 'chip', {maxAge: 1000, httpOnly: true})
  res.cookie('banana', 'nut', {maxAge: 1000, httpOnly: true})
  res.render('index', { title: 'splash page' });
});

router.get('/home', function(req, res, send){
  knex.raw(`select * from countries`)
  .then(function(countries){
    console.log(countries.rows)
    res.render('home', {countries: countries.rows} )
  })
})

router.get('/account', function(req, res, send){
  // console.log(${res.cookie.username})
  knex.raw(`select * from users where username = '${res.cookie.username}'`)
  .then(function(user){
    res.render('account', {title: 'User Account', user: user.rows[0]})
  })
})




module.exports = router;
