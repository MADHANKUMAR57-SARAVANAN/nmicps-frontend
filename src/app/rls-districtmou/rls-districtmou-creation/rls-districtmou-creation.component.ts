import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
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
  templateUrl: './rls-districtmou-creation.component.html',
  styleUrls: ['./rls-districtmou-creation.component.scss']
})
export class RLSdistrictmouCreationComponent implements OnInit {
  fileupload: FormGroup;

  constructor(
    public toastr: ToastrManager,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService
  ) { }

  @Input() passdata: any[];
  @Input() userTypes: any[];
  @Input() uploadedFiles: any[];
  curstateval = '';
  curdistrictsval = '';

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

  OnDeviceformSubmit(formdata) {
     let validData = this.fileupload.valid;
    if (validData) {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
      console.log(formData);
      console.log(this.uploadedFiles[i]);
      console.log(this.uploadedFiles[i].name);
    }
     formData.append('stateName',formdata.stateName);
     formData.append('Rank',formdata.Rank);
     formData.append('District',formdata.District);
     formData.append('ExecutedBy',formdata.ExecutedBy);
     formData.append('TeacherTrainingDate',formdata.TeacherTrainingDate);
     formData.append('ShipmentDate',formdata.ShipmentDate);
     formData.append('ChildrenTrained',formdata.ChildrenTrained);
     formData.append('KitHandoverDate',formdata.KitHandoverDate);
     
     this.dynamicScriptLoader.fileupload('addexcutive', formData).subscribe(data => {
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

  get stateName() {
    return this.fileupload.get('stateName')
  }

  get file() {
    return this.fileupload.get('file')
  } 

  get Rank() {
    return this.fileupload.get('Rank')
  }

  get District() {
    return this.fileupload.get('District')
  }

  get ExecutedBy() {
    return this.fileupload.get('ExecutedBy')
  }

  get TeacherTrainingDate() {
    return this.fileupload.get('TeacherTrainingDate')
  }

  get ShipmentDate() {
    return this.fileupload.get('ShipmentDate')
  }

  get ChildrenTrained() {
    return this.fileupload.get('ChildrenTrained')
  }

  get KitHandoverDate() {
    return this.fileupload.get('KitHandoverDate')
  }



  ngOnInit() {
    'use strict';

    this.GetStates();

    this.fileupload = this.fb.group({
      file: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      Rank: ['', [Validators.required]],
      District: ['', [Validators.required]],
      ExecutedBy: ['', [Validators.required]],
      TeacherTrainingDate: ['', [Validators.required]],
      ShipmentDate: ['', [Validators.required]],
      ChildrenTrained: ['', [Validators.required]],
      KitHandoverDate: ['', [Validators.required]],
    });


  }

}
