import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
declare const $: any;
declare const Dropzone: any;
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-timeline1',
  templateUrl: './rls-unanswered-questions-creation.component.html',
  styleUrls: ['./rls-unanswered-questions-creation.component.scss']
})
export class RLSUnansweredquestionCreationComponent implements OnInit {
  queryData: FormGroup;
  form_returnres: any;
  curstateval: any;
  curdistrictsval: any;



  constructor(private fb: FormBuilder, private dynamicScriptLoader: DynamicScriptLoaderService, public toastr: ToastrManager) { }

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
      this.queryData.get('stateName').setValue(stateName);
    }
  }


  onSubmit(formdata) {
    console.log(formdata);
    let validData = this.queryData.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      this.dynamicScriptLoader.getpost('device/unansCreation', formdata).subscribe(data => {
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
  get Device_ID() {
    return this.queryData.get('Device_ID')
  }
  get weightage() {
    return this.queryData.get('weightage')
  }
  get Answer() {
    return this.queryData.get('Answer')
  }
 



  ngOnInit() {
    this.queryData = this.fb.group({
      Question: ['', [Validators.required, Validators.minLength(3)]],
      Device_ID: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      weightage: ['', [Validators.required]],
      Answer: [''],
    })


    'use strict';
    this.GetStates();

    $(function () {

      function addBusiness() {
        alert('2');
      }

    });

  }

}
