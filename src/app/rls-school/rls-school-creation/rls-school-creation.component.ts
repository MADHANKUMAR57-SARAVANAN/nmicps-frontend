import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
declare const $: any;
declare const Dropzone: any;
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-timeline1',
  templateUrl: './rls-school-creation.component.html',
  styleUrls: ['./rls-school-creation.component.scss']
})
export class RLSSchoolCreationComponent implements OnInit {
  schoolData: FormGroup;
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
      this.schoolData.get('stateName').setValue(stateName);
    }
  }


  onSubmit(formdata) {
    console.log(formdata);
    let validData = this.schoolData.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      this.dynamicScriptLoader.getpost('school/schoolCreation', formdata).subscribe(data => {
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

  get NameofSchool() {
    return this.schoolData.get('NameofSchool')
  }
  get USCHCD() {
    return this.schoolData.get('USCHCD')
  }
  get ClusterName() {
    return this.schoolData.get('ClusterName')
  }
  get NameofBlocks() {
    return this.schoolData.get('NameofBlocks')
  }
  get stateId() {
    return this.schoolData.get('stateId')
  }
  get Districts() {
    return this.schoolData.get('Districts')
  }
  get Teachers() {
    return this.schoolData.get('Teachers')
  }
  get stateName() {
    return this.schoolData.get('stateName')
  }
  get ClusterCode() {
    return this.schoolData.get('ClusterCode')
  }

  get U_DISECode() {
    return this.schoolData.get('U_DISECode')
  }
  get Category() {
    return this.schoolData.get('Category')
  }
  get Management() {
    return this.schoolData.get('Management')
  }

  get Enrol_6_8() {
    return this.schoolData.get('Enrol_6_8')
  }

  get Enrol_9_10() {
    return this.schoolData.get('Enrol_9_10')
  }

  get Total_enrol() {
    return this.schoolData.get('Total_enrol')
  }

  get clrooms() {
    return this.schoolData.get('clrooms')
  }
  get RURURB() {
    return this.schoolData.get('RURURB')
  }
  get ELECTRIC_YN() {
    return this.schoolData.get('ELECTRIC_YN')
  }
  get teacherName1() {
    return this.schoolData.get('teacherName1')
  }
  get teacherName2() {
    return this.schoolData.get('teacherName2')
  }



  ngOnInit() {
    this.schoolData = this.fb.group({
      NameofSchool: ['', [Validators.required, Validators.minLength(3)]],
      USCHCD: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      ClusterName: ['', [Validators.required]],
      NameofBlocks: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      Districts: ['', [Validators.required]],
      Teachers: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      stateName: ['', [Validators.required]],
      ClusterCode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      U_DISECode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Category: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Management: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Enrol_6_8: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Enrol_9_10: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Total_enrol: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      clrooms: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      RURURB: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      ELECTRIC_YN: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      teacherName1: ['', [Validators.required]],
      teacherName2: ['', [Validators.required]],







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
