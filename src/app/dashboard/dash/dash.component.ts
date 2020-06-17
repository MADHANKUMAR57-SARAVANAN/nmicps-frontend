import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { Lightbox } from 'ngx-lightbox';
declare const $: any;
declare const Chart: any;
declare const window: any;
declare const swal: any;

@Component({
	selector: 'app-dash',
	templateUrl: './dash.component.html',
	styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit {
	awsurl = "https://rlstest.s3.ap-south-1.amazonaws.com/images/"
	public schoolData_DisPlay: any[];
	public alerts: Array<any> = [];
	userTypeId = localStorage.getItem('userTypeId');
	schooloption = localStorage.getItem('schooloption');
	passdata: any[];
	activeusers: any[];
	activetrained: any[];
	activechildren: any[];
	activekit: any[];
	schoolNames: any[];
	listdistrict: any[];
	shipdisarray: any[];
	curstateval = '';
	curdistrictsval = '';
	curdistrict = '';
	schoolcount = 0;
	shippedcount = 0;
	districtcount = 0;
	unanscount = 0;
	video_count = 0;
	children_trained_count = 0;
	stateNam = '';
	modelPopupVal = 0;
	deviceassignedcount = 0;
	trained_date = '-';
	shipped_date = '-';
	private _albums:any[];
	private _albums1: any[];
	private _albums2: any[];
	private _albums3: any[];

	tot_teachers_count = 0;
	tot_student_trained_count = 0;
	constructor(private rest: DynamicScriptLoaderService,private _lightbox: Lightbox) { }

	

	ngOnInit() {
		this.unanscountfun();
		this.videocountfun();
		this.shippeddistrictfun();
		this.districtcountfun();
		this.deviceassignedcountfun();
		this.TeacherAndStudentTrainedCount();
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
		console.log(this.activeusers[i].districtId==this.capitalizeFirstLetter(district));
			if(this.activeusers[i].districtId==this.capitalizeFirstLetter(district))
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
		}
	}
	trainedshowing(district)
	{
		var trainedim = [];
		for(var i= 0; this.activeusers.length>i;i++){
			if(this.activeusers[i].districtId==this.capitalizeFirstLetter(district))
			{
				if(typeof this.activeusers[i].trainedImage!='undefined' && this.activeusers[i].trainedImage.length>1)
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
		}
	}
	kithandleshowing(district)
	{
		var kithandedim = [];
		for(var i= 0; this.activeusers.length>i;i++){
			if(this.activeusers[i].districtId==this.capitalizeFirstLetter(district))
			{
				if(typeof this.activeusers[i].kitHImage!='undefined' && this.activeusers[i].kitHImage.length>1)
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
		}
	}

	childrenshowing(district)
	{
		var childrenim = [];
		for(var i= 0; this.activeusers.length>i;i++){
			if(this.activeusers[i].districtId==this.capitalizeFirstLetter(district))
			{
				if(typeof this.activeusers[i].ChildrenTriImage!='undefined' && this.activeusers[i].ChildrenTriImage.length>1)
				{

					for (let j = 0; j < this.activeusers[i].ChildrenTriImage.length; j++) {
						const album = {
							src: this.awsurl+this.activeusers[i].ChildrenTriImage[j]
						};
						childrenim.push(album);
					}
				}
			}
		}
		console.log(childrenim);
		this._albums3 = childrenim;
		console.log(this._albums3);
		if(this._albums3.length>0)
		{
			this.open3(0);
		}
	}

	getstatefunction(state)
	{
		this.rest.get('device/getdistrict?state='+state).subscribe((result) => {
		  if(result.status)
		  {
		  	this.listdistrict = result.result;
		  }
		  else
		  {
				this.listdistrict = [];
		  }
		}, (err) => {
			console.log(err);
		});
		this.rest.get('device/allusers').subscribe((result) => {
		  if(result.status)
		  {
		  	var data = result.result;
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
		  }
		  else
		  {
				this.activeusers = [];
		  }
		}, (err) => {
			console.log(err);
		});
		this.stateNam  = state;
	}

	showimage(district){
		alert('lksdfljsdfl')
		this.curdistrict = district;
	}
	clickFun(district){
		this.curdistrict = district;
		this.trained_date = "-";
		this.shipped_date = "-";
		this.rest.get('school/TeacherAndStudentTrainedCount?district='+district).subscribe((result) => {
			if(result.status)
			{
				this.children_trained_count = (result.result[0].Enrol_6_8_Count)+(result.result[0].Enrol_9_10_Count);
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

	}
	shippeddistrictfun()
	{
		this.rest.get('device/shippeddistrict').subscribe((result) => {
		  if(result.status)
		  {
				if(result.result.length){
					this.shippedcount = result.result.length;
					let shipdis = [];
					for(var j=0;result.result.length>j;j++)
					{
						shipdis.push(result.result[j]._id);
					}
					this.shipdisarray = shipdis;
					console.log(this.shipdisarray,'testing');
				} else {
					this.shippedcount = 0;
					this.shipdisarray = [];
				}
		  }
		  else
		  {
		  	this.shippedcount = 0;
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

	videocountfun() {
		this.rest.get('device/videoswatchedcount').subscribe((result) => {
			if(result.status)
			{
				this.video_count = (result.result);
			}
			else
			{
				this.video_count = 0;
			}
		}, (err) => {
			console.log(err);
		});
	}

	unanscountfun() {
		this.rest.get('device/unanscount').subscribe((result) => {
			if(result.status)
			{
				this.unanscount = (result.result);
			}
			else
			{
				this.unanscount = 0;
			}
		}, (err) => {
			console.log(err);
		});
	}


	SchoolData_DisPlay() {
		const webToken = localStorage.getItem('webtoken');
		const userTypeId = localStorage.getItem('userTypeId');
		const userId = localStorage.getItem('userId');

		this.rest.get('school/getSchooldetails?type='+userTypeId+'&userId='+userId).subscribe((result) => {
		  if(result.status)
		  {
		  	this.schoolData_DisPlay = result.result;
		  }
		  else
		  {
				this.schoolData_DisPlay = [];
		  }
		  setTimeout(function() {
		  $('#tableExport').DataTable({
		  dom: 'Bfrtip',
		  buttons: [
			'copy',{
			  extend: 'print',
			  title: 'AFS-ICPS'
			} ,{
			  extend: 'csv',
			  title: 'AFS-ICPS'
			},{
			  extend: 'excel',
			  title: 'AFS-ICPS'
			}, {
			  extend: 'pdf',
			  title: 'AFS-ICPS'
			}
		  ]
		});
		 },1000);
		}, (err) => {
		console.log(err);
		});
	   }

}
