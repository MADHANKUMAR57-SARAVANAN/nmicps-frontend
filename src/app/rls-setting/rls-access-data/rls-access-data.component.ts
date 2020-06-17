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
  templateUrl: './rls-access-data.component.html',
  styleUrls: ['./rls-access-data.component.scss']
})
export class RLSAccessDataComponent implements OnInit {
  accessCreation: FormGroup;
  useraccess: any[];
  userview1: boolean;
  useredit1: boolean;
  useradd1: boolean;
  schoolview1: boolean;
  schooledit1: boolean;
  schooladd1: boolean;
  schoolassign1: boolean;
  deviceview1: boolean;
  deviceedit1: boolean;
  deviceadd1: boolean;
  deviceassign1: boolean;
  schoolidentifiedview1: boolean;
  shippeddistrictview1: boolean;
  issuedschoolview1: boolean;
  commissionedschoolview1: boolean;
  deviceassignview1: boolean;
  voicerecordview1: boolean;



  constructor(
    public toastr: ToastrManager,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService,
  ) {
    // this.useraccess = [{
    //       id: 1, name: 'useradd' , selected : true, display:"Add"
    //      },
    //      {
    //        id: 2, name: 'useredit'  , selected : true,display:"Edit"
    //      },
    //      {
    //        id: 3, name: 'userview'  , selected : false,display:"View"
    //      },  
    //    ]
  }


  @Input() userTypes: any[];
  userTypeId = localStorage.getItem('userTypeId');


  userTypeChange(event: any) {
    if (event.target.value != '') {
      this.dynamicScriptLoader.getpost('getparticularusertype', { 'userTypeId': event.target.value }).subscribe(data => {
        console.log(data);
        if (data.status) {
          var roles = data.data.roles;
          var useroption               = roles[1] ? roles[1].split(",") : [];
          var schooloption             = roles[2] ? roles[2].split(",") : [];
          var deviceoption             = roles[3] ? roles[3].split(",") : [];
          var schoolidentifiedoption   = roles[4] ? roles[4].split(",") : [];
          var shippeddistrictoption    = roles[5] ? roles[5].split(",") : [];
          var issuedschooloption       = roles[6] ? roles[6].split(",") : [];
          var commissionedschooloption = roles[7] ? roles[7].split(",") : [];
          var deviceassignoption       = roles[8] ? roles[8].split(",") : [];
          var voicerecordoption        = roles[9] ? roles[9].split(",") : [];
          this.userview1 = (useroption.indexOf('a') != -1) ? true : false;
          this.useredit1 = (useroption.indexOf('b') != -1) ? true : false;
          this.useradd1 = (useroption.indexOf('c') != -1) ? true : false;

          this.deviceview1 = (deviceoption.indexOf('a') != -1) ? true : false;
          this.deviceedit1 = (deviceoption.indexOf('b') != -1) ? true : false;
          this.deviceadd1 = (deviceoption.indexOf('c') != -1) ? true : false;
          this.deviceassign1 = (deviceoption.indexOf('d') != -1) ? true : false;

          this.schoolview1 = (schooloption.indexOf('a') != -1) ? true : false;
          this.schooledit1 = (schooloption.indexOf('b') != -1) ? true : false;
          this.schooladd1 = (schooloption.indexOf('c') != -1) ? true : false;
          this.schoolassign1 = (schooloption.indexOf('d') != -1) ? true : false;

          this.schoolidentifiedview1 = (schoolidentifiedoption.indexOf('a') != -1) ? true : false;

          this.shippeddistrictview1 = (shippeddistrictoption.indexOf('a') != -1) ? true : false;

          this.issuedschoolview1 = (issuedschooloption.indexOf('a') != -1) ? true : false;

          this.commissionedschoolview1 = (commissionedschooloption.indexOf('a') != -1) ? true : false;

          this.deviceassignview1 = (deviceassignoption.indexOf('a') != -1) ? true : false;

          this.voicerecordview1 = (voicerecordoption.indexOf('a') != -1) ? true : false;
        }
      });
    }
  }

  GetUsertypes(): void {
    // alert(this.useradd);
    // this.userview = false;
    const webToken = localStorage.getItem('webtoken');
    const userTypeId = localStorage.getItem('userTypeId');
    this.dynamicScriptLoader.GetUsertypes(webToken, userTypeId).subscribe(data => {
      this.userTypes = data;
      // this.userCreation.get('userview').setValue('a');
    });
  };


  OnUserformSubmit(formdata) {
    console.log(formdata);
    let validData = this.accessCreation.valid;
    if (validData) {
      this.dynamicScriptLoader.getpost('accessControl', formdata).subscribe(data => {

        if (data['status']) {
          this.toastr.successToastr(data['message'], 'Success');
        }
        else {
          this.toastr.errorToastr(data['message']);
        }

      });
    } else {
      this.toastr.errorToastr('Invalid deatails check the form inputs');
    }
  }


  get userview() {
    return this.accessCreation.get('userview')
  }

  get useradd() {
    return this.accessCreation.get('useradd')
  }
  get useredit() {
    return this.accessCreation.get('useredit')
  }
  get deviceview() {
    return this.accessCreation.get('deviceview')
  }

  get deviceadd() {
    return this.accessCreation.get('deviceadd')
  }
  get deviceedit() {
    return this.accessCreation.get('deviceedit')
  }
  get deviceassign() {
    return this.accessCreation.get('deviceassign')
  }

  get schoolview() {
    return this.accessCreation.get('schoolview')
  }

  get schooladd() {
    return this.accessCreation.get('schooladd')
  }
  get schooledit() {
    return this.accessCreation.get('schooledit')
  }
  get schoolassign() {
    return this.accessCreation.get('schoolassign')
  }
   get schoolidentifiedview() {
    return this.accessCreation.get('schoolidentifiedview')
  } 
  get shippeddistrictview() {
    return this.accessCreation.get('shippeddistrictview')
  }
  get issuedschoolview() {
    return this.accessCreation.get('issuedschoolview')
  }
  get commissionedschoolview() {
    return this.accessCreation.get('commissionedschoolview')
  }
  get deviceassignview() {
    return this.accessCreation.get('deviceassignview')
  }
   get voicerecordview() {
    return this.accessCreation.get('voicerecordview')
  }
  get userType() {
    return this.accessCreation.get('userType')
  }

  
  ngOnInit() {
    'use strict';

    this.GetUsertypes();

    this.accessCreation = this.fb.group({
      userview: [''],
      useredit: [''],
      useradd: [''],
      schoolview: [''],
      schooledit: [''],
      schooladd: [''],
      schoolassign: [''],
      deviceview: [''],
      deviceedit: [''],
      deviceadd: [''],
      deviceassign: [''],
      schoolidentifiedview: [''],
      shippeddistrictview: [''],
      issuedschoolview: [''],
      commissionedschoolview: [''],
      deviceassignview: [''],
      voicerecordview: [''],
      userType: ['', [Validators.required]],

    });


  }

}
