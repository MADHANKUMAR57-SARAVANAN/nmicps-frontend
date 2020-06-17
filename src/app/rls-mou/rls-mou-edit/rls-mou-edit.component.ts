import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
declare const $: any;
declare const Dropzone: any;
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../../_helpers/must-match.validator';
import { Observable } from 'rxjs'
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-timeline1',
  templateUrl: './rls-mou-edit.component.html',
  styleUrls: ['./rls-mou-edit.component.scss']
})
export class RLSmouEditComponent implements OnInit {
  fileupload: FormGroup;

  constructor(
    public toastr: ToastrManager,
    private fb: FormBuilder,
    private router: Router,
    private dynamicScriptLoader: DynamicScriptLoaderService, private activatedRoute: ActivatedRoute
  ) { }

  @Input() passdata: any[];
  @Input() passdata1: any[];
  @Input() userTypes: any[];
  uploadedFiles = [];
  curstateval = '';
  curdistrictsval = '';

  Getstatedetails(id): void {
    const webToken = localStorage.getItem('webtoken');
    this.dynamicScriptLoader.get('/particularstate?id='+id).subscribe(data => {
      this.passdata1 = data;
      if(typeof this.passdata['data'] != 'undefined')
      {
        let index = this.passdata['data'].findIndex(x => x._id ===this.passdata1['data']._id);
        this.fileupload.get('stateId').setValue(index);
        this.fileupload.get('stateName').setValue(this.passdata1['data'].stateName);
        this.fileupload.get('file1').setValue(this.passdata1['data'].Statemou);
      }
    });
  };

  addDevice() {
    this.router.navigate(['rls-mou']);
  }

  GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.dynamicScriptLoader.GetStates(webToken).subscribe(data => {
      this.passdata = data;
       let id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
          this.Getstatedetails(id);
        }
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

  OnDeviceformSubmit(formdata) {
    console.log(formdata);
     let validData = this.fileupload.valid;
    if (validData) {
    let formData = new FormData();
    if(this.uploadedFiles.length>0)
    {
        for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
          console.log(formData);
          console.log(this.uploadedFiles[i]);
          console.log(this.uploadedFiles[i].name);
        }
     formData.append('stateName',formdata.stateName);
    }
    else
    {
     formData.append('stateName',formdata.stateName);
     formData.append('file1',formdata.file1);
    }

     this.dynamicScriptLoader.fileupload('uploadmou', formData).subscribe(data => {
        console.log(data);
          if (data['status']) {
            this.toastr.successToastr(data['message'], 'Success');
            this.fileupload.reset();
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

  get stateName() {
    return this.fileupload.get('stateName')
  }

  get file() {
    return this.fileupload.get('file')
  }
  get file1() {
    return this.fileupload.get('file1')
  }



  ngOnInit() {
    'use strict';

   
    this.GetStates();

    this.fileupload = this.fb.group({
      file: [''],
      file1: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
    });


  }

}
