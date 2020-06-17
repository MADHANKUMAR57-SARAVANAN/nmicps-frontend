import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
declare const $: any;
declare const Dropzone: any;
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-timeline1',
  templateUrl: './rls-unanswered-questions-edit.component.html',
  styleUrls: ['./rls-unanswered-questions-edit.component.scss']
})
export class RLSUnansweredquestionEditComponent implements OnInit {
  queryData: FormGroup;
  form_returnres: any;
  curstateval: any;
  curdistrictsval: any;


  constructor(private fb: FormBuilder, private dynamicScriptLoader: DynamicScriptLoaderService, public toastr: ToastrManager, private activatedRoute: ActivatedRoute) { }

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
      // this.queryData.get('stateName').setValue(stateName);
    }
  }

  GetSchooldetails(id): void {
    this.dynamicScriptLoader.getpost('device/getunansdetails', { Id: id }).subscribe(data => {
      if (data['status'])
       
      this.queryData.get('Id').setValue(data.result._id);
      this.queryData.get('Question').setValue(data.result.Question);
      this.queryData.get('Answer').setValue(data.result.Answer);
      this.queryData.get('Device_Id').setValue(data.result.Device_ID);
      this.queryData.get('weightage').setValue(data.result.weightage);
      console.log(data.result.districtId);
    });
  };


  onSubmit(formdata) {
    let validData = this.queryData.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      this.dynamicScriptLoader.getpost('device/unansupdate', formdata).subscribe(data => {
        this.form_returnres = data;
        if (typeof this.form_returnres != 'undefined') {
          if (this.form_returnres['status']) {
            this.toastr.successToastr(this.form_returnres['message'], 'Success');
          }
          else {
            this.toastr.errorToastr(this.form_returnres['message']);
          }
        }
      });
    } else {
      this.toastr.errorToastr('Invalid deatails check the form inputs');
    }
  }

  get Question() {
    return this.queryData.get('Question')
  }
  get Answer() {
    return this.queryData.get('Answer')
  }
  get Device_Id() {
    return this.queryData.get('Device_Id')
  }
  get weightage() {
    return this.queryData.get('weightage')
  }
  get Id() {
    return this.queryData.get('Id')
  }



  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.queryData = this.fb.group({
      Question: ['', [Validators.required]],
      Id: ['', [Validators.required]],
      Answer: [''],
      Device_Id: ['', [Validators.required]],
      weightage: ['', [Validators.required]],
    })


    'use strict';
    this.GetStates();
    if (id) {
      this.GetSchooldetails(id);

    }

    $(function () {

      function addBusiness() {
        alert('2');
      }

    });

  }

}