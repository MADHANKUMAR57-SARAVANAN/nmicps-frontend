import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs'
import { ToastrManager } from 'ng6-toastr-notifications';
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
declare const $: any;
declare const Dropzone: any;

@Component({
  selector: 'app-deviceassign',
  templateUrl: './rls-device-assign.component.html',
  styleUrls: ['./rls-device-assign.component.scss']
})

export class RLSDeviceAssignComponent implements OnInit {
  deviceAssign: FormGroup;
  filteredBanks = ["india", "australia"]

  constructor(public toastr: ToastrManager,
    private fb: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderService) { }

  @Input() tabledata: any[];
  @Input() passdata: any[];
  @Input() schooldata: any[];
  @Input() form_returnres: any[];
  statedata: any[];
  curstateval = '';
  curdistrictsval = '';


  ngOnInit() {
    this.startScript();
    // this.GetImei();
    // this.GetSchoolname();
    this.Getassigned();
    this.GetStates();
    this.deviceAssign = this.fb.group({
      deviceId: ['', [Validators.required]],
      state: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      districtId: ['', [Validators.required]],
      schoolName: ['', [Validators.required]]
    });
  }

  get deviceId() {
    return this.deviceAssign.get('deviceId')
  }
  get schoolName() {
    return this.deviceAssign.get('schoolName')
  }
  get stateName() {
    return this.deviceAssign.get('stateName')
  }
  get state() {
    return this.deviceAssign.get('state')
  }
  get districtId() {
    return this.deviceAssign.get('districtId')
  }

  GetImei(): void {
    this.dynamicScriptLoader.get('device/listDevicesbyDistrict?districtId=' + this.deviceAssign.get('districtId').value + '&stateName=' + this.deviceAssign.get('stateName').value).subscribe(data => {
      this.passdata = data.data;
      console.log(data.data);
      setTimeout(function () {
        $('.selectpicker2').selectpicker('refresh');
        $('.dropdown-menu.show').css('transform', 'none !important');
      }, 1000);
    });
  };

  Getassigned(): void {
    this.dynamicScriptLoader.get('device/getassigneddevice').subscribe(data => {
      this.tabledata = data.data;
      console.log(data.data);
      setTimeout(function () {
        $('.dropdown-trigger').hide();
        $('.selectpicker3').selectpicker('refresh');
      }, 1000);

    });
  };

  GetSchoolname(): void {
    this.dynamicScriptLoader.get('school/listSchoolName?districtId=' + this.deviceAssign.get('districtId').value + '&stateName=' + this.deviceAssign.get('stateName').value).subscribe(data => {
      this.schooldata = data.data;
      console.log(data.data);
      setTimeout(function () {
        $('.selectpicker4').selectpicker('refresh');
      }, 2000);
    });
  };

  districtChange(event: any) {
    if (event.target.value != '') {
      this.dynamicScriptLoader.get('device/listDevicesbyDistrict?districtId=' + event.target.value + '&stateName=' + this.deviceAssign.get('stateName').value).subscribe((result) => {
        if (result.status) {
          this.passdata = result.result;
          setTimeout(function () {
            $('.selectpicker3').selectpicker('refresh');
          }, 2000);
        }
        else {
          this.toastr.errorToastr(result.message);
        }
      }, (err) => {
        console.log(err);
      });

      this.dynamicScriptLoader.get('school/listSchoolName?districtId=' + event.target.value + '&stateName=' + this.deviceAssign.get('stateName').value).subscribe((result) => {
        if (result.status) {
          this.schooldata = result.data;
          setTimeout(function () {
            $('.selectpicker4').selectpicker('refresh');
          }, 2000);
        }
        else {
          this.toastr.errorToastr(result.message);
        }
      }, (err) => {
        console.log(err);
      });

    }
  }

  stateChange(event: any) {
    if (event.target.value != '') {
      this.curstateval = event.target.value;
      this.curdistrictsval = this.statedata['data'][this.curstateval].districts;
      let stateName = this.statedata['data'][this.curstateval].stateName;
      this.deviceAssign.get('stateName').setValue(stateName);
      setTimeout(function () {
        $('.selectpicker2').selectpicker('refresh');
      }, 2000);

    }
  }

  GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.dynamicScriptLoader.GetStates(webToken).subscribe(data => {
      console.log(data, 'testtttttttt');
      this.statedata = data;
      setTimeout(function () {
        $('.selectpicker1').selectpicker('refresh');
        $('.dropdown-menu.show').css('transform', 'none !important');
      }, 1000);
    });
  };

  /*GetImei(): void {
     const webToken = localStorage.getItem('webtoken');
     this.dynamicScriptLoader.GetImei(webToken).subscribe(data=>{
       this.passdata = data;
     });
   };
   */





  OnDeviceformSubmit(formdata) {
    console.log(formdata);
    this.dynamicScriptLoader.getpost('device/assignschool', formdata).subscribe((result) => {
      if (result.status) {
        this.toastr.successToastr(result['message'], 'Success');
      }
      else {
        this.toastr.errorToastr(result['message']);
      }
      this.GetImei();
      this.GetSchoolname();
    });

  }



  async startScript() {
    await this.dynamicScriptLoader.load('dataTables.buttons', 'buttons.flash', 'jszip', 'pdfmake', 'vfs_fonts', 'pdfmake', 'buttons.html5', 'buttons.print', 'bootstrap-colorpicker').then(data => {
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
}

