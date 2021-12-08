/*-- Node test js file ---*/

/*(function printSomething(){

	console.log("Hello Thabo!, I'm Node.js nice to meet you.");
	return;
})();*/

// Create a node server
var express = require('express');

	app = express();

app.use(express.static(__dirname + '/public'));
app.listen(8080);

console.log('Server now running on port 8080 through express');