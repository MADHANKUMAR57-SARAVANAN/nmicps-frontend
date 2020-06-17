import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Observable } from 'rxjs'
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
declare const Dropzone: any;


@Component({
  selector: 'app-timeline2',
  templateUrl: './rls-device-manager.component.html',
  styleUrls: ['./rls-device-manager.component.scss']
})
export class RLSDeviceManagerComponent implements OnInit {
  public deviceData_DisPlay: any;
  public alerts: Array<any> = [];
  userTypeId = localStorage.getItem('userTypeId');
  deviceoption = localStorage.getItem('deviceoption');
  passdata: any[];
  simdata: any[];
  schoolNames: any[];
  curstateval = '';
  curdistrictsval = '';
  filterOption: FormGroup;

  constructor(private router: Router, private rest: DynamicScriptLoaderService, private fb: FormBuilder, ) { }

  ngOnInit() {


    this.GetSimNumbers();
    this.GetIMEI();
    this.startScript();

    this.DeviceData_DisPlay();

    this.filterOption = this.fb.group({
      state: ['', [Validators.required]],
      district: ['', [Validators.required]],
      school: ['', [Validators.required]],
      stateName: [''],
    });

  }

  get state() {
    return this.filterOption.get('state');
  }
  get stateName() {
    return this.filterOption.get('stateName');
  }
  get district() {
    return this.filterOption.get('district');
  }
  get school() {
    return this.filterOption.get('school');
  }

  GetIMEI(): void {
    const webToken = localStorage.getItem('webtoken');
    this.rest.get('device/listIMEI').subscribe(data => {
      this.passdata = data;
      setTimeout(function () {
        $('.selectpicker1').selectpicker('refresh');
      }, 1000);
    });
  }

  GetSimNumbers(): void {
    const webToken = localStorage.getItem('webtoken');
    this.rest.get('device/listSimno').subscribe(data => {
      this.simdata = data.data;
      setTimeout(function () {
        $('.selectpicker2').selectpicker('refresh');
      }, 1000);
    });
  }

  deviceChange(event: any) {
    if (event.target.value != '') {
      $("#tableExport").DataTable().search(event.target.value).draw();
    }
  }

  simChange(event: any) {
    if (event.target.value != '') {
      $("#tableExport").DataTable().search(event.target.value).draw();
    }
  }

  statusChange(event: any) {
    if (event.target.value != '') {
      this.rest.getpost('device/filsterbystatus', { status: event.target.value }).subscribe((result) => {
        if (result.status) {
          $("#tableExport").DataTable().destroy();
          this.deviceData_DisPlay = result.result;
          setTimeout(function () {
            $('#tableExport').DataTable({
              dom: 'Bfrtip',
              buttons: [
                'copy', {
                  extend: 'print',
                  title: 'Robotics Learning System'
                }, {
                  extend: 'csv',
                  title: 'Robotics Learning System'
                }, {
                  extend: 'excel',
                  title: 'Robotics Learning System'
                }, {
                  extend: 'pdf',
                  title: 'Robotics Learning System'
                }
              ]
            });
          }, 100);
        }
      });
    }
  }



  async startScript() {
    await this.rest.load('dataTables.buttons', 'buttons.flash', 'jszip', 'pdfmake', 'vfs_fonts', 'pdfmake', 'buttons.html5', 'buttons.print').then(data => {
      // this.loadData();
    }).catch(error => console.log(error));
  }

  // private loadData(){
  //   $('#tableExport').DataTable({
  //     dom: 'Bfrtip',
  //     buttons: [

  //       'copy',{
  //         extend: 'print',

  //         title: 'AFS-ICPS'
  //       } ,{
  //         extend: 'csv',
  //         title: 'AFS-ICPS'
  //       },{
  //         extend: 'excel',
  //         title: 'AFS-ICPS'
  //       }, {
  //         extend: 'pdf',
  //         title: 'AFS-ICPS'
  //       }
  //     ]
  //   });
  //   this.initBasicSelect();


  // }

  addDevice() {
    this.router.navigate(['rls-setting/rls-device-creation']);
  }


  DeviceData_DisPlay() {

    const webToken = localStorage.getItem('webtoken');
    const userTypeId = localStorage.getItem('userTypeId');
    const userId = localStorage.getItem('userId');

    this.rest.get('device/getDevicedetails?type=' + userTypeId + '&userId=' + userId).subscribe((result) => {
      if (result.status) {
        this.deviceData_DisPlay = result.result;


      }
      else {
        this.deviceData_DisPlay = [];

      }
      setTimeout(function () {
        $('#tableExport').DataTable({
          dom: 'Bfrtip',
          buttons: [

            'copy', {
              extend: 'print',
              title: 'AFS-ICPS'
            }, {
              extend: 'csv',
              title: 'AFS-ICPS'
            }, {
              extend: 'excel',
              title: 'AFS-ICPS'
            }, {
              extend: 'pdf',
              title: 'AFS-ICPS'
            }
          ]
        });
      }, 1000);
    }, (err) => {
      console.log(err);
    });


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
