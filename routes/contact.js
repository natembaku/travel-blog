// the required variables
var express = require('express');
var router = express.Router();

/* GET contact page */
router.get('/',function(req,res,next){

  res.render('contact',{
    title : "Contact",
  });
  
});


// to give what this page allows other pages to use
module.exports = router
