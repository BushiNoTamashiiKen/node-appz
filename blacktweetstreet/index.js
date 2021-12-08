/*--- Twitter-based Marketplace app for black businesses ---*/
/*--- Index File ---*/
const config = require('./config');
//const twit = require('twit');
const twitter = require('twitter-lite');
//const FetchTweets = require('fetch-tweets');

const client = new twitter(config); // twitter-lite module access to API Keys
//const fetchTweets = new FetchTweets(config); // Give module access to API Keys
//const client = new twit(config); // Give module access to API Keys


/*-- End-points 
/*-- 'statuses/update' || Update tweet 
/*-- 'users/show' || Show user-id
/*-- 'stream' 
*/

/*-- Fetch user-account to assign retweet points --*/
client.get('users/show', {screen_name: 'sunlitboy'}).then(result => {

	/*-- Display user account if found --*/
	var user = result;
	var latestTweet = result.status;

	//console.log(latestTweet);
	console.log(latestTweet);

	/*-- Generate Tweet --*
	client.post('statuses/update', {status: 'Bot-tweet count test-06'}).then(result => {

		console.log('Tweet generated remotely: "' + result.text + '"');
	}).catch(console.error);

	/*-- Check for Retweet --*/
	client.get('statuses/retweet', {id: latestTweet.id_str}).then(result =>{

		console.log('Retweeted successfully!');

	}).catch(console.error);

	//
	client.get('statuses/retweet', {retweeted_status: latestTweet.id_str}).then(result =>{
	
		console.log(result);

	}).catch(console.error);
}).catch(console.error); // Catch Errors



/**
 * Retweets a tweet passed into a function
 * @param {*} tweet || Stores Tweet object
 *

function tweetStatus(message){

	// Store tweet content in object
	var tweet = {
		status: message
	}

	// Call POST method with API
	T.post('statuses/update', tweet, tweeted);

	// Resonse callback
	function tweeted(err, data, response){
		if(err){

			console.log('something went wrong');
			console.log(err);
			console.log();
		}else{

			console.log('Success! The post has been published successfully!');
		}

	}
}	

// Call tweet function
tweetStatus('Test Bot Tweet');

function testTweet(result){

	//Put something here
	console.log(result);// Callback function
	console.error(err); // Catch errors
}
testTweet('Tweet string');

// authentication function
function callRoles(variable){

}
//
callRoles('string');*/










