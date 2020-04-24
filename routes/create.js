// the required variables
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')
var request = require('request');

/* GET create page */
router.get('/',function(req,res,next){

  res.render('create',{
    title : "Create",
  });

});


// posts a create  request
router.post('/',function(req,res,next){

  var Posts = dataBase.posts;

  // get the id of the last post
  var id = Posts[Posts.length-1].id;
  // and sets the variable to that id + 1
  // this insures that the id will never be the same
  id = Number(id)+1;

  // getting the date
  var newDate = new Date();
  //in the format DD/MM/YYYY
  var date = `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;

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
    url:"http://localhost:8080/posts",
    method:"POST",
    form:{
      id:id,
      date: date,
      author:req.app.locals.user,
      title:req.body.title,
      image : req.body.image,
      description:description+"...</p>",
      content:content,
    },
    function(error,reponse,body){
      res.render('index',{message: 'successfully added'});
    }
  })

    // redirect to home page after creating
    res.redirect('/');

})

// to give what this page allows other pages to use
module.exports = router
