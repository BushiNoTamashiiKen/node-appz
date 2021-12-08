/**
 * Velocity animation properties
 * Custom objects
 * p: Property
 * o: Option
 */

 'use strict';

 // Opacity anim 
 var fades = {

 	p: {

 		opacity: 1
 	}
 };

 // To circle anim
 var toCircle = {

 	p: {

 		borderRadius: '25px',
 		width: '45px',
 		paddingLeft: '0',
 		paddingRight: '0',
 		backgroundColor: '#bada55',
 		boxShadowX: '0',
 		boxShadowY: '0'
 	},
 	o: {

 		duration: 350,
 		easing: 'easeInQuad'
 	}
 };

 // Scroll up and down
 var scroll = {

 	o: {

 		duration: 800,
 		easing: 'easeInBack'
 	}
 };

 // Bouncing up and down
 var bounce = {

 	p: {

 		translateY: '10px'
 	},
 	o: {

 		loop: true
 	}
 };

 /**
  * Motion definitions
  */
  