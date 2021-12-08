/**
 * Node and express chat app using socket.io
 * Uses Node event I/O powers
 *
 */

 // Fetch modules
 var express = require('express'),
     app     = express(), // New app instance
     server  = require('http').createServer(app), // Wrap express app in node http
     io      = require('socket.io')(server); // Expose my app to socket.io

 const PORT = 8085;
 server.listen(PORT, function(err){
 	if(err){
 		console.log('Problem starting server!', err);
 	}
 	console.log('Chat app started at: ' + PORT);
 });

 // Route_01 Set up express static server
 app.use(express.static('public'));

 app.get('*', (request, response) => {

 	throw new Error('Oops!');
 });

 // Fetch app views
 app.get('/', (req, res, err, next) => {

  if(err){
    next(err);
  }
  res.sendFile( __dirname + '/' + 'index.html');
 });

 app.get('/', (req, res, err, next) => {

 	if(err){
 		next(err);
 	}
 	res.sendFile( __dirname + '/' + 'chat.htm');
 });

 // Socket event emitters and listeners
 io.on('connection', (socket) => {

 	userConnected();
 	socket.on('new message', newMessage);
 });

 // Route_01 404 error handler
 app.use(notFound);

 // Route_02 server 500 errors
 app.use(serverErrs);

 // Route_03 socket connection errors
 app.use(socketErrs);

 /**
  * Socket.io function definitions
  *
  */
  // When a user connects
  function userConnected(){
  	return console.log('New user connected:');
  }

  // When a user sends a new message
  function newMessage(msg){

  	// Broadcast message event to client for display
  	io.emit('newMsg', msg);
  	console.log('Message: ' + msg);
  }

  // When a user logs off
  function userLoggedoff(){
  	return console.log('User logged off:');
  }

 /**
  * Error handlers
  *
  */
 // Handles 404 errors
 function notFound(err, request, response, next){

 	console.log(err);
 	response.status(404).send('Sorry, could not resolve that request :(');
 	next;
 }

 // Handles socket.io errors
 function socketErrs(err, req, res, next){

 	console.log(err);
 	res.send('Socket.io failed to connect');
 }

 // Handles server 500 errors
 function serverErrs(err, request, response, next){

 	if(response.status !== 500){
 		next(err);
 	}
 	console.log(err);
 	return response.status(500).send('Server error');
 }