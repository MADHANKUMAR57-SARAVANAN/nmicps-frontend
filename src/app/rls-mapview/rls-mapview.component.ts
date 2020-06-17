import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Lightbox } from 'ngx-lightbox';

declare const $: any;
@Component({
  selector: 'app-export-table',
  templateUrl: './rls-mapview.component.html',
  styleUrls: ['./rls-mapview.component.scss']
})
export class RLSMapviewComponent implements OnInit {
title = 'My first AGM project';
lat = 20.5937;
lng = 78.9629;
Districtmouarr = [];
userTypeId = localStorage.getItem('userTypeId');
activeusers = [];
_albums1 = [];
public redDistricts = ['Ranchi','Khunti','Ramgarh','Purbi Singhbhum','Pashchimi Singhbhum','Garhwa','Palamu','Latehar','Gumla','Simdega','Hazaribag','Chatra','Giridih','Lohardaga','Dumka','Bokaro','Bastar','Bijapur','Dantewada','Kanker','Narayanpur','Rajnandgaon','Sukma','Kondagaon','Aurangabad','Gaya','Nawada','Jamui','Muzaffarpur','Banka'];
imageObject: Array<object> = [{
    //    video: 'https://youtu.be/6pxRHBw-k8M' // Youtube url
   },
   {
   	// video: 'https://youtu.be/6pxRHBw-k8M', // MP4 Video url
   },
   {
   	// video: 'http://localhost:4200/assets/images/Logo--haselfre.jpg',
    //    posterImage: 'http://localhost:4200/assets/images/Logo--haselfre.jpg', //Optional: You can use this key if you want to show video poster image in slider
    //    title: 'Image title'
   },
   
];

awsurl = "http://afs-icps-image.haselfrefoundation.org.s3.ap-south-1.amazonaws.com/"
constructor(public toastr: ToastrManager,private _router: Router,private rest: DynamicScriptLoaderService,private _lightbox: Lightbox) { }

  ngOnInit() {
    this.getexecutive();
  }
clickedMarker(district)
{
	var childrenim = [];
	var classname = "image";
		for(var i= 0; this.activeusers.length>i;i++){
			if((this.activeusers[i].districtId).toLowerCase()==(district).toLowerCase())
			{
				if(typeof this.activeusers[i].ChildrenTriImage!='undefined' && this.activeusers[i].ChildrenTriImage.length>0)
				{
					for (let j = 0; j < this.activeusers[i].ChildrenTriImage.length; j++) {
						const album = {
							video: this.awsurl+this.activeusers[i].ChildrenTriImage[j]
						};
						childrenim.push(album);
						

					}
				}
				if(typeof this.activeusers[i].ChildrenTriVideo!='undefined' && this.activeusers[i].ChildrenTriVideo.length>0)
				{
					for (let j = 0; j < this.activeusers[i].ChildrenTriVideo.length; j++) {
						const album = {
							video: this.awsurl+this.activeusers[i].ChildrenTriVideo[j]
						};
						var classname = "video";
						childrenim.push(album);
					}
				}
			}

		}
		console.log(childrenim);
		if(childrenim.length>0)
		{
			this.imageObject = childrenim;
			setTimeout(function () {
				$( "."+classname).eq(0).trigger( "click" );
				setTimeout(function () {
					var userTypeId = localStorage.getItem('userTypeId');
					if(userTypeId!='6')
					{
						$('.lightbox-div').after('<a href="https://drive.google.com/drive/folders/17pXTqwpwj2HpAZZjYamcnashWkOXTTuX?usp=sharing" target="_blank" class="more-images" style="color: #fff;left: 0;font-size: 14px;width: auto;background-color: transparent;border-radius: 0;text-align: left;top: -34px;text-shadow: none;font-weight: normal;position: absolute;padding: 10px;box-shadow: none;cursor:pointer;">More Images</a>');
					}
				}, 1000);
			}, 2000);
		}
		else
		{
			this.toastr.errorToastr('There is No Images in This District');
			//alert('There is no images in This District');
		}
}
open1(index: number): void {
		// open lightbox
		this._lightbox.open(this._albums1, index);
		}
getexecutive()
{
	var userTypeId = localStorage.getItem('userTypeId');
					if(userTypeId=='6')
					{
						var state = localStorage.getItem('stateName');
					}
					else
					{
						var state = '';

					}
	this.rest.get('device/getexcutedetails?getvalue=test&state='+state).subscribe((result) => {
	if(result.status)
	{
		if(result.result.length>0)
		{
			var result_data = result.result;
			 for(var i=0;i<result_data.length;i++)
            {
              console.log(result_data[i].ShipmentDate);
              if(typeof result_data[i].ShipmentDate == 'undefined' || result_data[i].ShipmentDate == '')
              {
                result_data[i].ShipmentDate = 'none';
              }
              else
              {
                var ShipmentDate = result_data[i].ShipmentDate;
                result_data[i].ShipmentDate = ShipmentDate.split("T")[0];
              }

            }
			this.Districtmouarr = result_data;
		}
	}
	}, (err) => {
		console.log(err);
	});

	this.rest.get('device/getparticularuser').subscribe((result) => {
	if(result.status)
	{
		if(result.result.length>0)
		{
			this.activeusers = result.result;
		}
	}
	}, (err) => {
		console.log(err);
	});
}
isInfoWindowOpen()
{
	return true;
}
mouseOver(res)
{
	// infoWindow.open();
	console.log(res);
	this.isInfoWindowOpen();
}


}
