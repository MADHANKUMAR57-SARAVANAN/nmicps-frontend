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
  templateUrl: './rls-user-edit.component.html',
  styleUrls: ['./rls-user-edit.component.scss']
})
export class RLSUserEditComponent implements OnInit {
  userCreation: FormGroup;

  constructor(
    public toastr: ToastrManager,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  @Input() passdata: any[];
  @Input() userTypes: any[];
  @Input() userDetails: any[];
  @Input() form_returnres: any[];
  curstateval = '';
  curdistrictsval = '';
  userTypeId = localStorage.getItem('userTypeId');

  //will transfer to db
  Admin_types: { [key: string]: string } =
    {
      1: 'Super admin',
      2: 'Admin',
      3: 'State user',
      4: 'District user'
    };

  GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.dynamicScriptLoader.GetStates(webToken).subscribe(data => {
      this.passdata = data;
    });
  };

  GetUsertypes(): void {
    const webToken = localStorage.getItem('webtoken');
    const userTypeId = localStorage.getItem('userTypeId');
    this.dynamicScriptLoader.GetUsertypes(webToken, userTypeId).subscribe(data => {
      console.log(data.data);
      this.userTypes = data;
    });
  };

  GetUserdetails(id): void {

    this.dynamicScriptLoader.getpost('/getuserdetails', { userId: id }).subscribe(data => {
      if (data['status'])
        this.userDetails = data.result;
      this.curdistrictsval = this.passdata['data'][data.result.stateId].districts;
      let stateName = this.passdata['data'][data.result.stateId].stateName;
      this.userCreation.get('userName').setValue(data.result.username);
      this.userCreation.get('password').setValue(data.result.password);
      this.userCreation.get('confirmPassword').setValue(data.result.password);
      this.userCreation.get('email').setValue(data.result.email);
      this.userCreation.get('mobileNumber').setValue(data.result.phoneNumber);
      this.userCreation.get('address1').setValue(data.result.address1);
      this.userCreation.get('address2').setValue(data.result.address2);
      this.userCreation.get('country').setValue(data.result.country);
      this.userCreation.get('state').setValue(data.result.stateId);
      this.userCreation.get('district').setValue(data.result.districtId);
      this.userCreation.get('zipcode').setValue(data.result.zipCode);
      this.userCreation.get('status').setValue(data.result.isActive);
      this.userCreation.get('userType').setValue(data.result.userTypeId);
      this.userCreation.get('userId').setValue(data.result.userId);
      this.userCreation.get('stateName').setValue(stateName);
      // this.userCreation.setValue({
      // userName: data.result.username,
      // });
    });
  };

  stateChange(event: any) {
    if (event.target.value != '') {
      this.curstateval = event.target.value;
      this.curdistrictsval = this.passdata['data'][this.curstateval].districts;
      let stateName = this.passdata['data'][this.curstateval].stateName;
      this.userCreation.get('stateName').setValue(stateName);
    }
  }

  PutUserCreation(formdata): void {
    this.dynamicScriptLoader.getpost('/updateuserdetails', formdata).subscribe(data => {
      if (data['status']) {
        this.toastr.successToastr(data['message'], 'Success');
      }
      else {
        this.toastr.errorToastr(data['message']);

      }
    });
  };

  OnUserformSubmit(u) {
    let validData = this.userCreation.valid;
    console.log('u :', u);
    if (validData) {
      console.log('form valid :', u);
      this.PutUserCreation(u);

    } else {
      this.toastr.errorToastr('Invalid deatails check the form inputs');
    }
  }


  get userName() {
    return this.userCreation.get('userName')
  }
  get password() {
    return this.userCreation.get('password')
  }
  get confirmPassword() {
    return this.userCreation.get('confirmPassword')
  }
  get userType() {
    return this.userCreation.get('userType')
  }
  get email() {
    return this.userCreation.get('email')
  }
  get mobileNumber() {
    return this.userCreation.get('mobileNumber')
  }

  get address1() {
    return this.userCreation.get('address1')
  }
  get address2() {
    return this.userCreation.get('address2')
  }

  get country() {
    return this.userCreation.get('country')
  }
  get state() {
    return this.userCreation.get('state')
  }
  get district() {
    return this.userCreation.get('district')
  }
  get zipcode() {
    return this.userCreation.get('zipcode')
  }
  get status() {
    return this.userCreation.get('status')
  }
  get userId() {
    return this.userCreation.get('userId')
  }
  get stateName() {
    return this.userCreation.get('stateName')
  }



  ngOnInit() {
    'use strict';

    this.GetStates();
    this.GetUsertypes();
    // this.GetUsertypes();

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.GetUserdetails(id);

    }

    this.userCreation = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3),]],
      password: ['', [Validators.required, Validators.minLength(8),]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8),]],
      userType: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email,]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]*$"),]],
      address1: ['', [Validators.required, Validators.minLength(3),]],
      address2: ['', [Validators.required, Validators.minLength(3),]],
      country: ['India', [Validators.required,]],
      state: ['', [Validators.required,]],
      district: ['', [Validators.required,]],
      zipcode: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$"),]],
      status: ['', [Validators.required,]],
      userId: [''],
      stateName: [''],
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });


  }

}
