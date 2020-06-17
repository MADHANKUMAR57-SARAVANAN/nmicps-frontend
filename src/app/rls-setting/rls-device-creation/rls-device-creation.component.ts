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
  selector: 'app-timeline2',
  templateUrl: './rls-device-creation.component.html',
  styleUrls: ['./rls-device-creation.component.scss']
})
export class RLSDeviceCreationComponent implements OnInit {
  deviceCreation: FormGroup;
  form_returnres: ''

  constructor(public toastr: ToastrManager,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService) { }


  OnDeviceformSubmit(formdata) {
    let validData = this.deviceCreation.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      this.dynamicScriptLoader.getpost('device/deviceCreation', formdata).subscribe(data => {
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


  get modelNumber() {
    return this.deviceCreation.get('modelNumber')
  }
  get modelName() {
    return this.deviceCreation.get('modelName')
  }
  get deviceIMEI() {
    return this.deviceCreation.get('deviceIMEI')
  }
  get deviceSNO() {
    return this.deviceCreation.get('deviceSNO')
  }
  get simNumber() {
    return this.deviceCreation.get('simNumber')
  }
  get simIMEI() {
    return this.deviceCreation.get('simIMEI')
  }

  get manufactureName() {
    return this.deviceCreation.get('manufactureName')
  }
  get manufactureDate() {
    return this.deviceCreation.get('manufactureDate')
  }

  get simProviderName() {
    return this.deviceCreation.get('simProviderName')
  }
  get workingStatus() {
    return this.deviceCreation.get('workingStatus')
  }
  get status() {
    return this.deviceCreation.get('status')
  }


  async startScript() {
    await this.dynamicScriptLoader.load('form.min').then(data => {
      this.loadData();
    }).catch(error => console.log(error));
  }
  private loadData() {

    //Datetimepicker plugin

    $('.datepicker').bootstrapMaterialDatePicker({
      format: 'DD-MM-YYYY',
      clearButton: true,
      weekStart: 1,
      time: false,
      'setDate': '10-06-2019'
    }).on('change', function (e, date) {
      // var mydate = new Date(date);
      // var date = mydate.getDate();
      // var year = mydate.getFullYear();
      // var month = mydate.getMonth()+1;
      // var selectdate = (date+"-"+month+"-"+year);
      // console.log(deviceCreation);
      // console.log(this.deviceCreation);
      // if(typeof this.deviceCreation != 'undefined')
      // this.deviceCreation.get('manufactureDate').setValue(selectdate);
      // test();
    });;


  }

  //   dateChange(event: any) {
  //     alert('fskdfsdklfj');
  //   if(event.target.value!=''){
  //     alert(event.target.value);
  //     // this.curstateval = event.target.value;
  //     // this.curdistrictsval = this.passdata['data'][this.curstateval].districts;
  //     // let stateName = this.passdata['data'][this.curstateval].stateName;
  //     // this.userCreation.get('stateName').setValue(stateName);
  //   }
  // }


  ngOnInit() {
    'use strict';


    this.deviceCreation = this.fb.group({
      modelNumber: ['', [Validators.required, Validators.minLength(3),]],
      modelName: ['', [Validators.required, Validators.minLength(3),]],
      deviceIMEI: ['', [Validators.required, Validators.minLength(3),]],
      deviceSNO: ['', [Validators.required, Validators.minLength(3),]],
      simNumber: ['', [Validators.required, Validators.minLength(3),]],
      simIMEI: ['', [Validators.required, Validators.minLength(3),]],
      manufactureName: ['', [Validators.required, Validators.minLength(3),]],
      manufactureDate: ['', [Validators.required]],
      simProviderName: ['', [Validators.required, Validators.minLength(3),]],
      status: ['', [Validators.required,]],
      workingStatus: ['', [Validators.required,]],

    });

    this.startScript();

  }
}
