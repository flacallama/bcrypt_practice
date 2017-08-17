var express = require('express');
var router = express.Router();
var knex = require('../db/knex.js');

/* GET home page. */
router.get('/:id', function(req, res, next) {
  knex.raw(`select * from countries join flag_colors on countries.id = flag_colors.country_id join colors on flag_colors.color_id = colors.id where countries.id = ${req.params.id}`)
  .then(function(colors){
    res.render('country_show', {colors:colors.rows})
  })

});

router.get('/:id/edit', function(req, res, next){
  var countID = req.params.id;
  knex.raw(`select * from countries join flag_colors on countries.id = flag_colors.country_id join colors on flag_colors.color_id = colors.id where countries.id = ${countID}`)
  .then(function(countries){
    res.render('country_edit', {data: countries.rows, countID: countID })
  })

})

////////////////// I NEED TO MAKE THE :ID/EDIT POST FORM AND FINISH THE COUNTRY EDIT JADE DOC


module.exports = router;
