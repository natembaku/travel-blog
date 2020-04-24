// the required variables
var express = require('express');
var router = express.Router();
var dataBase = require('../db.json')

/* GET main page */
router.get('/',function(req,res,next){

  // checks if there is a user varification cookie
  if (req.cookies.userId !== undefined){
    // var to find index
    var id;
    var users = dataBase.users;
    // loop to find index
    for(var i = 0; i < users.length; i++){
      if (users[i].id == req.cookies.userId){
        id = i;
      }
    }

    // sets login variables
    req.app.locals.user = users[id].username;
    req.app.locals.logedIn = true;
  }

  if (req.cookies.cookieWarning !== undefined){
    req.app.locals.cookieWarning = true;
    // for developement
    // req.app.locals.cookieWarning = false;
    // res.clearCookie('cookieWarning');
  }

  console.log('Cookies: ',req.cookies);

  res.render('index',{
    title : "Bloggle",
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
