'use strict';

// Check first if DOM is ready
document.onreadystatechange = function(){

	if(document.readyState === 'complete'){

		document.getElementById('launch-test').onclick = () => {

			fetchStuff('users.json', renderRes);
		};

		// Makes an XHR call async style
		function fetchStuff(url, fetched){

			// Create new XHR instance
			var ajaxCall; 	
			try{
				ajaxCall = new XMLHttpRequest();
			}catch(e){
				try{
					
					// For IE and other such fools
					ajaxCall = new ActieXObject('Microsoft.XMLHTTP');
				}catch(e){
					console.error('Browser says no!');
				}
			}

			// Track status of request
			ajaxCall.onreadystatechange = function(){
				if(ajaxCall.readyState === XMLHttpRequest.DONE && ajaxCall.status === 200){

					// If everything's cool go on processing data
					var res = ajaxCall.responseText;
					var data = JSON.stringify(res);

					console.log('Making call...');
					setTimeout(() => {

						// Callback to process data
						fetched(data);
					}, 2000);
				}
			};

			// Open request ports
			ajaxCall.open('GET', url, true);
			ajaxCall.setRequestHeader('content-type', 'application/json');
			ajaxCall.send();
		}

		// Populates document with retrieved data
		function modDom(data){

			var pos = document.querySelector('.contents article');

			var el = document.createElement('p');
			var content = document.createTextNode(data); 

			el.appendChild(content);
			pos.appendChild(el); // modify DOM

			// Animate addition of new element
			animateData(el);
			animateObjs('form');
		}

		// Processes and renders data to console
		function renderRes(data){

			console.log(JSON.parse(data));
			console.log('Request processing complete!');
			//
			modDom(data);
		}

		// Adds classes to elements
		function toggleClasses(obj, toAdd){

			var el = document.querySelector(obj);
			el.classList.add(toAdd);
		}

		// Animates app elements
		function animateData(el){

			// Velocity anim prop objects
			// Props & Ops into separate files
			// Props (properties) || Ops (Options)
			// Fade-in/Fade-out
			var fadeIn = {
				props:{

					color: 'white',
					backgroundColor: '#bada55'
				},
				ops:{

					duration: 800
				}
			};
			var fadeOut = {
				props: {

					color: 'black',
					height: 'initial',
					width: 'initial',
					opacity: 0,
					translateY: -500
				},
				ops: {

					delay: 2000,
					duration: 1000,
					easing: 'linear'
				}
			};

			// Slide-down/Slide-up
			var slideDown = {
				ops:{

					duration: 800,
					easing: 'spring'
				}
			};
			var slideUp = {
				props: {

					opacity: 0
				},
				ops: {

					duration: 800,
					delay: 2000
				}
			};

			// Slide-left/Slide-right
			var slideLeft = {

				props: {

					translateX: -500
				},
				ops: {

					duration: 500,
					delay: 1000
				}
			};	
			var slideRight = {

				props: {

					translateX: 0
				},
				ops: {

					duration: 800,
					delay: 1000,
					easing: 'spring'
				}
			};

			// Action time
			// Pass in animation objects
			Velocity(el, 'transition.bounceDownIn', slideDown.ops);
			//Velocity(el, slideLeft.props, slideLeft.ops);
			//Velocity(el, slideRight.props, slideRight.ops);
			Velocity(el, 'transition.bounceUpOut', slideUp.props, slideUp.ops);
		}	

		// Animate DOM elements
		function animateObjs(el){

			// Global selector objects
			var obj = document.querySelector(el);

			// Set up the scene
			// Side-slide-in/out
			var slideInL = {

				props: {

					opacity: 0,
					translateX: -500
				},
				ops: {

					duration: 1000,
					easing: 'spring'
				}
			};
			var slideOutR = {

				props: {

					opacity: 1,
					translateX: 0
				},
				ops: {

					duration: 800,
					delay: 1000,
					easing: 'spring'
				}
			};

			// Slide-up/Down
			var slideUp = {

				props: {

					translateY: -300
				},
				ops: {

					duration: 800
				}
			};
			var slideDown = {
				props: {

					translateY: 0
				},
				ops: {

					duration: 800,
					delay: 1000
				}
			};

			// Action time
			Velocity(obj, slideInL.props, slideInL.ops);
			Velocity(obj, slideOutR.props, slideOutR.ops);
			//Velocity(obj, 'transition.slideUpOut', slideUp.ops);
			//Velocity(obj, 'transition.slideDownIn', slideDown.ops);
		}
	}
};