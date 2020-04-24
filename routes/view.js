// the required variables
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

/* GET view page */
router.get('/:id',function(req,res,next){
  // sets the variable to the url parameter
  var id ;

  var Posts = dataBase.posts;

  // loop to find index
  for(var i = 0; i < Posts.length; i++){
    if (Posts[i]. id == req.params.id){
      id = i;
    }
  }

  res.render('view',{
    title : "View",
    // for posts
    posts : dataBase.posts,
    // the id
    id : id
  });
});

// for cookies
router.post('/',function(req,res,next){
  res.cookie('cookieWarning','we gave cookies');
  res.redirect('/');
})

// to give what this page allows other pages to use
module.exports = router
