// the required variables
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

/* GET archive page */
router.get('/',function(req,res,next){

  res.render('archive',{
    title : "Archive",
    posts : dataBase.posts,
  });

});

// for cookie
router.post('/',function(req,res,next){
  res.cookie('cookieWarning','we gave cookies');
  res.redirect('/');
})

// to give what this page allows other pages to use
module.exports = router
