// the required variables
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')
var request = require('request');

/* GET edit page */
router.get('/:id',function(req,res,next){

  // var to find index
  var id ;
  var Posts = dataBase.posts;
  // loop to find index
  for(var i = 0; i < Posts.length; i++){
    if (Posts[i]. id == req.params.id){
      id = i;
    }
  }

  res.render('edit',{
    title : "Edit",
    posts : dataBase.posts,
    id : id,
  });

});


// posts the edit request
router.post('/:id',function(req,res,next){

  // gets the content
  var content = req.body.content;

  // text is used for the description
  // turns the object to string
  var text = JSON.stringify(content);

  // the description variable
  var description ;
  description = text.charAt(1);

  // gets the char from the srting
  for(var i = 2; i < 200;i++){
    description += text.charAt(i);
  }

  // post request
  request({
    url:"http://localhost:8080/posts/"+ req.params.id,
    method:"PATCH",
    form:{
      author:req.body.author,
      title:req.body.title,
      image:req.body.image,
      description:description+"...</p>",
      content:content,
    },
    function(error,reponse,body){
      res.render('index',{message: 'successfully added'});
    }
  })

  // redirects to home page
  res.redirect('/');

})


// to give what this page allows other pages to use
module.exports = router
