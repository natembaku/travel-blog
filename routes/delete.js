// the required variables
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')
var request = require('request');

/* GET delete page */
router.get('/:id',function(req,res,next){

  // var to find index
  var id;
  var Posts = dataBase.posts;
  // loop to find index
  for(var i = 0; i < Posts.length; i++){
    if (Posts[i]. id == req.params.id){
      id = i;
    }
  }

  res.render('delete',{
    title : "Delete",
    posts : dataBase.posts,
    id : id,
  });

});

// posts the delete request
router.post('/:id', function(req, res, next) {

  //make a post request to our database
  request({
    url: "http://localhost:8080/posts/"  + req.params.id,
    method: "DELETE",
    },
    function(error, response, body) {
      res.render('index',{message: 'successfully added'});
    }
  );

  // redirects to home page
  res.redirect('/');

});


// to give what this page allows other pages to use
module.exports = router;
