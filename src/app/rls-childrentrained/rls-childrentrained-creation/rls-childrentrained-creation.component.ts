import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
declare const $: any;
declare const Dropzone: any;
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-timeline1',
  templateUrl: './rls-childrentrained-creation.component.html',
  styleUrls: ['./rls-childrentrained-creation.component.scss']
})
export class RLSchildrentrainedCreationComponent implements OnInit {
  fileupload: FormGroup;
  form_returnres: any;
  curstateval: any;
  curdistrictsval: any;
  uploadedFiles: any[];
  uploadedFiles1: any[];



  constructor(private http: HttpClient,private fb: FormBuilder, private dynamicScriptLoader: DynamicScriptLoaderService, public toastr: ToastrManager) { }

  @Input() passdata: any[];
  /*Admin_types = ['Super admin','Admin','State user','District user'];*/

  GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.dynamicScriptLoader.GetStates(webToken).subscribe(data => {
      this.passdata = data;
    });
  };

  stateChange(event: any) {
    if (event.target.value != '') {
      this.curstateval = event.target.value;
      this.curdistrictsval = this.passdata['data'][this.curstateval].districts;
      let stateName = this.passdata['data'][this.curstateval].stateName;
      this.fileupload.get('stateName').setValue(stateName);
    }
  }


  fileChange(element) {
    console.log(element.target.files);
    this.uploadedFiles = element.target.files;
  }

   filevideoChange(element) {
    console.log(element.target.files);
    if(element.target.files)
    {
    this.uploadedFiles1 = element.target.files;

    }
  }

  OnDeviceformSubmit(formdata) {
    console.log(formdata);
     let validData = this.fileupload.valid;
    if (validData) {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
      console.log(formData);
      console.log(this.uploadedFiles[i]);
      console.log(this.uploadedFiles[i].name);
    }
    if(typeof this.uploadedFiles1 != 'undefined' && this.uploadedFiles1.length>0)
    {
        for (var i = 0; i < this.uploadedFiles1.length; i++) {
          formData.append("videos", this.uploadedFiles1[i], this.uploadedFiles1[i].name);
          console.log(this.uploadedFiles1[i]);
          console.log(this.uploadedFiles1[i].name);
        }
    }
     formData.append('stateName',formdata.stateName);
     formData.append('Districts',formdata.Districts);
     this.dynamicScriptLoader.fileupload('uploadChildrentrained', formData).subscribe(data => {
        console.log(data);
          if (data['status']) {
            this.toastr.successToastr(data['message'], 'Success');
          }
          else {
            this.toastr.errorToastr(data['message']);
          }
        
      });
   }
   else
   {
      this.toastr.errorToastr('Invalid deatails check the form inputs');
   }
  }
  
  get stateId() {
    return this.fileupload.get('stateId')
  }
  get Districts() {
    return this.fileupload.get('Districts')
  }
 
  get stateName() {
    return this.fileupload.get('stateName')
  }

  get file() {
    return this.fileupload.get('file')
  }

  get video() {
    return this.fileupload.get('video')
  }



  ngOnInit() {

       this.fileupload = this.fb.group({
      file: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      Districts: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      video: [''],

    });


    'use strict';
    this.GetStates();

    $(function () {

      function addBusiness() {
        alert('2');
      }

    });

  }

}
