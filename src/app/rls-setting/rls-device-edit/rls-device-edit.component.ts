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
  selector: 'app-timeline2',
  templateUrl: './rls-device-edit.component.html',
  styleUrls: ['./rls-device-edit.component.scss']
})
export class RLSDeviceEditComponent implements OnInit {
  deviceCreation: FormGroup;
  form_returnres: ''
  deviceDetails: any;

  constructor(public toastr: ToastrManager,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService, private activatedRoute: ActivatedRoute) { }


  OnDeviceformSubmit(formdata) {
    let validData = this.deviceCreation.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      this.dynamicScriptLoader.getpost('device/deviceUpdate', formdata).subscribe(data => {
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
  get deviceId() {
    return this.deviceCreation.get('deviceId')
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
      time: false
    });


  }
  GetDevicedetails(id): void {
    this.dynamicScriptLoader.getpost('device/getDevicedetails', { deviceId: id }).subscribe(data => {
      if (data['status'])
        this.deviceDetails = data.result;
      var mydate = new Date(data.result.manufactureDate);

      var date = mydate.getDate();
      var year = mydate.getFullYear();
      var month = mydate.getMonth() + 1;
      var selectdate = (date + "/" + month + "/" + year);
      $('.date').val(selectdate);
      this.deviceCreation.get('modelNumber').setValue(data.result.modelNumber);
      this.deviceCreation.get('modelName').setValue(data.result.dmodelName);
      this.deviceCreation.get('deviceIMEI').setValue(data.result.deviceIMEI);
      this.deviceCreation.get('deviceSNO').setValue(data.result.deviceSNO);
      this.deviceCreation.get('simNumber').setValue(data.result.simNumber);
      this.deviceCreation.get('simIMEI').setValue(data.result.simIMEI);
      this.deviceCreation.get('manufactureName').setValue(data.result.manufacturerName);
      this.deviceCreation.get('manufactureDate').setValue(selectdate);
      this.deviceCreation.get('simProviderName').setValue(data.result.simProviderName);
      this.deviceCreation.get('status').setValue(data.result.isActive);
      this.deviceCreation.get('workingStatus').setValue(data.result.workingStatus);
      this.deviceCreation.get('deviceId').setValue(data.result._id);
    });
  };
  ngOnInit() {
    'use strict';

    this.startScript();
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.GetDevicedetails(id);

    }
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
      deviceId: ['', [Validators.required,]],

    });


  }
}
