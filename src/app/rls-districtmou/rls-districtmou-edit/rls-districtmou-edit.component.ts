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
  templateUrl: './rls-districtmou-edit.component.html',
  styleUrls: ['./rls-districtmou-edit.component.scss']
})
export class RLSdistrictmouEditComponent implements OnInit {
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
    this.dynamicScriptLoader.get('/particularexec?id='+id).subscribe(data => {
      this.passdata1 = data;
      if(typeof this.passdata['data'] != 'undefined')
      {
        let index = this.passdata['data'].findIndex(x => x.stateName ===this.passdata1['data'].State);
        console.log(this.passdata1['data']);
        this.fileupload.get('stateId').setValue(index);
        var teach = this.passdata1['data'].TeacherTrainingDate?this.passdata1['data'].TeacherTrainingDate.split('T'):[];
        var ship = this.passdata1['data'].ShipmentDate?this.passdata1['data'].ShipmentDate.split('T'):[];
        var kith = this.passdata1['data'].KitHandoverDate?this.passdata1['data'].KitHandoverDate.split('T'):[];
        this.curdistrictsval = this.passdata['data'][index].districts;
        this.fileupload.get('_id').setValue(this.passdata1['data']._id);
        this.fileupload.get('stateName').setValue(this.passdata1['data'].State);
        this.fileupload.get('District').setValue(this.passdata1['data'].District);
        this.fileupload.get('file1').setValue(this.passdata1['data'].Districtmou);
        this.fileupload.get('Rank').setValue(this.passdata1['data'].Rank);
        this.fileupload.get('ExecutedBy').setValue(this.passdata1['data'].ExecutedBy);
        this.fileupload.get('TeacherTrainingDate').setValue(teach[0]);
        this.fileupload.get('ShipmentDate').setValue(ship[0]);
        this.fileupload.get('ChildrenTrained').setValue(this.passdata1['data'].ChildrenTrained);
        this.fileupload.get('KitHandoverDate').setValue(kith[0]);

      }
    });
  };

  addDevice() {
    this.router.navigate(['rls-districtmou']);
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
    console.log(validData);

    // if (validData) {
    let formData = new FormData();

    if(this.uploadedFiles.length>0)
    {
        for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
          console.log(formData);
          console.log(this.uploadedFiles[i]);
          console.log(this.uploadedFiles[i].name);
        }
    }
    else
    {
     formData.append('file1',formdata.file1);
    }

     formData.append('_id',formdata._id);
     formData.append('stateName',formdata.stateName);
    //  formData.append('Rank',formdata.Rank);
     formData.append('District',formdata.District);
    //  formData.append('ExecutedBy',formdata.ExecutedBy);
    //  formData.append('TeacherTrainingDate',formdata.TeacherTrainingDate);
    //  formData.append('ShipmentDate',formdata.ShipmentDate);
    //  formData.append('ChildrenTrained',formdata.ChildrenTrained);
    //  formData.append('KitHandoverDate',formdata.KitHandoverDate);
     
     this.dynamicScriptLoader.fileupload('addexcutive', formData).subscribe(data => {
        console.log(data);
          if (data['status']) {
            this.toastr.successToastr(data['message'], 'Success');
            setTimeout(function(){
              window.location.href="/#/rls-districtmou/"
            }, 3000);
          }
          else {
            this.toastr.errorToastr(data['message']);
          }
        
      });
   // }
   // else
   // {
   //    this.toastr.errorToastr('Invalid deatails check the form inputs');
   // }
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

  get _id() {
    return this.fileupload.get('_id')
  }



  ngOnInit() {
    'use strict';

    this.GetStates();

    this.fileupload = this.fb.group({
      file: [''],
      file1: ['', [Validators.required]],
      _id: ['', [Validators.required]],
      stateId: [''],
      stateName: [''],
      Rank: [''],
      District: [''],
      ExecutedBy: [''],
      TeacherTrainingDate: [''],
      ShipmentDate: [''],
      ChildrenTrained: [''],
      KitHandoverDate: [''],
    });


  }

}
