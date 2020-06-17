import { Component, Input, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { DynamicScriptLoaderService } from '../../dynamic-script-loader-service.service';


import { Observable } from 'rxjs'
import { ToastrManager } from 'ng6-toastr-notifications';
declare const $: any;
declare const Dropzone: any;


@Component({
  selector: 'app-timeline2',
  templateUrl: './rls-kithandler-manager.component.html',
  styleUrls: ['./rls-kithandler-manager.component.scss']
})
export class RLSkithandlerManagerComponent implements OnInit {
  public schoolData_DisPlay: any[];
  public alerts: Array<any> = [];
  userTypeId = localStorage.getItem('userTypeId');
  schooloption = localStorage.getItem('schooloption');
  passdata: any[];
  schoolNames: any[];
  curstateval = '';
  curdistrictsval = '';
  showaddbtn = true;
  constructor(private router: Router, private rest: DynamicScriptLoaderService,private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit() {
    let districtidd = this.activatedRoute.snapshot.paramMap.get('id');
    this.GetStates();
    this.startScript();
    // this.SchoolData_DisPlay(districtidd);
    if(districtidd!=null)
    {
      this.showaddbtn = false;
    }
  }

  async startScript() {
    await this.rest.load('dataTables.buttons', 'buttons.flash', 'jszip', 'pdfmake', 'vfs_fonts', 'pdfmake', 'buttons.html5', 'buttons.print').then(data => {
      // this.loadData();
    }).catch(error => console.log(error));
  }

  

  addDevice() {
    this.router.navigate(['rls-kithandler/rls-kithandler-creation']);
  }
  GetStates(): void {
    const webToken = localStorage.getItem('webtoken');
    this.rest.GetStates(webToken).subscribe(data => {
      console.log(data, 'data');
      this.passdata = data;
      setTimeout(function () {
        $('.selectpicker1').selectpicker('refresh');
      }, 2000);
    });
  };

  stateChange(event: any) {
    if (event.target.value != '') {
      this.curstateval = event.target.value;
      this.curdistrictsval = this.passdata['data'][this.curstateval].districts;
      let stateName = this.passdata['data'][this.curstateval].stateName;
      $("#tableExport").DataTable().search(stateName).draw();
      setTimeout(function () {
        $('.selectpicker2').selectpicker('refresh');
      }, 2000);
    }
  }

  schoolChange(event: any) {
    if (event.target.value != '') {
      $("#tableExport").DataTable().search(event.target.value).draw();
    }
  }

  districtChange(event: any) {
    if (event.target.value != '') {

      $("#tableExport").DataTable().search(event.target.value).draw();
      this.rest.getpost('school/getSchoolfilter', { district: event.target.value, type: 'school' }).subscribe((result) => {
        if (result.status) {
          this.schoolNames = result.result;
          console.log(this.schoolNames);
          setTimeout(function () {
            $('.selectpicker3').selectpicker('refresh');
          }, 2000);
        }
        else {
          //this.toastr.errorToastr(result.message); 
        }
      }, (err) => {
        console.log(err);
      });

    }
  }

  SchoolData_DisPlay(districtidd) {

    const webToken = localStorage.getItem('webtoken');
    const userTypeId = localStorage.getItem('userTypeId');
    const userId = localStorage.getItem('userId');

    this.rest.get('school/getSchooldetails?type=' + userTypeId + '&userId=' + userId).subscribe((result) => {
      if (result.status) {
        this.schoolData_DisPlay = result.result;

      }
      else {
        this.schoolData_DisPlay = [];
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
        if(districtidd!=null)
        {
          $("#tableExport").DataTable().search(districtidd).draw();
        }
      }, 1000);
    }, (err) => {
      console.log(err);
    });
  }

}
