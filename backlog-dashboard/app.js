/*--- Imports ---*/
 var express = require('express');
 var app = express();
 var path = require('path');

//Launch app server
app.use(express.static(path.join(__dirname, 'dist')));
app.listen(3000, function (){

  console.log('Test app listening on port 3000!');

  var err = 'Server error'
  if(err){

    console.error(err);
  }else{

    console.log('App started successfully!');
    return;
  }
})

module.exports = app;


