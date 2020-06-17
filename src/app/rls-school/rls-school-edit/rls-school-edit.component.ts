import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
declare const $: any;
declare const Dropzone: any;
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-timeline1',
  templateUrl: './rls-school-edit.component.html',
  styleUrls: ['./rls-school-edit.component.scss']
})
export class RLSSchoolEditComponent implements OnInit {
  schoolData: FormGroup;
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
      this.schoolData.get('stateName').setValue(stateName);
    }
  }

  GetSchooldetails(id): void {
    this.dynamicScriptLoader.getpost('school/getSchooldetails', { schoolId: id }).subscribe(data => {
      if (data['status'])
        this.curdistrictsval = this.passdata['data'][data.result.stateId].districts;
      let stateName = this.passdata['data'][data.result.stateId].stateName;
      this.schoolData.get('NameofSchool').setValue(data.result.NameofSchool);
      this.schoolData.get('Districts').setValue(data.result.Districts);
      this.schoolData.get('NameofBlocks').setValue(data.result.NameofBlocks);
      this.schoolData.get('ClusterCode').setValue(data.result.ClusterCode);
      this.schoolData.get('ClusterName').setValue(data.result.ClusterName);
      this.schoolData.get('U_DISECode').setValue(data.result.U_DISECode);
      this.schoolData.get('USCHCD').setValue(data.result.USCHCD);
      this.schoolData.get('Category').setValue(data.result.Category);
      this.schoolData.get('Management').setValue(data.result.Management);
      this.schoolData.get('Enrol_6_8').setValue(data.result.Enrol_6_8);
      this.schoolData.get('Enrol_9_10').setValue(data.result.Enrol_9_10);
      this.schoolData.get('Total_enrol').setValue(data.result.Total_enrol);
      this.schoolData.get('clrooms').setValue(data.result.clrooms);
      this.schoolData.get('RURURB').setValue(data.result.RURURB);
      this.schoolData.get('Teachers').setValue(data.result.Teachers);
      this.schoolData.get('ELECTRIC_YN').setValue(data.result.ELECTRIC_YN);
      this.schoolData.get('stateId').setValue(data.result.stateId);
      this.schoolData.get('stateName').setValue(data.result.stateName);
      this.schoolData.get('teacherName1').setValue(data.result.teacherName1);
      this.schoolData.get('teacherName2').setValue(data.result.teacherName2);
      this.schoolData.get('schoolId').setValue(data.result._id);
      console.log(data.result.districtId);
    });
  };


  onSubmit(formdata) {
    let validData = this.schoolData.valid;
    if (validData) {
      var userId = localStorage.getItem('userTypeId');
      formdata.userId = userId;
      this.dynamicScriptLoader.getpost('school/schoolupdate', formdata).subscribe(data => {
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
  get Districts() {
    return this.schoolData.get('Districts')
  }
  get NameofBlocks() {
    return this.schoolData.get('NameofBlocks')
  }
  get ClusterCode() {
    return this.schoolData.get('ClusterCode')
  }
  get ClusterName() {
    return this.schoolData.get('ClusterName')
  }
  get U_DISECode() {
    return this.schoolData.get('U_DISECode')
  }
  get USCHCD() {
    return this.schoolData.get('USCHCD')
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
  get Teachers() {
    return this.schoolData.get('Teachers')
  }
  get ELECTRIC_YN() {
    return this.schoolData.get('ELECTRIC_YN')
  }
  get stateId() {
    return this.schoolData.get('stateId')
  }
  get stateName() {
    return this.schoolData.get('stateName')
  }
  get schoolId() {
    return this.schoolData.get('schoolId')
  }
  get teacherName1() {
    return this.schoolData.get('teacherName1')
  }
  get teacherName2() {
    return this.schoolData.get('teacherName2')
  }



  ngOnInit() {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.schoolData = this.fb.group({
      NameofSchool: ['', [Validators.required]],
      Districts: ['', [Validators.required]],
      NameofBlocks: ['', [Validators.required]],
      ClusterCode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      ClusterName: ['', [Validators.required]],
      U_DISECode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      USCHCD: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Category: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Management: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Enrol_6_8: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Enrol_9_10: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Total_enrol: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      clrooms: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      RURURB: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      Teachers: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      ELECTRIC_YN: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      stateId: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      schoolId: ['', [Validators.required]],
      teacherName1: ['', [Validators.required]],
      teacherName2: ['', [Validators.required]],
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