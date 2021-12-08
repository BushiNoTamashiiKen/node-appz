/**
 * Dynamic GraphS
 * Line Graph and Circular Progress Bars
 * Projects | Circular Progress
 * Burndown Chart | Line Graph
 * API's: Chart.js 
 */

 'use strict';

 /*--- Checking first if DOM is initialised ---*/
 document.onreadystatechange = () => {

 	if(document.readyState === 'complete'){

 		/*--- Radial Progress Chart Properties ---*/
  		/*--- COMPLETE ---*/
  		var bar_01 = new RadialProgress(document.getElementById('bar_01'), {

        	progress: 0.7,
        	colorBg:"#eeeeee",
        	colorFg:"#00e4ac",
        	colorText:"rgba(0,0,0,0.9)",
        	thick: 5.0,
        	fixedTextSize: 0.3,
        	noPercentage: true,
        	round: true
    	});
    	bar_01.setText('68');
    	bar_01.draw(true);

    	/*--- ONGOING ---*/
    	var bar_02 = new RadialProgress(document.getElementById('bar_02'), {

        	progress: 0.1,
        	colorBg:"#eeeeee",
        	colorFg:"#00e4ac",
        	colorText:"rgba(0,0,0,0.9)",
        	thick: 8.0,
        	fixedTextSize: 0.3,
        	noPercentage: true,
        	round: true
    	});
    	bar_02.setText('3');
    	bar_02.draw(true);

    	/*--- UPCOMING ---*/
    	var bar_03 = new RadialProgress(document.getElementById('bar_03'), {

        	progress: 0.5,
        	colorBg:"#eeeeee",
        	colorFg:"#00e4ac",
        	colorText:"rgba(0,0,0,0.9)",
        	thick: 8.0,
        	fixedTextSize: 0.3,
        	noPercentage: true,
        	round: true
    	});
    	bar_03.setText('15');
    	bar_03.draw(true);
 	}

 	/*--- Line Chart Instantiation ---*/
    var ctx = document.getElementById('burndownChart').getContext('2d');

    /*--- Chart Gradient Object ---*/
    var gradient = ctx.createLinearGradient(0, 60, 80, 400);
    gradient.addColorStop(0, 'rgba(0, 228, 172,0.2)');   
    gradient.addColorStop(1, 'rgba(40, 167, 186,0.0)');
    /*----------------------------*/

    /*--- Line Chart Properties ---*/
    var chart = new Chart(ctx, {

        /*---  Type of chart ---*/
        type: 'line',

        /*--- The dataset ---*/
        data: {
            labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
            datasets: [{
                label: "Productivity Level",

                backgroundColor : gradient, // Pass in Gradient object

                borderColor: "#00e4ac",
                pointColor: "#fff",
                pointBorderColor: "#00e4ac",
                pointBackgroundColor: "#fff",
                pointRadius: 4.0,
                data: [0, 15, 8, 29, 3, 15, 25],
            }]
        },

        /*--- Line Chart config options ---*/
        options: {
            scales: {
                xAxes:[{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes:[{
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }]
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }                                
        }
    });
 }
