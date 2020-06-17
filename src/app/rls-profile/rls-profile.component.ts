import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '../dynamic-script-loader-service.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
declare const Dropzone: any;
@Component({
  selector: 'app-profile',
  templateUrl: './rls-profile.component.html',
  styleUrls: ['./rls-profile.component.scss']
})
export class ProfileComponent implements OnInit {
changePassword: FormGroup;
  constructor(public toastr: ToastrManager,private rest: DynamicScriptLoaderService,private fb: FormBuilder,) { }

  ngOnInit() {
    // this.startScript();
    this.getuserdetails();

      this.changePassword = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.minLength(3),]],
      newpassword: ['', [Validators.required, Validators.minLength(3),]],
      retypepassword: ['', [Validators.required, Validators.minLength(3),]],
    });


  }
  userdetails : [];
  userId = localStorage.getItem('userId');

  // async startScript() {
  //     await this.dynamicScriptLoader.load('dataTables.buttons','buttons.flash','jszip','pdfmake','vfs_fonts','pdfmake','buttons.html5','buttons.print','bootstrap-colorpicker').then( data => {
  //       this.loadData();
  //     }).catch(error => console.log(error));
  //   }

    private loadData(){
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

  OnformSubmit(formdata) {
  let validData = this.changePassword.valid;
  if (validData) {
    var userId = localStorage.getItem('userId');
    formdata.userId = userId;
    this.rest.getpost('/changePassword', formdata).subscribe(data => {
        if (data.status) {
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

  getuserdetails(){
      this.rest.getpost('/getuserdetails', { userId: this.userId }).subscribe((result) => {
        if(result.status)
        {
          this.userdetails = result.result;
        }
        else
        {
          this.userdetails = [];
        }
      });
  }

  get oldpassword() {
    return this.changePassword.get('oldpassword')
  }

  get newpassword() {
    return this.changePassword.get('newpassword')
  }

  get retypepassword() {
    return this.changePassword.get('retypepassword')
  }
}
