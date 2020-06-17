import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
declare const $: any;
declare const Dropzone: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageURL: any;
  selectedUser = '01';
  model: any;
  registerForm: FormGroup;
  public email: any;
  public phoneNumber: any;
  public firstName: any;
  public username: any;
  public address1: any;
  public address2: any;

  public stateName: any;
  public storeValues: any;
  public country: any;
  public zipCode: any;
  public districtId: any;
  submitted = false;
  options = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' },

  ]
  remainderValue = null;
  constructor(private rest: DynamicScriptLoaderService, private my_router: ActivatedRoute, private router: Router, public toastr: ToastrManager, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.startScript();
    this.dashBoardData();
    //this.user_update();
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.maxLength(15)]],
      username: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],


      address1: ['', Validators.required],
      address2: ['', Validators.required],
      districtId: ['', Validators.required],
      stateName: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],


    });
    this.imageURL = 'assets/images/uday.gif';
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.user_update();


    if (this.registerForm.invalid) {

    }


  }

  async startScript() {
    await this.rest.load('dataTables.buttons', 'buttons.flash', 'jszip', 'pdfmake', 'vfs_fonts', 'pdfmake', 'buttons.html5', 'buttons.print', 'bootstrap-colorpicker').then(data => {
      this.loadData();
    }).catch(error => console.log(error));
  }

  private loadData() {
    $('#tableExport').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    });
    $('.colorpicker').colorpicker();

    this.initBasicSelect();
  }

  private initBasicSelect() {
    /* basic select start*/
    $('select').formSelect();
    $('#sel').formSelect();
    var data = [{ id: 1, name: "Option 1" }, { id: 2, name: "Option 2" }, { id: 3, name: "Option 3" }];

    var Options = "";
    $.each(data, function (i, val) {
      $('#sel').append("<option value='" + val.id + "'>" + val.name + "</option>");
      $('#sel').formSelect();
    });
    /* basic select end*/
  }

  dashBoardData() {    //function creation BINDING VALUE api calls

    const webToken = localStorage.getItem('webtoken');

    this.rest.user_bind(webToken).subscribe((result) => {
      console.log('bind3', result.data.firstName)

      if (result.status) {
        this.email = result.data.email;
        this.firstName = result.data.firstName;
        this.phoneNumber = result.data.phoneNumber;
        this.username = result.data.username;
        this.address1 = result.data.address1;
        this.address2 = result.data.address2;
        this.stateName = result.data.stateName;
        this.country = result.data.country;
        this.zipCode = result.data.zipCode;
        this.districtId = result.data.districtId;
      } else {
        alert(result.message);
      }
    }, (err) => {
      console.log(err);
    });
  }


  user_update() {                  //function creation for user profile update api calls

    const webToken = localStorage.getItem('webtoken');

    this.rest.user_update(this.registerForm.value, webToken).subscribe((result) => {

      if (result.status) {

        this.toastr.successToastr('Your Registration Successfull');

        this.router.navigate(['/dashboard']);
      } else {

      }
    }, (err) => {
      console.log(err);
    });
  }


}
