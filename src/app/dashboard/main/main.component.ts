import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { Event, Router, NavigationStart, NavigationEnd, RouterEvent } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
declare const $: any;
declare const Chart: any;
declare const window: any;
declare const swal: any;
declare const vall: any;

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
 
export class MainComponent implements OnInit {
 
	awsurl = "http://afs-icps-image.haselfrefoundation.org.s3.ap-south-1.amazonaws.com/"
	//awsurl = "https://rlstest.s3.ap-south-1.amazonaws.com/images/"
	//awsurl = "http://afs-icps-image.haselfrefoundation.org.s3.website.ap-south-1.amazonaws.com/"
	public schoolData_DisPlay: any[];
 
 
 
	public alerts: Array<any> = [];
	userTypeId = localStorage.getItem('userTypeId');
	schooloption = localStorage.getItem('schooloption');
	userstateName = localStorage.getItem('stateName');
	userdistrictId = localStorage.getItem('districtId');
	passdata: any[];
	activeusers: any[];
	activetrained: any[];
	activechildren: any[];
	schooldetails: any[];
	activekit: any[];
	schoolNames: any[];
	listdistrict: any[];
	shipdisarray: any[];
	excutives: any[];
	Districtmou_list: any[];
	activestatesarray: any[];
	curstateval = '';
	curdistrictsval = '';
	excutive = '';
	curdistrict = '';
	schoolcount = 0;
	shippedcount = 0;
	video_count = 0;
	audio_count = 0;
	teacherscount = 0;
	statevideo_count = 0;
	stateaudio_count = 0;
	kitcount = 0;
	districtcount = 0;
	totdistrictcount = 0;
	children_trained_count = 0;
	stateNam = '';
	modelPopupVal = 0;
	deviceassignedcount = 0;
	trained_date = '-';
	shipped_date = '-';
	startdate = 'None';
	enddate = 'None';
	private _albums:any[];
	private _albums1: any[];
	private _albums2: any[];
	private _albums3: any[];
	statemou = '';

	tot_teachers_count = 0;
	tot_student_trained_count = 0;

imageObject: Array<object> = [{
       video: 'https://youtu.be/6pxRHBw-k8M' // Youtube url
   },
   {
   	video: 'https://youtu.be/6pxRHBw-k8M', // MP4 Video url
   },
   {
   	video: 'http://localhost:4200/assets/images/Logo--haselfre.jpg',
       posterImage: 'http://localhost:4200/assets/images/Logo--haselfre.jpg', //Optional: You can use this key if you want to show video poster image in slider
       title: 'Image title'
   },
   
];


	constructor(private _router: Router,private rest: DynamicScriptLoaderService,private _lightbox: Lightbox) { }

	

	ngOnInit() {
		this.shippeddistrictfun();
		this.activestates();
		this.districtcountfun();
		this.totaldisountfun();
		this.deviceassignedcountfun();
		// this.TeacherAndStudentTrainedCount();
		$(function () {
            $('.js-sweetalert button').on('click', function () {
                var type = $(this).data('type');
                if (type === 'basic') {
                    showBasicMessage();
                }

                else if (type === 'ajax-loader') {
                    showAjaxLoaderMessage();
                }
            });
        });

		function showBasicMessage() {
            swal("Here's a message!");
        }

        function showAjaxLoaderMessage() {
            swal({
                title: "Ajax request example",
                text: "Submit to run ajax request",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            }, function () {
                setTimeout(function () {
                    swal("Ajax request finished!");
                }, 2000);
            });
		}


		$(function () {


			$('#chat-conversation').slimscroll({
				height: '264px',
				size: '5px'
			});
			initCardChart();
			initSparkline();
			initLineChart();
			initSalesChart();


			// initChartReport2();
			$.getScript("./assets/js/try-js-map/map-config.js");
			$.getScript("./assets/js/try-js-map/map-interact.js");
			$.getScript("./assets/js/try-js-map/pins-config.js");

		});

		function initCardChart() {


			//Chart Bar
			$('.chart.chart-bar').sparkline([6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5, 6, 4, 8, 6, 8, 10, 5, 6, 7, 9, 5], {
				type: 'bar',
				barColor: '#FF9800',
				negBarColor: '#fff',
				barWidth: '4px',
				height: '45px'
			});


			//Chart Pie
			$('.chart.chart-pie').sparkline([30, 35, 25, 8], {
				type: 'pie',
				height: '45px',
				sliceColors: ['#65BAF2', '#F39517', '#F44586', '#6ADF42']
			});


			//Chart Line
			$('.chart.chart-line').sparkline([9, 4, 6, 5, 6, 4, 7, 3], {
				type: 'line',
				width: '60px',
				height: '45px',
				lineColor: '#65BAF2',
				lineWidth: 2,
				fillColor: 'rgba(0,0,0,0)',
				spotColor: '#F39517',
				maxSpotColor: '#F39517',
				minSpotColor: '#F39517',
				spotRadius: 3,
				highlightSpotColor: '#F44586'
			});

			// live chart
			var mrefreshinterval = 500; // update display every 500ms
			var lastmousex = -1;
			var lastmousey = -1;
			var lastmousetime;
			var mousetravel = 0;
			var mpoints = [];
			var mpoints_max = 30;
			$('html').on("mousemove", function (e) {
				var mousex = e.pageX;
				var mousey = e.pageY;
				if (lastmousex > -1) {
					mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
				}
				lastmousex = mousex;
				lastmousey = mousey;
			});
			var mdraw = function () {
				var md = new Date();
				var timenow = md.getTime();
				if (lastmousetime && lastmousetime != timenow) {
					var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
					mpoints.push(pps);
					if (mpoints.length > mpoints_max)
						mpoints.splice(0, 1);
					mousetravel = 0;
					$('#liveChart').sparkline(mpoints, {
						width: mpoints.length * 2,
						height: '45px',
						tooltipSuffix: ' pixels per second'
					});
				}
				lastmousetime = timenow;
				setTimeout(mdraw, mrefreshinterval);
			};
			// We could use setInterval instead, but I prefer to do it this way
			setTimeout(mdraw, mrefreshinterval);
		}
		// function initChartReport1() {
		// 	var canvas = <HTMLCanvasElement>document.getElementById("chartReport1");
		// 	// Apply multiply blend when drawing datasets
		// 	var multiply = {
		// 		beforeDatasetsDraw: function (chart, options, el) {
		// 			chart.ctx.globalCompositeOperation = 'multiply';
		// 		},
		// 		afterDatasetsDraw: function (chart, options) {
		// 			chart.ctx.globalCompositeOperation = 'source-over';
		// 		},
		// 	};

		// 	// Gradient color - this week
		// 	var gradientThisWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		// 	gradientThisWeek.addColorStop(0, '#5555FF');
		// 	gradientThisWeek.addColorStop(1, '#9787FF');

		// 	// Gradient color - previous week
		// 	var gradientPrevWeek = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		// 	gradientPrevWeek.addColorStop(0, '#FF55B8');
		// 	gradientPrevWeek.addColorStop(1, '#FF8787');


		// 	var config = {
		// 		type: 'line',
		// 		data: {
		// 			labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
		// 			datasets: [
		// 				{
		// 					label: 'This week',
		// 					data: [24, 18, 16, 18, 24, 36, 28],
		// 					backgroundColor: gradientThisWeek,
		// 					borderColor: 'transparent',
		// 					pointBackgroundColor: '#FFFFFF',
		// 					pointBorderColor: '#FFFFFF',
		// 					lineTension: 0.40,
		// 				},
		// 				{
		// 					label: 'Previous week',
		// 					data: [20, 22, 30, 22, 18, 22, 30],
		// 					backgroundColor: gradientPrevWeek,
		// 					borderColor: 'transparent',
		// 					pointBackgroundColor: '#FFFFFF',
		// 					pointBorderColor: '#FFFFFF',
		// 					lineTension: 0.40,
		// 				}
		// 			]
		// 		},
		// 		options: {
		// 			elements: {
		// 				point: {
		// 					radius: 0,
		// 					hitRadius: 5,
		// 					hoverRadius: 5
		// 				}
		// 			},
		// 			legend: {
		// 				display: false,
		// 			},
		// 			scales: {
		// 				xAxes: [{
		// 					display: false,
		// 				}],
		// 				yAxes: [{
		// 					display: false,
		// 					ticks: {
		// 						beginAtZero: true,
		// 					},
		// 				}]
		// 			}
		// 		},
		// 		plugins: [multiply],
		// 	};

		// 	window.chart = new Chart(canvas, config);
		// }
		// function initChartReport2() {
		// 	var canvas = <HTMLCanvasElement>document.getElementById("chartReport2");

		// 	var gradientBlue = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		// 	gradientBlue.addColorStop(0, 'rgba(85, 85, 255, 0.9)');
		// 	gradientBlue.addColorStop(1, 'rgba(151, 135, 255, 0.8)');

		// 	var gradientHoverBlue = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		// 	gradientHoverBlue.addColorStop(0, 'rgba(65, 65, 255, 1)');
		// 	gradientHoverBlue.addColorStop(1, 'rgba(131, 125, 255, 1)');

		// 	var gradientRed = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		// 	gradientRed.addColorStop(0, 'rgba(255, 85, 184, 0.9)');
		// 	gradientRed.addColorStop(1, 'rgba(255, 135, 135, 0.8)');

		// 	var gradientHoverRed = canvas.getContext('2d').createLinearGradient(0, 0, 0, 150);
		// 	gradientHoverRed.addColorStop(0, 'rgba(255, 65, 164, 1)');
		// 	gradientHoverRed.addColorStop(1, 'rgba(255, 115, 115, 1)');

		// 	var redArea = null;
		// 	var blueArea = null;

		// 	var shadowed = {
		// 		beforeDatasetsDraw: function (chart, options) {
		// 			chart.ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
		// 			chart.ctx.shadowBlur = 40;
		// 		},
		// 		afterDatasetsDraw: function (chart, options) {
		// 			chart.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
		// 			chart.ctx.shadowBlur = 0;
		// 		}
		// 	};


		// 	window.chart = new Chart(document.getElementById("chartReport2"), {
		// 		type: "radar",
		// 		data: {
		// 			labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
		// 			datasets: [{
		// 				label: "Product",
		// 				data: [25, 59, 90, 81, 60, 82, 52],
		// 				fill: true,
		// 				backgroundColor: gradientRed,
		// 				borderColor: 'transparent',
		// 				pointBackgroundColor: "transparent",
		// 				pointBorderColor: "transparent",
		// 				pointHoverBackgroundColor: "transparent",
		// 				pointHoverBorderColor: "transparent",
		// 				pointHitRadius: 50,
		// 			}, {
		// 				label: "Services",
		// 				data: [40, 100, 40, 90, 40, 90, 84],
		// 				fill: true,
		// 				backgroundColor: gradientBlue,
		// 				borderColor: "transparent",
		// 				pointBackgroundColor: "transparent",
		// 				pointBorderColor: "transparent",
		// 				pointHoverBackgroundColor: "transparent",
		// 				pointHoverBorderColor: "transparent",
		// 				pointHitRadius: 50,
		// 			}]
		// 		},
		// 		options: {
		// 			legend: {
		// 				display: false,
		// 			},
		// 			gridLines: {
		// 				display: false
		// 			},
		// 			scale: {
		// 				ticks: {
		// 					maxTicksLimit: 1,
		// 					display: false,
		// 				}
		// 			}
		// 		},
		// 		plugins: [shadowed]
		// 	});
		// q}
		function initSparkline() {
			$(".sparkline").each(function () {
				var $this = $(this);
				$this.sparkline('html', $this.data());
			});
		}

		



		function initLineChart() {
			try {
				//line chart
				var ctx = <HTMLCanvasElement>document.getElementById("lineChart");
				if (ctx) {
					ctx.height = 150;
					var myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: ["January", "February", "March", "April", "May", "June", "July"],
							defaultFontFamily: "Poppins",
							datasets: [
								{
									label: "My First dataset",
									borderColor: "rgba(0,0,0,.09)",
									borderWidth: "1",
									backgroundColor: "rgba(0,0,0,.07)",
									data: [22, 44, 67, 43, 76, 45, 12]
								},
								{
									label: "My Second dataset",
									borderColor: "rgba(0, 123, 255, 0.9)",
									borderWidth: "1",
									backgroundColor: "rgba(0, 123, 255, 0.5)",
									pointHighlightStroke: "rgba(26,179,148,1)",
									data: [16, 32, 18, 26, 42, 33, 44]
								}
							]
						},
						options: {
							legend: {
								position: 'top',
								labels: {
									fontFamily: 'Poppins'
								}
							},
							responsive: true,
							tooltips: {
								mode: 'index',
								intersect: false
							},
							hover: {
								mode: 'nearest',
								intersect: true
							},
							scales: {
								xAxes: [{
									ticks: {
										fontFamily: "Poppins"
									}
								}],
								yAxes: [{
									ticks: {
										beginAtZero: true,
										fontFamily: "Poppins"
									}
								}]
							}
						}
					});
				}
			} catch (error) {
				console.log(error);
			}
		}

		function initSalesChart() {

			try {
				//Sales chart
				var ctx = <HTMLCanvasElement>document.getElementById("sales-chart");
				if (ctx) {
					ctx.height = 150;
					var myChart = new Chart(ctx, {
						type: 'line',
						data: {
							labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
							type: 'line',
							defaultFontFamily: 'Poppins',
							datasets: [{
								label: "Foods",
								data: [0, 30, 10, 120, 50, 63, 10],
								backgroundColor: 'transparent',
								borderColor: '#222222',
								borderWidth: 2,
								pointStyle: 'circle',
								pointRadius: 3,
								pointBorderColor: 'transparent',
								pointBackgroundColor: '#222222',
							}, {
								label: "Electronics",
								data: [0, 50, 40, 80, 40, 79, 120],
								backgroundColor: 'transparent',
								borderColor: '#f96332',
								borderWidth: 2,
								pointStyle: 'circle',
								pointRadius: 3,
								pointBorderColor: 'transparent',
								pointBackgroundColor: '#f96332',
							}]
						},
						options: {
							responsive: true,
							tooltips: {
								mode: 'index',
								titleFontSize: 12,
								titleFontColor: '#000',
								bodyFontColor: '#000',
								backgroundColor: '#fff',
								titleFontFamily: 'Poppins',
								bodyFontFamily: 'Poppins',
								cornerRadius: 3,
								intersect: false,
							},
							legend: {
								display: false,
								labels: {
									usePointStyle: true,
									fontFamily: 'Poppins',
								},
							},
							scales: {
								xAxes: [{
									display: true,
									gridLines: {
										display: false,
										drawBorder: false
									},
									scaleLabel: {
										display: false,
										labelString: 'Month'
									},
									ticks: {
										fontFamily: "Poppins"
									}
								}],
								yAxes: [{
									display: true,
									gridLines: {
										display: false,
										drawBorder: false
									},
									scaleLabel: {
										display: true,
										labelString: 'Value',
										fontFamily: "Poppins"

									},
									ticks: {
										fontFamily: "Poppins"
									}
								}]
							},
							title: {
								display: false,
								text: 'Normal Legend'
							}
						}
					});
				}
			} catch (error) {
				console.log(error);
			}
		}

	}

	logout() {
		localStorage.setItem('webtoken', '');
		localStorage.setItem('userTypeId', '');
		localStorage.setItem('isLoggedin', '');
		localStorage.setItem('useroption', '');
		localStorage.setItem('schooloption', '');
		localStorage.setItem('deviceoption', '');
		this._router.navigate(['/signin'])
	  }

	modelPopup(val) {
		this.modelPopupVal = val;
	}

		open(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums, index);
		}	
		open1(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums1, index);
		}
		open2(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums2, index);
		}

		open3(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums3, index);
		}

		close(): void {
		// close lightbox programmatically
		this._lightbox.close();
		}

	unassignSchools(userId) {
		console.log(userId, 'flksdjfksdhjf');
		const webToken = localStorage.getItem('webtoken');
		const userType = localStorage.getItem('userTypeId');
		localStorage.setItem('assignuser1', userId);
		this.rest.get('school/unassignSchools?userId=' + userId).subscribe((result) => {
			//this.dropdownList1 = result.result;
			}, (err) => {
			  console.log(err);
			});
	  }


	deviceassignedcountfun() {
		this.rest.get('device/deviceassignedcount').subscribe((result) => {
		  if(result.status)
		  {
		   this.deviceassignedcount = result.result;
			
		  }
		  else
		  {
			this.deviceassignedcount = 0;
		  }
		  
		}, (err) => {
		console.log(err);
		});
	}

	capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}
	imageshowing(district)
	{
						
		var shippedim = [];
		
		for(var i= 0; this.activeusers.length>i;i++){
			if((this.activeusers[i].districtId).toLowerCase()==(district).toLowerCase())
			{
				if(typeof this.activeusers[i].profileImage!='undefined' && this.activeusers[i].profileImage.length>0)
				{
					for (let j = 0; j < this.activeusers[i].profileImage.length; j++) {
						console.log(this.activeusers[i].profileImage[j]);
						if(this.activeusers[i].profileImage[j]!='')
						{
							const album = {
							src: this.awsurl+this.activeusers[i].profileImage[j]
							};

							shippedim.push(album);

						}
					}
				}
			}
		}
		console.log(shippedim);
		this._albums = shippedim;
		if(this._albums.length>0)
		{
			this.open(0);
			if(this.userTypeId!='6')
			{
			
			setTimeout(function () {
					$('.lb-close').after('<button><a href="https://drive.google.com/drive/folders/17pXTqwpwj2HpAZZjYamcnashWkOXTTuX?usp=sharing" target="_blank" class="more-images" style="color: #000;float: left;font-size: 14px;width: auto;background-color: transparent;border-radius: 0;text-align:;top: 0px;x; text-shadow: none;font-weight: normal;position: relative;padding: 10px;box-shadow: none;cursor:pointer;opacity: 7;">More Images</a></button>');
				}, 1000);
			}
		}
	}
	withouhashelfre(state)
	{

		this.rest.get('user/getuserbystate?state='+state).subscribe((result) => {
		  if(result.status)
		  {
				var user = result.result;
				var shippedim = [];
			
				if(typeof user.trainedImage!='undefined' && user.trainedImage.length>0)
				{
					for (let j = 0; j < user.trainedImage.length; j++) {
						
						if(user.trainedImage[j]!='')
						{
							console.log(this.awsurl+user.trainedImage[j]);
							const album = {
								src: this.awsurl+user.trainedImage[j]
							};

							shippedim.push(album);

						}
					}
				}

				if(typeof user.trainedImage!='undefined' && user.trainedImage.length>0)
				{
					for (let j = 0; j < user.ChildrenTriImage.length; j++) {
						
						if(user.ChildrenTriImage[j]!='')
						{
							console.log(this.awsurl+user.ChildrenTriImage[j]);
							const album = {
								src: this.awsurl+user.ChildrenTriImage[j]
							};

							shippedim.push(album);

						}
					}
				}
					
				console.log(shippedim);
				this._albums = shippedim;
				if(this._albums.length>0)
				{
					this.open(0);
					if(this.userTypeId!='6')
					{
					setTimeout(function () {
							$('.lb-close').after('<button><a href="https://drive.google.com/drive/folders/17pXTqwpwj2HpAZZjYamcnashWkOXTTuX?usp=sharing" target="_blank" class="more-images" style="color: #000;float: left;font-size: 14px;width: auto;background-color: transparent;border-radius: 0;text-align:;top: 0px;x; text-shadow: none;font-weight: normal;position: relative;padding: 10px;box-shadow: none;cursor:pointer;opacity: 7;">More Images</a></button>');
						}, 1000);
					}
				}
		  }
		  else
		  {
				// var user = '';
				return false;
		  }
		}, (err) => {
			console.log(err);
		});
						
	}
	trainedshowing(district)
	{
		var trainedim = [];
		for(var i= 0; this.activeusers.length>i;i++){
			if((this.activeusers[i].districtId).toLowerCase()==(district).toLowerCase())
			{
				if(typeof this.activeusers[i].trainedImage!='undefined' && this.activeusers[i].trainedImage.length>0)
				{
					for (let j = 0; j < this.activeusers[i].trainedImage.length; j++) {
						const album = {
							src: this.awsurl+this.activeusers[i].trainedImage[j]
						};
						trainedim.push(album);
					}
				}
			}
		}
		this._albums1 = trainedim;
		console.log(this._albums1);
		if(this._albums1.length>0)
		{
			this.open1(0);
			if(this.userTypeId!='6')
			{
			setTimeout(function () {
					$('.lb-close').after('<button><a href="https://drive.google.com/drive/folders/17pXTqwpwj2HpAZZjYamcnashWkOXTTuX?usp=sharing" target="_blank" class="more-images" style="color: #000;float: left;font-size: 14px;width: auto;background-color: transparent;border-radius: 0;text-align:;top: 0px;x; text-shadow: none;font-weight: normal;position: relative;padding: 10px;box-shadow: none;cursor:pointer;opacity: 7;">More Images</a></button>');
				}, 1000);
			}
		}
	}
	kithandleshowing(district)
	{
		var kithandedim = [];
		for(var i= 0; this.activeusers.length>i;i++){
			if((this.activeusers[i].districtId).toLowerCase()==(district).toLowerCase())
			{
				if(typeof this.activeusers[i].kitHImage!='undefined' && this.activeusers[i].kitHImage.length>0)
				{
					for (let j = 0; j < this.activeusers[i].kitHImage.length; j++) {
						const album = {
							src: this.awsurl+this.activeusers[i].kitHImage[j]
						};
						kithandedim.push(album);
					}
				}
			}
		}
		this._albums2 = kithandedim;
		console.log(this._albums2);
		if(this._albums2.length>0)
		{
			this.open2(0);
			if(this.userTypeId!='6')
			{
			setTimeout(function () {
					$('.lb-close').after('<button><a href="https://drive.google.com/drive/folders/17pXTqwpwj2HpAZZjYamcnashWkOXTTuX?usp=sharing" target="_blank" class="more-images" style="color: #000;float: left;font-size: 14px;width: auto;background-color: transparent;border-radius: 0;text-align:;top: 0px;x; text-shadow: none;font-weight: normal;position: relative;padding: 10px;box-shadow: none;cursor:pointer;opacity: 7;">More Images</a></button>');
				}, 1000);
			}
		}
	}

	childrenshowing(district)
	{
		var childrenim = [];
					var classname = "img-div";
		for(var i= 0; this.activeusers.length>i;i++){
			console.log(this.activeusers[i].districtId+'=='+this.capitalizeFirstLetter(district))
			if((this.activeusers[i].districtId).toLowerCase()==(district).toLowerCase())
			{

				if(typeof this.activeusers[i].ChildrenTriImage!='undefined' && this.activeusers[i].ChildrenTriImage.length>0)
				{

					for (let j = 0; j < this.activeusers[i].ChildrenTriImage.length; j++) {
						const album = {
							src: this.awsurl+this.activeusers[i].ChildrenTriImage[j]
						};
						childrenim.push(album);
					}

					
					// for (let j = 0; j < this.activeusers[i].ChildrenTriImage.length; j++) {
					// 	const album = {
					// 		video: this.awsurl+this.activeusers[i].ChildrenTriImage[j]
					// 	};
					// 	childrenim.push(album);
						

					// }
				}
				// console.log(this.activeusers[i].ChildrenTriVideo);
				// if(typeof this.activeusers[i].ChildrenTriVideo!='undefined' && this.activeusers[i].ChildrenTriVideo.length>0)
				// {
				// 	for (let j = 0; j < this.activeusers[i].ChildrenTriVideo.length; j++) {
				// 		const album = {
				// 			video: this.awsurl+this.activeusers[i].ChildrenTriVideo[j]
				// 		};
				// 		var classname = "video";
				// 		childrenim.push(album);
				// 	}
				// }
			}
		}
		

		this._albums3 = childrenim;
		// this.imageObject = childrenim;
		//  setTimeout(function () {
		// 				$( "."+classname+":first-child" ).trigger( "click" );
  //               }, 2000);
		console.log(this._albums3);
		if(this._albums3.length>0)
		{
			this.open3(0);
			if(this.userTypeId!='6')
			{
				setTimeout(function () {
						$('.lb-close').after('<a href="https://drive.google.com/drive/folders/17pXTqwpwj2HpAZZjYamcnashWkOXTTuX?usp=sharing" target="_blank" class="more-images" style="color: #fff;float: left;font-size: 14px;width: auto;background-color: transparent;border-radius: 0;text-align:;top: 0px;x; text-shadow: none;font-weight: normal;position: relative;padding: 10px;box-shadow: none;cursor:pointer;opacity: 7;">More Images</a>');
					}, 1000);
			}
		}
	}
	backfunction() {
		window.location.href="/";
			 // this._router.navigate(['/dashboard/main']);
		}
	getstatefunction(state)
	{
		if(this.userTypeId=='6')
		{
			if(this.userstateName!=state)
			{
				return false;
			}
		}
		if(state=='Manipur')
		{
			this.withouhashelfre(state);
		}
		else
		{
		var stateres = state.replace(" ", "--");
		$('#mapbase').hide();
		$('#backbutton').show();
		$('#'+stateres+'-image').show();

		this.enddate = "None";
		this.tot_student_trained_count = 0;
		this.statevideo_count = 0;
		this.stateaudio_count = 0;
		this.districtcount = 0;
		this.rest.get('device/shippeddistrictar?state='+state).subscribe((result) => {
		  if(result.status)
		  {
				if(result.result.length){
					// this.shippedcount = result.result.length;
					// this.teacherscount = (result.result.length*100)*2;
					// this.kitcount = (result.result.length*100);
					let shipdis = [];
					for(var j=0;result.result.length>j;j++)
					{
						shipdis.push(result.result[j]._id);
					}
					this.shipdisarray = shipdis;
					var params = JSON.stringify(shipdis);
			 
				} else {
					// this.shippedcount = 0;
					// this.teacherscount = 0;
					// this.kitcount = 0;
					this.shipdisarray = [];
				}
		  }
		  else
		  {
		  	this.shippedcount = 0;
		  }
		});
		this.rest.get('device/getdistrict?state='+state).subscribe((result) => {
		  if(result.status)
		  {
		  	if(this.userTypeId=='3')
		  	{
		  		console.log('if');
		  		console.log(this.userdistrictId);
		  		var temlistdistrict = [];
		  		var index = result.result.findIndex(x => (x.Districts).toLowerCase() ===this.userdistrictId.toLowerCase());
                    if(index!='-1')
                    {
                    	
                    	temlistdistrict.push(result.result[index]);
                    }
                    this.listdistrict = temlistdistrict;
                    	
		  	}
		  	else
		  	{
		  		this.listdistrict = result.result;
		  	}
		  	this.totdistrictcount = result.result.length;
		  }
		  else
		  {
				this.listdistrict = [];
		  }
		}, (err) => {
			console.log(err);
		});

		this.rest.get('device/videoswatchedstate?state='+state).subscribe((result) => {
		  if(result.status)
		  {
		  	this.statevideo_count = result.result;
		  }
		  else
		  {
			this.statevideo_count = 0;
		  }
		}, (err) => {
			console.log(err);
		});

		this.rest.get('device/audiostate?state='+state).subscribe((result) => {
		  if(result.status)
		  {
		  	this.stateaudio_count = result.result;
		  }
		  else
		  {
			this.stateaudio_count = 0;
		  }
		}, (err) => {
			console.log(err);
		});
		this.rest.get('device/getstatedetails?state='+state).subscribe((result) => {
		  if(result.status)
		  {
		  	console.log(result.result.Statemou);
		  	this.statemou = typeof result.result.Statemou!='undefined'?result.result.Statemou:'';
		  	// this.totdistrictcount = result.result.length;
		  }
		  else
		  {
				this.statemou = '';
		  }
		}, (err) => {
			console.log(err);
		});

		this.rest.get('school/getschoolbystate?state='+state).subscribe((result) => {
			let schooc = [];
			let chiledtrain = 0;
			let schoo = [];
			console.log(result.result.length);
		  if(result.status && result.result.length>0)
		  {
			for(var jk=0;result.result.length>jk;jk++)
			{
				schoo.push(result.result[jk]._id.toLowerCase());		
			}
			console.log(schoo,'fldsfsdhfjsdfkjsdhf');
			this.schooldetails = schoo;
			// this.districtcount = schoo.length;
			this.districtcount += schoo.length;
			// this.tot_student_trained_count = chiledtrain;
		  }
		  else
		  {
			this.schooldetails = [];
			this.districtcount += schoo.length;
			// this.tot_student_trained_count = chiledtrain;
		  }
		}, (err) => {
			console.log(err);
		});

		this.rest.get('device/getstarting?state='+state).subscribe((result) => {
		  if(result.status && result.result.length>0)
		  {
		  	var start = result.result[0].startingdate.split('T');
		  	// var end = result.result[0].endingdate.split('T');
			this.startdate = result.result[0].startingdate!='TBD'?start[0]:"None";
			// this.enddate = result.result[0].endingdate!='TBD'?end[0]:"None";
		  }
		  else
		  {
			this.startdate = "None";
			this.enddate = "None";
		  }
		}, (err) => {
			console.log(err);
		});

		this.rest.get('device/districtmoucount?state='+state).subscribe((result) => {
		  if(result.status)
		  {
		  	this.districtcount += result.result;
		  }
		 
		}, (err) => {
			console.log(err);
		});

		this.rest.get('device/getexcutives?state='+state).subscribe((result) => {
		  if(result.status)
		  {
			this.excutive = result.result[0].ExecutedBy;
			this.Districtmou_list = [];
			var Districtmou_list_arr = []
			if(result.result.length>0)
			{
				var endss = false;
				for(var ij=0;ij<result.result.length;ij++)
				{
					var cur_arr = result.result[ij];
					Districtmou_list_arr[cur_arr.District] = [];
					if(cur_arr.Districtmou && typeof cur_arr.Districtmou != undefined)
					{
						Districtmou_list_arr[cur_arr.District] = cur_arr.Districtmou;
															 
						//this.Districtmou_list = cur_arr.Districtmou.length;

						//console.log('some',this.Districtmou_list);


					} else {
						Districtmou_list_arr[cur_arr.District] = 'no';
					}

					if(result.result[ij].TeacherTrainingDate=='TBD')
					{
						endss = true;
					}
				}

				this.Districtmou_list = Districtmou_list_arr;
				console.log('Districtmou_list_arr');
				console.log(this.Districtmou_list);

				if(endss)
				{
					this.enddate = "None";
				}
				else
				{
					var start = typeof result.result[0].TeacherTrainingDate!='undefined'?result.result[0].TeacherTrainingDate.split('T'):[];
					this.enddate = start[0];
				}
			}
			else
			{
				this.enddate = "None";
			}
		  }
		  else
		  {
			this.excutive = '';
			this.excutives = [];
		  }
		}, (err) => {
			console.log(err);
		});
		this.rest.get('device/allusers').subscribe((result) => {
		  if(result.status)
		  {
		  	var data 		 = result.result;
		  	this.activeusers = result.result;
			var district_check = [];
		  	var active = [];
		  	var trained = [];
		  	var kit = [];
		  	var children = [];
		  	for(var i= 0; data.length>i;i++){
		  		if(data[i].stateName==state)
		  		{
		  			if(typeof data[i].profileImage!='undefined' && data[i].profileImage.length>1)
		  			{
				  		var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			active.push(dis.toLowerCase());
				  		}
		  			}
		  			if(typeof data[i].trainedImage!='undefined' && data[i].trainedImage.length>0)
		  			{
		  				var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			trained.push(dis.toLowerCase());
				  		}
		  			}
		  			if(typeof data[i].kitHImage!='undefined' && data[i].kitHImage.length>0)
		  			{
		  				var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			kit.push(dis.toLowerCase());
				  		}
		  			}
		  			if(typeof data[i].ChildrenTriImage!='undefined' && data[i].ChildrenTriImage.length>0)
		  			{
		  				var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			children.push(dis.toLowerCase());
				  		}
		  			}
		  		}
		  	};

		   	this.activetrained = trained;
		   	this.activekit = kit;
		   	this.activechildren = children;
		   	this.teacherscount = (trained.length*100)*2;
		   	this.kitcount = (kit.length*100);
		   	if(children.length>0)
		   	{
		   		var params = JSON.stringify(children);
			   	this.rest.get('school/particularchilds?district='+params).subscribe((result) => {
			   		 if(result.status && result.result.length>0)
					 {
					 	this.tot_student_trained_count = result.result[0].Total_enrol;
					 	console.log(this.tot_student_trained_count);
					 }
					 else
					 {
					 	this.tot_student_trained_count = 0;
					 }
				});
			   }
		  }
		  else
		  {
				this.activeusers = [];
		  }
		}, (err) => {
			console.log(err);
		});
		var stateres = state.replace("--", " & ");
		this.stateNam  = stateres;
	}
	}

	showimage(district){
		alert('lksdfljsdfl')
		this.curdistrict = district;
	}
	clickFun(district){
		this.curdistrict = district;
		this.trained_date = "-";
		this.shipped_date = "-";
		this.children_trained_count = 0;
		this.audio_count = 0;
		this.video_count = 0;
		this.rest.get('school/TeacherAndStudentTrainedCount?district='+district).subscribe((result) => {
			if(result.status)
			{
				this.children_trained_count = (result.result[0].Total_enrol);
				this.video_count = (result.result[0].Videowatched);
				this.audio_count = (result.result[0].Queryasked);
			}
			else
			{
				this.children_trained_count = 0;
			}
		}, (err) => {
			console.log(err);
		});
		this.rest.get('device/trainingdetl?district='+district).subscribe((result) => {
			if(result.status)
			{
				var TeacherTrainingDate = result.result[0].TeacherTrainingDate.split('T');
				var ShipmentDate = result.result[0].ShipmentDate.split('T');
				this.trained_date = TeacherTrainingDate[0];
				this.shipped_date = ShipmentDate[0];
			}
			else
			{
				this.trained_date = '-';
				this.shipped_date = '-';
			}
		}, (err) => {
			console.log(err);
		});
		// this.rest.get('device/videoswatched?district='+district).subscribe((result) => {
		// 	if(result.status)
		// 	{
		// 		this.video_count = (result.result);
		// 	}
		// 	else
		// 	{
		// 		this.video_count = 0;
		// 	}
		// }, (err) => {
		// 	console.log(err);
		// });
		// this.rest.get('device/audiocount?district='+district).subscribe((result) => {
		// 	if(result.status)
		// 	{
		// 		this.audio_count = (result.result);
		// 	}
		// 	else
		// 	{
		// 		this.audio_count = 0;
		// 	}
		// }, (err) => {
		// 	console.log(err);
		// });
	}
	activestates()
	{
		this.rest.get('device/listactivestates').subscribe((result) => {
		  if(result.status)
		  {
				if(result.result.length){
					this.activestatesarray = result.result;
				} else {
					this.activestatesarray = [];
				}
		  }
		  else
		  {
			this.activestatesarray = [];
		  }
		});
	}
	shippeddistrictfun()
	{
		// this.rest.get('device/shippeddistrict').subscribe((result) => {
		//   if(result.status)
		//   {
		// 		if(result.result.length){
		// 			this.shippedcount = result.result.length;
		// 			this.teacherscount = (result.result.length*100)*2;
		// 			this.kitcount = (result.result.length*100);
		// 			let shipdis = [];
		// 			for(var j=0;result.result.length>j;j++)
		// 			{
		// 				shipdis.push(result.result[j]._id);
		// 			}
		// 			// this.shipdisarray = shipdis;
		// 			var params = JSON.stringify(shipdis);
		// 	   		this.rest.get('school/particularchilds?district='+params).subscribe((result) => {
		// 		   		 if(result.status)
		// 				 {
		// 				 	this.tot_student_trained_count = result.result[0].Total_enrol;
		// 				 }
		// 				 else
		// 				 {
		// 				 	this.tot_student_trained_count = 0;
		// 				 }
		// 			});
		// 		} else {
		// 			this.shippedcount = 0;
		// 			this.teacherscount = 0;
		// 			this.kitcount = 0;
		// 			this.shipdisarray = [];
		// 		}
		//   }
		//   else
		//   {
		//   	this.shippedcount = 0;
		//   }
		// });

		this.rest.get('device/allusers').subscribe((result) => {
		  if(result.status)
		  {
		  	var data 		 = result.result;
		  	this.activeusers = result.result;
			var district_check = [];
		  	var active = [];
		  	var trained = [];
		  	var kit = [];
		  	var children = [];
		  	for(var i= 0; data.length>i;i++){
		  		// if(data[i].stateName==state)
		  		// {
		  			if(typeof data[i].profileImage!='undefined' && data[i].profileImage.length>1)
		  			{
				  		var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			active.push(dis.toLowerCase());
				  		}
		  			}
		  			if(typeof data[i].trainedImage!='undefined' && data[i].trainedImage.length>0)
		  			{
		  				var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			trained.push(dis.toLowerCase());
				  		}
		  			}
		  			if(typeof data[i].kitHImage!='undefined' && data[i].kitHImage.length>0)
		  			{
		  				var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			kit.push(dis.toLowerCase());
				  		}
		  			}
		  			if(typeof data[i].ChildrenTriImage!='undefined' && data[i].ChildrenTriImage.length>0)
		  			{
		  				var dis = data[i].districtId;
				  		if(typeof dis != 'undefined')
				  		{
				  			children.push(dis.toLowerCase());
				  		}
		  			}
		  		// }
		  	};

		   	this.shipdisarray = active;
		   	this.activetrained = trained;
		   	this.activekit = kit;
		   	this.activechildren = children;
		   	this.teacherscount = (trained.length*100)*2 - 200;
		   	this.kitcount = (kit.length*100);
		   	if(children.length>0)
		   	{
		   		var params = JSON.stringify(children);
			   	this.rest.get('school/particularchilds?district='+params).subscribe((result) => {
			   		 if(result.status && result.result.length>0)
					 {
					 	this.tot_student_trained_count = result.result[0].Total_enrol;
					 	console.log(this.tot_student_trained_count);
					 }
					 else
					 {
					 	this.tot_student_trained_count = 0;
					 }
				});
			   }
		  }
		  else
		  {
				this.activeusers = [];
		  }
		}, (err) => {
			console.log(err);
		});
	}

	totaldisountfun()
	{
		this.rest.get('device/totaldiscount').subscribe((result) => {
		  if(result.status)
		  {
				if(result.result){
					this.totdistrictcount = result.result;
				} else {
					this.totdistrictcount = 0;
				}
		  }
		  else
		  {
		  	this.totdistrictcount = 0;
		  }
		});
	}

	districtcountfun()
	{
		this.rest.get('device/inaugrateddistrict').subscribe((result) => {
		  if(result.status)
		  {
				if(result.result.length){
					this.districtcount = result.result[0].Districts;
				} else {
					this.districtcount = 0;
				}
		  }
		  else
		  {
		  	this.districtcount = 0;
		  }
		  this.rest.get('device/districtmoucount').subscribe((result) => {
		  	 if(result.status)
			 {
					if(result.result){
						this.districtcount = this.districtcount+result.result;
					} else {
						this.districtcount = this.districtcount;
					}
			 	
			  }
			  else
			  {
			  	this.districtcount = this.districtcount;
			  }
		  });
		});
	}


	TeacherAndStudentTrainedCount() {
		this.rest.get('school/TeacherAndStudentTrainedCount').subscribe((result) => {
			if(result.status)
			{
				this.tot_student_trained_count = (result.result[0].Enrol_6_8_Count)+(result.result[0].Enrol_9_10_Count);
			}
			else
			{
				this.tot_student_trained_count = 0;
			}
		}, (err) => {
			console.log(err);
		});
	}

}
